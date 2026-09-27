'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Activity, Cpu, HardDrive, Database, Wifi, ChevronLeft, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function AdminSystemPage() {
  const [metrics] = useState([
    { name: 'API Health', status: 'healthy', value: '99.98%', icon: Server },
    { name: 'Database', status: 'healthy', value: 'Connected', icon: Database },
    { name: 'AI Services', status: 'healthy', value: '42 agents', icon: Cpu },
    { name: 'Storage', status: 'warning', value: '68% used', icon: HardDrive },
    { name: 'Network', status: 'healthy', value: '1.2 Gbps', icon: Wifi },
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
            <h1 className="text-xl font-semibold">System Health</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-6 ${
                metric.status === 'healthy'
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-orange-500/30 bg-orange-500/5'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`grid size-10 place-items-center rounded-lg ${
                  metric.status === 'healthy'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  <metric.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{metric.name}</h3>
                  <p className="text-xs text-slate-400 capitalize">{metric.status}</p>
                </div>
              </div>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-800 bg-[#111a2d] p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="size-5" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="size-4 text-emerald-400" />
                <span className="text-slate-300">AI test completed - Agent-Alpha</span>
                <span className="text-slate-500 ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="size-4 text-emerald-400" />
                <span className="text-slate-300">User registered - john@example.com</span>
                <span className="text-slate-500 ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <AlertTriangle className="size-4 text-orange-400" />
                <span className="text-slate-300">Storage warning - 68% capacity</span>
                <span className="text-slate-500 ml-auto">15m ago</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-800 bg-[#111a2d] p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Server Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className="text-slate-300">45%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[45%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Memory</span>
                  <span className="text-slate-300">62%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[62%] rounded-full bg-purple-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Disk I/O</span>
                  <span className="text-slate-300">28%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full w-[28%] rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
