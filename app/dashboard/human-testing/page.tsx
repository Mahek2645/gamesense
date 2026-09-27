'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Check, X, AlertTriangle, Clock, ChevronRight, ChevronLeft, PlayCircle, Pause, SkipForward } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HumanTestingPage() {
  const router = useRouter()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [results, setResults] = useState<{ [key: number]: 'PASS' | 'FAIL' | 'BLOCKED' }>({})
  const [notes, setNotes] = useState<{ [key: number]: string }>({})
  const [showNotes, setShowNotes] = useState<{ [key: number]: boolean }>({})

  const scenarios = [
    {
      id: 'SC-001',
      title: 'Login & Start Game',
      description: 'Test login flow and game initialization',
      steps: ['Open game', 'Navigate to login', 'Enter credentials', 'Start game'],
      expectedResult: 'User successfully enters the game',
    },
    {
      id: 'SC-002',
      title: 'Character Movement',
      description: 'Test movement controls and physics',
      steps: ['Move forward', 'Move backward', 'Jump', 'Turn', 'Interact with object'],
      expectedResult: 'Character responds correctly',
    },
    {
      id: 'SC-003',
      title: 'Combat Mechanics',
      description: 'Test combat systems and damage',
      steps: ['Attack enemy', 'Use special ability', 'Check damage', 'Defend'],
      expectedResult: 'Combat works as expected',
    },
    {
      id: 'SC-004',
      title: 'Inventory System',
      description: 'Test inventory management',
      steps: ['Open inventory', 'Add item', 'Remove item', 'Use item'],
      expectedResult: 'Inventory functions correctly',
    },
  ]

  const handleResult = (result: 'PASS' | 'FAIL' | 'BLOCKED') => {
    setResults({ ...results, [currentScenario]: result })
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
    }
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
    }
  }

  const handlePrevious = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1)
    }
  }

  const handleComplete = () => {
    const passed = Object.values(results).filter(r => r === 'PASS').length
    const failed = Object.values(results).filter(r => r === 'FAIL').length
    const blocked = Object.values(results).filter(r => r === 'BLOCKED').length
    alert(`Testing Complete!\nPassed: ${passed}\nFailed: ${failed}\nBlocked: ${blocked}`)
    router.push('/dashboard/comparison')
  }

  const scenario = scenarios[currentScenario]

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
              <h1 className="text-xl font-semibold">Human Testing</h1>
              <p className="text-sm text-slate-400">Neon Drift - Main Testing Project</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-emerald-400" />
            <span className="text-sm">Scenario {currentScenario + 1} of {scenarios.length}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-slate-400">{Math.round(((currentScenario + 1) / scenarios.length) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario Card */}
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-slate-800 bg-[#0d1425] p-6 lg:p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-slate-400">{scenario.id}</span>
            <h2 className="text-2xl font-semibold">{scenario.title}</h2>
          </div>
          <p className="text-slate-400 mb-6">{scenario.description}</p>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Steps</p>
              <div className="space-y-2">
                {scenario.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-slate-900/50 p-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
              <p className="text-sm font-medium text-emerald-400 mb-1">Expected Result</p>
              <p className="text-sm text-slate-300">{scenario.expectedResult}</p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t border-slate-800 pt-4">
            <button
              onClick={() => setShowNotes({ ...showNotes, [currentScenario]: !showNotes[currentScenario] })}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-3"
            >
              {showNotes[currentScenario] ? 'Hide' : 'Add'} Notes
            </button>
            {showNotes[currentScenario] && (
              <textarea
                value={notes[currentScenario] || ''}
                onChange={(e) => setNotes({ ...notes, [currentScenario]: e.target.value })}
                placeholder="Add your observations here..."
                rows={3}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
              />
            )}
          </div>
        </motion.div>

        {/* Result Buttons */}
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <button
            onClick={() => handleResult('PASS')}
            className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
          >
            <Check className="size-4" />
            PASS
          </button>
          <button
            onClick={() => handleResult('FAIL')}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition"
          >
            <X className="size-4" />
            FAIL
          </button>
          <button
            onClick={() => handleResult('BLOCKED')}
            className="flex items-center justify-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-400 hover:bg-orange-500/20 transition"
          >
            <AlertTriangle className="size-4" />
            BLOCKED
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentScenario === 0}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-300 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>

          {currentScenario === scenarios.length - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition"
            >
              <Check className="size-4" />
              Complete Testing
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-300 hover:border-slate-600 transition"
            >
              Skip
              <SkipForward className="size-4" />
            </button>
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          <h3 className="text-sm font-medium mb-3">Results Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-emerald-400">{Object.values(results).filter(r => r === 'PASS').length}</p>
              <p className="text-xs text-slate-400">Passed</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-red-400">{Object.values(results).filter(r => r === 'FAIL').length}</p>
              <p className="text-xs text-slate-400">Failed</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-orange-400">{Object.values(results).filter(r => r === 'BLOCKED').length}</p>
              <p className="text-xs text-slate-400">Blocked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
