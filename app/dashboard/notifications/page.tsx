'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, ArrowLeft, AlertCircle, Info, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { PageTransition } from '@/components/animations'

interface NotificationItem {
  id: string
  userId: string
  title: string
  message: string
  type: 'alert' | 'success' | 'info' | 'warning'
  read: boolean
  createdAt: string
  link?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, read: true } : n))
        )
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const handleMarkAllRead = async () => {
    for (const n of notifications.filter(item => !item.read)) {
      await handleMarkAsRead(n.id)
    }
  }

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="size-9 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Bell className="size-5 text-violet-400" />
                <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Gameplay alerts, exploit warnings, and recommendation briefings</p>
            </div>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition self-start sm:self-auto"
          >
            <Check className="size-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map(n => {
            const Icon = n.type === 'alert' ? AlertCircle : n.type === 'success' ? CheckCircle2 : Info
            return (
              <div
                key={n.id}
                className={`rounded-xl border p-5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !n.read
                    ? 'border-violet-500/40 bg-[#101830] shadow-lg shadow-violet-950/20'
                    : 'border-slate-800/80 bg-[#0d1425]/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                      n.type === 'alert'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                        : n.type === 'success'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : 'bg-violet-500/15 text-violet-400 border border-violet-500/20'
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{n.title}</h3>
                      {!n.read && (
                        <span className="size-2 rounded-full bg-violet-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">{n.message}</p>
                    <span className="text-[11px] font-mono text-slate-500 mt-2 block">
                      {new Date(n.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  {!n.read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition"
                    >
                      Mark read
                    </button>
                  )}

                  {n.link && (
                    <Link
                      href={n.link}
                      className="px-3.5 py-1.5 rounded-lg bg-violet-600/80 hover:bg-violet-500 text-xs font-semibold text-white transition inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
