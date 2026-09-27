'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Search, Filter, ArrowLeft, ArrowRight, ShieldAlert, Sparkles, ChevronRight, X, Clock } from 'lucide-react'
import Link from 'next/link'
import { PageTransition } from '@/components/animations'

interface BalanceIssue {
  id: string
  gameId: string
  title: string
  category: 'combat' | 'economy' | 'progression' | 'physics' | 'ai_behavior'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'detected' | 'investigating' | 'resolved' | 'dismissed'
  confidence: number
  detectedBy: 'ai' | 'human' | 'hybrid'
  metricTrigger: string
  description: string
  impactAnalysis: string
  affectedSegment: string
  createdAt: string
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<BalanceIssue[]>([])
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedIssue, setSelectedIssue] = useState<BalanceIssue | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/issues')
      if (res.ok) {
        const data = await res.json()
        setIssues(data.issues || [])
      }
    } catch (err) {
      console.error('Failed to fetch issues:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const handleUpdateStatus = async (id: string, newStatus: BalanceIssue['status']) => {
    try {
      const res = await fetch('/api/issues', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status: newStatus } })
      })
      if (res.ok) {
        fetchIssues()
        if (selectedIssue && selectedIssue.id === id) {
          setSelectedIssue({ ...selectedIssue, status: newStatus })
        }
      }
    } catch (err) {
      console.error('Failed to update issue status:', err)
    }
  }

  const filteredIssues = issues.filter(issue => {
    if (severityFilter !== 'all' && issue.severity !== severityFilter) return false
    if (statusFilter !== 'all' && issue.status !== statusFilter) return false
    return true
  })

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
              <h1 className="text-2xl font-bold tracking-tight">Balance Problem Detector</h1>
              <p className="text-xs text-slate-400 mt-0.5">Empirical gameplay anomalies flagged by AI agents & player cohorts</p>
            </div>
          </div>

          <Link
            href="/dashboard/recommendations"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition self-start sm:self-auto"
          >
            <Sparkles className="size-3.5" />
            <span>View AI Recommendations</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0d1425] p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 mr-2">Severity:</span>
            {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-lg uppercase transition ${
                  severityFilter === sev
                    ? sev === 'critical'
                      ? 'bg-red-600 text-white'
                      : sev === 'high'
                      ? 'bg-amber-600 text-white'
                      : 'bg-violet-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 py-1.5 px-3 text-xs text-white outline-none focus:border-violet-500"
            >
              <option value="all">All Statuses</option>
              <option value="detected">Detected</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        {/* Issues List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.map(issue => (
            <div
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="rounded-2xl border border-slate-800 bg-[#0d1425]/90 hover:border-violet-500/50 p-6 flex flex-col justify-between shadow-xl cursor-pointer transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      issue.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : issue.severity === 'high'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {issue.severity}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {issue.confidence}% Confidence
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition mb-2">
                  {issue.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {issue.description}
                </p>

                <div className="space-y-1.5 text-[11px] font-mono border-t border-slate-800/80 pt-3">
                  <div className="text-amber-300/90 truncate">
                    Trigger: {issue.metricTrigger}
                  </div>
                  <div className="text-slate-500">
                    Segment: {issue.affectedSegment}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="uppercase font-mono text-[10px] text-violet-400">
                  Detected By {issue.detectedBy}
                </span>
                <span className="group-hover:translate-x-1 transition text-slate-300 flex items-center gap-1">
                  Inspect <ChevronRight className="size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal / Drawer */}
        <AnimatePresence>
          {selectedIssue && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0d1425] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white"
                >
                  <X className="size-5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      selectedIssue.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {selectedIssue.severity} Severity
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Status: <strong className="text-white uppercase">{selectedIssue.status}</strong>
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-4">{selectedIssue.title}</h2>

                <div className="space-y-4 text-sm text-slate-300 mb-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Detailed Description</h4>
                    <p className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs leading-relaxed">
                      {selectedIssue.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Player Impact Analysis</h4>
                    <p className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-rose-300 leading-relaxed">
                      {selectedIssue.impactAnalysis}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block mb-1">TRIGGER THRESHOLD</span>
                      <span className="text-amber-300 font-semibold">{selectedIssue.metricTrigger}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block mb-1">CONFIDENCE METRIC</span>
                      <span className="text-emerald-400 font-semibold">{selectedIssue.confidence}% Model Certainty</span>
                    </div>
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedIssue.id, 'investigating')}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                    >
                      Mark Investigating
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedIssue.id, 'resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white transition"
                    >
                      Resolve Issue
                    </button>
                  </div>

                  <Link
                    href="/dashboard/recommendations"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium transition"
                  >
                    <span>View AI Proposed Fixes</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
