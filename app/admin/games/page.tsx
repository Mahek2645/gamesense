'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Search, ChevronLeft, MoreVertical } from 'lucide-react'
import Link from 'next/link'

export default function AdminGamesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const games = [
    { id: 'g1', name: 'Neon Drift', version: '1.0.0', owner: 'John Doe', tests: 36, bugs: 7, status: 'Testing' },
    { id: 'g2', name: 'Starfall Tactics', version: '0.9.0', owner: 'Jane Smith', tests: 24, bugs: 12, status: 'Development' },
    { id: 'g3', name: 'Pocket Worlds', version: '2.1.0', owner: 'Alice Brown', tests: 72, bugs: 3, status: 'Released' },
  ]

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronLeft className="size-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">All Games</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition focus:border-violet-500"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Games</p>
            <p className="text-2xl font-semibold">{games.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Tests</p>
            <p className="text-2xl font-semibold">{games.reduce((acc, g) => acc + g.tests, 0)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Bugs</p>
            <p className="text-2xl font-semibold">{games.reduce((acc, g) => acc + g.bugs, 0)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111a2d] overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Tests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Bugs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredGames.map((game, i) => (
                <motion.tr
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-900/30 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-violet-500/20 text-xl">🎮</div>
                      <span className="font-medium">{game.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{game.version}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{game.owner}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{game.tests}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{game.bugs}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      game.status === 'Released' ? 'bg-emerald-500/10 text-emerald-400' :
                      game.status === 'Testing' ? 'bg-violet-500/10 text-violet-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>{game.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-white transition">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
