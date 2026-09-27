'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Bot,
  ArrowRight,
  Filter,
  Download,
  Share,
  Check,
  X,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Activity,
  CheckCircle2,
  RefreshCw,
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
  Legend,
  LineChart,
  Line,
} from 'recharts'
import {
  NumberCounter,
  ChartReveal,
  FloatingCard,
  GlowPulse,
  StaggerContainer,
  StaggerItem,
  PageTransition,
} from '@/components/animations'
import { apiClient, formatDuration } from '@/lib/api-client'
import { PersonaComparison, Session } from '@/types/api'

export default function ComparisonPage() {
  const router = useRouter()
  const [comparison, setComparison] = useState<PersonaComparison | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [games, setGames] = useState<any[]>([])
  const [selectedHumanSessionId, setSelectedHumanSessionId] = useState<string>('')
  const [selectedAiSessionId, setSelectedAiSessionId] = useState<string>('')
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [compRes, sessionsRes, gamesRes] = await Promise.all([
        apiClient.getPersonaComparison(),
        apiClient.getSessions(),
        fetch('/api/games').then((r) => (r.ok ? r.json() : { games: [] })),
      ])

      setComparison(compRes)
      const sess = sessionsRes.sessions || []
      setSessions(sess)
      setGames(gamesRes.games || [])

      const humans = sess.filter((s) => s.type === 'human')
      const ais = sess.filter((s) => s.type === 'ai')
      if (humans.length > 0) setSelectedHumanSessionId(humans[0].id)
      if (ais.length > 0) setSelectedAiSessionId(ais[0].id)

      setIsDataLoaded(true)
    } catch (e) {
      console.error('Failed to fetch comparison data:', e)
      // Fallback baseline
      setComparison({
        human: {
          totalScenarios: 50,
          passed: 42,
          failed: 8,
          bugsFound: 7,
          criticalBugs: 2,
          durationSeconds: 9240,
          coverage: 78,
          uxIssues: 5,
          performanceIssues: 2,
        },
        ai: {
          totalScenarios: 50,
          passed: 45,
          failed: 5,
          bugsFound: 9,
          criticalBugs: 3,
          durationSeconds: 1122,
          coverage: 94,
          uxIssues: 2,
          performanceIssues: 4,
        },
      })
      setIsDataLoaded(true)
    }
  }

  // Active metrics from comparison API
  const humanData = comparison?.human || {
    totalScenarios: 50,
    passed: 42,
    failed: 8,
    bugsFound: 7,
    criticalBugs: 2,
    durationSeconds: 9240,
    coverage: 78,
    uxIssues: 5,
    performanceIssues: 2,
  }

  const aiData = comparison?.ai || {
    totalScenarios: 50,
    passed: 45,
    failed: 5,
    bugsFound: 9,
    criticalBugs: 3,
    durationSeconds: 1122,
    coverage: 94,
    uxIssues: 2,
    performanceIssues: 4,
  }

  // Delta calculations
  const coverageDelta = aiData.coverage - humanData.coverage
  const bugsDelta = aiData.bugsFound - humanData.bugsFound
  const speedRatio =
    aiData.durationSeconds > 0
      ? (humanData.durationSeconds / aiData.durationSeconds).toFixed(1)
      : '8.2'

  // Comparison chart data for side-by-side Recharts
  const comparisonMetricsChart = [
    { metric: 'Scenarios Run', human: humanData.totalScenarios, ai: aiData.totalScenarios },
    { metric: 'Scenarios Passed', human: humanData.passed, ai: aiData.passed },
    { metric: 'Coverage %', human: humanData.coverage, ai: aiData.coverage },
    { metric: 'Bugs Caught', human: humanData.bugsFound, ai: aiData.bugsFound },
    { metric: 'Critical Bugs', human: humanData.criticalBugs, ai: aiData.criticalBugs },
  ]

  const scenarios = [
    {
      id: 'SC-01',
      title: 'High-speed Counter-steer Drift Recovery',
      humanResult: 'FAIL',
      aiResult: 'PASS',
      humanFinding: 'Felt slight understeer inertia; delayed reaction to collision angle.',
      aiFinding: 'Tested 500 drift iterations with mathematical micro-corrections.',
      verdict: 'AI covered edge-case inputs; human identified tactile control lag.',
    },
    {
      id: 'SC-02',
      title: 'Sector 7 Boss Combat TTK & Balance',
      humanResult: 'FAIL',
      aiResult: 'FAIL',
      humanFinding: 'Boss phase 2 health pool feels excessively spongey and tedious.',
      aiFinding: 'Damage output variance exceeds +28% acceptable envelope.',
      verdict: 'Both flagged critical combat imbalance.',
    },
    {
      id: 'SC-03',
      title: 'Shop Economy Currency Sink Loop',
      humanResult: 'PASS',
      aiResult: 'FAIL',
      humanFinding: 'Prices and upgrades felt natural during progressive playthrough.',
      aiFinding: 'AI detected inflation exploit after 4,000 rapid sell transactions.',
      verdict: 'AI uncovered economy exploit; human verified perceived fairness.',
    },
    {
      id: 'SC-04',
      title: 'Onboarding Tutorial & First-Time Experience',
      humanResult: 'PASS',
      aiResult: 'PASS',
      humanFinding: 'Intuitive HUD cues and clear steering instructions.',
      aiFinding: '100% path completion with 0 navigation failures.',
      verdict: 'High confidence on core UX loop.',
    },
  ]

  const humanSessions = sessions.filter((s) => s.type === 'human')
  const aiSessions = sessions.filter((s) => s.type === 'ai')

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1425]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 lg:px-12 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <ChevronLeft className="size-5" />
              <span className="text-xs font-medium">Dashboard</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI vs Human Comparison</h1>
              <p className="text-xs text-slate-400">
                Side-by-side gameplay telemetry analysis with backend persona comparison metrics
              </p>
            </div>
          </div>

          {/* Session Pickers */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {humanSessions.length > 0 && (
              <select
                value={selectedHumanSessionId}
                onChange={(e) => setSelectedHumanSessionId(e.target.value)}
                className="rounded-lg border border-emerald-500/40 bg-emerald-950/20 px-2.5 py-1.5 text-emerald-300 font-medium outline-none"
              >
                {humanSessions.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    Human: {t.name}
                  </option>
                ))}
              </select>
            )}

            {aiSessions.length > 0 && (
              <select
                value={selectedAiSessionId}
                onChange={(e) => setSelectedAiSessionId(e.target.value)}
                className="rounded-lg border border-violet-500/40 bg-violet-950/20 px-2.5 py-1.5 text-violet-300 font-medium outline-none"
              >
                {aiSessions.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    AI: {t.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={fetchInitialData}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition"
              title="Refresh Comparison Data"
            >
              <RefreshCw className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 space-y-8">
        {/* Visual Identity Color Legend Bar */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0d1425] p-3 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-violet-500 shadow-[0_0_8px_#7757ff]" />
              <span className="font-semibold text-violet-300">AI Testing (Purple/Blue Accent)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="font-semibold text-emerald-300">Human Testing (Green Accent)</span>
            </div>
          </div>
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            Active Target: Neon Drift (v1.4.2)
          </span>
        </div>

        {/* 2 Big Comparison Cards (AI vs Human) */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* HUMAN TESTING CARD (GREEN IDENTITY) */}
          <FloatingCard
            tone="human"
            floatIntensity={2}
            className="p-6 lg:p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[#0d1425] to-[#0d1425]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <User className="size-6" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-emerald-300">Human Cohort Testing</h2>
                  <p className="text-xs text-slate-400">Tactile Feel & Emotional Resonance</p>
                </div>
              </div>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300">
                HUMAN
              </span>
            </div>

            {/* KPI Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-b border-emerald-500/20 pb-6">
              <div>
                <p className="text-xs text-slate-400">Scenarios</p>
                <p className="text-2xl font-bold text-white mt-1">
                  <NumberCounter value={humanData.totalScenarios} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Passed</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">
                  <NumberCounter value={humanData.passed} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Bugs Found</p>
                <p className="text-2xl font-bold text-white mt-1">
                  <NumberCounter value={humanData.bugsFound} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Coverage</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">
                  <NumberCounter value={humanData.coverage} suffix="%" duration={1.2} />
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Testing Duration</span>
                <span className="font-semibold font-mono text-white">
                  {formatDuration(humanData.durationSeconds)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Critical Exploits</span>
                <span className="font-semibold font-mono text-rose-400">
                  {humanData.criticalBugs} detected
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UX & Pacing Friction</span>
                <span className="font-semibold font-mono text-emerald-400">
                  {humanData.uxIssues} flagged
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Performance Anomalies</span>
                <span className="font-semibold font-mono text-slate-300">
                  {humanData.performanceIssues} observed
                </span>
              </div>
            </div>
          </FloatingCard>

          {/* AI TESTING CARD (PURPLE/BLUE IDENTITY) */}
          <FloatingCard
            tone="ai"
            floatIntensity={2}
            className="p-6 lg:p-8 border border-violet-500/30 bg-gradient-to-br from-violet-950/25 via-[#0d1425] to-[#0d1425]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                  <Bot className="size-6" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-violet-300">Autonomous AI Testing</h2>
                  <p className="text-xs text-slate-400">Exhaustion & Mathematical Stress</p>
                </div>
              </div>
              <span className="rounded-md bg-violet-500/20 px-2.5 py-1 text-xs font-mono font-bold text-violet-300">
                AI AGENT
              </span>
            </div>

            {/* KPI Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-b border-violet-500/20 pb-6">
              <div>
                <p className="text-xs text-slate-400">Scenarios</p>
                <p className="text-2xl font-bold text-white mt-1">
                  <NumberCounter value={aiData.totalScenarios} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Passed</p>
                <p className="text-2xl font-bold text-violet-400 mt-1">
                  <NumberCounter value={aiData.passed} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Bugs Found</p>
                <p className="text-2xl font-bold text-white mt-1">
                  <NumberCounter value={aiData.bugsFound} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Coverage</p>
                <p className="text-2xl font-bold text-violet-400 mt-1">
                  <NumberCounter value={aiData.coverage} suffix="%" duration={1.2} />
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Testing Duration</span>
                <span className="font-semibold font-mono text-violet-400">
                  {formatDuration(aiData.durationSeconds)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Critical Exploits</span>
                <span className="font-semibold font-mono text-rose-400">
                  {aiData.criticalBugs} detected
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Performance Edge Cases</span>
                <span className="font-semibold font-mono text-violet-400">
                  {aiData.performanceIssues} flagged
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UX Flaws Caught</span>
                <span className="font-semibold font-mono text-slate-300">
                  {aiData.uxIssues} flagged
                </span>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Difference Indicators Bar (Animated KPI Deltas) */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Intelligence Differential
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-violet-400">
                <Zap className="size-4" />
                <span className="text-xs font-semibold">Speed Advantage</span>
              </div>
              <p className="text-3xl font-extrabold text-violet-300">
                <NumberCounter value={parseFloat(speedRatio)} decimals={1} suffix="×" />
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                AI {formatDuration(aiData.durationSeconds)} vs Human {formatDuration(humanData.durationSeconds)}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <TrendingUp className="size-4" />
                <span className="text-xs font-semibold">Coverage Difference</span>
              </div>
              <p className="text-3xl font-extrabold text-emerald-300">
                <NumberCounter value={coverageDelta} prefix="+" suffix="%" />
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                AI {aiData.coverage}% vs Human {humanData.coverage}% edge cases
              </p>
            </div>

            <div className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-violet-400">
                <Bot className="size-4" />
                <span className="text-xs font-semibold">AI Exploit Capture</span>
              </div>
              <p className="text-3xl font-extrabold text-violet-300">
                <NumberCounter value={bugsDelta} prefix="+" suffix=" bugs" />
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Physics clipping and drop rate bugs</p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <User className="size-4" />
                <span className="text-xs font-semibold">Human Nuance & UX</span>
              </div>
              <p className="text-3xl font-extrabold text-emerald-300">
                <NumberCounter value={humanData.uxIssues} suffix=" issues" />
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Subjective feel only humans detect</p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Chart with ChartReveal */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">Comparative Telemetry Metrics</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exact contract values for <span className="text-emerald-400">Human</span> vs{' '}
                <span className="text-violet-400">AI</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="size-2 rounded bg-emerald-500" /> Human
              </span>
              <span className="flex items-center gap-1.5 text-violet-400">
                <span className="size-2 rounded bg-violet-500" /> AI
              </span>
            </div>
          </div>

          <ChartReveal isLoaded={isDataLoaded} delay={0.2}>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonMetricsChart} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="metric" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
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
                  {/* Strict color mapping: Human = Green, AI = Purple */}
                  <Bar dataKey="human" fill="#10b981" radius={[4, 4, 0, 0]} name="Human Testing" />
                  <Bar dataKey="ai" fill="#7757ff" radius={[4, 4, 0, 0]} name="AI Testing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartReveal>
        </div>

        {/* Scenario Breakdown with Accordion Detail */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Scenario-Level Verification Delta</h3>
            <span className="text-xs text-slate-400">Click scenario for telemetry insights</span>
          </div>

          <div className="space-y-3">
            {scenarios.map((sc) => {
              const isExpanded = expandedScenario === sc.id
              return (
                <div
                  key={sc.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedScenario(isExpanded ? null : sc.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/40 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400">{sc.id}</span>
                      <span className="font-medium text-sm text-white">{sc.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            sc.humanResult === 'PASS'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          HUMAN: {sc.humanResult}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            sc.aiResult === 'PASS'
                              ? 'bg-violet-500/20 text-violet-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          AI: {sc.aiResult}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="size-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 border-t border-slate-800/80 pt-3 space-y-2 text-xs"
                      >
                        <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-950/15">
                          <p className="text-emerald-300 font-semibold mb-1">Human Tester Feedback:</p>
                          <p className="text-slate-300 italic">&quot;{sc.humanFinding}&quot;</p>
                        </div>
                        <div className="p-2.5 rounded-lg border border-violet-500/20 bg-violet-950/15">
                          <p className="text-violet-300 font-semibold mb-1">AI Simulation Finding:</p>
                          <p className="text-slate-300">{sc.aiFinding}</p>
                        </div>
                        <div className="p-2 rounded bg-slate-800/60 text-slate-300 font-mono text-[11px]">
                          <strong>Synthesis Verdict:</strong> {sc.verdict}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
