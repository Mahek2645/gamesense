'use client'

import React from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number
  delayChildren?: number
  className?: string
  children: React.ReactNode
}

export function StaggerContainer({
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className = '',
  children,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export function StaggerItem({
  direction = 'up',
  distance = 20,
  duration = 0.5,
  className = '',
  children,
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitialOffset = () => {
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

  const offset = getInitialOffset()

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}
