import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, getAuthUser } from '@/lib/auth'
import { createTestRun, getTestRunsByUserId, getAllTestRuns } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (user.role === 'admin') {
      const testRuns = await getAllTestRuns()
      return NextResponse.json({ testRuns })
    } else {
      const testRuns = await getTestRunsByUserId(user.userId)
      return NextResponse.json({ testRuns })
    }
  } catch (error) {
    console.error('Get test runs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { gameId, type, name } = await request.json()

    if (!gameId || !type || !name) {
      return NextResponse.json(
        { error: 'Game ID, type, and name are required' },
        { status: 400 }
      )
    }

    const testRun = await createTestRun(gameId, user.userId, type, name)

    return NextResponse.json({ testRun }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    console.error('Create test run error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { updateTestRun } = await import('@/lib/db')
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Test run ID is required' },
        { status: 400 }
      )
    }

    const updated = await updateTestRun(id, updates)
    if (!updated) {
      return NextResponse.json(
        { error: 'Test run not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ testRun: updated })
  } catch (error) {
    console.error('Update test run error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}