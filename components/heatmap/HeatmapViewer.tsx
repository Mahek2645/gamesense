'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Skull,
  Navigation,
  RefreshCw,
  Layers,
  Info,
  Filter,
  Activity,
  AlertCircle,
} from 'lucide-react'
import { apiClient, ApiError } from '@/lib/api-client'
import { HeatmapPoint, HeatmapResponse } from '@/types/api'

interface HeatmapViewerProps {
  initialType?: 'DEATH' | 'MOVEMENT'
  levelId?: string
  className?: string
}

export function HeatmapViewer({
  initialType = 'DEATH',
  levelId,
  className = '',
}: HeatmapViewerProps) {
  const [type, setType] = useState<'DEATH' | 'MOVEMENT'>(initialType)
  const [points, setPoints] = useState<HeatmapPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<HeatmapPoint | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>(levelId || 'all')

  const fetchHeatmap = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await apiClient.getHeatmap(
        type,
        selectedLevel === 'all' ? undefined : selectedLevel
      )
      setPoints(res.points || [])
    } catch (err) {
      console.error('Failed to fetch heatmap data:', err)
      const msg = err instanceof ApiError ? err.message : 'Failed to load heatmap data'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHeatmap()
  }, [type, selectedLevel])

  // Get unique level IDs from points
  const availableLevels = Array.from(
    new Set(points.map((p) => p.levelId).filter(Boolean))
  )

  // Bounds calculation for responsive canvas scaling
  const minX = points.length ? Math.min(...points.map((p) => p.x)) : 0
  const maxX = points.length ? Math.max(...points.map((p) => p.x)) : 200
  const minY = points.length ? Math.min(...points.map((p) => p.y)) : 0
  const maxY = points.length ? Math.max(...points.map((p) => p.y)) : 120

  const width = Math.max(maxX - minX + 40, 240)
  const height = Math.max(maxY - minY + 40, 140)

  // Coordinate normalizer for SVG viewBox
  const scaleX = (x: number) => ((x - minX + 20) / width) * 100
  const scaleY = (y: number) => ((y - minY + 20) / height) * 100

  return (
    <div className={`rounded-2xl border border-slate-800 bg-[#0d1425] p-6 shadow-xl ${className}`}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            {type === 'DEATH' ? (
              <span className="grid size-8 place-items-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Skull className="size-4" />
              </span>
            ) : (
              <span className="grid size-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Navigation className="size-4" />
              </span>
            )}
            <div>
              <h3 className="text-base font-bold text-white">
                {type === 'DEATH' ? 'Spatial Death Cluster Heatmap' : 'Player Movement Trajectory'}
              </h3>
              <p className="text-xs text-slate-400">
                {type === 'DEATH'
                  ? 'High-density combat casualty hotspots and hazard zones'
                  : 'Pathing vectors and traversal telemetry over time'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Heatmap Type Switcher */}
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900/80 p-1 text-xs font-mono">
            <button
              onClick={() => setType('DEATH')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                type === 'DEATH'
                  ? 'bg-rose-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Skull className="size-3.5" />
              <span>Death</span>
            </button>
            <button
              onClick={() => setType('MOVEMENT')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                type === 'MOVEMENT'
                  ? 'bg-cyan-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="size-3.5" />
              <span>Movement</span>
            </button>
          </div>

          {/* Level Filter */}
          {availableLevels.length > 0 && (
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 font-mono outline-none"
            >
              <option value="all">All Sectors</option>
              {availableLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          )}

          {/* Refresh Button */}
          <button
            onClick={fetchHeatmap}
            disabled={isLoading}
            className="p-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-50"
            title="Refresh Heatmap"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Heatmap Canvas Area */}
      <div className="relative w-full h-80 rounded-xl border border-slate-800 bg-[#080d18] overflow-hidden">
        {/* Tactical Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #334155 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080d18]/80 backdrop-blur-xs z-20">
            <div className="size-7 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
            <p className="text-xs text-slate-400 font-mono mt-2">Computing telemetry coordinates...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <AlertCircle className="size-8 text-rose-400 mb-2" />
            <p className="text-sm font-medium text-slate-300">Heatmap Data Unavailable</p>
            <p className="text-xs text-slate-500 font-mono mt-1 max-w-sm">{error}</p>
            <button
              onClick={fetchHeatmap}
              className="mt-4 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition"
            >
              Retry Ingestion
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && points.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <Layers className="size-8 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-400">No telemetry coordinates recorded</p>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Run active game sessions or playtests to generate {type.toLowerCase()} points.
            </p>
          </div>
        )}

        {/* Render Canvas / SVG */}
        {!isLoading && !error && points.length > 0 && (
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Movement Trajectory Polyline */}
            {type === 'MOVEMENT' && points.length > 1 && (
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.8"
                strokeDasharray="2 1"
                strokeOpacity="0.6"
                points={points.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')}
              />
            )}

            {/* Heatmap Nodes */}
            {points.map((point, index) => {
              const cx = scaleX(point.x)
              const cy = scaleY(point.y)
              const baseRadius = type === 'DEATH' ? Math.max(1.5, point.weight * 0.25) : 1.2
              const isHovered = hoveredPoint === point

              return (
                <g
                  key={index}
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={baseRadius * (isHovered ? 2.5 : 1.8)}
                    fill={type === 'DEATH' ? '#f43f5e' : '#06b6d4'}
                    fillOpacity={point.intensity * (isHovered ? 0.45 : 0.25)}
                  />

                  {/* Core node */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={baseRadius * (isHovered ? 1.4 : 1)}
                    fill={type === 'DEATH' ? '#f43f5e' : '#22d3ee'}
                    fillOpacity={Math.max(0.6, point.intensity)}
                    stroke="#ffffff"
                    strokeWidth={isHovered ? 0.6 : 0.2}
                    strokeOpacity={0.8}
                  />
                </g>
              )
            })}
          </svg>
        )}

        {/* Hovered Point Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs font-mono shadow-xl backdrop-blur-sm"
            style={{
              left: `${Math.min(scaleX(hoveredPoint.x), 75)}%`,
              top: `${Math.max(scaleY(hoveredPoint.y) - 15, 8)}%`,
            }}
          >
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span
                className={`size-2 rounded-full ${
                  type === 'DEATH' ? 'bg-rose-400' : 'bg-cyan-400'
                }`}
              />
              <span>{hoveredPoint.levelId}</span>
            </div>
            <div className="text-slate-300 mt-1 space-y-0.5 text-[11px]">
              <div>
                Coord: ({hoveredPoint.x.toFixed(1)}, {hoveredPoint.y.toFixed(1)})
              </div>
              <div>Intensity: {(hoveredPoint.intensity * 100).toFixed(0)}%</div>
              <div>Weight: {hoveredPoint.weight} hits</div>
              {hoveredPoint.timestamp && (
                <div className="text-slate-500 text-[10px]">
                  {new Date(hoveredPoint.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className={`size-2.5 rounded-full ${
                type === 'DEATH' ? 'bg-rose-500' : 'bg-cyan-500'
              }`}
            />
            <span>{points.length} coordinates tracked</span>
          </span>
          {points.length > 0 && (
            <span>
              Peak Weight:{' '}
              <strong className="text-white">
                {Math.max(...points.map((p) => p.weight))}
              </strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span>Low Density</span>
          <div
            className="h-2 w-20 rounded-full"
            style={{
              background:
                type === 'DEATH'
                  ? 'linear-gradient(to right, rgba(244,63,94,0.2), #f43f5e)'
                  : 'linear-gradient(to right, rgba(6,182,212,0.2), #06b6d4)',
            }}
          />
          <span>Critical Hotspot</span>
        </div>
      </div>
    </div>
  )
}
