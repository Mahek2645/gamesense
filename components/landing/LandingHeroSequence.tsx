'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2,
  Zap,
  Users,
  Activity,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  Eye,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import {
  NumberCounter,
  FloatingCard,
  GlowPulse,
  DataStream,
  useReducedMotion,
  TechnicalBackground,
} from '@/components/animations'

export function LandingHeroSequence({
  onEnterWorkspace,
}: {
  onEnterWorkspace?: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const [step, setStep] = useState<number>(shouldReduceMotion ? 9 : 0)
  const [key, setKey] = useState<number>(0)

  // Choreographed 9-step timer progression on initial load
  useEffect(() => {
    if (shouldReduceMotion) {
      setStep(9)
      return
    }

    setStep(1) // Step 1: Branding immediate

    const t2 = setTimeout(() => setStep(2), 450) // Step 2: Hero headline
    const t3 = setTimeout(() => setStep(3), 900) // Step 3: Supporting text
    const t4 = setTimeout(() => setStep(4), 1400) // Step 4: AI agent cards
    const t5 = setTimeout(() => setStep(5), 2000) // Step 5: Human tester indicators
    const t6 = setTimeout(() => setStep(6), 2600) // Step 6: Data connections form
    const t7 = setTimeout(() => setStep(7), 3200) // Step 7: Analytics cards reveal
    const t8 = setTimeout(() => setStep(8), 3700) // Step 8: Balance score counter
    const t9 = setTimeout(() => setStep(9), 4300) // Step 9: CTA buttons appear last

    return () => {
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      clearTimeout(t7)
      clearTimeout(t8)
      clearTimeout(t9)
    }
  }, [key, shouldReduceMotion])

  const restartSequence = () => {
    setKey((prev) => prev + 1)
    setStep(0)
  }

  return (
    <section className="relative min-h-screen overflow-hidden text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Background with Subtle Animated Technical Grid */}
      <TechnicalBackground showGrid showParticles showConnections />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Top Header / Sequence Tracker */}
        <div className="flex items-center justify-between mb-8">
          {/* STEP 1: GameSense Branding */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <GlowPulse tone="ai" intensity="subtle">
              <span className="grid size-10 place-items-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
                <Gamepad2 className="size-5 text-white" />
              </span>
            </GlowPulse>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">GAMESENSE</span>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-violet-300 uppercase">
                  v2.4 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">AI & Human Gameplay Intelligence Platform</p>
            </div>
          </motion.div>

          {/* Quick Controls & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <nav className="hidden lg:flex items-center gap-4 text-xs text-slate-300 font-medium mr-2">
              <Link href="/how-it-works" className="hover:text-white transition">How It Works</Link>
              <Link href="/platform" className="hover:text-white transition">Platform</Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
              <Link href="/admin/login" className="text-violet-400 hover:text-violet-300 transition">Admin</Link>
            </nav>
            <button
              onClick={restartSequence}
              title="Replay 9-step animation sequence"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition"
            >
              <RotateCcw className="size-3" />
              <span className="hidden sm:inline">Replay</span>
            </button>
            <Link
              href="/login"
              className="rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-violet-400 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-600/30 hover:brightness-110 transition"
            >
              Launch Studio
            </Link>
          </div>
        </div>

        {/* Hero Narrative Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Headlines & Supporting Text */}
          <div className="lg:col-span-6 space-y-6">
            {/* STEP 2: Hero Headline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300 font-medium mb-3">
                <Sparkles className="size-3 text-violet-400" />
                <span>Autonomous Simulation × Live Telemetry</span>
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
                Read the play.{' '}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  Shape the feeling.
                </span>
              </h1>
            </motion.div>

            {/* STEP 3: Supporting Text Follows */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              GameSense synchronizes autonomous <span className="text-violet-400 font-semibold">AI agents</span> for
              exhaustion testing with real <span className="text-emerald-400 font-semibold">human testers</span> for
              emotional feel — transforming gameplay signals into instant mathematical balance.
            </motion.p>

            {/* Visual Identity Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={step >= 3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6 text-xs text-slate-400 pt-1"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-violet-500 shadow-[0_0_8px_#7757ff]" />
                <span>AI Identity (Speed & Exhaustion)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span>Human Identity (Feel & Nuance)</span>
              </div>
            </motion.div>

            {/* STEP 9: CTA Buttons Appear Last */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={step >= 9 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onEnterWorkspace}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition duration-200"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/dashboard/comparison"
                className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-emerald-500/40 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-emerald-300 transition duration-200"
              >
                <Users className="size-4 text-emerald-400" />
                <span>Compare AI vs Human</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Diagram (Steps 4, 5, 6, 7, 8) */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl border border-slate-800 bg-[#0d1425]/85 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden">
              {/* Header inside canvas */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Live Signal Architecture
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`size-2 rounded-full ${
                      step >= 6 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                  <span className="text-slate-400 font-mono text-[11px]">
                    {step >= 6 ? 'STREAM: ONLINE' : 'STREAM: CONNECTING'}
                  </span>
                </div>
              </div>

              {/* Diagram 3-Column Layout: Left (Sources) -> Center (Game Hub) -> Right (Analytics) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative min-h-[320px]">
                {/* 1. LEFT: AI Agents & Human Testers (Steps 4 & 5) */}
                <div className="sm:col-span-4 space-y-3 z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    1. Signal Sources
                  </p>

                  {/* STEP 4: AI Agent Cards (Purple visual identity) */}
                  <div className="space-y-2">
                    {[
                      { name: 'Valkyrie AI', role: 'Combat Balancer', rate: '14.2x speed' },
                      { name: 'Chronos AI', role: 'Economy Stressor', rate: '100k simulated runs' },
                    ].map((agent, i) => (
                      <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={step >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : i * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="rounded-xl border border-violet-500/30 bg-violet-950/25 p-2.5 relative group hover:border-violet-400 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-violet-200">
                            <Zap className="size-3 text-violet-400" />
                            {agent.name}
                          </span>
                          <span className="text-[10px] text-violet-300/80 font-mono">AI AGENT</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{agent.role}</p>
                        <p className="text-[10px] text-violet-400 font-mono mt-0.5">{agent.rate}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* STEP 5: Human Tester Indicators (Green visual identity) */}
                  <div className="space-y-2 pt-1">
                    {[
                      { name: 'Cohort Alpha', role: 'Core Guild (24 testers)', feel: '8.9/10 Feel' },
                      { name: 'Cohort Beta', role: 'Casual Onboarding (48 testers)', feel: '94% Retention' },
                    ].map((human, i) => (
                      <motion.div
                        key={human.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={step >= 5 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : i * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-2.5 relative hover:border-emerald-400 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-200">
                            <Users className="size-3 text-emerald-400" />
                            {human.name}
                          </span>
                          <span className="text-[10px] text-emerald-300/80 font-mono">HUMAN</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{human.role}</p>
                        <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{human.feel}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 2. CENTER: Game Engine Telemetry Hub (Step 6 Data Connections) */}
                <div className="sm:col-span-4 flex flex-col items-center justify-center py-4 z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    2. Telemetry Engine
                  </p>

                  {/* Central Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={step >= 6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-28 h-28 rounded-2xl border border-sky-500/40 bg-slate-900/90 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                  >
                    <GlowPulse tone="ai" intensity="subtle">
                      <Gamepad2 className="size-7 text-sky-400 mb-1" />
                    </GlowPulse>
                    <span className="text-xs font-bold text-white leading-tight">Neon Drift</span>
                    <span className="text-[10px] text-sky-300 font-mono">v1.4.2 Kernel</span>

                    {/* Orbiting Ring */}
                    {!shouldReduceMotion && step >= 6 && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2 rounded-2xl border border-dashed border-sky-400/20 pointer-events-none"
                      />
                    )}
                  </motion.div>

                  {/* STEP 6: Data Connections Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={step >= 6 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full mt-3 px-2"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>AI (PURPLE)</span>
                      <span>HUMAN (GREEN)</span>
                    </div>
                    <DataStream source="ai" target="game" active={step >= 6} speed={2.5} />
                  </motion.div>
                </div>

                {/* 3. RIGHT: Analytics Cards & Balance Score (Steps 7 & 8) */}
                <div className="sm:col-span-4 space-y-3 z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    3. Actionable Insights
                  </p>

                  {/* STEP 7: Analytics Cards Reveal */}
                  <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    animate={step >= 7 ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-slate-700 bg-slate-900/60 p-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Events Analyzed</span>
                      <span className="text-violet-400 font-mono font-semibold">+24.1%</span>
                    </div>
                    <p className="text-lg font-bold text-white mt-1">
                      {step >= 7 ? (
                        <NumberCounter value={240800} duration={1.2} formatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                      ) : (
                        '0'
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500">Real-time simulation ingestion</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    animate={step >= 7 ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-slate-700 bg-slate-900/60 p-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Friction Triaged</span>
                      <span className="text-emerald-400 font-mono font-semibold">0 Critical</span>
                    </div>
                    <p className="text-lg font-bold text-white mt-1">
                      {step >= 7 ? <NumberCounter value={34} duration={1.1} /> : '0'}{' '}
                      <span className="text-xs text-slate-400 font-normal">bugs resolved</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Autonomous edge-case capture</p>
                  </motion.div>

                  {/* STEP 8: Balance Score Counter Animates */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={step >= 8 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-violet-950/30 p-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-emerald-400" />
                        Balance Score
                      </span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 uppercase">
                        Optimal
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-extrabold text-white">
                        {step >= 8 ? (
                          <NumberCounter value={94.8} decimals={1} duration={1.5} />
                        ) : (
                          '0.0'
                        )}
                      </span>
                      <span className="text-sm text-slate-400">/ 100</span>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={step >= 8 ? { width: '94.8%' } : { width: '0%' }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Pillows with Floating Animation */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          <FloatingCard tone="ai" floatIntensity={3} className="p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-violet-500/15 text-violet-400">
                <Cpu className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">Exhaustion AI Agents</h4>
                <p className="text-xs text-slate-400">Continuous 24/7 stress testing of every scenario</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard tone="human" floatIntensity={3} className="p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <Users className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">Verified Human Guilds</h4>
                <p className="text-xs text-slate-400">Targeted cohorts assessing pacing & tactile feel</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard tone="neutral" floatIntensity={3} className="p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-sky-500/15 text-sky-400">
                <TrendingUp className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">Unified Telemetry</h4>
                <p className="text-xs text-slate-400">Zero guesswork. Mathematical game balance</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
