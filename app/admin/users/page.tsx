'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, MoreVertical, ChevronLeft, Shield, Ban, Check } from 'lucide-react'
import Link from 'next/link'

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const users = [
    { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'User', games: 3, tests: 24, status: 'Active', joined: '2024-01-15' },
    { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', games: 5, tests: 42, status: 'Active', joined: '2024-01-10' },
    { id: 'u3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Admin', games: 0, tests: 0, status: 'Active', joined: '2024-01-01' },
    { id: 'u4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', games: 2, tests: 18, status: 'Inactive', joined: '2024-02-01' },
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1425]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ChevronLeft className="size-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold">User Management</h1>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 rounded-lg border border-slate-700 bg-slate-900/50 py-2 pl-9 pr-3 text-sm text-white outline-none transition focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Users</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Active Users</p>
            <p className="text-2xl font-semibold text-emerald-400">{users.filter(u => u.status === 'Active').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Admins</p>
            <p className="text-2xl font-semibold text-purple-400">{users.filter(u => u.role === 'Admin').length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111a2d] p-5">
            <p className="text-sm text-slate-400 mb-2">Total Games</p>
            <p className="text-2xl font-semibold">{users.reduce((acc, u) => acc + u.games, 0)}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-slate-800 bg-[#111a2d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Games</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-900/30 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{user.games}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{user.tests}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{user.joined}</td>
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
    </div>
  )
}
