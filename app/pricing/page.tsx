'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Check, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Indie Studio',
    tagline: 'Essential gameplay telemetry & AI playtesting for single titles.',
    priceMonthly: 79,
    priceAnnual: 59,
    badge: 'EARLY ACCESS',
    features: [
      'Up to 2 active game projects',
      '200,000 telemetry events / month',
      '4 concurrent AI agent playtests',
      'Community human playtester pool',
      'Automated collision & glitch detection',
      'Standard 7-day data retention',
      'Discord community support'
    ],
    cta: 'Start Indie Trial',
    highlighted: false
  },
  {
    name: 'Pro Studio',
    tagline: 'Complete intelligence kernel for competitive & live-service games.',
    priceMonthly: 299,
    priceAnnual: 239,
    badge: 'MOST POPULAR',
    features: [
      'Up to 10 active game projects',
      '5,000,000 telemetry events / month',
      '32 concurrent AI agent playtests',
      'Dedicated vetted human cohorts',
      'Mathematical balance anomaly detection',
      'Automated AI tuning recommendations',
      'Monte Carlo before/after retesting',
      '90-day data retention & CSV export',
      'Priority 24/7 technical support'
    ],
    cta: 'Upgrade to Pro Studio',
    highlighted: true
  },
  {
    name: 'Enterprise / Publisher',
    tagline: 'Bespoke infrastructure, on-prem clusters & SLA for AAA publishing.',
    priceMonthly: 899,
    priceAnnual: 749,
    badge: 'UNLIMITED POWER',
    features: [
      'Unlimited game projects & environments',
      'Unlimited microsecond telemetry',
      'Dedicated GPU cluster for custom agent training',
      'Custom RL agent behavioral policies',
      'Full source SDK & custom engine integration',
      'Dedicated account engineer & data scientist',
      'SOC2 Type II & custom NDA guarantees',
      '99.99% uptime SLA guarantee'
    ],
    cta: 'Contact Enterprise Sales',
    highlighted: false
  }
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)

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
            <Link href="/platform" className="hover:text-white transition">Platform</Link>
            <Link href="/pricing" className="text-white font-semibold">Pricing</Link>
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
              <span>Dashboard</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-4">
            <Sparkles className="size-3.5" />
            <span>TRANSPARENT STUDIO TIERS</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Scale From Prototype to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Millions of Live Players
            </span>
          </h1>
          <p className="mt-4 text-base text-slate-400">
            Start testing today with full feature access. No hidden setup fees or long-term lock-in.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 text-xs">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full font-medium transition ${!annual ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition ${annual ? 'bg-[#7757ff] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <span>Annual billing</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition ${
                tier.highlighted
                  ? 'border-2 border-violet-500 bg-gradient-to-b from-[#131a38] to-[#0d1425] shadow-2xl shadow-violet-950/60'
                  : 'border border-slate-800 bg-[#0d1425]/70 hover:border-slate-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-3.5 py-0.5 text-[11px] font-bold tracking-wider uppercase text-white shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  {!tier.highlighted && (
                    <span className="text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-6 min-h-[32px]">{tier.tagline}</p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800/80 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={tier.name.includes('Enterprise') ? '/contact' : '/dashboard'}
                className={`w-full text-center py-3 rounded-lg text-sm font-semibold transition ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#7757ff] to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:brightness-110'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
