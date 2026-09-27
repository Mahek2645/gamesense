'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface ChartRevealProps extends HTMLMotionProps<'div'> {
  isLoaded?: boolean
  delay?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export function ChartReveal({
  isLoaded = true,
  delay = 0.1,
  duration = 0.7,
  className = '',
  children,
  ...props
}: ChartRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
          scaleY: shouldReduceMotion ? 1 : 0.96,
          transformOrigin: 'bottom center',
        }}
        animate={
          isLoaded
            ? {
                opacity: 1,
                scaleY: 1,
              }
            : {
                opacity: 0,
                scaleY: 0.96,
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0.2 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        {...props}
      >
        {children}
      </motion.div>

      {/* Subtle telemetry data sweep line on reveal */}
      {!shouldReduceMotion && isLoaded && (
        <motion.div
          initial={{ left: '-10%', opacity: 0 }}
          animate={{ left: '110%', opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent"
        />
      )}
    </div>
  )
}
