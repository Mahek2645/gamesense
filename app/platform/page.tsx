'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Cpu, ShieldCheck, Database, Layers, Network, Zap, CheckCircle2, ArrowRight, Activity, Terminal } from 'lucide-react'
import Link from 'next/link'

const pillars = [
  {
    title: 'Reinforcement AI Swarm Core',
    badge: 'AUTONOMOUS KERNEL',
    description: 'Custom neural architectures built on proximal policy optimization (PPO) and curiosity-driven exploration. Agents test level collision meshes, combat mechanics, and edge cases at 1,000x human execution speed.',
    metrics: ['1,000x Speedup', 'Zero Human Fatigue', 'Automated Exploit Mapping'],
    icon: Zap,
    tone: 'violet'
  },
  {
    title: 'Distributed Human Feedback Protocol',
    badge: 'QUALITATIVE INTELLIGENCE',
    description: 'Vetted global player cohort network with biometric input capture, voice transcription, controller haptics, and emotional valence tracking to detect when players experience delight vs. friction.',
    metrics: ['24,000+ Vetted Testers', 'Sentiment Time-Series', 'Demographic Segmentation'],
    icon: Network,
    tone: 'cyan'
  },
  {
    title: 'Microsecond Time-Series Ingestion Engine',
    badge: 'ANALYTICS BACKBONE',
    description: 'Columnar telemetry storage optimized for spatial 3D game coordinates, entity interactions, and combat transactions. Capable of handling over 500,000 gameplay events per second with sub-millisecond query response.',
    metrics: ['500k+ Events/sec', 'Sub-ms Query Latency', 'Zero Ingestion Drop'],
    icon: Database,
    tone: 'blue'
  },
  {
    title: 'Mathematical Balance Tuning Engine',
    badge: 'OPTIMIZATION MODEL',
    description: 'Monte Carlo simulations run thousands of parameter variations against historical telemetry to predict win-rate parity curves, TTK balancing, and economic equilibrium before developers touch a single line of production code.',
    metrics: ['Predictive Win Parity', 'Closed-Loop Verification', '1-Click Config Hotfix'],
    icon: Cpu,
    tone: 'emerald'
  }
]

export default function PlatformPage() {
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
            <Link href="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link href="/platform" className="text-white font-semibold">Platform</Link>
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
              <span>Launch Studio</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] bg-cyan-600/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-cyan-300 mb-6"
          >
            <Cpu className="size-3.5" />
            <span>ARCHITECTURAL SPECIFICATION & RUNTIME ENGINE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            The GameSense <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#7757ff] to-emerald-400">
              Intelligence Kernel
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Built from the ground up for AAA game developers, competitive esports studios, and ambitious indie creators who need rigorous empirical confidence in every patch.
          </motion.p>
        </div>
      </section>

      {/* Architecture Pillars Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl p-8 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md border border-violet-500/20">
                        {item.badge}
                      </span>
                      <Icon className="size-6 text-slate-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{item.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-2">
                    {item.metrics.map(m => (
                      <div key={m} className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <CheckCircle2 className="size-3.5 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Code / SDK Integration Snippet */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950/40">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Integrate with 3 Lines of Code</h3>
            <p className="text-sm text-slate-400">Drop the native SDK into your project or call our REST / WebSocket telemetry endpoint.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070b14] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/60" />
                <span className="size-3 rounded-full bg-amber-500/60" />
                <span className="size-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs font-mono text-slate-400">GameSenseKernel.cs / UnrealEngine.cpp</span>
              </div>
              <span className="text-xs font-mono text-violet-400">C# / C++</span>
            </div>
            <pre className="p-6 text-xs sm:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{`// 1. Initialize GameSense Kernel Session
var session = await GameSense.InitializeAsync(new GameSenseConfig {
    ApiKey = "gs_live_48f902cba841",
    GameId = "game-01",
    Environment = GameEnvironment.Staging
});

// 2. Dispatch High-Precision Telemetry Hook
session.TrackEvent("weapon_fire", new {
    WeaponId = "apex_booster_t3",
    SpeedKmh = playerRigidBody.velocity.magnitude * 3.6f,
    DriftAngle = currentDriftAngle,
    Position = transform.position
});

// 3. Query Real-Time AI Balance Recommendation
var balanceAdvice = await session.GetActiveRecommendationsAsync();`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-center">
        <h3 className="text-2xl font-bold mb-3">Explore the Platform in Action</h3>
        <p className="text-sm text-slate-400 mb-6">Open the studio workspace with pre-populated telemetry datasets.</p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-[#7757ff] hover:bg-violet-500 font-semibold text-white shadow-lg shadow-violet-500/25 transition inline-flex items-center gap-2"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  )
}
