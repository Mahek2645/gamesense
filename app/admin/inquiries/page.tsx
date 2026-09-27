'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Search,
  ChevronLeft,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building,
  Gamepad2,
  Cpu,
  Trash2,
  ExternalLink,
  RefreshCw,
  Eye,
  Send,
  Sparkles,
  Archive,
  Inbox,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Inquiry {
  id: string
  name: string
  email: string
  studio?: string
  engine?: string
  projectStage?: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  notes?: string
}

export default function AdminInquiriesPage() {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all')
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminNote, setAdminNote] = useState('')

  // Verify Admin Cookie
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1]

    if (!token) {
      router.push('/admin/login')
      return
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (decoded.role !== 'admin') {
        router.push('/')
        return
      }
    } catch {
      router.push('/admin/login')
      return
    }

    fetchInquiries()
    const interval = setInterval(fetchInquiries, 4000)
    return () => clearInterval(interval)
  }, [router])

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries')
      if (res.ok) {
        const data = await res.json()
        setInquiries(data.inquiries || [])
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: Inquiry['status'], notes?: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes }),
      })
      if (res.ok) {
        const data = await res.json()
        setInquiries(prev => prev.map(item => item.id === id ? data.inquiry : item))
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry(data.inquiry)
        }
      }
    } catch (err) {
      console.error('Failed to update inquiry:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry message?')) return
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id))
        if (activeInquiry?.id === id) {
          setActiveInquiry(null)
        }
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err)
    }
  }

  const openInquiryModal = (inq: Inquiry) => {
    setActiveInquiry(inq)
    setAdminNote(inq.notes || '')
    // Auto mark as read if it was new
    if (inq.status === 'new') {
      handleUpdateStatus(inq.id, 'read')
    }
  }

  // Filter & Search
  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = selectedFilter === 'all' ? true : inq.status === selectedFilter
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      (inq.studio && inq.studio.toLowerCase().includes(query)) ||
      (inq.engine && inq.engine.toLowerCase().includes(query)) ||
      inq.message.toLowerCase().includes(query)
    return matchesFilter && matchesSearch
  })

  const newCount = inquiries.filter(i => i.status === 'new').length
  const readCount = inquiries.filter(i => i.status === 'read').length
  const repliedCount = inquiries.filter(i => i.status === 'replied').length
  const archivedCount = inquiries.filter(i => i.status === 'archived').length

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoStr
    }
  }

  return (
    <div className="min-h-screen bg-[#080d18] text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0d1425]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
            >
              <ChevronLeft className="size-4" />
              <span>Admin Overview</span>
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-violet-500/15 text-violet-400 border border-violet-500/30">
                <Mail className="size-4" />
              </span>
              <h1 className="text-lg font-bold tracking-tight">Studio Contact Inquiries</h1>
              {newCount > 0 && (
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-xs font-mono font-semibold text-emerald-400 animate-pulse">
                  {newCount} New
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search studio, email, engine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 rounded-lg border border-slate-700 bg-slate-900/80 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 transition"
              />
            </div>

            <button
              onClick={fetchInquiries}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
              title="Refresh Inquiries"
            >
              <RefreshCw className="size-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-[#0e162a]/90 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Total Inquiries</span>
              <Inbox className="size-4 text-slate-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">{inquiries.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Submitted from GameSense /contact</p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Unread / New</span>
              <AlertCircle className="size-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{newCount}</div>
            <p className="text-[11px] text-emerald-400/70 mt-1">Awaiting solutions architect response</p>
          </div>

          <div className="rounded-xl border border-violet-500/30 bg-violet-950/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-violet-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Replied</span>
              <CheckCircle2 className="size-4 text-violet-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-violet-300">{repliedCount}</div>
            <p className="text-[11px] text-violet-400/70 mt-1">Architecture sessions scheduled</p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-5 shadow-sm">
            <div className="flex items-center justify-between text-cyan-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Top Game Engines</span>
              <Gamepad2 className="size-4 text-cyan-400" />
            </div>
            <div className="text-sm font-semibold font-mono text-cyan-300">UE5, Unity, Godot</div>
            <p className="text-[11px] text-cyan-400/70 mt-1">Telemetry SDK integrations</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          {[
            { key: 'all', label: 'All Inquiries', count: inquiries.length },
            { key: 'new', label: 'New / Unread', count: newCount, highlight: true },
            { key: 'read', label: 'Reviewing', count: readCount },
            { key: 'replied', label: 'Replied', count: repliedCount },
            { key: 'archived', label: 'Archived', count: archivedCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedFilter === tab.key
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                  selectedFilter === tab.key
                    ? 'bg-white/20 text-white'
                    : tab.highlight && tab.count > 0
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Inquiries List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <RefreshCw className="size-8 animate-spin text-violet-500 mb-3" />
            <p className="text-sm">Retrieving studio inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0d1425]/60 p-12 text-center">
            <MessageSquare className="size-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No inquiries found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'No messages match your search query. Try clearing the filter.'
                : 'No studio inquiries in this category.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredInquiries.map((inq) => (
              <motion.div
                key={inq.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group relative rounded-xl border p-5 transition hover:shadow-lg ${
                  inq.status === 'new'
                    ? 'border-emerald-500/40 bg-[#0e192c]/90 shadow-emerald-950/20'
                    : inq.status === 'replied'
                    ? 'border-violet-500/30 bg-[#0f1424]/80'
                    : inq.status === 'archived'
                    ? 'border-slate-800/60 bg-slate-900/30 opacity-70'
                    : 'border-slate-800 bg-[#0d1425]/90 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Details */}
                  <div className="space-y-2 flex-1 cursor-pointer" onClick={() => openInquiryModal(inq)}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-bold text-white group-hover:text-violet-300 transition">
                        {inq.name}
                      </span>
                      {inq.studio && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-xs text-violet-300 font-medium">
                          <Building className="size-3 text-violet-400" />
                          <span>{inq.studio}</span>
                        </span>
                      )}
                      {inq.engine && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300 font-mono">
                          <Gamepad2 className="size-3 text-cyan-400" />
                          <span>{inq.engine}</span>
                        </span>
                      )}
                      {inq.projectStage && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                          <Clock className="size-3 text-amber-400" />
                          <span>{inq.projectStage}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="text-cyan-400 hover:underline">{inq.email}</span>
                      <span>&bull;</span>
                      <span>Received: {formatDate(inq.createdAt)}</span>
                    </div>

                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mt-1">
                      {inq.message}
                    </p>

                    {inq.notes && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                        <span className="font-semibold text-violet-400">Admin Note:</span>
                        <span>{inq.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Actions & Status Badges */}
                  <div className="flex items-center md:flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                    <div>
                      {inq.status === 'new' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                          NEW INQUIRY
                        </span>
                      )}
                      {inq.status === 'read' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-medium text-blue-400">
                          REVIEWED
                        </span>
                      )}
                      {inq.status === 'replied' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-medium text-violet-400">
                          <CheckCircle2 className="size-3 text-violet-400" />
                          REPLIED
                        </span>
                      )}
                      {inq.status === 'archived' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-xs font-medium text-slate-400">
                          ARCHIVED
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openInquiryModal(inq)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition"
                      >
                        <Eye className="size-3.5" />
                        <span>View</span>
                      </button>

                      <a
                        href={`mailto:${inq.email}?subject=GameSense%20Solutions%20Architecture%20Session&body=Hi%20${encodeURIComponent(
                          inq.name
                        )},%0A%0AThank%20you%20for%20reaching%20out%20to%20GameSense%20regarding%20${encodeURIComponent(
                          inq.studio || 'your project'
                        )}.%0A%0A`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleUpdateStatus(inq.id, 'replied')}
                        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110 transition"
                      >
                        <Send className="size-3.5" />
                        <span>Reply</span>
                      </a>

                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {activeInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0d1425] p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Top Modal Bar */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">{activeInquiry.name}</h2>
                    {activeInquiry.studio && (
                      <span className="rounded bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 text-xs text-violet-300 font-semibold">
                        {activeInquiry.studio}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="text-cyan-400">{activeInquiry.email}</span>
                    <span>&bull;</span>
                    <span>{formatDate(activeInquiry.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveInquiry(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                >
                  &times;
                </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5 font-mono uppercase">Game Engine</span>
                  <span className="font-semibold text-slate-200">{activeInquiry.engine || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-mono uppercase">Development Stage</span>
                  <span className="font-semibold text-slate-200">{activeInquiry.projectStage || 'Alpha / Beta'}</span>
                </div>
              </div>

              {/* Inquiry Message Body */}
              <div className="mb-6">
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Inquiry Message:
                </label>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {activeInquiry.message}
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="mb-6">
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                  Internal Architect Notes / Session Plan:
                </label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add notes, meeting time, or engineer assignment..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2 px-3 text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Status:</span>
                  {(['new', 'read', 'replied', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      disabled={isUpdating}
                      onClick={() => handleUpdateStatus(activeInquiry.id, st, adminNote)}
                      className={`px-2.5 py-1 rounded text-xs font-medium uppercase transition ${
                        activeInquiry.status === st
                          ? 'bg-violet-600 text-white shadow'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${activeInquiry.email}?subject=GameSense%20Solutions%20Architecture%20Session&body=Hi%20${encodeURIComponent(
                      activeInquiry.name
                    )},%0A%0A`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleUpdateStatus(activeInquiry.id, 'replied', adminNote)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white shadow-lg hover:brightness-110 transition"
                  >
                    <Send className="size-3.5" />
                    <span>Send Email Reply</span>
                  </a>

                  <button
                    onClick={() => setActiveInquiry(null)}
                    className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
