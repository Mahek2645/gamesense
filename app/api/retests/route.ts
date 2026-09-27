import { NextRequest, NextResponse } from 'next/server'
import { getRetests, createRetest } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId') || undefined
    const retests = await getRetests(gameId)

    return NextResponse.json({
      success: true,
      retests,
      count: retests.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch retest runs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      gameId = 'game-01',
      recommendationId,
      name = 'Automated Verification Retest',
      baseVersion = 'v1.4.2',
      testVersion = 'v1.4.3-hotfix',
      status = 'running',
      improvementScore = 84,
      scenariosRerun = 36,
      resolvedIssuesCount = 1
    } = body

    const newRetest = await createRetest({
      gameId,
      recommendationId,
      name,
      baseVersion,
      testVersion,
      status,
      improvementScore,
      scenariosRerun,
      resolvedIssuesCount
    })

    return NextResponse.json({
      success: true,
      retest: newRetest,
      message: 'Retest initiated'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initiate retest' }, { status: 500 })
  }
}
