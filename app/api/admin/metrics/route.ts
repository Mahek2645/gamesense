import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsData, getAllGames, getAllTestRuns, getAllUsers, getTelemetryEvents, getBalanceIssues, getAllInquiries } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const analytics = await getAnalyticsData()
    const games = await getAllGames()
    const testRuns = await getAllTestRuns()
    const users = await getAllUsers()
    const telemetry = await getTelemetryEvents(undefined, 20)
    const issues = await getBalanceIssues()
    const inquiries = await getAllInquiries()

    // Strip passwords from users
    const safeUsers = users.map(({ password, ...u }) => u)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      analytics,
      platformHealth: {
        status: 'nominal',
        uptime: '99.98%',
        telemetryThroughput: '4,820 eps',
        activeClusters: 8,
        storageUsage: '34.2 GB / 250 GB'
      },
      games,
      testRuns,
      users: safeUsers,
      recentTelemetry: telemetry,
      issues,
      inquiries
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve admin telemetry metrics' }, { status: 500 })
  }
}
