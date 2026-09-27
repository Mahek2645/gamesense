'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Zap, Users, Activity, Sliders, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Database, RefreshCw, BarChart2 } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    step: '01',
    title: 'Engine & Build Ingestion',
    subtitle: 'Plug & Play Integration with Zero Complex Code Refactoring',
    description: 'Connect your game via the GameSense C++ / C# lightweight SDK or directly upload your Unreal Engine 5, Unity, Godot, or WebGL package. Telemetry hooks automatically bind to player input, world transforms, physics ticks, and custom game events.',
    icon: Cpu,
    color: 'from-violet-500 to-indigo-600',
    tags: ['UE 5.3', 'Unity LTS', 'Godot 4.2', 'Custom C++']
  },
  {
    step: '02',
    title: 'Autonomous AI Swarms & Human Cohorts',
    subtitle: 'Dual-Pronged Gameplay Intelligence',
    description: 'Deploy swarms of reinforcement-learning AI agents trained on player behavior to stress-test millions of action permutations in minutes. Concurrently, invite vetted human playtesters to measure qualitative satisfaction, emotional arc, and UX friction.',
    icon: Users,
    color: 'from-cyan-500 to-emerald-500',
    tags: ['Monte Carlo Swarms', 'Vetted Human Cohorts', 'Exploit Detection']
  },
  {
    step: '03',
    title: 'Microsecond Telemetry Pipeline',
    subtitle: 'Real-Time Spatial & Kinetic Telemetry Stream',
    description: 'Every shot, drift, weapon switch, currency drop, and player death is ingested into our high-throughput analytical time-series engine. Visualize 3D spatial death clusters, input frequency heatmaps, and latency histograms instantly.',
    icon: Activity,
    color: 'from-blue-500 to-violet-600',
    tags: ['Spatial Heatmaps', 'Physics Anomalies', 'Sub-millisecond Latency']
  },
  {
    step: '04',
    title: 'Kernel Balance Anomaly Detection',
    subtitle: 'Mathematical Parity & Exploit Isolation',
    description: 'GameSense continuously evaluates win-rate deviation, time-to-kill (TTK) outliers, weapon DPS disparity, and economy inflation. When an item or boss encounter deviates beyond statistically balanced thresholds, an issue is immediately flagged.',
    icon: BarChart2,
    color: 'from-amber-500 to-rose-500',
    tags: ['Win Rate Drift', 'TTK Outliers', 'Economy Inflation']
  },
  {
    step: '05',
    title: 'AI Tuning Recommendations & Automated Retesting',
    subtitle: 'Closed-Loop Verification Before Production Release',
    description: 'Our Balance Engine proposes concrete, mathematical parameter modifications (e.g., reduce thrust multiplier from 2.35 to 1.85). One click schedules an automated retest against previous baseline runs to confirm parity before you push updates.',
    icon: RefreshCw,
    color: 'from-emerald-500 to-cyan-500',
    tags: ['1-Click Hotfix', 'Version Delta Audit', 'Predictive Retest']
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#080d18] text-white selection:bg-violet-500/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080d18]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-[#7757ff] to-cyan-400 shadow-md shadow-violet-500/20">
              <Gamepad2 className="size-5 text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight">gamesense</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/how-it-works" className="text-white font-semibold">How It Works</Link>
            <Link href="/platform" className="hover:text-white transition">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 text-white shadow-md shadow-violet-500/20 hover:brightness-110 transition inline-flex items-center gap-1.5"
            >
              <span>Studio Workspace</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] bg-violet-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-6"
          >
            <Zap className="size-3.5" />
            <span>THE 5-STEP PLAYTESTING CLOSED LOOP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            From Raw Build to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">
              Mathematical Game Balance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto"
          >
            GameSense eliminates weeks of blind guesswork. See how autonomous AI exploration, human sentiment cohorts, and prescriptive parameter tuning deliver peak gameplay feel.
          </motion.p>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl border border-slate-800 bg-[#0d1425]/70 backdrop-blur-xl p-8 sm:p-10 shadow-xl hover:border-slate-700 transition"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg shrink-0`}>
                      <Icon className="size-7" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs font-bold text-violet-400 tracking-wider">
                          STEP {item.step}
                        </span>
                        <div className="h-3 w-[1px] bg-slate-700" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                          {item.subtitle}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {item.title}
                      </h2>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2.5 py-1 rounded-md border border-slate-700/60 bg-slate-900/60 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to test your game at superhuman scale?</h3>
          <p className="text-slate-400 mb-8">Deploy your first AI regression swarm or human cohort in under 5 minutes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 font-semibold text-white shadow-lg shadow-violet-500/25 hover:brightness-110 transition inline-flex items-center gap-2"
            >
              <span>Launch Studio Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 font-semibold text-slate-300 hover:text-white transition"
            >
              Book Studio Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
