import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsOverview } from '@/types/api'

export async function GET(request: NextRequest) {
  // If external backend configured, forward request
  const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
  if (backendUrl && !backendUrl.includes('localhost:3000')) {
    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/analytics/overview`, {
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

  // Contract default response
  const overview: AnalyticsOverview = {
    totalSessions: 120,
    completedSessions: 108,
    failedSessions: 12,
    winRate: 87.5,
    averageDurationSeconds: 1122,
    totalDeaths: 342,
    itemsCollected: 1820,
    enemiesDefeated: 934,
    activePersonas: 8,
    humanSessions: 42,
    aiSessions: 78,
    averageCoverage: 91.4,
    totalBugs: 37,
  }

  return NextResponse.json(overview)
}
