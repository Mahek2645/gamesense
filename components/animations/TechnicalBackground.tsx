'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface TechnicalBackgroundProps {
  className?: string
  showGrid?: boolean
  showParticles?: boolean
  showConnections?: boolean
}

export function TechnicalBackground({
  className = '',
  showGrid = true,
  showParticles = true,
  showConnections = true,
}: TechnicalBackgroundProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-10 ${className}`}
    >
      {/* Deep technical space base gradient */}
      <div className="absolute inset-0 bg-[#080d18]" />

      {/* Subtle radial ambient glows (AI purple top-left, Human emerald bottom-right) */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      <div className="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

      {/* Subtle Moving Technical Orthogonal Grid */}
      {showGrid && (
        <div
          className={`absolute inset-[-20%] opacity-40 ${
            shouldReduceMotion ? '' : 'animate-technical-grid'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(119, 87, 255, 0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(69, 224, 189, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            transform: shouldReduceMotion ? 'none' : 'perspective(800px) rotateX(45deg) scale(1.3)',
            transformOrigin: '50% 25%',
            maskImage:
              'radial-gradient(ellipse 80% 65% at 50% 40%, black 15%, rgba(0,0,0,0.5) 45%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 65% at 50% 40%, black 15%, rgba(0,0,0,0.5) 45%, transparent 75%)',
          }}
        />
      )}

      {/* Glowing Nodes & Connection Lines (SVG) */}
      {showConnections && (
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ai-conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7757ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#45e0bd" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="human-conn-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          <line
            x1="18%"
            y1="28%"
            x2="52%"
            y2="42%"
            stroke="url(#ai-conn-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            x1="52%"
            y1="42%"
            x2="82%"
            y2="34%"
            stroke="url(#ai-conn-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            x1="24%"
            y1="68%"
            x2="52%"
            y2="42%"
            stroke="url(#human-conn-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            x1="52%"
            y1="42%"
            x2="78%"
            y2="72%"
            stroke="url(#human-conn-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Node 1: AI Cluster */}
          <circle cx="18%" cy="28%" r="4" fill="#7757ff" />
          <circle
            cx="18%"
            cy="28%"
            r="12"
            fill="none"
            stroke="#7757ff"
            strokeWidth="1"
            opacity="0.5"
            className={shouldReduceMotion ? '' : 'animate-ping'}
            style={{ animationDuration: '4s' }}
          />

          {/* Node 2: Central Game Telemetry Hub */}
          <circle cx="52%" cy="42%" r="5" fill="#38bdf8" />
          <circle
            cx="52%"
            cy="42%"
            r="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            opacity="0.4"
            className={shouldReduceMotion ? '' : 'animate-ping'}
            style={{ animationDuration: '5s' }}
          />

          {/* Node 3: Analytics Output Node */}
          <circle cx="82%" cy="34%" r="4" fill="#7757ff" />

          {/* Node 4: Human Cohort Node */}
          <circle cx="24%" cy="68%" r="4" fill="#10b981" />
          <circle
            cx="24%"
            cy="68%"
            r="12"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            opacity="0.5"
            className={shouldReduceMotion ? '' : 'animate-ping'}
            style={{ animationDuration: '4.5s' }}
          />

          {/* Node 5: Real-time Telemetry Monitor */}
          <circle cx="78%" cy="72%" r="4" fill="#10b981" />
        </svg>
      )}

      {/* Subtle Data Particles */}
      {showParticles && !shouldReduceMotion && (
        <div className="absolute inset-0 opacity-40">
          {[
            { top: '22%', left: '30%', delay: 0, tone: '#7757ff' },
            { top: '35%', left: '70%', delay: 2, tone: '#45e0bd' },
            { top: '65%', left: '20%', delay: 1.5, tone: '#10b981' },
            { top: '78%', left: '60%', delay: 3.2, tone: '#7757ff' },
            { top: '48%', left: '85%', delay: 0.8, tone: '#45e0bd' },
            { top: '15%', left: '55%', delay: 2.4, tone: '#38bdf8' },
          ].map((particle, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -16, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 6 + idx,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
              className="absolute size-1.5 rounded-full"
              style={{
                top: particle.top,
                left: particle.left,
                backgroundColor: particle.tone,
                boxShadow: `0 0 8px 1px ${particle.tone}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Soft Vignette Overlay to guarantee high content contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 20%, rgba(8, 13, 24, 0.5) 60%, rgba(8, 13, 24, 0.95) 100%)',
        }}
      />
    </div>
  )
}
