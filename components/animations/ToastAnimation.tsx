'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'
import { CheckCircle2, AlertCircle, Info, X, Zap } from 'lucide-react'

export interface ToastProps {
  id?: string
  title: string
  description?: string
  type?: 'ai' | 'human' | 'info' | 'warning' | 'error'
  duration?: number // ms
  onDismiss: () => void
  className?: string
}

export function ToastAnimation({
  title,
  description,
  type = 'info',
  duration = 4000,
  onDismiss,
  className = '',
}: ToastProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  const getIconAndColors = () => {
    switch (type) {
      case 'ai':
        return {
          icon: <Zap className="size-4 text-violet-400" />,
          border: 'border-violet-500/40',
          bg: 'bg-violet-950/40',
          bar: 'bg-violet-500',
        }
      case 'human':
        return {
          icon: <CheckCircle2 className="size-4 text-emerald-400" />,
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-950/40',
          bar: 'bg-emerald-500',
        }
      case 'error':
        return {
          icon: <AlertCircle className="size-4 text-rose-400" />,
          border: 'border-rose-500/40',
          bg: 'bg-rose-950/40',
          bar: 'bg-rose-500',
        }
      case 'warning':
        return {
          icon: <AlertCircle className="size-4 text-amber-400" />,
          border: 'border-amber-500/40',
          bg: 'bg-amber-950/40',
          bar: 'bg-amber-500',
        }
      default:
        return {
          icon: <Info className="size-4 text-sky-400" />,
          border: 'border-sky-500/40',
          bg: 'bg-sky-950/40',
          bar: 'bg-sky-500',
        }
    }
  }

  const { icon, border, bg, bar } = getIconAndColors()

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 20,
        scale: shouldReduceMotion ? 1 : 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 15,
        scale: shouldReduceMotion ? 1 : 0.95,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden rounded-xl border ${border} ${bg} backdrop-blur-md p-4 shadow-xl text-slate-100 min-w-[300px] max-w-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && <p className="mt-0.5 text-xs text-slate-300 line-clamp-2">{description}</p>}
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white transition"
          aria-label="Close notification"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Dismiss Progress Bar */}
      {!shouldReduceMotion && duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-0.5 ${bar}`}
        />
      )}
    </motion.div>
  )
}
