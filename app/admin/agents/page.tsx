'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ChevronLeft, Activity, Cpu, HardDrive, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminAgentsPage() {
  const [agents] = useState([
    { id: 'a1', name: 'Agent-Alpha', status: 'active', performance: 94, tasks: 142, successRate: 98 },
    { id: 'a2', name: 'Agent-Beta', status: 'active', performance: 91, tasks: 128, successRate: 96 },
    { id: 'a3', name: 'Agent-Gamma', status: 'idle', performance: 89, tasks: 95, successRate: 94 },
    { id: 'a4', name: 'Agent-Delta', status: 'active', performance: 97, tasks: 156, successRate: 99 },
    { id: 'a5', name: 'Agent-Epsilon', status: 'maintenance', performance: 0, tasks: 0, successRate: 0 },
  ])

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronLeft className="size-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">AI Agent Management</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Active Agents</p>
            <p className="text-2xl font-semibold text-emerald-400">{agents.filter(a => a.status === 'active').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Idle Agents</p>
            <p className="text-2xl font-semibold text-slate-400">{agents.filter(a => a.status === 'idle').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Avg Performance</p>
            <p className="text-2xl font-semibold text-purple-400">93%</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Tasks</p>
            <p className="text-2xl font-semibold">{agents.reduce((acc, a) => acc + a.tasks, 0)}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-6 ${
                agent.status === 'active'
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : agent.status === 'idle'
                  ? 'border-slate-700 bg-slate-900/30'
                  : 'border-orange-500/30 bg-orange-500/5'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`grid size-10 place-items-center rounded-lg ${
                    agent.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : agent.status === 'idle'
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-xs text-slate-400 capitalize">{agent.status}</p>
                  </div>
                </div>
                {agent.status === 'active' && (
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Performance</span>
                  <span className="font-semibold">{agent.performance}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tasks</span>
                  <span className="font-semibold">{agent.tasks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="font-semibold text-emerald-400">{agent.successRate}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
