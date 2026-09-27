'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bug, Users, Zap, ChevronLeft, Search, Filter, AlertTriangle, CheckCircle, Clock, MoreVertical } from 'lucide-react'
import Link from 'next/link'

export default function BugsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const bugs = [
    {
      id: 'BUG-001',
      title: 'Character movement delay',
      severity: 'High',
      game: 'Neon Drift',
      scenario: 'Character Movement',
      detectedBy: 'Human',
      status: 'Open',
      createdAt: '2 days ago',
    },
    {
      id: 'BUG-002',
      title: 'Inventory UI response slow',
      severity: 'Medium',
      game: 'Neon Drift',
      scenario: 'Inventory System',
      detectedBy: 'AI',
      status: 'In Progress',
      createdAt: '1 day ago',
    },
    {
      id: 'BUG-003',
      title: 'Combat damage calculation error',
      severity: 'Critical',
      game: 'Starfall Tactics',
      scenario: 'Combat Mechanics',
      detectedBy: 'Both',
      status: 'Open',
      createdAt: '3 days ago',
    },
    {
      id: 'BUG-004',
      title: 'Login authentication timeout',
      severity: 'High',
      game: 'Pocket Worlds',
      scenario: 'Login & Start Game',
      detectedBy: 'AI',
      status: 'Resolved',
      createdAt: '1 week ago',
    },
  ]

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.game.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || bug.detectedBy.toLowerCase() === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronLeft className="size-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">Bug Management</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <div className="flex items-center gap-3 mb-2">
              <Bug className="size-5 text-red-400" />
              <span className="text-sm text-slate-400">Total Bugs</span>
            </div>
            <p className="text-2xl font-semibold">{bugs.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="size-5 text-emerald-400" />
              <span className="text-sm text-slate-400">Human Found</span>
            </div>
            <p className="text-2xl font-semibold">{bugs.filter(b => b.detectedBy === 'Human' || b.detectedBy === 'Both').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="size-5 text-purple-400" />
              <span className="text-sm text-slate-400">AI Found</span>
            </div>
            <p className="text-2xl font-semibold">{bugs.filter(b => b.detectedBy === 'AI' || b.detectedBy === 'Both').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="size-5 text-emerald-400" />
              <span className="text-sm text-slate-400">Resolved</span>
            </div>
            <p className="text-2xl font-semibold">{bugs.filter(b => b.status === 'Resolved').length}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search bugs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-white outline-none transition focus:border-violet-500"
            >
              <option value="all">All Detection Methods</option>
              <option value="human">Human Only</option>
              <option value="ai">AI Only</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        {/* Bugs Table */}
        <div className="rounded-xl border border-slate-800 bg-[#111a2d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Bug ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Game</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Detected By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredBugs.map((bug, i) => (
                  <motion.tr
                    key={bug.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-900/30 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">{bug.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{bug.title}</p>
                      <p className="text-xs text-slate-400">{bug.scenario}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          bug.severity === 'Critical'
                            ? 'bg-red-500/10 text-red-400'
                            : bug.severity === 'High'
                            ? 'bg-orange-500/10 text-orange-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {bug.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{bug.game}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {bug.detectedBy === 'Human' && <Users className="size-4 text-emerald-400" />}
                        {bug.detectedBy === 'AI' && <Zap className="size-4 text-purple-400" />}
                        {bug.detectedBy === 'Both' && (
                          <>
                            <Users className="size-4 text-emerald-400" />
                            <Zap className="size-4 text-purple-400" />
                          </>
                        )}
                        <span className="text-sm text-slate-300">{bug.detectedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          bug.status === 'Open'
                            ? 'bg-red-500/10 text-red-400'
                            : bug.status === 'In Progress'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {bug.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{bug.createdAt}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
