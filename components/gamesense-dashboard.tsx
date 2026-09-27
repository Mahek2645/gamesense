'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CinematicIntro } from '@/components/cinematic/CinematicIntro'
import { MinimalLanding } from '@/components/landing/MinimalLanding'

export default function GameSenseDashboard() { 
  const router = useRouter()
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    // Check authentication via cookie silently in background
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1]
    
    if (!token) return

    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (decoded.role === 'admin') {
        router.push('/admin')
        return
      }
      router.push('/dashboard')
    } catch {
      // Invalid token - stay on landing
    }
  }, [router])

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-white">
      {intro && <CinematicIntro onContinue={() => setIntro(false)} />}
      <MinimalLanding />
    </div>
  )
}
