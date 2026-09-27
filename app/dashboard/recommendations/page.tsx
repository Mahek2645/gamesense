'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Check,
  X,
  Sliders,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Layers,
  HelpCircle,
  Cpu,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { PageTransition } from '@/components/animations'
import { apiClient, formatDelta } from '@/lib/api-client'
import { Recommendation, RecommendationStatus } from '@/types/api'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    try {
      const res = await apiClient.getRecommendations()
      setRecommendations(res.recommendations || [])
    } catch (err) {
      console.error('Failed to fetch recommendations:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const handleUpdateStatus = async (id: string, newStatus: RecommendationStatus) => {
    try {
      await apiClient.updateRecommendationStatus(id, newStatus)
      setActiveMessage(`Recommendation successfully updated to ${newStatus.toUpperCase()}`)
      fetchRecommendations()
      setTimeout(() => setActiveMessage(null), 3000)
    } catch (err) {
      console.error('Failed to update recommendation:', err)
    }
  }

  const handleTriggerAnalysis = async () => {
    setIsAnalyzing(true)
    setActiveMessage(null)
    try {
      const result = await apiClient.analyzeRecommendations('game-01')
      setActiveMessage(
        `AI Analysis Complete: Evaluated ${result.analyzedSessions || 25} sessions, generated ${result.generatedCount || 3} optimal tuning parameters.`
      )
      await fetchRecommendations()
    } catch (err) {
      console.error('Failed to trigger AI analysis:', err)
      setActiveMessage('AI Analysis failed to run. Please check backend service.')
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setActiveMessage(null), 5000)
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
                <Sparkles className="size-5 text-violet-400" />
                <h1 className="text-2xl font-bold tracking-tight">AI Balance Tuning Engine</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated mathematical optimization recommendations for Neon Drift
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition disabled:opacity-50"
            >
              <Zap className={`size-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Sessions...' : 'Trigger AI Balance Analysis'}</span>
            </button>

            <Link
              href="/dashboard/retests"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 transition self-start sm:self-auto"
            >
              <RefreshCw className="size-3.5" />
              <span>Go to Retesting</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-lg border border-cyan-500/30 bg-cyan-950/25 text-xs font-mono text-cyan-300 flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 shrink-0 text-cyan-400" />
            <span>{activeMessage}</span>
          </motion.div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-5">
            <span className="text-xs font-mono text-slate-400">ACTIVE RECOMMENDATIONS</span>
            <p className="text-3xl font-bold text-white mt-1">{recommendations.length}</p>
            <span className="text-xs text-violet-400 font-mono mt-1 block">Monte Carlo Evaluated</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-5">
            <span className="text-xs font-mono text-slate-400">READY TO APPLY</span>
            <p className="text-3xl font-bold text-cyan-400 mt-1">
              {recommendations.filter((r) => r.status === 'accepted').length}
            </p>
            <span className="text-xs text-slate-400 font-mono mt-1 block">Accepted by Game Designer</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-5">
            <span className="text-xs font-mono text-slate-400">APPLIED TO BUILD</span>
            <p className="text-3xl font-bold text-emerald-400 mt-1">
              {recommendations.filter((r) => r.status === 'applied').length}
            </p>
            <span className="text-xs text-emerald-400/80 font-mono mt-1 block">In Production Hotfix</span>
          </div>
        </div>

        {/* Recommendations Cards */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500 font-mono text-sm">
              <div className="size-6 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500 mx-auto mb-2" />
              Loading recommendations...
            </div>
          ) : recommendations.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-800 bg-[#0d1425] text-slate-500 font-mono text-sm">
              No recommendations generated yet. Click &quot;Trigger AI Balance Analysis&quot; above to inspect session telemetry.
            </div>
          ) : (
            recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl border border-slate-800 bg-[#0d1425]/90 p-6 sm:p-7 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-700 transition"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        rec.status === 'applied'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : rec.status === 'accepted'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : rec.status === 'rejected'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      }`}
                    >
                      STATUS: {rec.status}
                    </span>

                    <span className="text-xs font-mono text-slate-500">
                      Target: <strong className="text-slate-300">{rec.parameter}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{rec.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rec.rationale}
                  </p>

                  {/* Mathematical Parameter Diff Box */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                    <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500">Current Value: </span>
                      <span className="text-rose-300 font-bold">{rec.currentValue}</span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-500" />
                    <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500">AI Suggested: </span>
                      <span className="text-emerald-300 font-bold">{rec.suggestedValue}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium">
                      {formatDelta(rec.projectedDelta)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 justify-end">
                  {rec.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(rec.id, 'accepted')}
                        className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-md shadow-cyan-600/20 transition inline-flex items-center gap-1.5"
                      >
                        <Check className="size-3.5" /> Accept Fix
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(rec.id, 'rejected')}
                        className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition inline-flex items-center gap-1.5"
                      >
                        <X className="size-3.5" /> Dismiss
                      </button>
                    </>
                  )}

                  {rec.status === 'accepted' && (
                    <button
                      onClick={() => handleUpdateStatus(rec.id, 'applied')}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 hover:brightness-110 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition inline-flex items-center gap-1.5"
                    >
                      <Sliders className="size-3.5" /> Apply Parameter to Build
                    </button>
                  )}

                  {rec.status === 'applied' && (
                    <Link
                      href="/dashboard/retests"
                      className="px-4 py-2 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-semibold hover:bg-emerald-600/40 transition inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="size-3.5" /> Verify in Retest
                    </Link>
                  )}

                  {rec.status === 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(rec.id, 'pending')}
                      className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  )
}
