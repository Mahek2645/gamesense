'use client'

import { useState, useEffect } from 'react'
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

export function useReducedMotion(): boolean {
  const framerReducedMotion = useFramerReducedMotion()
  const [hasReducedMotion, setHasReducedMotion] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHasReducedMotion(mediaQuery.matches || Boolean(framerReducedMotion))

    const listener = (event: MediaQueryListEvent) => {
      setHasReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [framerReducedMotion])

  return hasReducedMotion
}
