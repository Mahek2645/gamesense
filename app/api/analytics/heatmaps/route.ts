import { NextRequest, NextResponse } from 'next/server'
import { HeatmapResponse } from '@/types/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = (searchParams.get('type') || 'DEATH').toUpperCase()
  const levelId = searchParams.get('levelId')

  // If external backend configured, forward request
  const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
  if (backendUrl && !backendUrl.includes('localhost:3000')) {
    try {
      const url = new URL(`${backendUrl.replace(/\/$/, '')}/api/analytics/heatmaps`)
      url.searchParams.set('type', type)
      if (levelId) url.searchParams.set('levelId', levelId)

      const res = await fetch(url.toString(), {
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

  if (type === 'MOVEMENT') {
    const movementData: HeatmapResponse = {
      type: 'MOVEMENT',
      points: [
        { x: 30.0, y: 25.0, intensity: 0.2, weight: 1, levelId: 'sector-01', timestamp: '2026-09-06T10:00:00Z' },
        { x: 55.4, y: 38.2, intensity: 0.35, weight: 1, levelId: 'sector-01', timestamp: '2026-09-06T10:01:00Z' },
        { x: 82.1, y: 50.5, intensity: 0.5, weight: 2, levelId: 'sector-01', timestamp: '2026-09-06T10:02:00Z' },
        { x: 100.2, y: 54.8, intensity: 0.35, weight: 1, levelId: 'sector-01', timestamp: '2026-09-06T10:03:00Z' },
        { x: 124.5, y: 78.2, intensity: 0.8, weight: 3, levelId: 'sector-01', timestamp: '2026-09-06T10:04:00Z' },
        { x: 145.0, y: 82.0, intensity: 0.45, weight: 2, levelId: 'sector-01', timestamp: '2026-09-06T10:05:00Z' },
        { x: 170.2, y: 95.1, intensity: 0.6, weight: 2, levelId: 'sector-01', timestamp: '2026-09-06T10:06:00Z' },
        { x: 185.0, y: 105.0, intensity: 0.3, weight: 1, levelId: 'sector-01', timestamp: '2026-09-06T10:07:00Z' },
      ],
    }
    return NextResponse.json(movementData)
  }

  // Default: DEATH heatmap
  const deathData: HeatmapResponse = {
    type: 'DEATH',
    points: [
      { x: 124.5, y: 78.2, intensity: 0.82, weight: 14, levelId: 'sector-01' },
      { x: 45.2, y: 32.1, intensity: 0.65, weight: 9, levelId: 'sector-01' },
      { x: 180.4, y: 92.6, intensity: 0.94, weight: 22, levelId: 'sector-01' },
      { x: 95.8, y: 64.3, intensity: 0.45, weight: 5, levelId: 'sector-02' },
      { x: 140.1, y: 110.0, intensity: 0.78, weight: 12, levelId: 'sector-02' },
      { x: 62.0, y: 48.0, intensity: 0.55, weight: 7, levelId: 'sector-02' },
    ],
  }
  return NextResponse.json(deathData)
}
