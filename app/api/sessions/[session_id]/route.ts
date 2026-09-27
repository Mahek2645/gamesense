import { NextRequest, NextResponse } from 'next/server'
import { SessionDetail } from '@/types/api'
import { getTestRunById } from '@/lib/db'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ session_id: string }> }
) {
  const { session_id } = await context.params

  // If external backend configured, forward request
  const backendUrl = process.env.FASTAPI_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
  if (backendUrl && !backendUrl.includes('localhost:3000')) {
    try {
      const res = await fetch(
        `${backendUrl.replace(/\/$/, '')}/api/sessions/${encodeURIComponent(session_id)}`,
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.ok) {
        const data = await res.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fall through to local fallback
    }
  }

  // Fallback to local DB or mock session
  try {
    const local = await getTestRunById(session_id)
    if (local) {
      const detail: SessionDetail = {
        id: local.id,
        gameId: local.gameId,
        type: local.type,
        name: local.name,
        status: local.status,
        progress: local.progress ?? 100,
        activeAgents: local.activeAgents ?? 0,
        activeTesters: local.activeTesters ?? 0,
        totalScenarios: local.totalScenarios,
        passedScenarios: local.passedScenarios,
        failedScenarios: local.failedScenarios,
        bugsFound: local.bugsFound,
        criticalBugs: local.criticalBugs,
        testingTime: local.testingTime,
        coverage: local.coverage,
        uxIssues: local.uxIssues,
        performanceIssues: local.performanceIssues,
        createdAt: local.createdAt,
        completedAt: local.completedAt,
        description: 'Session test execution',
      }
      return NextResponse.json(detail)
    }
  } catch {
    // Continue
  }

  // Contract default fallback
  const fallbackDetail: SessionDetail = {
    id: session_id,
    gameId: 'game-01',
    type: 'ai',
    name: `Playtest Session (${session_id})`,
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
    description: 'Detailed telemetry telemetry execution analysis',
    scenarioDetails: [
      { id: 'SC-01', title: 'High-speed Counter-steer Drift Recovery', status: 'pass', executionTimeMs: 1420 },
      { id: 'SC-02', title: 'Sector 7 Boss Combat TTK & Balance', status: 'fail', executionTimeMs: 4210 },
      { id: 'SC-03', title: 'Shop Economy Currency Sink Loop', status: 'pass', executionTimeMs: 980 },
    ],
  }

  return NextResponse.json(fallbackDetail)
}
