import { NextRequest, NextResponse } from 'next/server'
import { PersonaComparison } from '@/types/api'

export async function GET(request: NextRequest) {
  // If external backend configured, forward request
  const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
  if (backendUrl && !backendUrl.includes('localhost:3000')) {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/analytics/personas/comparison`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        const data = await res.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fall through to local fallback
    }
  }

  const comparison: PersonaComparison = {
    human: {
      totalScenarios: 50,
      passed: 42,
      failed: 8,
      bugsFound: 7,
      criticalBugs: 2,
      durationSeconds: 9240,
      coverage: 78,
      uxIssues: 5,
      performanceIssues: 2,
    },
    ai: {
      totalScenarios: 50,
      passed: 45,
      failed: 5,
      bugsFound: 9,
      criticalBugs: 3,
      durationSeconds: 1122,
      coverage: 94,
      uxIssues: 2,
      performanceIssues: 4,
    },
  }

  return NextResponse.json(comparison)
}
