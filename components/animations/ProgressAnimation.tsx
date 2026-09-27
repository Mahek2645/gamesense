'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface ProgressAnimationProps {
  value: number // 0 to 100
  status?: 'running' | 'paused' | 'completed' | 'failed' | 'idle'
  tone?: 'ai' | 'human' | 'auto'
  height?: number | string
  showGlowTrail?: boolean
  className?: string
}

export function ProgressAnimation({
  value,
  status = 'running',
  tone = 'auto',
  height = 8,
  showGlowTrail = true,
  className = '',
}: ProgressAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  const clampedValue = Math.min(100, Math.max(0, value))

  // Determine theme based on tone & status
  let barGradient = 'from-violet-600 via-indigo-500 to-purple-400'
  let glowColor = 'rgba(124, 92, 255, 0.45)'

  if (tone === 'human') {
    barGradient = 'from-emerald-600 via-teal-500 to-emerald-400'
    glowColor = 'rgba(69, 224, 189, 0.45)'
  } else if (tone === 'ai') {
    barGradient = 'from-violet-600 via-indigo-500 to-cyan-400'
    glowColor = 'rgba(124, 92, 255, 0.45)'
  } else if (tone === 'auto') {
    switch (status) {
      case 'completed':
        barGradient = 'from-emerald-600 via-teal-500 to-emerald-400'
        glowColor = 'rgba(69, 224, 189, 0.45)'
        break
      case 'paused':
        barGradient = 'from-amber-600 via-amber-500 to-yellow-400'
        glowColor = 'rgba(245, 158, 11, 0.45)'
        break
      case 'failed':
        barGradient = 'from-rose-600 via-rose-500 to-red-400'
        glowColor = 'rgba(239, 68, 68, 0.45)'
        break
      case 'running':
      default:
        barGradient = 'from-violet-600 via-indigo-500 to-purple-400'
        glowColor = 'rgba(124, 92, 255, 0.45)'
        break
    }
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-800/80 border border-slate-700/50 ${className}`}
      style={{ height }}
    >
      {/* Active Fill Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`relative h-full rounded-full bg-gradient-to-r ${barGradient}`}
        style={{
          boxShadow: showGlowTrail && status === 'running' ? `0 0 16px 2px ${glowColor}` : 'none',
        }}
      >
        {/* Leading edge light pulse when genuinely running */}
        {!shouldReduceMotion && status === 'running' && clampedValue > 0 && clampedValue < 100 && (
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.25, 0.85] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_12px_#fff]"
          />
        )}

        {/* Shimmer sweep along bar when active */}
        {!shouldReduceMotion && status === 'running' && (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-1/2 pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  )
}
