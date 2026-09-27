'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  PlayCircle,
  Pause,
  Square,
  Activity,
  Cpu,
  HardDrive,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  Users,
  Clock,
  Radio,
  RefreshCw,
  Sliders,
  Check,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ProgressAnimation,
  DataStream,
  GlowPulse,
  NumberCounter,
  FloatingCard,
  PageTransition,
} from '@/components/animations'
import { apiClient, sessionToTestRun } from '@/lib/api-client'

export default function LivePlaytestMonitoringPage() {
  const router = useRouter()
  const [testRuns, setTestRuns] = useState<any[]>([])
  const [selectedRunId, setSelectedRunId] = useState<string>('')
  const [currentRun, setCurrentRun] = useState<any | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(1122) // ~18m 42s
  const [events, setEvents] = useState<any[]>([])

  // AI agents state (Purple visual identity)
  const [aiAgents, setAiAgents] = useState([
    { id: 'agent-1', name: 'Agent Valkyrie', role: 'Combat Pacing & Boss TTK', action: 'Simulating evasive maneuvers', apm: 480, status: 'active' },
    { id: 'agent-2', name: 'Agent Chronos', role: 'Economy Stress & Currency Sink', action: 'Verifying rare drop rates', apm: 520, status: 'active' },
    { id: 'agent-3', name: 'Agent Phantom', role: 'Collision & Boundary Clipping', action: 'Probing collision mesh Sector 7', apm: 390, status: 'active' },
    { id: 'agent-4', name: 'Agent Apex', role: 'Latency & Netcode Desync Probe', action: 'Injecting 140ms packet jitter', apm: 610, status: 'idle' },
  ])

  // Human testers state (Green visual identity)
  const [humanTesters, setHumanTesters] = useState([
    { id: 'tester-1', name: 'Marcus Vance', cohort: 'Competitive Pro Guild', inputLag: '12ms', sentiment: 'Thrilling drift feel, boss 2 HP too spongey', status: 'in_game' },
    { id: 'tester-2', name: 'Elena Rostova', cohort: 'Casual Onboarding Cohort', inputLag: '16ms', sentiment: 'Tutorial prompts clean, missed turbo tutorial', status: 'in_game' },
    { id: 'tester-3', name: 'Kaito Tanaka', cohort: 'Competitive Pro Guild', inputLag: '11ms', sentiment: 'Corner exit speed feels slightly floaty', status: 'in_game' },
    { id: 'tester-4', name: 'Sarah Jenkins', cohort: 'Accessibility Focus', inputLag: '14ms', sentiment: 'High contrast colorblind mode verified', status: 'standby' },
  ])

  // Fetch test runs from backend on mount
  useEffect(() => {
    fetchTestRuns()
  }, [])

  const fetchTestRuns = async () => {
    try {
      const res = await apiClient.getSessions()
      const runs = (res.sessions || []).map(sessionToTestRun)
      setTestRuns(runs)
      if (runs.length > 0) {
        // Prefer running test, then paused, then first
        const active = runs.find((r: any) => r.status === 'running') || runs[0]
        setSelectedRunId(active.id)
        setCurrentRun(active)
      }
    } catch (e) {
      console.error('Failed to fetch sessions:', e)
      try {
        const fallbackRes = await fetch('/api/test-runs')
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json()
          const fallbackRuns = fallbackData.testRuns || []
          setTestRuns(fallbackRuns)
          if (fallbackRuns.length > 0) {
            const active = fallbackRuns.find((r: any) => r.status === 'running') || fallbackRuns[0]
            setSelectedRunId(active.id)
            setCurrentRun(active)
          }
        }
      } catch {
        // Handled
      }
    }
  }

  // Update current run when selection changes
  useEffect(() => {
    if (!selectedRunId || testRuns.length === 0) return
    const found = testRuns.find((r) => r.id === selectedRunId)
    if (found) {
      setCurrentRun(found)
    }
  }, [selectedRunId, testRuns])

  const backendStatus = currentRun?.status || 'running'
  const isGenuinelyRunning = backendStatus === 'running'

  // Elapsed timer - only increments when backend reports 'running'
  useEffect(() => {
    if (!isGenuinelyRunning) return

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isGenuinelyRunning])

  // Telemetry event stream generator - only adds events when genuinely running
  useEffect(() => {
    // Initial events seed
    setEvents([
      { id: '1', time: '18:41', source: 'ai', tag: 'PHYSICS', msg: 'Collision normal validated at Sector 4 ramp.' },
      { id: '2', time: '18:38', source: 'human', tag: 'FEEL', msg: 'Marcus V. flagged cornering slip angle as responsive.' },
      { id: '3', time: '18:35', source: 'ai', tag: 'EXPLOIT', msg: 'Agent Phantom tested nitro pause buffering. No exploit.' },
      { id: '4', time: '18:30', source: 'human', tag: 'UX', msg: 'Elena R. completed Lap 1 in 1m 14s.' },
    ])

    if (!isGenuinelyRunning) return

    const interval = setInterval(() => {
      const isAI = Math.random() > 0.4
      const timestamp = new Date().toTimeString().slice(3, 8)
      const newEvent = isAI
        ? {
            id: String(Date.now()),
            time: timestamp,
            source: 'ai',
            tag: ['COMBAT', 'PHYSICS', 'NETCODE', 'ECONOMY'][Math.floor(Math.random() * 4)],
            msg: `Agent ${['Valkyrie', 'Chronos', 'Phantom', 'Apex'][Math.floor(Math.random() * 4)]} verified scenario trial #${Math.floor(Math.random() * 80 + 10)}.`,
          }
        : {
            id: String(Date.now()),
            time: timestamp,
            source: 'human',
            tag: ['FEEL', 'UX', 'PACING', 'BALANCE'][Math.floor(Math.random() * 4)],
            msg: `Tester ${['Marcus V.', 'Elena R.', 'Kaito T.', 'Sarah J.'][Math.floor(Math.random() * 4)]} submitted pacing rating: 9.1/10.`,
          }

      setEvents((prev) => [newEvent, ...prev.slice(0, 14)])
    }, 2800)

    return () => clearInterval(interval)
  }, [isGenuinelyRunning])

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}m ${s < 10 ? '0' : ''}${s}s`
  }

  // Update backend test run status via PATCH API
  const updateBackendState = async (newStatus: 'running' | 'paused' | 'completed' | 'failed') => {
    if (!currentRun) return
    try {
      const res = await fetch('/api/test-runs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentRun.id,
          status: newStatus,
          progress: newStatus === 'completed' ? 100 : currentRun.progress || 68,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const updated = data.testRun
        setCurrentRun(updated)
        setTestRuns((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
      }
    } catch (e) {
      console.error('Failed to update status:', e)
    }
  }

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white">
      {/* Header with Navigation & Live Backend State Badge */}
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
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight">Playtest Live Monitor</h1>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-mono text-violet-300">
                  SESSION ID: {currentRun?.id || 'test-01'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentRun?.name || 'AI Autonomous Regression Run 04'} · Neon Drift (v1.4.2)
              </p>
            </div>
          </div>

          {/* Test Run Selector & Backend Status */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedRunId}
              onChange={(e) => setSelectedRunId(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-violet-500"
            >
              {testRuns.map((run) => (
                <option key={run.id} value={run.id}>
                  {run.name} ({run.status.toUpperCase()})
                </option>
              ))}
            </select>

            {/* Backend State Badge */}
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5">
              <span
                className={`size-2.5 rounded-full ${
                  backendStatus === 'running'
                    ? 'bg-violet-400 animate-pulse shadow-[0_0_8px_#7757ff]'
                    : backendStatus === 'paused'
                    ? 'bg-amber-400'
                    : backendStatus === 'completed'
                    ? 'bg-emerald-400'
                    : 'bg-rose-500'
                }`}
              />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                {backendStatus}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 space-y-8">
        {/* Backend State Switcher Controls */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Interactive State Controller
            </p>
            <p className="text-xs text-slate-400">
              Animations strictly reflect the actual database state below:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => updateBackendState('running')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                backendStatus === 'running'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <PlayCircle className="size-3.5" />
              <span>RUNNING</span>
            </button>
            <button
              onClick={() => updateBackendState('paused')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                backendStatus === 'paused'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Pause className="size-3.5" />
              <span>PAUSED</span>
            </button>
            <button
              onClick={() => updateBackendState('completed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                backendStatus === 'completed'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="size-3.5" />
              <span>COMPLETED</span>
            </button>
            <button
              onClick={() => updateBackendState('failed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                backendStatus === 'failed'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <XCircle className="size-3.5" />
              <span>FAILED</span>
            </button>
          </div>
        </div>

        {/* State Banner Callout */}
        <AnimatePresence mode="wait">
          {backendStatus === 'paused' && (
            <motion.div
              key="paused-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Pause className="size-5 text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-amber-200">Playtest Execution Paused</p>
                  <p className="text-xs text-amber-300/80">
                    Telemetry packet buffering is holding state. All agent actions and elapsed timers are frozen.
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateBackendState('running')}
                className="rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition"
              >
                Resume Run
              </button>
            </motion.div>
          )}

          {backendStatus === 'completed' && (
            <motion.div
              key="completed-banner"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-emerald-200">Test Run Completed Successfully</p>
                  <p className="text-xs text-emerald-300/80">
                    All test scenarios executed to 100% coverage. Telemetry artifacts compiled into report.
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/comparison"
                className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition"
              >
                Inspect Comparison Data
              </Link>
            </motion.div>
          )}

          {backendStatus === 'failed' && (
            <motion.div
              key="failed-banner"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 text-rose-400" />
                <div>
                  <p className="text-sm font-semibold text-rose-200">Playtest Execution Failed (Aborted)</p>
                  <p className="text-xs text-rose-300/80">
                    Critical assertion failed: Packet drop threshold exceeded (&gt;4.8%) during multiplayer sync trial.
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateBackendState('running')}
                className="rounded-lg bg-rose-600 hover:bg-rose-500 px-3.5 py-1.5 text-xs font-semibold text-white transition"
              >
                Retry Test
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Session Progress Bar & Metrics */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Session Telemetry Progress
              </p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {currentRun?.progress || (backendStatus === 'completed' ? 100 : 68)}% Completed
              </h3>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-slate-500" />
                  Elapsed Time
                </p>
                <p className="text-lg font-mono font-bold text-white mt-0.5">
                  {formatTime(elapsedSeconds)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Scenarios Run</p>
                <p className="text-lg font-mono font-bold text-violet-400 mt-0.5">
                  {currentRun?.passedScenarios || 32}/{currentRun?.totalScenarios || 48}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Animation Bar */}
          <ProgressAnimation
            value={currentRun?.progress || (backendStatus === 'completed' ? 100 : 68)}
            status={backendStatus}
            tone={currentRun?.type === 'ai' ? 'ai' : 'human'}
            height={10}
            showGlowTrail={isGenuinelyRunning}
          />

          {/* Live Data Stream Conduits (Only pulsing when genuinely running) */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
              <span className="flex items-center gap-1.5 text-violet-300">
                <Zap className="size-3 text-violet-400" />
                AI AGENT CONDUIT (PURPLE)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Users className="size-3 text-emerald-400" />
                HUMAN TESTER CONDUIT (GREEN)
              </span>
            </div>
            <DataStream
              source="ai"
              target="game"
              active={isGenuinelyRunning}
              speed={2.2}
              particleCount={5}
            />
          </div>
        </div>

        {/* 2-Column Grid: Active AI Agents (Purple) vs Active Human Testers (Green) */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT: Active AI Agents (Purple Visual Identity) */}
          <div className="rounded-2xl border border-violet-500/30 bg-[#0d1425] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-violet-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
                  <Zap className="size-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-white text-base">Active AI Agents</h3>
                  <p className="text-xs text-violet-300/80">Autonomous Scenario Fleet</p>
                </div>
              </div>
              <span className="rounded-md bg-violet-500/20 px-2.5 py-1 text-xs font-mono font-bold text-violet-300">
                4 AGENTS DEPLOYED
              </span>
            </div>

            <div className="space-y-3">
              {aiAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="rounded-xl border border-violet-500/20 bg-violet-950/15 p-3.5 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{agent.name}</span>
                      <span className="text-[10px] rounded bg-violet-500/20 px-1.5 py-0.5 font-mono text-violet-300">
                        {agent.apm} APM
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{agent.role}</p>
                    <p className="text-xs text-violet-400 flex items-center gap-1.5">
                      <span
                        className={`size-1.5 rounded-full ${
                          isGenuinelyRunning ? 'bg-violet-400 animate-ping' : 'bg-slate-500'
                        }`}
                      />
                      <span>{isGenuinelyRunning ? agent.action : 'Action suspended'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        agent.status === 'active' && isGenuinelyRunning
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isGenuinelyRunning ? 'ONLINE' : 'STANDBY'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Active Human Testers (Green Visual Identity) */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#0d1425] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Users className="size-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-white text-base">Active Human Testers</h3>
                  <p className="text-xs text-emerald-300/80">Live Cohort Telemetry Feed</p>
                </div>
              </div>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300">
                4 SESSIONS CONNECTED
              </span>
            </div>

            <div className="space-y-3">
              {humanTesters.map((tester) => (
                <div
                  key={tester.id}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-3.5 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{tester.name}</span>
                      <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-emerald-300">
                        PING: {tester.inputLag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{tester.cohort}</p>
                    <p className="text-xs text-emerald-300 italic line-clamp-1">
                      &quot;{tester.sentiment}&quot;
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        tester.status === 'in_game' && isGenuinelyRunning
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isGenuinelyRunning ? 'IN MATCH' : 'PAUSED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Telemetry Event Stream */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-violet-400" />
              <h3 className="font-semibold text-white text-base">Real-time Telemetry Event Stream</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span
                className={`size-2 rounded-full ${
                  isGenuinelyRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
              <span>{isGenuinelyRunning ? 'INGESTING: 240.8k ev/s' : 'STREAM: SUSPENDED'}</span>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-64 overflow-y-auto font-mono text-xs pr-2">
            {events.map((evt) => (
              <div key={evt.id} className="py-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono">{evt.time}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      evt.source === 'ai'
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {evt.tag}
                  </span>
                  <span className="text-slate-200">{evt.msg}</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase">{evt.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
