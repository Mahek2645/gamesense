'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Gamepad2,
  Zap,
  Users,
  Activity,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  Sparkles,
  CheckCircle2,
  Radio,
  Sliders,
  Terminal,
  RefreshCw,
  LineChart,
  Layers,
  Flame,
} from 'lucide-react'
import Link from 'next/link'
import {
  FloatingCard,
  NumberCounter,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations'
import { GameSense3DBackground } from '@/components/3d/GameSense3DBackground'

export function MinimalLanding() {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'ai' | 'human'>('ai')
  const [livePackets, setLivePackets] = useState([
    { id: '1', actor: 'AI Swarm-08', type: 'boundary_collision', ms: '12ms ago', status: 'pass' },
    { id: '2', actor: 'Human Tester-14', type: 'input_latency_spike', ms: '45ms ago', status: 'warn' },
    { id: '3', actor: 'AI Swarm-02', type: 'jump_arc_verified', ms: '78ms ago', status: 'pass' },
    { id: '4', actor: 'Human Tester-03', type: 'emotional_friction', ms: '110ms ago', status: 'alert' },
  ])

  // Simulate real-time live telemetry stream ticker
  useEffect(() => {
    const packetTypes = [
      { actor: 'AI Swarm-12', type: 'melee_hitbox_verified', status: 'pass' },
      { actor: 'Human Tester-09', type: 'camera_fov_disorientation', status: 'warn' },
      { actor: 'AI Swarm-05', type: 'physics_ragdoll_glitch', status: 'alert' },
      { actor: 'Human Tester-22', type: 'boss_phase2_satisfaction', status: 'pass' },
    ]

    const interval = setInterval(() => {
      const next = packetTypes[Math.floor(Math.random() * packetTypes.length)]
      setLivePackets((prev) => [
        { id: Date.now().toString(), actor: next.actor, type: next.type, ms: 'just now', status: next.status },
        ...prev.slice(0, 3),
      ])
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#080d18] text-white selection:bg-violet-500/30 overflow-hidden">
      {/* 3D Moving Gaming Universe Background (Procedural Gamepads, D20 dice, Mana Crystals, Action Glyphs) */}
      <GameSense3DBackground />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080d18]/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-white group">
            <motion.span
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-[#7757ff] to-cyan-400 shadow-md shadow-violet-500/25 transition"
            >
              <Gamepad2 className="size-5 text-white" />
            </motion.span>
            <span className="text-xl font-bold tracking-tight">gamesense</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <Link href="/how-it-works" className="hover:text-white transition relative group">
              <span>How It Works</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/platform" className="hover:text-white transition relative group">
              <span>Platform</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/pricing" className="hover:text-white transition relative group">
              <span>Pricing</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/contact" className="hover:text-white transition relative group">
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-violet-400 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-600/30 hover:brightness-110 transition inline-flex items-center gap-1.5"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 size-3.5 group-hover:translate-x-0.5 transition" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Animated Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 font-medium mb-8 shadow-[0_0_20px_rgba(119,87,255,0.2)]"
          >
            <span className="size-2 rounded-full bg-violet-400 animate-ping" />
            <Sparkles className="size-3.5 text-violet-400" />
            <span>Autonomous Simulation × Live Telemetry</span>
          </motion.div>

          {/* HEADLINE: SCROLL-TRIGGERED POP-OUT + DYNAMIC LASER LINE ANIMATION */}
          <div className="relative my-4 inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white select-none"
            >
              <motion.span
                initial={{ opacity: 0, x: -35, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
              >
                Read the play.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.85, y: 25 }}
                whileInView={{ opacity: 1, scale: [0.85, 1.07, 1], y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(119,87,255,0.6)]"
              >
                Shape the feeling.
              </motion.span>
            </motion.h1>

            {/* Glowing Animated Laser Line Drawing Underneath Headline on Scroll */}
            <div className="relative mt-5 mx-auto h-[3px] w-full max-w-2xl overflow-visible">
              {/* Dim base background guide */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/40 to-transparent rounded-full" />

              {/* Dynamic Laser Line that expands from left to right on scroll */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="origin-left h-full w-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 shadow-[0_0_18px_3px_rgba(119,87,255,0.8)]"
              />

              {/* Glowing Travelling Photon Particle on Line Edge */}
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.35, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3.5 rounded-full bg-white shadow-[0_0_20px_6px_rgba(69,224,189,0.95)] pointer-events-none"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            GameSense synchronizes autonomous{' '}
            <span className="text-violet-400 font-semibold drop-shadow-[0_0_12px_rgba(119,87,255,0.4)]">
              AI swarms
            </span>{' '}
            for exhaustion testing with real{' '}
            <span className="text-emerald-400 font-semibold drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              human testers
            </span>{' '}
            for emotional feel — turning raw gameplay signals into mathematical balance.
          </motion.p>

          {/* Interactive Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center items-center gap-4"
          >
            <Link
              href="/login"
              className="relative group overflow-hidden flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:brightness-110 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:scale-[1.03]"
            >
              <span className="relative z-10">Get Started with GameSense</span>
              <ArrowRight className="relative z-10 size-4 group-hover:translate-x-1 transition" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </Link>

            <Link
              href="/dashboard/comparison"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-600 px-6 py-3.5 text-sm font-medium text-slate-200 shadow-md hover:shadow-cyan-500/10 transition hover:scale-[1.02]"
            >
              <Users className="size-4 text-emerald-400" />
              <span>Compare AI vs Human</span>
            </Link>
          </motion.div>

          {/* Interactive Live Telemetry Console Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            className="mt-14 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0d1425]/90 backdrop-blur-xl p-5 shadow-2xl shadow-violet-950/30 text-left relative overflow-hidden"
          >
            {/* Top Terminal Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">kernel-stream://telemetry/live</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  4,820 EPS
                </span>
              </div>
            </div>

            {/* Live Packet Stream */}
            <div className="space-y-2 font-mono text-xs">
              {livePackets.map((pkt) => (
                <motion.div
                  key={pkt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`size-2 rounded-full ${
                        pkt.status === 'pass'
                          ? 'bg-emerald-400'
                          : pkt.status === 'warn'
                          ? 'bg-amber-400'
                          : 'bg-rose-400 animate-ping'
                      }`}
                    />
                    <span className="text-slate-300 font-semibold">{pkt.actor}</span>
                    <span className="text-slate-500">&bull;</span>
                    <span className="text-violet-300">{pkt.type}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{pkt.ms}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated Audio/Friction Frequency Waveform Line */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-cyan-400" />
                <span>Microsecond Kernel Latency: 0.38ms</span>
              </span>
              <div className="flex items-center gap-1">
                {[4, 12, 8, 16, 22, 14, 28, 18, 10, 24, 16, 8, 20, 12].map((height, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [height, height * 0.4, height * 1.2, height] }}
                    transition={{ duration: 1.4 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 rounded-full bg-violet-400/70 inline-block"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Live Metrics Bar with NumberCounter */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-y border-slate-800/60 bg-slate-950/50 relative">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              REAL-TIME TELEMETRY ENGINE CONNECTED &bull; ZERO PACKET LOSS
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl border border-slate-800/80 bg-[#0d1425]/60 backdrop-blur shadow-lg hover:border-slate-700 transition"
            >
              <span className="text-xs font-mono text-slate-400 block mb-1">CONNECTED GAMES</span>
              <span className="text-3xl font-black text-white font-mono block">03 Active</span>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">UE5, Unity, Godot</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl border border-violet-500/30 bg-[#0d1425]/60 backdrop-blur shadow-lg hover:border-violet-400/50 transition"
            >
              <span className="text-xs font-mono text-slate-400 block mb-1">TELEMETRY INGESTION</span>
              <span className="text-3xl font-black text-violet-400 font-mono block">
                <NumberCounter value={4820} suffix=" eps" duration={1.4} />
              </span>
              <span className="text-[11px] text-violet-400/80 font-mono mt-1 block">0.4ms Latency</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl border border-emerald-500/30 bg-[#0d1425]/60 backdrop-blur shadow-lg hover:border-emerald-400/50 transition"
            >
              <span className="text-xs font-mono text-slate-400 block mb-1">BALANCE PARITY SCORE</span>
              <span className="text-3xl font-black text-emerald-400 font-mono block">
                <NumberCounter value={94.8} decimals={1} suffix=" / 100" duration={1.5} />
              </span>
              <span className="text-[11px] text-emerald-400/80 font-mono mt-1 block">Optimal Win Rate</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl border border-cyan-500/30 bg-[#0d1425]/60 backdrop-blur shadow-lg hover:border-cyan-400/50 transition"
            >
              <span className="text-xs font-mono text-slate-400 block mb-1">AUTOMATED RETESTS</span>
              <span className="text-3xl font-black text-cyan-400 font-mono block">
                <NumberCounter value={89} prefix="+" suffix="% Gain" duration={1.6} />
              </span>
              <span className="text-[11px] text-cyan-400/80 font-mono mt-1 block">Verified Patches</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Animated Feature Pillars with 3D Hover & Micro-Animations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 font-mono mb-3"
            >
              <Cpu className="size-3.5 text-violet-400" />
              <span>THE ARCHITECTURE</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            >
              The Dual-Engine Playtesting Matrix
            </motion.h2>
            <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
              Built for game designers who need empirical mathematical certainty before shipping updates.
            </p>
          </div>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Autonomous AI Swarms */}
            <StaggerItem>
              <FloatingCard
                tone="ai"
                className="p-6 relative overflow-hidden group border-slate-800 hover:border-violet-500/50"
              >
                {/* Scanning Radar Laser Line */}
                <motion.div
                  animate={{ y: ['-100%', '300%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent pointer-events-none"
                />

                <div className="size-12 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-[0_0_20px_rgba(119,87,255,0.2)]">
                  <Cpu className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition">
                  Autonomous AI Swarms
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reinforcement learning agents test collision boundaries, combat loops, and edge cases at 1,000x human execution speed.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-violet-400">
                  <span>Speed: 1,000x</span>
                  <span className="text-emerald-400">0ms Fatigue</span>
                </div>
              </FloatingCard>
            </StaggerItem>

            {/* Pillar 2: Human Tester Cohorts */}
            <StaggerItem>
              <FloatingCard
                tone="human"
                className="p-6 relative overflow-hidden group border-slate-800 hover:border-emerald-500/50"
              >
                {/* Heartbeat Valence Wave */}
                <motion.div
                  animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 right-2 size-20 rounded-full bg-emerald-500/10 blur-xl pointer-events-none"
                />

                <div className="size-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <Users className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition">
                  Human Tester Cohorts
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vetted global playtesters provide genuine emotional valence, subjective friction, and controller ergonomics.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>Subjective Feel</span>
                  <span className="text-violet-400">Emotional Truth</span>
                </div>
              </FloatingCard>
            </StaggerItem>

            {/* Pillar 3: Microsecond Telemetry */}
            <StaggerItem>
              <FloatingCard
                tone="ai"
                className="p-6 relative overflow-hidden group border-slate-800 hover:border-cyan-500/50"
              >
                <div className="size-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Activity className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                  Microsecond Telemetry
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sub-millisecond spatial event stream mapping death clusters, weapon switch intervals, and economy surpluses.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>Resolution: &lt;1ms</span>
                  <span className="text-emerald-400">Zero Loss</span>
                </div>
              </FloatingCard>
            </StaggerItem>

            {/* Pillar 4: Mathematical Balance */}
            <StaggerItem>
              <FloatingCard
                tone="human"
                className="p-6 relative overflow-hidden group border-slate-800 hover:border-indigo-500/50"
              >
                <div className="size-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                  Mathematical Balance
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI parameter tuning suggestions with 1-click apply and before-and-after retest verification.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-indigo-400">
                  <span>Auto-Diff</span>
                  <span className="text-emerald-400">1-Click Apply</span>
                </div>
              </FloatingCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive AI vs Human Live Comparison Matrix */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/40 relative">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why Neither AI Nor Humans Alone Are Enough
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Only the synthesis of algorithmic rigor and human feeling guarantees commercial hit balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Side */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-violet-500/30 bg-[#0d1425]/80 p-7 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
                  AUTONOMOUS AI ENGINE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-mono">
                  EXHAUSTION
                </span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-violet-400 shrink-0" />
                  <span>10,000 scenario executions per hour</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-violet-400 shrink-0" />
                  <span>100% collision box and out-of-bounds scanning</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-violet-400 shrink-0" />
                  <span>Zero player fatigue or subjective boredom</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-violet-400 shrink-0" />
                  <span>Instant weapon DPS and TTK curve regression checks</span>
                </li>
              </ul>
            </motion.div>

            {/* Human Side */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-emerald-500/30 bg-[#0d1425]/80 p-7 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  HUMAN TESTER COHORTS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  EMOTIONAL FEEL
                </span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Genuine visceral game feeling and adrenaline response</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Controller weight, responsiveness, and tactile friction</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Subjective narrative immersion and onboarding confusion</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Player churn triggers before day-1 retention loss</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cosmic Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl rounded-3xl border border-violet-500/40 bg-gradient-to-b from-[#111a36]/90 to-[#0b1022]/95 p-10 sm:p-14 text-center relative shadow-2xl shadow-violet-950/40 overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 size-64 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 size-64 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-xs text-violet-300 font-mono mb-6">
            <Radio className="size-3.5 text-violet-400 animate-pulse" />
            <span>START TESTING TODAY</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to read the play and{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              shape the feeling?
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Connect your Unreal Engine 5, Unity, or Godot build in under 5 minutes. No manual setup required.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-violet-600/30 hover:brightness-110 transition hover:scale-105 inline-flex items-center gap-2.5"
            >
              <span className="relative z-10">Launch Free Studio Workspace</span>
              <ArrowRight className="relative z-10 size-4 group-hover:translate-x-1 transition" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Minimalist Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 relative z-10 bg-[#080d18]/90">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">GameSense</span>
            <span>&mdash; Intelligent Gameplay Kernel &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link href="/platform" className="hover:text-white transition">Platform</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition font-medium">Sign In</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

