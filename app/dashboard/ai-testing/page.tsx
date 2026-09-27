'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, PlayCircle, Settings, ChevronRight, ChevronLeft, SlidersHorizontal, Clock, Activity, Cpu, HardDrive } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AITestingPage() {
  const router = useRouter()
  const [config, setConfig] = useState({
    agentCount: 4,
    duration: 30,
    testType: 'gameplay',
    difficulty: 'medium',
    environment: 'production',
  })

  const handleStartTesting = () => {
    alert(`Starting AI testing with ${config.agentCount} agents for ${config.duration} minutes`)
    router.push('/dashboard/ai-testing/live')
  }

  const testTypes = [
    { id: 'gameplay', label: 'Gameplay', description: 'Core gameplay mechanics' },
    { id: 'navigation', label: 'Navigation', description: 'Movement and pathfinding' },
    { id: 'ui', label: 'UI', description: 'User interface interactions' },
    { id: 'stress', label: 'Stress', description: 'High-load testing' },
    { id: 'performance', label: 'Performance', description: 'FPS and resource usage' },
    { id: 'edge', label: 'Edge Cases', description: 'Boundary conditions' },
  ]

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
            <div>
              <h1 className="text-xl font-semibold">AI Testing Configuration</h1>
              <p className="text-sm text-slate-400">Neon Drift - Main Testing Project</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-purple-400" />
            <span className="text-sm">AI Agents</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-12">
        {/* Game Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-3xl">
              🎮
            </div>
            <div>
              <h2 className="text-xl font-semibold">Neon Drift</h2>
              <p className="text-sm text-slate-400">Version 1.0.0 • 5 scenarios configured</p>
            </div>
          </div>
        </motion.div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 lg:p-8 mb-6"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Settings className="size-5" />
            Test Configuration
          </h2>

          <div className="space-y-6">
            {/* Agent Count */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Number of AI Agents</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={config.agentCount}
                  onChange={(e) => setConfig({ ...config, agentCount: parseInt(e.target.value) })}
                  className="flex-1 h-2 rounded-lg bg-slate-700 appearance-none cursor-pointer"
                />
                <span className="text-lg font-semibold text-purple-400 w-12 text-center">{config.agentCount}</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Testing Duration (minutes)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
                  className="flex-1 h-2 rounded-lg bg-slate-700 appearance-none cursor-pointer"
                />
                <span className="text-lg font-semibold text-purple-400 w-20 text-center">{config.duration}m</span>
              </div>
            </div>

            {/* Test Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Test Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {testTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConfig({ ...config, testType: type.id })}
                    className={`rounded-lg border p-3 text-left transition ${
                      config.testType === type.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                    }`}
                  >
                    <p className="font-medium text-sm">{type.label}</p>
                    <p className="text-xs text-slate-400">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Difficulty Level</label>
              <div className="flex gap-3">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfig({ ...config, difficulty: level.toLowerCase() })}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      config.difficulty === level.toLowerCase()
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Environment */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Environment</label>
              <div className="flex gap-3">
                {['Development', 'Staging', 'Production'].map((env) => (
                  <button
                    key={env}
                    onClick={() => setConfig({ ...config, environment: env.toLowerCase() })}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      config.environment === env.toLowerCase()
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Estimates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="size-5" />
            Resource Estimates
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="size-4 text-purple-400" />
                <span className="text-sm text-slate-400">CPU Usage</span>
              </div>
              <p className="text-2xl font-semibold">~{config.agentCount * 15}%</p>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="size-4 text-purple-400" />
                <span className="text-sm text-slate-400">Memory</span>
              </div>
              <p className="text-2xl font-semibold">~{config.agentCount * 2}GB</p>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="size-4 text-purple-400" />
                <span className="text-sm text-slate-400">Est. Time</span>
              </div>
              <p className="text-2xl font-semibold">{config.duration}m</p>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={handleStartTesting}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition"
          >
            <PlayCircle className="size-6" />
            Start AI Testing
          </button>
        </motion.div>
      </div>
    </div>
  )
}
