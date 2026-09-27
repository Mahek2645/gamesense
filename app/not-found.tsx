'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md text-center rounded-2xl border border-slate-800 bg-[#0d1425] p-8 shadow-2xl"
      >
        <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 mb-4">
          <Gamepad2 className="size-7" />
        </div>
        <div className="text-5xl font-black font-mono tracking-wider text-violet-400 mb-2">404</div>
        <h1 className="text-xl font-bold mb-2">Simulation Sector Not Found</h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The requested telemetry endpoint, scenario, or route does not exist in the current GameSense universe cluster.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition inline-flex items-center gap-1.5"
          >
            <Home className="size-3.5" /> Back Home
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition inline-flex items-center gap-1.5"
          >
            Launch Studio <ArrowLeft className="size-3.5 rotate-180" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
