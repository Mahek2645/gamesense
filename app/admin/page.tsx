'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Gamepad2, Activity, Bug, Zap, Server, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowRight, LogOut, Settings, Menu, X, LayoutDashboard, Mail, MessageSquare, Building } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalGames: 0,
    humanTests: 0,
    aiTests: 0,
    totalBugs: 0,
    totalInquiries: 0,
    newInquiries: 0,
  })
  const [platformData, setPlatformData] = useState<any>(null)

  useEffect(() => {
    // Check admin authentication via cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1]
    
    if (!token) {
      router.push('/admin/login')
      return
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (decoded.role !== 'admin') {
        router.push('/')
        return
      }
    } catch {
      router.push('/admin/login')
      return
    }

    setIsLoading(false)

    // Fetch analytics data and poll real-time every 3 seconds
    fetchAnalytics()
    const pollInterval = setInterval(fetchAnalytics, 3000)
    return () => clearInterval(pollInterval)
  }, [router])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/metrics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
        setPlatformData(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      document.cookie = 'auth_token=; path=/; max-age=0; SameSite=lax'
      router.push('/admin/login')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
      </div>
    )
  }

  const stats = [
    { label: 'Total Users', value: analytics.totalUsers.toString(), delta: '+12.4%', icon: Users, color: 'violet' },
    { label: 'Total Games', value: analytics.totalGames.toString(), delta: '+8.2%', icon: Gamepad2, color: 'cyan' },
    { label: 'Human Tests', value: analytics.humanTests.toString(), delta: '+18.6%', icon: Activity, color: 'emerald' },
    { label: 'AI Tests', value: analytics.aiTests.toString(), delta: '+24.1%', icon: Zap, color: 'orange' },
    { label: 'Studio Inquiries', value: (analytics.totalInquiries || platformData?.inquiries?.length || 3).toString(), delta: `${analytics.newInquiries ?? 1} new`, icon: Mail, color: 'emerald' },
    { label: 'Total Bugs', value: analytics.totalBugs.toString(), delta: '+9.8%', icon: Bug, color: 'red' },
  ]

  const navItems = [
    { label: 'Overview', icon: Activity, href: '/admin' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Games', icon: Gamepad2, href: '/admin/games' },
    { label: 'Test Runs', icon: Activity, href: '/admin/tests' },
    { label: 'Comparisons', icon: TrendingUp, href: '/admin/comparisons' },
    { label: 'Bugs', icon: Bug, href: '/admin/bugs' },
    { label: 'AI Agents', icon: Zap, href: '/admin/agents' },
    { label: 'Analytics', icon: TrendingUp, href: '/admin/analytics' },
    { label: 'System Health', icon: Server, href: '/admin/system' },
    { label: 'Activity Logs', icon: Clock, href: '/admin/logs' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
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
          <Link href="/admin" className="flex items-center gap-2.5 text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30">
              <Shield className="size-4" />
            </span>
            <span className="text-[17px] font-semibold">GameSense Admin</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-slate-500 lg:hidden">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-violet-500/15 px-3 py-2.5 text-sm font-medium text-violet-300">
            <LayoutDashboard className="size-5" />
            Overview
          </Link>
          <Link href="/admin/inquiries" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 group transition">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-slate-400 group-hover:text-emerald-400 transition" />
              <span>Inquiries</span>
            </div>
            {Boolean(analytics.newInquiries || (platformData?.inquiries?.filter((i: any) => i.status === 'new').length)) && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 animate-pulse">
                {analytics.newInquiries || platformData?.inquiries?.filter((i: any) => i.status === 'new').length} New
              </span>
            )}
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Users className="size-5" />
            Users
          </Link>
          <Link href="/admin/games" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Gamepad2 className="size-5" />
            Games
          </Link>
          <Link href="/admin/agents" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Zap className="size-5" />
            AI Agents
          </Link>
          <Link href="/admin/system" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Activity className="size-5" />
            System Health
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <Link href="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-emerald-400 transition">
            <Activity className="size-[17px]" />
            User Dashboard
          </Link>
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
            <h1 className="text-lg font-semibold">Platform Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
                AD
              </span>
              <span className="hidden text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-7xl p-5 sm:p-7 lg:p-10">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-slate-800 bg-[#111a2d] p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`grid size-9 place-items-center rounded-lg ${
                      stat.color === 'violet'
                        ? 'bg-violet-500/10 text-violet-500'
                        : stat.color === 'cyan'
                        ? 'bg-cyan-500/10 text-cyan-500'
                        : stat.color === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : stat.color === 'orange'
                        ? 'bg-orange-500/10 text-orange-500'
                        : stat.color === 'pink'
                        ? 'bg-pink-500/10 text-pink-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    <stat.icon className="size-4" />
                  </div>
                  <span
                    className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                      stat.delta.startsWith('+')
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {stat.delta}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Platform Health */}
          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-slate-800 bg-[#111a2d] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-white">Platform Health</h2>
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle className="size-4" />
                  All Systems Operational
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">API Status</span>
                  <span className="text-sm text-emerald-400">99.98% uptime</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Database</span>
                  <span className="text-sm text-emerald-400">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">AI Services</span>
                  <span className="text-sm text-emerald-400">42 agents active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Storage</span>
                  <span className="text-sm text-emerald-400">68% used</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-slate-800 bg-[#111a2d] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-white">Active Tests</h2>
                <span className="text-sm text-slate-400">Live</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Neon Drift - AI Test</p>
                    <p className="text-xs text-slate-400">78% complete</p>
                  </div>
                  <span className="text-xs text-slate-400">4 agents</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Starfall Tactics - Human Test</p>
                    <p className="text-xs text-slate-400">3 testers active</p>
                  </div>
                  <span className="text-xs text-slate-400">2h 15m</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                  <div className="size-2 rounded-full bg-orange-400 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Pocket Worlds - Comparison</p>
                    <p className="text-xs text-slate-400">Processing results</p>
                  </div>
                  <span className="text-xs text-slate-400">AI + Human</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Human vs AI Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-xl border border-slate-800 bg-[#111a2d] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">Platform Human vs AI Analytics</h2>
              <Link
                href="/admin/comparisons"
                className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
              >
                View Details <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">AI Detection Rate</p>
                <p className="mt-1 text-2xl font-semibold text-white">91%</p>
                <p className="mt-1 text-xs text-emerald-400">+3.2% vs last month</p>
              </div>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">Human Detection Rate</p>
                <p className="mt-1 text-2xl font-semibold text-white">83%</p>
                <p className="mt-1 text-xs text-slate-400">Stable</p>
              </div>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">Avg AI Speed</p>
                <p className="mt-1 text-2xl font-semibold text-white">7.8×</p>
                <p className="mt-1 text-xs text-emerald-400">faster</p>
              </div>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">Bug Overlap</p>
                <p className="mt-1 text-2xl font-semibold text-white">67%</p>
                <p className="mt-1 text-xs text-slate-400">Both methods</p>
              </div>
            </div>
          </motion.div>

          {/* Registered Accounts & Studio Workspaces */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-[#111a2d] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Platform User Accounts & Studios</h2>
                <p className="text-xs text-slate-400">All registered developer and administrative accounts</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20">
                {platformData?.users?.length || 2} Accounts Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3">User ID</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Workspace</th>
                    <th className="pb-3">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {platformData?.users?.map((u: any) => (
                    <tr key={u.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3 text-violet-400">{u.id}</td>
                      <td className="py-3 font-semibold text-white">{u.name}</td>
                      <td className="py-3 text-cyan-300">{u.email}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-slate-700/40 text-slate-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{u.workspaceName || 'Personal'}</td>
                      <td className="py-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-slate-500">Loading user accounts...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Studio Inquiries & Contact Sessions */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-[#111a2d] p-6 shadow-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Studio Inquiries & Contact Sessions</h2>
                  {Boolean(platformData?.inquiries?.filter((i: any) => i.status === 'new').length) && (
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-xs font-mono font-semibold text-emerald-400 animate-pulse">
                      {platformData.inquiries.filter((i: any) => i.status === 'new').length} New
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">Direct studio demo requests and custom telemetry inquiries sent by users</p>
              </div>

              <Link
                href="/admin/inquiries"
                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 hover:bg-violet-500/20 hover:text-white transition"
              >
                <span>Manage All Inquiries</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {platformData?.inquiries?.slice(0, 3).map((inq: any) => (
                <div
                  key={inq.id}
                  className="rounded-lg border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{inq.name}</span>
                      {inq.studio && (
                        <span className="inline-flex items-center gap-1 rounded bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[11px] font-medium text-violet-300">
                          <Building className="size-3 text-violet-400" />
                          <span>{inq.studio}</span>
                        </span>
                      )}
                      {inq.engine && (
                        <span className="inline-flex items-center gap-1 rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[11px] font-mono text-cyan-300">
                          <Gamepad2 className="size-3 text-cyan-400" />
                          <span>{inq.engine}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {inq.status === 'new' && (
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                          New
                        </span>
                      )}
                      {inq.status === 'read' && (
                        <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                          Reviewed
                        </span>
                      )}
                      {inq.status === 'replied' && (
                        <span className="rounded-full bg-violet-500/10 border border-violet-500/30 px-2 py-0.5 text-[10px] font-bold text-violet-400 uppercase">
                          Replied
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {inq.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                    <span className="text-cyan-400">{inq.email}</span>
                    <Link
                      href="/admin/inquiries"
                      className="text-violet-400 hover:text-violet-300 transition inline-flex items-center gap-1"
                    >
                      <span>Open Session</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )) || (
                <div className="py-6 text-center text-slate-500 text-xs">
                  No incoming inquiries yet.
                </div>
              )}
            </div>
          </div>

          {/* Real-time Telemetry Ingestion Activity */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-[#111a2d] p-6 shadow-xl mb-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Live Engine Telemetry Stream</h2>
                <p className="text-xs text-slate-400">Direct packet inspection from connected games</p>
              </div>
              <Link
                href="/dashboard/telemetry"
                className="text-xs text-violet-400 hover:text-violet-300 font-mono transition inline-flex items-center gap-1"
              >
                <span>Full Telemetry Explorer</span> <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto font-mono text-xs">
              {platformData?.recentTelemetry?.map((t: any) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        t.actorType === 'ai' ? 'text-violet-400' : 'text-emerald-400'
                      }`}
                    >
                      {t.actorType}
                    </span>
                    <span className="font-semibold text-white">{t.eventType}</span>
                    <span className="text-slate-500">[{t.actorId}]</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    {new Date(t.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )) || (
                <div className="py-6 text-center text-slate-500">Listening for telemetry packets...</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
