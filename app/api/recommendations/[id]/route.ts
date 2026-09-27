import { NextRequest, NextResponse } from 'next/server'
import { updateRecommendationStatus, getRecommendations } from '@/lib/db'
import { RecommendationStatus } from '@/types/api'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const status = body.status as RecommendationStatus

    // If external backend configured, forward request
    const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
    if (backendUrl && !backendUrl.includes('localhost:3000')) {
      try {
        const res = await fetch(
          `${backendUrl.replace(/\/$/, '')}/api/recommendations/${encodeURIComponent(id)}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          }
        )
        if (res.ok) {
          const data = await res.json()
          return NextResponse.json(data)
        }
      } catch {
        // Fall through to local fallback
      }
    }

    if (!['pending', 'accepted', 'rejected', 'applied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    const updated = await updateRecommendationStatus(id, status)
    if (!updated) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      recommendation: updated,
      message: `Recommendation marked as ${status}`,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 })
  }
}
