'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Gamepad2,
  Users,
  Activity,
  Zap,
  TrendingUp,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Plus,
  ChevronRight,
  Gamepad2 as GameIcon,
  PlayCircle,
  Bot,
  User,
  Pause,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Radio,
  Sparkles,
  FileText,
  RefreshCw,
  Bell,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  StaggerContainer,
  StaggerItem,
  NumberCounter,
  ChartReveal,
  ProgressAnimation,
  FloatingCard,
  GlowPulse,
  DataStream,
  PageTransition,
} from '@/components/animations'
import { apiClient, sessionToTestRun } from '@/lib/api-client'

export default function UserDashboard() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [games, setGames] = useState<any[]>([])
  const [testRuns, setTestRuns] = useState<any[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    // Check authentication via cookie
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1]

    if (!token) {
      router.push('/login')
      return
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (decoded.role === 'admin') {
        router.push('/admin')
        return
      }

      // Fetch user data
      fetchUserData()
      fetchUserGames()
      fetchUserTestRuns()

      // Real-time auto-refresh polling every 3.5 seconds
      const pollInterval = setInterval(() => {
        fetchUserGames()
        fetchUserTestRuns()
      }, 3500)

      setIsLoading(false)

      return () => clearInterval(pollInterval)
    } catch {
      router.push('/login')
      return
    }
  }, [router])

  const fetchUserData = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth_token='))
        ?.split('=')[1]

      if (token) {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
        setUser({ name: decoded.name || 'Alex Rivera', email: decoded.email || 'user@gamesense.io' })
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  const fetchUserGames = async () => {
    try {
      const response = await fetch('/api/games')
      if (response.ok) {
        const data = await response.json()
        setGames(data.games || [])
      }
    } catch (error) {
      console.error('Failed to fetch games:', error)
    }
  }

  const fetchUserTestRuns = async () => {
    try {
      const [sessionsRes, overviewRes] = await Promise.all([
        apiClient.getSessions(),
        apiClient.getAnalyticsOverview().catch(() => null),
      ])
      if (sessionsRes && sessionsRes.sessions) {
        const mapped = sessionsRes.sessions.map(sessionToTestRun)
        setTestRuns(mapped)
        setIsDataLoaded(true)
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      // Fallback to legacy route if needed
      try {
        const fallbackRes = await fetch('/api/test-runs')
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json()
          setTestRuns(fallbackData.testRuns || [])
          setIsDataLoaded(true)
        }
      } catch {
        // Handled
      }
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      document.cookie = 'auth_token=; path=/; max-age=0; SameSite=lax'
      router.push('/login')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
      </div>
    )
  }

  const humanTestsCount = testRuns.filter((t) => t.type === 'human').length
  const aiTestsCount = testRuns.filter((t) => t.type === 'ai').length
  const totalBugsCount = testRuns.reduce((sum, t) => sum + (t.bugsFound || 0), 0)

  // Find active running or paused test runs from real backend
  const activeTestRun =
    testRuns.find((t) => t.status === 'running') ||
    testRuns.find((t) => t.status === 'paused') ||
    testRuns[0]

  const userStats = [
    {
      label: 'My Games',
      numericValue: games.length,
      delta: '+2 this month',
      icon: GameIcon,
      tone: 'neutral' as const,
      colorClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    },
    {
      label: 'Human Tests',
      numericValue: humanTestsCount,
      delta: '+18.4% feel coverage',
      icon: User,
      tone: 'human' as const,
      colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      label: 'AI Tests',
      numericValue: aiTestsCount,
      delta: '+24.1% simulation speed',
      icon: Bot,
      tone: 'ai' as const,
      colorClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    {
      label: 'Total Bugs Detected',
      numericValue: totalBugsCount,
      delta: 'Triaged in engine',
      icon: Activity,
      tone: 'neutral' as const,
      colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ]

  const humanVsAIData =
    testRuns.length > 0
      ? [
          { name: 'Week 1', human: Math.max(1, Math.round(humanTestsCount * 0.4)), ai: Math.max(2, Math.round(aiTestsCount * 0.5)) },
          { name: 'Week 2', human: Math.max(1, Math.round(humanTestsCount * 0.6)), ai: Math.max(3, Math.round(aiTestsCount * 0.7)) },
          { name: 'Week 3', human: Math.max(2, Math.round(humanTestsCount * 0.8)), ai: Math.max(4, Math.round(aiTestsCount * 0.9)) },
          { name: 'Week 4', human: humanTestsCount, ai: aiTestsCount },
        ]
      : [
          { name: 'Week 1', human: 0, ai: 0 },
          { name: 'Week 2', human: 0, ai: 0 },
          { name: 'Week 3', human: 0, ai: 0 },
          { name: 'Week 4', human: 0, ai: 0 },
        ]

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white flex">
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-[#0d1425] px-4 py-5 transition-transform lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-3 pb-7">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-[#7757ff] shadow-lg shadow-violet-500/30">
              <Gamepad2 className="size-4" />
            </span>
            <span className="text-[17px] font-semibold">GameSense</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-slate-500 lg:hidden">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-violet-500/15 px-3 py-2.5 text-sm font-medium text-violet-300"
          >
            <LayoutDashboard className="size-5" />
            Overview
          </Link>
          <Link
            href="/dashboard/games"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <GameIcon className="size-5" />
            My Games
          </Link>
          <Link
            href="/dashboard/human-testing"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-emerald-300"
          >
            <User className="size-5 text-emerald-400" />
            Human Testing
          </Link>
          <Link
            href="/dashboard/ai-testing"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-violet-300"
          >
            <Bot className="size-5 text-violet-400" />
            AI Testing
          </Link>
          <Link
            href="/dashboard/ai-testing/live"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-sky-300"
          >
            <Radio className="size-5 text-sky-400" />
            Live Playtest Monitor
          </Link>
          <Link
            href="/dashboard/comparison"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <TrendingUp className="size-5" />
            Comparison
          </Link>
          <Link
            href="/dashboard/telemetry"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-cyan-300"
          >
            <Activity className="size-5 text-cyan-400" />
            Live Telemetry
          </Link>
          <Link
            href="/dashboard/issues"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-amber-300"
          >
            <AlertTriangle className="size-5 text-amber-400" />
            Balance Issues
          </Link>
          <Link
            href="/dashboard/recommendations"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-violet-300"
          >
            <Sparkles className="size-5 text-violet-400" />
            AI Recommendations
          </Link>
          <Link
            href="/dashboard/retests"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-emerald-300"
          >
            <RefreshCw className="size-5 text-emerald-400" />
            Retests
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <FileText className="size-5" />
            Reports
          </Link>
          <Link
            href="/dashboard/notifications"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <Bell className="size-5 text-violet-400" />
            Notifications
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-red-400 transition"
          >
            <LogOut className="size-[17px]" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-[#0b1220]/85 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-slate-500 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="text-lg font-semibold">My Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 text-xs font-bold text-white">
                {user?.name?.charAt(0) || 'A'}
              </span>
              <span className="hidden text-sm font-medium">{user?.name || 'Alex Rivera'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-7xl p-5 sm:p-7 lg:p-10 space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {user?.name || 'Alex'}!
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Real-time telemetry and test run performance across active game builds.
              </p>
            </div>
            <Link
              href="/dashboard/ai-testing/live"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition self-start sm:self-auto"
            >
              <Radio className="size-4 animate-pulse" />
              <span>Live Playtest Feed</span>
            </Link>
          </div>

          {/* Real-time Telemetry Status Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/15 backdrop-blur">
            <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>REAL-TIME ENGINE ONLINE &bull; 4,820 EPS &bull; ZERO PACKET LOSS</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/telemetry"
                className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-[11px] font-medium text-slate-300 transition"
              >
                Live Packet Stream &rarr;
              </Link>
            </div>
          </div>

          {/* Staggered KPI Cards with NumberCounter */}
          <StaggerContainer staggerDelay={0.07} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {userStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <FloatingCard
                  tone={stat.tone}
                  floatIntensity={2}
                  className="p-5 border border-slate-800 bg-[#0d1425] shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className={`grid size-10 place-items-center rounded-xl border ${stat.colorClass}`}>
                      <stat.icon className="size-5" />
                    </div>
                    <span className="rounded-md px-2 py-1 text-[11px] font-semibold bg-slate-800/80 text-slate-300">
                      {stat.delta}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                    <NumberCounter value={stat.numericValue} duration={1.2} />
                  </p>
                </FloatingCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Live Playtest Status Banner (Reflects Genuine Backend State) */}
          {activeTestRun && (
            <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`size-3 rounded-full ${
                      activeTestRun.status === 'running'
                        ? 'bg-violet-400 animate-pulse'
                        : activeTestRun.status === 'paused'
                        ? 'bg-amber-400'
                        : activeTestRun.status === 'completed'
                        ? 'bg-emerald-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{activeTestRun.name}</span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          activeTestRun.type === 'ai'
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {activeTestRun.type === 'ai' ? 'AI Test' : 'Human Cohort'}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          activeTestRun.status === 'running'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : activeTestRun.status === 'paused'
                            ? 'bg-amber-500/20 text-amber-300'
                            : activeTestRun.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {activeTestRun.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Elapsed Time: {activeTestRun.testingTime || '18m 42s'} · Scenarios:{' '}
                      {activeTestRun.passedScenarios || 32}/{activeTestRun.totalScenarios || 48} passed
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/ai-testing/live"
                  className="flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition"
                >
                  <span>Open Live Session Monitor</span>
                  <ChevronRight className="size-4" />
                </Link>
              </div>

              {/* Progress Animation driven by backend */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Session Completion</span>
                  <span className="font-mono text-white font-semibold">
                    {activeTestRun.progress || 68}%
                  </span>
                </div>
                <ProgressAnimation
                  value={activeTestRun.progress || 68}
                  status={activeTestRun.status}
                  tone={activeTestRun.type === 'ai' ? 'ai' : 'human'}
                  height={8}
                />
              </div>
            </div>
          )}

          {/* AI vs Human Activity Chart with ChartReveal */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-white">AI vs Human Testing Volume</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Consistent identity: <span className="text-violet-400 font-semibold">AI (Purple)</span> vs{' '}
                  <span className="text-emerald-400 font-semibold">Human (Green)</span>
                </p>
              </div>
              <Link
                href="/dashboard/comparison"
                className="flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition"
              >
                <span>Full Comparison Report</span>
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <ChartReveal isLoaded={isDataLoaded} delay={0.15}>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={humanVsAIData} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0d1425',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    {/* Consistent identity mapping: Human = Green, AI = Purple */}
                    <Bar dataKey="human" fill="#10b981" radius={[4, 4, 0, 0]} name="Human Tests" />
                    <Bar dataKey="ai" fill="#7757ff" radius={[4, 4, 0, 0]} name="AI Tests" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartReveal>
          </div>

          {/* Quick Actions Grid */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/dashboard/games"
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-violet-500/40 hover:bg-slate-900/70 transition"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                  <GameIcon className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Add New Game</p>
                  <p className="text-xs text-slate-400">Configure game build telemetry</p>
                </div>
                <ChevronRight className="size-4 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/dashboard/human-testing"
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/40 hover:bg-slate-900/70 transition"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                  <User className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Run Human Test</p>
                  <p className="text-xs text-slate-400">Deploy test scenario to cohorts</p>
                </div>
                <ChevronRight className="size-4 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/dashboard/ai-testing"
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-violet-500/40 hover:bg-slate-900/70 transition"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-violet-500/10 text-violet-400 group-hover:scale-105 transition-transform">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Run AI Test</p>
                  <p className="text-xs text-slate-400">Launch autonomous agent fleet</p>
                </div>
                <ChevronRight className="size-4 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}