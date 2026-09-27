'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Plus, Search, Filter, MoreVertical, PlayCircle, Users, ShieldCheck, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalData, setModalData] = useState({ name: '', version: '', description: '' })

  const [games, setGames] = useState([
    {
      id: 'g1',
      name: 'Neon Drift',
      version: '1.0.0',
      image: '🏎️',
      status: 'Testing',
      humanTests: 12,
      aiTests: 24,
      bugs: 7,
      qualityScore: 87,
      lastTested: '2 days ago',
    },
    {
      id: 'g2',
      name: 'Starfall Tactics',
      version: '0.9.0',
      image: '⚔️',
      status: 'In Development',
      humanTests: 8,
      aiTests: 16,
      bugs: 12,
      qualityScore: 82,
      lastTested: '1 week ago',
    },
    {
      id: 'g3',
      name: 'Pocket Worlds',
      version: '2.1.0',
      image: '🌍',
      status: 'Released',
      humanTests: 24,
      aiTests: 48,
      bugs: 3,
      qualityScore: 94,
      lastTested: '3 days ago',
    },
  ])

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games')
      if (response.ok) {
        const data = await response.json()
        if (data.games && data.games.length > 0) {
          setGames(data.games)
        }
      }
    } catch (error) {
      console.error('Failed to fetch games:', error)
    }
  }

  const handleAddGame = async () => {
    if (modalData.name.trim()) {
      try {
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: modalData.name,
            version: modalData.version,
            description: modalData.description
          })
        })

        if (response.ok) {
          const data = await response.json()
          alert(`Game "${modalData.name}" v${modalData.version} added successfully!`)
          setShowAddModal(false)
          setModalData({ name: '', version: '', description: '' })
          fetchGames() // Refresh the games list
        } else {
          const error = await response.json()
          alert(`Failed to add game: ${error.error}`)
        }
      } catch (error) {
        console.error('Failed to add game:', error)
        alert('Failed to add game. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronRight className="size-5 rotate-180" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">My Games</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition"
          >
            <Plus className="size-4" />
            Add Game
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/50 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-300 hover:border-violet-400 hover:text-violet-200 transition">
              <Filter className="size-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-slate-800 bg-[#0d1425] p-6 hover:border-violet-500/30 transition cursor-pointer"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-2xl">
                    {game.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{game.name}</h3>
                    <p className="text-sm text-slate-400">v{game.version}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white transition">
                  <MoreVertical className="size-4" />
                </button>
              </div>

              <div className="mb-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    game.status === 'Testing'
                      ? 'bg-violet-500/10 text-violet-400'
                      : game.status === 'In Development'
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {game.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="size-4 text-slate-400" />
                  <span className="text-slate-300">{game.humanTests} Human</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PlayCircle className="size-4 text-slate-400" />
                  <span className="text-slate-300">{game.aiTests} AI</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="size-4 text-slate-400" />
                  <span className="text-slate-300">{game.bugs} Bugs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span className="text-emerald-400">{game.qualityScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="size-3" />
                  <span>Last tested: {game.lastTested}</span>
                </div>
                <Link
                  href={`/dashboard/projects/new?game=${game.id}`}
                  className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition"
                >
                  Create Test
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Game Modal */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add New Game</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                  <Plus className="size-5 rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Game Name</label>
                  <input
                    type="text"
                    value={modalData.name}
                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                    placeholder="Enter game name"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Version</label>
                  <input
                    type="text"
                    value={modalData.version}
                    onChange={(e) => setModalData({ ...modalData, version: e.target.value })}
                    placeholder="e.g., 1.0.0"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={modalData.description}
                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                    placeholder="Describe your game"
                    rows={3}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                  />
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
                  onClick={handleAddGame}
                  disabled={!modalData.name.trim()}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Plus className="size-4" />
                  Add Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
