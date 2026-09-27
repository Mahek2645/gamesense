'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  delay?: number
  duration?: number
  ease?: any
  className?: string
  children: React.ReactNode
}


export function FadeIn({
  direction = 'none',
  distance = 20,
  delay = 0,
  duration = 0.5,
  ease = [0.16, 1, 0.3, 1],
  className = '',
  children,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 }
    switch (direction) {
      case 'up':
        return { x: 0, y: distance }
      case 'down':
        return { x: 0, y: -distance }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const offset = getOffset()

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
