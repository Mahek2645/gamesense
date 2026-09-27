'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface PageTransitionProps extends HTMLMotionProps<'div'> {
  className?: string
  children: React.ReactNode
}

export function PageTransition({
  className = '',
  children,
  ...props
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
