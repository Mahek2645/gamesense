'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center rounded-2xl border border-red-500/30 bg-[#0d1425] p-8 shadow-2xl">
        <div className="size-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-xl font-bold mb-2">Telemetry Cluster Anomaly</h1>
        <p className="text-xs text-slate-400 mb-6">
          An unexpected error occurred during execution. Our telemetry monitor has captured the stack trace.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition inline-flex items-center gap-1.5"
          >
            <RefreshCw className="size-3.5" /> Recover Session
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition inline-flex items-center gap-1.5"
          >
            <Home className="size-3.5" /> Home
          </Link>
        </div>
      </div>
    </div>
  )
}
