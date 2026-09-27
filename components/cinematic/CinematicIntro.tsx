'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CinematicIntroProps {
  onContinue: () => void
}

export default function CinematicIntro({ onContinue }: CinematicIntroProps) {
  // Animation flow:
  // 0.0s: Dark 100vh screen (#0B1020) with animated cyber grid & floating mana particles
  // 0.25s: GAME lands from left (-100vw) with cyan speed trail, SENSE lands from right (+100vw) with violet speed trail
  // 1.05s: Both meet at center to form GameSense + double shockwave collision burst + radial glow aura
  // 1.4s+: Wait for user scroll!
  // User scrolls -> Whole intro glides upward (-100vh) unveiling the minimalistic homepage
  const [hasJoined, setHasJoined] = useState(false)
  const [showScrollPrompt, setShowScrollPrompt] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const touchStartY = useRef<number | null>(null)
  const dismissedRef = useRef(false)

  // Memoized floating cyber particles
  const particles = useRef(
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: ((i * 13.7) % 94) + 3,
      y: ((i * 23.3) % 88) + 6,
      size: (i % 3) + 2.5,
      delay: (i * 0.18) % 3.5,
      duration: 3.8 + (i % 4) * 0.9,
      color: i % 2 === 0 ? '#7757ff' : '#45e0bd',
    }))
  ).current

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    document.body.style.overflow = ''
    setIsDismissing(true)
    setTimeout(() => {
      onContinue()
    }, 750)
  }, [onContinue])

  useEffect(() => {
    // Lock body scroll while cinematic intro is active
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setPrefersReducedMotion(true)
        setHasJoined(true)
        setShowScrollPrompt(true)
      }
    }

    // Join at 1.05s
    const joinTimer = setTimeout(() => {
      setHasJoined(true)
    }, 1050)

    // Show scroll indicator at 1.4s
    const promptTimer = setTimeout(() => {
      setShowScrollPrompt(true)
    }, 1400)

    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(joinTimer)
      clearTimeout(promptTimer)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  // Listen for user scroll (wheel, touch, keyboard)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5) {
        handleDismiss()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        const delta = touchStartY.current - (e.touches[0]?.clientY ?? touchStartY.current)
        if (delta > 15) {
          handleDismiss()
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        handleDismiss()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleDismiss])

  // Custom smooth easing curve for cinematic motion
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <div
      onClick={handleDismiss}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0B1020] text-white select-none cursor-pointer"
      style={{
        transform: isDismissing ? 'translateY(-100vh)' : 'translateY(0)',
        opacity: isDismissing ? 0 : 1,
        transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isDismissing ? 'none' : 'auto',
      }}
      aria-label="GameSense cinematic opening. Scroll down to enter homepage."
    >
      {/* ============================================================ */}
      {/* 1. DYNAMIC BACKGROUND ANIMATIONS LAYER                       */}
      {/* ============================================================ */}

      {/* Ambient Pulsing Aurora Core Glow */}
      <motion.div
        animate={{
          opacity: hasJoined ? [0.45, 0.7, 0.45] : [0.2, 0.35, 0.2],
          scale: hasJoined ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(119,87,255,0.28)_0%,rgba(69,224,189,0.12)_40%,transparent_75%)] blur-3xl"
      />

      {/* Animated 3D Cybernetic Perspective Grid on Lower Horizon */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52vh] overflow-hidden opacity-40 transition-transform duration-700 ease-out"
        style={{
          transform: `perspective(550px) rotateX(62deg) translate3d(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px, 0)`,
          transformOrigin: '50% 100%',
        }}
      >
        <div
          className="absolute inset-0 animate-technical-grid"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(119, 87, 255, 0.22) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(69, 224, 189, 0.16) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to top, black 20%, rgba(0,0,0,0.6) 50%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, rgba(0,0,0,0.6) 50%, transparent 95%)',
          }}
        />
      </div>

      {/* Floating Deep Space Gaming Wireframes (D20 & Mana Crystals) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -top-16 -right-16 size-[28rem] opacity-20 text-violet-400"
        style={{
          transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-current fill-none stroke-[0.8]">
          <polygon points="100,15 175,65 175,145 100,185 25,145 25,65" />
          <line x1="100" y1="15" x2="100" y2="185" />
          <line x1="25" y1="65" x2="175" y2="145" />
          <line x1="25" y1="145" x2="175" y2="65" />
          <circle cx="100" cy="100" r="42" strokeDasharray="3,3" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -bottom-16 -left-16 size-[24rem] opacity-20 text-cyan-400"
        style={{
          transform: `translate3d(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px, 0)`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-current fill-none stroke-[0.8]">
          <polygon points="100,20 170,100 100,180 30,100" />
          <line x1="30" y1="100" x2="170" y2="100" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <circle cx="100" cy="100" r="35" strokeDasharray="2,2" />
        </svg>
      </motion.div>

      {/* Drifting Glowing Cybernetic Mana Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.85, 0],
              y: [-15, -120],
              x: [0, (p.id % 2 === 0 ? 1 : -1) * 20, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full pointer-events-none blur-[0.5px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 12px 3px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* Energy Speed Trails as GAME (Left) and SENSE (Right) Fly In */}
      {!hasJoined && !prefersReducedMotion && (
        <>
          {/* Left Speed Ray behind GAME */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0.6], opacity: [0, 0.85, 0.3] }}
            transition={{ delay: 0.25, duration: 0.8, ease: cinematicEase }}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-[3px] origin-left bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_20px_rgba(69,224,189,0.9)] pointer-events-none"
          />

          {/* Right Speed Ray behind SENSE */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0.6], opacity: [0, 0.95, 0.4] }}
            transition={{ delay: 0.25, duration: 0.8, ease: cinematicEase }}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-[3px] origin-right bg-gradient-to-l from-transparent via-violet-500 to-[#7757ff] shadow-[0_0_25px_rgba(119,87,255,0.9)] pointer-events-none"
          />
        </>
      )}

      {/* Collision Shockwave Rings when words touch at center */}
      {hasJoined && !prefersReducedMotion && (
        <>
          {/* Primary Violet Shockwave Ring */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0.95 }}
            animate={{ scale: [0.2, 3.2], opacity: [0.95, 0] }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full border-2 border-violet-500 shadow-[0_0_60px_rgba(119,87,255,0.85)] pointer-events-none"
          />

          {/* Secondary Cyan Shockwave Ring */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: [0.2, 4.2], opacity: [0.8, 0] }}
            transition={{ duration: 1.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full border border-cyan-400 shadow-[0_0_50px_rgba(69,224,189,0.7)] pointer-events-none"
          />
        </>
      )}

      {/* ============================================================ */}
      {/* 2. CENTERED GAMESENSE WORD CONTAINER                         */}
      {/* ============================================================ */}
      <div
        className="relative z-10 flex items-center justify-center font-black tracking-tight"
        style={{
          transform: isDismissing ? 'translateY(-80px) scale(0.92)' : 'translateY(0) scale(1)',
          opacity: isDismissing ? 0 : 1,
          transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* GAME: Lands from the LEFT screen (-100vw) at 0.25s */}
        <motion.span
          initial={
            prefersReducedMotion
              ? { opacity: 1, x: 0 }
              : { x: '-100vw', opacity: 0, scale: 0.95 }
          }
          animate={{
            x: 0,
            opacity: 1,
            scale: hasJoined ? [1, 1.05, 1] : 1,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : {
                  x: { delay: 0.25, duration: 0.8, ease: cinematicEase },
                  opacity: { delay: 0.25, duration: 0.5 },
                  scale: hasJoined
                    ? { duration: 0.35, ease: 'easeOut' }
                    : { delay: 0.25, duration: 0.8 },
                }
          }
          className="inline-block text-[clamp(3.5rem,14vw,11rem)] font-black leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          Game
        </motion.span>

        {/* SENSE: Lands from the RIGHT screen (+100vw) at 0.25s */}
        <motion.span
          initial={
            prefersReducedMotion
              ? { opacity: 1, x: 0 }
              : { x: '100vw', opacity: 0, scale: 0.95 }
          }
          animate={{
            x: 0,
            opacity: 1,
            scale: hasJoined ? [1, 1.05, 1] : 1,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : {
                  x: { delay: 0.25, duration: 0.8, ease: cinematicEase },
                  opacity: { delay: 0.25, duration: 0.5 },
                  scale: hasJoined
                    ? { duration: 0.35, ease: 'easeOut' }
                    : { delay: 0.25, duration: 0.8 },
                }
          }
          className="inline-block text-[clamp(3.5rem,14vw,11rem)] font-black leading-none text-[#7757ff] drop-shadow-[0_0_45px_rgba(119,87,255,0.6)]"
        >
          Sense
        </motion.span>

        {/* Soft Radial Glow Pulse when words touch at center */}
        {hasJoined && !prefersReducedMotion && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.35, 1], opacity: [0, 0.55, 0.2] }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute inset-[-60%] -z-10 rounded-full bg-radial from-[#7757ff]/45 via-[#45e0bd]/20 to-transparent blur-3xl pointer-events-none"
          />
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. SCROLL DOWN PROMPT AT BOTTOM                              */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={showScrollPrompt ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2 pointer-events-none text-slate-400 font-mono tracking-widest uppercase text-xs select-none"
      >
        <span className="text-[11px] tracking-[0.2em] text-slate-400/90 font-medium">Scroll to Explore</span>
        <ChevronDown className="size-4 animate-bounce text-violet-400" />
      </motion.div>
    </div>
  )
}

export { CinematicIntro }
