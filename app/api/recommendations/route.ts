import { NextRequest, NextResponse } from 'next/server'
import { getRecommendations, updateRecommendationStatus } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId') || undefined
    const recommendations = await getRecommendations(gameId)

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    if (!id || !status) {
      return NextResponse.json({ error: 'Recommendation ID and target status are required' }, { status: 400 })
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
      message: `Recommendation marked as ${status}`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 })
  }
}
