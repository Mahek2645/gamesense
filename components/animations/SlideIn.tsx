'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface SlideInProps extends HTMLMotionProps<'div'> {
  from?: 'left' | 'right' | 'top' | 'bottom'
  distance?: number | string
  delay?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export function SlideIn({
  from = 'left',
  distance = 40,
  delay = 0,
  duration = 0.5,
  className = '',
  children,
  ...props
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0, x: 0, y: 0 }
    switch (from) {
      case 'left':
        return { opacity: 0, x: -distance, y: 0 }
      case 'right':
        return { opacity: 0, x: distance, y: 0 }
      case 'top':
        return { opacity: 0, x: 0, y: -distance }
      case 'bottom':
        return { opacity: 0, x: 0, y: distance }
    }
  }

  return (
    <motion.div
      initial={getInitial()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={getInitial()}
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
