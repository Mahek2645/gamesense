import { NextRequest, NextResponse } from 'next/server'
import { getBalanceIssues, createBalanceIssue, updateBalanceIssue } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId') || undefined
    const issues = await getBalanceIssues(gameId)

    return NextResponse.json({
      success: true,
      issues,
      count: issues.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch balance issues' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      gameId = 'game-01',
      title,
      category = 'combat',
      severity = 'high',
      status = 'detected',
      confidence = 90,
      detectedBy = 'ai',
      metricTrigger = 'Win-rate deviation > 15%',
      description = '',
      impactAnalysis = '',
      affectedSegment = 'Multiplayer Ladder'
    } = body

    if (!title) {
      return NextResponse.json({ error: 'Issue title is required' }, { status: 400 })
    }

    const newIssue = await createBalanceIssue({
      gameId,
      title,
      category,
      severity,
      status,
      confidence,
      detectedBy,
      metricTrigger,
      description,
      impactAnalysis,
      affectedSegment
    })

    return NextResponse.json({
      success: true,
      issue: newIssue,
      message: 'Balance anomaly recorded'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record balance issue' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    if (!id || !updates) {
      return NextResponse.json({ error: 'Issue ID and updates are required' }, { status: 400 })
    }

    const updated = await updateBalanceIssue(id, updates)
    if (!updated) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      issue: updated,
      message: 'Issue updated successfully'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 })
  }
}
