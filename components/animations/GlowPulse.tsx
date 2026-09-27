'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface GlowPulseProps {
  tone?: 'ai' | 'human' | 'warning' | 'error' | 'neutral'
  intensity?: 'subtle' | 'medium' | 'strong'
  duration?: number
  className?: string
  children?: React.ReactNode
}

export function GlowPulse({
  tone = 'ai',
  intensity = 'medium',
  duration = 3,
  className = '',
  children,
}: GlowPulseProps) {
  const shouldReduceMotion = useReducedMotion()

  const getColor = () => {
    switch (tone) {
      case 'ai':
        return {
          bg: 'bg-violet-500',
          shadow: 'rgba(119, 87, 255, 0.4)',
          border: 'border-violet-500/40',
        }
      case 'human':
        return {
          bg: 'bg-emerald-500',
          shadow: 'rgba(16, 185, 129, 0.4)',
          border: 'border-emerald-500/40',
        }
      case 'warning':
        return {
          bg: 'bg-amber-500',
          shadow: 'rgba(245, 158, 11, 0.4)',
          border: 'border-amber-500/40',
        }
      case 'error':
        return {
          bg: 'bg-rose-500',
          shadow: 'rgba(244, 63, 94, 0.4)',
          border: 'border-rose-500/40',
        }
      default:
        return {
          bg: 'bg-slate-500',
          shadow: 'rgba(148, 163, 184, 0.3)',
          border: 'border-slate-500/40',
        }
    }
  }

  const { shadow, border } = getColor()

  const getBlur = () => {
    switch (intensity) {
      case 'subtle':
        return '12px'
      case 'strong':
        return '32px'
      default:
        return '20px'
    }
  }

  const blur = getBlur()

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Ambient Breathing Glow Aura */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            opacity: [0.35, 0.8, 0.35],
            scale: [0.97, 1.04, 0.97],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-inherit"
          style={{
            boxShadow: `0 0 ${blur} 4px ${shadow}`,
            filter: 'blur(4px)',
          }}
        />
      )}

      {children}
    </div>
  )
}
