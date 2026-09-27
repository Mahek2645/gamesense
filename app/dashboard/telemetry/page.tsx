'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Radio, Filter, Send, Play, CheckCircle2, AlertTriangle, ArrowLeft, RefreshCw, Cpu, User, Zap, Terminal } from 'lucide-react'
import Link from 'next/link'
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations'

import { apiClient } from '@/lib/api-client'
import { TelemetryEvent } from '@/types/api'

export default function TelemetryPage() {
  const [events, setEvents] = useState<TelemetryEvent[]>([])
  const [actorFilter, setActorFilter] = useState<'all' | 'ai' | 'human'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStatus, setSimulationStatus] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchEvents = async () => {
    try {
      const res = await apiClient.getTelemetryEvents({ limit: 50 })
      setEvents(res.events || [])
    } catch (err) {
      console.error('Failed to fetch telemetry events:', err)
    }
  }

  useEffect(() => {
    fetchEvents()
    if (!autoRefresh) return
    const interval = setInterval(fetchEvents, 3000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleSimulateEvent = async (actorType: 'ai' | 'human') => {
    setIsSimulating(true)
    setSimulationStatus(null)

    const randomSpeed = Math.round(160 + Math.random() * 90)
    const randomDrift = Math.round(10 + Math.random() * 60)
    const eventTypes = ['checkpoint_reached', 'player_death', 'damage_dealt', 'combat_ended', 'level_completed']
    const chosenType = eventTypes[Math.floor(Math.random() * eventTypes.length)]

    try {
      const res = await apiClient.createTelemetryEvent({
        gameId: 'game-01',
        testRunId: 'session-001',
        eventType: chosenType,
        actorType,
        actorId: actorType === 'ai' ? `agent-neon-0${Math.floor(Math.random() * 8) + 1}` : `tester-live-${Math.floor(Math.random() * 20) + 1}`,
        levelId: `sector-0${Math.floor(Math.random() * 4) + 1}`,
        data: {
          speedKmh: randomSpeed,
          driftAngle: randomDrift,
          boostGauge: Math.round(Math.random() * 100),
          fps: Math.round(58 + Math.random() * 62),
          timestampMs: Date.now()
        }
      })

      if (res && res.success) {
        setSimulationStatus(`Event [${chosenType}] transmitted by ${actorType.toUpperCase()}!`)
        fetchEvents()
      }
    } catch (err) {
      setSimulationStatus('Simulation dispatch error')
    } finally {
      setIsSimulating(false)
      setTimeout(() => setSimulationStatus(null), 3500)
    }
  }

  const filteredEvents = events.filter(e => {
    if (actorFilter !== 'all' && e.actorType !== actorFilter) return false
    if (typeFilter !== 'all' && e.eventType !== typeFilter) return false
    return true
  })

  return (
    <PageTransition className="min-h-screen bg-[#080d18] text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-6">
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
                <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
                <h1 className="text-2xl font-bold tracking-tight">Real-Time Telemetry Stream</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">High-throughput microsecond event pipeline for Neon Drift</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                autoRefresh
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              <Radio className="size-3.5" />
              <span>{autoRefresh ? 'LIVE STREAM: ON' : 'STREAM: PAUSED'}</span>
            </button>

            <button
              disabled={isSimulating}
              onClick={() => handleSimulateEvent('ai')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-md shadow-violet-600/20 transition disabled:opacity-50"
            >
              <Zap className="size-3.5" />
              <span>Simulate AI Event</span>
            </button>

            <button
              disabled={isSimulating}
              onClick={() => handleSimulateEvent('human')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
            >
              <User className="size-3.5" />
              <span>Simulate Human Event</span>
            </button>
          </div>
        </div>

        {simulationStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{simulationStatus}</span>
          </motion.div>
        )}

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-4">
            <span className="text-xs text-slate-400 font-mono">EVENTS BUFFERED</span>
            <p className="text-2xl font-bold text-white mt-1">{events.length}</p>
            <span className="text-[11px] text-cyan-400 font-mono mt-1 block">In-Memory Circular Cache</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-4">
            <span className="text-xs text-slate-400 font-mono">INGESTION RATE</span>
            <p className="text-2xl font-bold text-violet-400 mt-1">4,820 eps</p>
            <span className="text-[11px] text-slate-500 font-mono mt-1 block">0.4ms Latency</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-4">
            <span className="text-xs text-slate-400 font-mono">AI AGENT SIGNALS</span>
            <p className="text-2xl font-bold text-violet-300 mt-1">
              {events.filter(e => e.actorType === 'ai').length}
            </p>
            <span className="text-[11px] text-violet-400 font-mono mt-1 block">Autonomous swarms</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-4">
            <span className="text-xs text-slate-400 font-mono">HUMAN TESTER SIGNALS</span>
            <p className="text-2xl font-bold text-emerald-300 mt-1">
              {events.filter(e => e.actorType === 'human').length}
            </p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Active cohort alpha</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="rounded-xl border border-slate-800 bg-[#0d1425] p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono mr-2 flex items-center gap-1">
              <Filter className="size-3.5" /> Actor:
            </span>
            {(['all', 'ai', 'human'] as const).map(actor => (
              <button
                key={actor}
                onClick={() => setActorFilter(actor)}
                className={`px-3 py-1.5 rounded-lg uppercase font-mono font-medium transition ${
                  actorFilter === actor
                    ? actor === 'ai'
                      ? 'bg-violet-600 text-white'
                      : actor === 'human'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {actor}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Filter Event:</span>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 py-1.5 px-3 text-xs text-white outline-none focus:border-violet-500"
            >
              <option value="all">All Event Types</option>
              <option value="player_death">player_death</option>
              <option value="checkpoint_reached">checkpoint_reached</option>
              <option value="damage_dealt">damage_dealt</option>
              <option value="combat_ended">combat_ended</option>
              <option value="level_completed">level_completed</option>
            </select>
          </div>
        </div>

        {/* Telemetry Stream Feed Table */}
        <div className="rounded-2xl border border-slate-800 bg-[#0d1425] overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="size-4 text-cyan-400" />
              <span>LIVE PACKET INSPECTOR ({filteredEvents.length} MATCHING EVENTS)</span>
            </div>
            <button
              onClick={fetchEvents}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 font-mono transition"
            >
              <RefreshCw className="size-3" /> Refresh
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[600px] overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-sm">
                No telemetry packets matching current filter parameters.
              </div>
            ) : (
              filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="px-6 py-3.5 hover:bg-slate-900/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        event.actorType === 'ai'
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {event.actorType}
                    </span>

                    <span className="font-semibold text-white">{event.eventType}</span>
                    <span className="text-slate-500">[{event.actorId}]</span>
                    <span className="text-slate-400">{event.levelId}</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="text-cyan-300 truncate max-w-xs">
                      {JSON.stringify(event.data)}
                    </span>
                    <span className="text-slate-500 shrink-0">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
