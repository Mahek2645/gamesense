'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, ChevronRight, ChevronLeft, Check, Users, Zap, ArrowRight, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function NewProjectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [gameId, setGameId] = useState(searchParams.get('game') || '')
  const [projectName, setProjectName] = useState('')
  const [testMethods, setTestMethods] = useState({ human: true, ai: true })
  const [scenarios, setScenarios] = useState([
    { id: 1, title: 'Login & Start Game', description: 'Test login flow and game initialization', checked: true },
    { id: 2, title: 'Character Movement', description: 'Test movement controls and physics', checked: true },
    { id: 3, title: 'Combat Mechanics', description: 'Test combat systems and damage', checked: true },
    { id: 4, title: 'Inventory System', description: 'Test inventory management', checked: false },
    { id: 5, title: 'UI Navigation', description: 'Test menu and interface navigation', checked: false },
  ])

  const games = [
    { id: 'g1', name: 'Neon Drift', version: '1.0.0' },
    { id: 'g2', name: 'Starfall Tactics', version: '0.9.0' },
    { id: 'g3', name: 'Pocket Worlds', version: '2.1.0' },
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCreate = () => {
    alert(`Project "${projectName}" created successfully!`)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/games" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronLeft className="size-5" />
              <span className="text-sm">Back to Games</span>
            </Link>
            <h1 className="text-xl font-semibold">Create Testing Project</h1>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1 w-8 rounded-full transition ${s <= step ? 'bg-violet-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Select Game</h2>
                <p className="text-slate-400">Choose the game you want to test</p>
              </div>
              <div className="grid gap-4">
                {games.map((game) => (
                  <button key={game.id} onClick={() => setGameId(game.id)} className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${gameId === game.id ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-2xl">🎮</div>
                      <div>
                        <h3 className="font-semibold">{game.name}</h3>
                        <p className="text-sm text-slate-400">v{game.version}</p>
                      </div>
                    </div>
                    {gameId === game.id && <Check className="size-5 text-violet-400" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
                <p className="text-slate-400">Name your testing project</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Project Name</label>
                  <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g., Main Testing Project" className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Test Scenarios</h2>
                <p className="text-slate-400">Select scenarios to include in your test plan</p>
              </div>
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <button key={scenario.id} onClick={() => setScenarios(scenarios.map((s) => s.id === scenario.id ? { ...s, checked: !s.checked } : s))} className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${scenario.checked ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                    <div>
                      <h3 className="font-semibold">{scenario.title}</h3>
                      <p className="text-sm text-slate-400">{scenario.description}</p>
                    </div>
                    {scenario.checked && <Check className="size-5 text-violet-400" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Testing Methods</h2>
                <p className="text-slate-400">Choose how you want to test your game</p>
              </div>
              <div className="grid gap-4">
                <button onClick={() => setTestMethods({ human: true, ai: false })} className={`flex items-center justify-between rounded-xl border p-6 text-left transition ${testMethods.human && !testMethods.ai ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400"><Users className="size-6" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Human Testing Only</h3>
                      <p className="text-sm text-slate-400">Manual testing by human testers</p>
                    </div>
                  </div>
                  {testMethods.human && !testMethods.ai && <Check className="size-5 text-emerald-400" />}
                </button>
                <button onClick={() => setTestMethods({ human: false, ai: true })} className={`flex items-center justify-between rounded-xl border p-6 text-left transition ${!testMethods.human && testMethods.ai ? 'border-purple-500 bg-purple-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-xl bg-purple-500/20 text-purple-400"><Zap className="size-6" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">AI Testing Only</h3>
                      <p className="text-sm text-slate-400">Automated testing by AI agents</p>
                    </div>
                  </div>
                  {!testMethods.human && testMethods.ai && <Check className="size-5 text-purple-400" />}
                </button>
                <button onClick={() => setTestMethods({ human: true, ai: true })} className={`flex items-center justify-between rounded-xl border p-6 text-left transition ${testMethods.human && testMethods.ai ? 'border-violet-500 bg-gradient-to-r from-emerald-500/10 to-purple-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20"><PlayCircle className="size-6 text-white" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Human + AI Comparison</h3>
                      <p className="text-sm text-slate-400">Compare both methods for best results</p>
                    </div>
                  </div>
                  {testMethods.human && testMethods.ai && <Check className="size-5 text-violet-400" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button onClick={handleBack} disabled={step === 1} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-300 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <ChevronLeft className="size-4" />
            Back
          </button>
          {step === 4 ? (
            <button onClick={handleCreate} disabled={!projectName.trim() || !gameId} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <ArrowRight className="size-4" />
              Create Project
            </button>
          ) : (
            <button onClick={handleNext} disabled={step === 1 && !gameId} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition">
              Next
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center">Loading...</div>}>
      <NewProjectContent />
    </Suspense>
  )
}
