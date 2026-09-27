import { NextRequest, NextResponse } from 'next/server'
import { Session, SessionListResponse } from '@/types/api'
import { getAllTestRuns } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const gameId = searchParams.get('gameId')
  const type = searchParams.get('type')
  const status = searchParams.get('status')

  // If external backend configured, forward request
  const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
  if (backendUrl && !backendUrl.includes('localhost:3000')) {
    try {
      const url = new URL(`${backendUrl.replace(/\/$/, '')}/api/sessions`)
      if (gameId) url.searchParams.set('gameId', gameId)
      if (type) url.searchParams.set('type', type)
      if (status) url.searchParams.set('status', status)

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

  // Contract default sessions combined with any active local test runs
  const defaultSessions: Session[] = [
    {
      id: 'session-001',
      gameId: 'game-01',
      type: 'ai',
      name: 'AI Playtest #01',
      status: 'completed',
      progress: 100,
      activeAgents: 8,
      activeTesters: 0,
      totalScenarios: 50,
      passedScenarios: 45,
      failedScenarios: 5,
      bugsFound: 9,
      criticalBugs: 3,
      testingTime: '18m 42s',
      coverage: 94,
      uxIssues: 2,
      performanceIssues: 4,
      createdAt: '2026-09-06T10:00:00Z',
      completedAt: '2026-09-06T10:18:42Z',
    },
    {
      id: 'session-002',
      gameId: 'game-01',
      type: 'human',
      name: 'Pro Guild Cohort Alpha',
      status: 'completed',
      progress: 100,
      activeAgents: 0,
      activeTesters: 12,
      totalScenarios: 50,
      passedScenarios: 42,
      failedScenarios: 8,
      bugsFound: 7,
      criticalBugs: 2,
      testingTime: '2h 34m',
      coverage: 78,
      uxIssues: 5,
      performanceIssues: 2,
      createdAt: '2026-09-06T08:00:00Z',
      completedAt: '2026-09-06T10:34:00Z',
    },
    {
      id: 'session-003',
      gameId: 'game-01',
      type: 'ai',
      name: 'Autonomous Physics Stress Fleet',
      status: 'running',
      progress: 68,
      activeAgents: 8,
      activeTesters: 0,
      totalScenarios: 48,
      passedScenarios: 32,
      failedScenarios: 4,
      bugsFound: 4,
      criticalBugs: 1,
      testingTime: '12m 15s',
      coverage: 88,
      uxIssues: 1,
      performanceIssues: 3,
      createdAt: '2026-09-06T11:00:00Z',
    },
  ]

  let sessions = defaultSessions

  // Synchronize with local DB if available
  try {
    const localRuns = await getAllTestRuns()
    if (localRuns && localRuns.length > 0) {
      // Map local test runs to session schema if not already present
      const mappedLocal: Session[] = localRuns.map((r) => ({
        id: r.id,
        gameId: r.gameId,
        type: r.type,
        name: r.name,
        status: r.status,
        progress: r.progress ?? (r.status === 'completed' ? 100 : 68),
        activeAgents: r.activeAgents ?? (r.type === 'ai' ? 4 : 0),
        activeTesters: r.activeTesters ?? (r.type === 'human' ? 6 : 0),
        totalScenarios: r.totalScenarios,
        passedScenarios: r.passedScenarios,
        failedScenarios: r.failedScenarios,
        bugsFound: r.bugsFound,
        criticalBugs: r.criticalBugs,
        testingTime: r.testingTime,
        coverage: r.coverage,
        uxIssues: r.uxIssues,
        performanceIssues: r.performanceIssues,
        createdAt: r.createdAt,
        completedAt: r.completedAt,
      }))

      // Merge unique by id
      const existingIds = new Set(sessions.map((s) => s.id))
      for (const m of mappedLocal) {
        if (!existingIds.has(m.id)) {
          sessions.push(m)
        }
      }
    }
  } catch {
    // Keep default sessions
  }

  // Filter
  if (gameId) {
    sessions = sessions.filter((s) => s.gameId === gameId)
  }
  if (type) {
    sessions = sessions.filter((s) => s.type === type)
  }
  if (status) {
    sessions = sessions.filter((s) => s.status === status)
  }

  const response: SessionListResponse = { sessions }
  return NextResponse.json(response)
}
