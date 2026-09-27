'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Printer, Eye, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { PageTransition } from '@/components/animations'

interface Report {
  id: string
  gameId: string
  title: string
  type: string
  format: string
  generatedAt: string
  status: string
  metricsSummary: {
    scenariosTested: number
    balanceScore: number
    humanSatisfaction: number
    criticalAnomalies: number
    completionRate: string
  }
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports')
      if (res.ok) {
        const data = await res.json()
        setReports(data.reports || [])
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: 'game-01',
          title: `Neon Drift Balance Audit — Build ${new Date().toLocaleDateString()}`,
          type: 'executive_summary'
        })
      })

      if (res.ok) {
        setActiveMessage('Executive Playtest Report generated successfully!')
        fetchReports()
        setTimeout(() => setActiveMessage(null), 3000)
      }
    } catch (err) {
      console.error('Failed to generate report:', err)
    } finally {
      setIsGenerating(false)
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
                <FileText className="size-5 text-violet-400" />
                <h1 className="text-2xl font-bold tracking-tight">Executive Reports & Audits</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive analytical summaries for studio leadership and publishing partners</p>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7757ff] to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition disabled:opacity-50 self-start sm:self-auto"
          >
            <Sparkles className="size-3.5" />
            <span>{isGenerating ? 'Compiling Report Data...' : 'Generate New Audit Report'}</span>
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

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map(rep => (
            <div
              key={rep.id}
              className="rounded-2xl border border-slate-800 bg-[#0d1425]/90 p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {rep.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {new Date(rep.generatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{rep.title}</h3>

                {/* Metrics Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono mb-6">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">BALANCE SCORE</span>
                    <span className="text-lg font-bold text-violet-400">{rep.metricsSummary.balanceScore}/100</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">SATISFACTION</span>
                    <span className="text-lg font-bold text-emerald-400">{rep.metricsSummary.humanSatisfaction}%</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">SCENARIOS</span>
                    <span className="text-lg font-bold text-white">{rep.metricsSummary.scenariosTested}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Ready for Export
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedReport(rep)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white transition inline-flex items-center gap-1.5"
                  >
                    <Eye className="size-3.5" /> Preview
                  </button>

                  <button
                    onClick={() => {
                      alert(`Exporting ${rep.title} as PDF...`)
                    }}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition inline-flex items-center gap-1.5"
                  >
                    <Download className="size-3.5" /> Export PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Preview Modal */}
        <AnimatePresence>
          {selectedReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-[#0d1425] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white"
                >
                  <X className="size-5" />
                </button>

                <div className="border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-1">
                    <span>GAMESENSE EXECUTIVE INTELLIGENCE BRIEF</span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Generated on {new Date(selectedReport.generatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-6 text-sm text-slate-300">
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-400 mb-2">Executive Summary</h3>
                    <p className="text-xs leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      The regression playtest series evaluated 148 automated and human scenarios across all 4 race sectors. The current build exhibits strong core engagement (91% satisfaction) with an overall balance score of 84/100. One high-priority kinetic boost exploit was detected during apex counter-steering. After applying AI recommendation REC-01, projected win-rate deviation dropped from 32.4% down to nominal 4.8%.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-400 mb-2">Key Metric Breakdown</h3>
                    <pre className="text-xs font-mono bg-[#070b14] p-4 rounded-xl border border-slate-800 text-cyan-300 overflow-x-auto">
                      {JSON.stringify(selectedReport.metricsSummary, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition inline-flex items-center gap-1.5"
                  >
                    <Printer className="size-3.5" /> Print Brief
                  </button>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
