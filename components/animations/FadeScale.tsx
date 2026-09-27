'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface FadeScaleProps extends HTMLMotionProps<'div'> {
  initialScale?: number
  delay?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export function FadeScale({
  initialScale = 0.94,
  delay = 0,
  duration = 0.5,
  className = '',
  children,
  ...props
}: FadeScaleProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : initialScale,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : initialScale,
      }}
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
