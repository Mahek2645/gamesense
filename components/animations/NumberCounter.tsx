'use client'

import React, { useEffect, useState, useRef } from 'react'
import { animate } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export interface NumberCounterProps {
  value: number
  startValue?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  formatter?: (val: number) => string
  delay?: number
  className?: string
}

export function NumberCounter({
  value,
  startValue = 0,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatter,
  delay = 0,
  className = '',
}: NumberCounterProps) {
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState<number>(shouldReduceMotion ? value : startValue)
  const previousValueRef = useRef<number>(startValue)

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value)
      previousValueRef.current = value
      return
    }

    const timeout = setTimeout(() => {
      const controls = animate(previousValueRef.current, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(latest)
        },
        onComplete: () => {
          previousValueRef.current = value
          setDisplayValue(value)
        },
      })

      return () => controls.stop()
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [value, duration, delay, shouldReduceMotion])

  const formatted = formatter
    ? formatter(displayValue)
    : decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString()

  return (
    <span className={`tabular-nums font-mono-numeric ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
