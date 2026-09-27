'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface FloatingCardProps {
  floatIntensity?: number // 0 to 10
  tiltIntensity?: number
  tone?: 'ai' | 'human' | 'neutral'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function FloatingCard({
  floatIntensity = 4,
  tiltIntensity = 10,
  tone = 'neutral',
  className = '',
  children,
  onClick,
}: FloatingCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = (e.clientX - rect.left) / width - 0.5
    const y = (e.clientY - rect.top) / height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Border & glow accent classes based on tone
  const getGlowStyles = () => {
    if (tone === 'ai') {
      return isHovered
        ? 'border-violet-500/50 shadow-[0_8px_30px_rgba(119,87,255,0.18)]'
        : 'border-slate-800 hover:border-violet-500/30'
    }
    if (tone === 'human') {
      return isHovered
        ? 'border-emerald-500/50 shadow-[0_8px_30px_rgba(69,224,189,0.18)]'
        : 'border-slate-800 hover:border-emerald-500/30'
    }
    return isHovered
      ? 'border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
      : 'border-slate-800'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
      }
      animate={
        shouldReduceMotion || floatIntensity <= 0 || isHovered
          ? { y: 0 }
          : {
              y: [0, -floatIntensity, 0],
            }
      }
      transition={{
        y: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      className={`relative rounded-2xl border bg-[#0d1425]/90 backdrop-blur-md transition-colors duration-300 ${getGlowStyles()} ${className}`}
    >
      {children}
    </motion.div>
  )
}
