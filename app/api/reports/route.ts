import { NextRequest, NextResponse } from 'next/server'
import { getReports, generateReport } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId') || undefined
    const reports = await getReports(gameId)

    return NextResponse.json({
      success: true,
      reports,
      count: reports.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytical reports' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gameId = 'game-01', title = 'Comprehensive Playtest Audit', type = 'executive_summary' } = body

    const report = await generateReport(gameId, title, type)

    return NextResponse.json({
      success: true,
      report,
      message: 'Report generated successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
