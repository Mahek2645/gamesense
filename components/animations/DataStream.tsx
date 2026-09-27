'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface DataStreamProps {
  source?: 'ai' | 'human' | 'game'
  target?: 'game' | 'analytics'
  orientation?: 'horizontal' | 'vertical'
  active?: boolean
  speed?: number
  particleCount?: number
  className?: string
}

export function DataStream({
  source = 'ai',
  target = 'game',
  orientation = 'horizontal',
  active = true,
  speed = 3,
  particleCount = 4,
  className = '',
}: DataStreamProps) {
  const shouldReduceMotion = useReducedMotion()

  const getColor = (node: 'ai' | 'human' | 'game' | 'analytics') => {
    switch (node) {
      case 'ai':
        return '#7757ff' // AI Purple
      case 'human':
        return '#10b981' // Human Green
      case 'game':
        return '#38bdf8' // Game Sky/Blue
      case 'analytics':
        return '#818cf8' // Indigo
      default:
        return '#7757ff'
    }
  }

  const startColor = getColor(source)
  const endColor = getColor(target)

  if (orientation === 'vertical') {
    return (
      <div className={`relative flex flex-col items-center justify-center w-6 h-32 overflow-hidden ${className}`}>
        {/* Line Track */}
        <div
          className="absolute inset-y-0 w-0.5"
          style={{
            background: `linear-gradient(to bottom, ${startColor}80, ${endColor}80)`,
          }}
        />

        {/* Traveling Packets */}
        {!shouldReduceMotion &&
          active &&
          Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: [0, 128],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                delay: (i * speed) / particleCount,
                ease: 'easeInOut',
              }}
              className="absolute size-2 rounded-full shadow-lg"
              style={{
                backgroundColor: i % 2 === 0 ? startColor : endColor,
                boxShadow: `0 0 8px ${i % 2 === 0 ? startColor : endColor}`,
              }}
            />
          ))}
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center h-8 w-full overflow-hidden ${className}`}>
      {/* Background Track with subtle dash */}
      <div
        className="absolute inset-x-0 h-0.5"
        style={{
          background: `linear-gradient(to right, ${startColor}60, ${endColor}60)`,
        }}
      />

      {/* Flowing Packets */}
      {!shouldReduceMotion &&
        active &&
        Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-10%', opacity: 0 }}
            animate={{
              x: ['0%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: (i * speed) / particleCount,
              ease: 'linear',
            }}
            className="absolute top-1/2 -translate-y-1/2 size-2 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? startColor : endColor,
              boxShadow: `0 0 10px 2px ${i % 2 === 0 ? startColor : endColor}`,
            }}
          />
        ))}
    </div>
  )
}
