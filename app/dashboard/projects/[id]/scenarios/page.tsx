'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ChevronRight, ChevronLeft, Save, PlayCircle, Check, X, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ScenariosPage() {
  const router = useRouter()
  const [scenarios, setScenarios] = useState([
    {
      id: 'SC-001',
      title: 'Login & Start Game',
      description: 'Test login flow and game initialization',
      steps: ['Open game', 'Navigate to login', 'Enter credentials', 'Start game'],
      expectedResult: 'User successfully enters the game',
      priority: 'High',
      category: 'Authentication',
    },
    {
      id: 'SC-002',
      title: 'Character Movement',
      description: 'Test movement controls and physics',
      steps: ['Move forward', 'Move backward', 'Jump', 'Turn', 'Interact with object'],
      expectedResult: 'Character responds correctly',
      priority: 'High',
      category: 'Gameplay',
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newScenario, setNewScenario] = useState({
    title: '',
    description: '',
    steps: '',
    expectedResult: '',
    priority: 'Medium',
    category: 'Gameplay',
  })

  const handleAddScenario = () => {
    if (newScenario.title.trim()) {
      const scenario = {
        id: `SC-${String(scenarios.length + 1).padStart(3, '0')}`,
        ...newScenario,
        steps: newScenario.steps.split('\n').filter(s => s.trim()),
      }
      setScenarios([...scenarios, scenario])
      setShowAddModal(false)
      setNewScenario({
        title: '',
        description: '',
        steps: '',
        expectedResult: '',
        priority: 'Medium',
        category: 'Gameplay',
      })
    }
  }

  const handleDeleteScenario = (id: string) => {
    if (confirm('Are you sure you want to delete this scenario?')) {
      setScenarios(scenarios.filter(s => s.id !== id))
    }
  }

  const handleStartTesting = () => {
    alert('Starting testing with ' + scenarios.length + ' scenarios')
    router.push('/dashboard/human-testing')
  }

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
              <h1 className="text-xl font-semibold">Test Scenarios</h1>
              <p className="text-sm text-slate-400">Neon Drift - Main Testing Project</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-200 transition"
            >
              <Plus className="size-4" />
              Add Scenario
            </button>
            <button
              onClick={handleStartTesting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition"
            >
              <PlayCircle className="size-4" />
              Start Testing
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
        {/* Scenarios List */}
        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-slate-800 bg-[#0d1425] p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-slate-400">{scenario.id}</span>
                    <h3 className="font-semibold text-lg">{scenario.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        scenario.priority === 'High'
                          ? 'bg-red-500/10 text-red-400'
                          : scenario.priority === 'Medium'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {scenario.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{scenario.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Category: {scenario.category}</span>
                    <span>Steps: {scenario.steps.length}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteScenario(scenario.id)}
                  className="text-slate-400 hover:text-red-400 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Steps</p>
                <div className="space-y-1">
                  {scenario.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-slate-500">{i + 1}.</span>
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Expected Result</p>
                <p className="text-sm text-slate-300">{scenario.expectedResult}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Scenario Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Add New Scenario</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                    <X className="size-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={newScenario.title}
                      onChange={(e) => setNewScenario({ ...newScenario, title: e.target.value })}
                      placeholder="Enter scenario title"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={newScenario.description}
                      onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
                      placeholder="Describe the scenario"
                      rows={2}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Steps (one per line)</label>
                    <textarea
                      value={newScenario.steps}
                      onChange={(e) => setNewScenario({ ...newScenario, steps: e.target.value })}
                      placeholder="Step 1&#10;Step 2&#10;Step 3"
                      rows={4}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Expected Result</label>
                    <input
                      type="text"
                      value={newScenario.expectedResult}
                      onChange={(e) => setNewScenario({ ...newScenario, expectedResult: e.target.value })}
                      placeholder="What should happen?"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                      <select
                        value={newScenario.priority}
                        onChange={(e) => setNewScenario({ ...newScenario, priority: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <select
                        value={newScenario.category}
                        onChange={(e) => setNewScenario({ ...newScenario, category: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                      >
                        <option value="Gameplay">Gameplay</option>
                        <option value="UI">UI</option>
                        <option value="Performance">Performance</option>
                        <option value="Authentication">Authentication</option>
                        <option value="Combat">Combat</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddScenario}
                    disabled={!newScenario.title.trim()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Plus className="size-4" />
                    Add Scenario
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
