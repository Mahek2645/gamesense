'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface FadeUpProps extends HTMLMotionProps<'div'> {
  distance?: number
  delay?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export function FadeUp({
  distance = 24,
  delay = 0,
  duration = 0.6,
  className = '',
  children,
  ...props
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -distance * 0.5 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
