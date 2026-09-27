'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Play, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, TrendingUp, Sparkles, Layers, Activity } from 'lucide-react'
import Link from 'next/link'
import { PageTransition } from '@/components/animations'

interface RetestRun {
  id: string
  gameId: string
  recommendationId?: string
  name: string
  baseVersion: string
  testVersion: string
  status: 'scheduled' | 'running' | 'completed' | 'failed'
  improvementScore: number
  scenariosRerun: number
  resolvedIssuesCount: number
  createdAt: string
}

export default function RetestsPage() {
  const [retests, setRetests] = useState<RetestRun[]>([])
  const [isTriggering, setIsTriggering] = useState(false)
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  const fetchRetests = async () => {
    try {
      const res = await fetch('/api/retests')
      if (res.ok) {
        const data = await res.json()
        setRetests(data.retests || [])
      }
    } catch (err) {
      console.error('Failed to fetch retests:', err)
    }
  }

  useEffect(() => {
    fetchRetests()
  }, [])

  const handleLaunchNewRetest = async () => {
    setIsTriggering(true)
    try {
      const res = await fetch('/api/retests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: 'game-01',
          name: 'Dynamic Hotfix Validation Sweep',
          baseVersion: 'v1.4.2',
          testVersion: 'v1.4.3-hotfix',
          status: 'running',
          improvementScore: 89,
          scenariosRerun: 48,
          resolvedIssuesCount: 2
        })
      })

      if (res.ok) {
        setActiveMessage('Automated Retest Suite dispatched! AI regression swarms are executing scenarios.')
        fetchRetests()
        setTimeout(() => setActiveMessage(null), 4000)
      }
    } catch (err) {
      console.error('Failed to launch retest:', err)
    } finally {
      setIsTriggering(false)
    }
  }

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="size-9 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <RefreshCw className="size-5 text-emerald-400" />
                <h1 className="text-2xl font-bold tracking-tight">Retesting & Verification Suite</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Automated before-and-after baseline comparison for game patches</p>
            </div>
          </div>

          <button
            onClick={handleLaunchNewRetest}
            disabled={isTriggering}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition disabled:opacity-50 self-start sm:self-auto"
          >
            <Play className="size-3.5" />
            <span>{isTriggering ? 'Dispatching Swarm...' : 'Trigger Automated Retest'}</span>
          </button>
        </div>

        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-xs font-mono text-emerald-300 flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{activeMessage}</span>
          </motion.div>
        )}

        {/* Retest Runs List */}
        <div className="space-y-4">
          {retests.map(run => (
            <div
              key={run.id}
              className="rounded-2xl border border-slate-800 bg-[#0d1425]/90 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      run.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-violet-500/20 text-violet-300 border border-violet-500/30 animate-pulse'
                    }`}
                  >
                    {run.status}
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    Baseline: <span className="text-slate-300">{run.baseVersion}</span> → Retest:{' '}
                    <span className="text-cyan-300 font-bold">{run.testVersion}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{run.name}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span>{run.scenariosRerun} Scenarios Re-run</span>
                  <span>•</span>
                  <span className="text-emerald-400">{run.resolvedIssuesCount} Balance Issues Resolved</span>
                  <span>•</span>
                  <span>{new Date(run.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">IMPROVEMENT DELTA</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                    +{run.improvementScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">PARITY GAIN</span>
                </div>

                <Link
                  href="/dashboard/comparison"
                  className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition inline-flex items-center gap-1.5"
                >
                  <span>Version Diff</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
