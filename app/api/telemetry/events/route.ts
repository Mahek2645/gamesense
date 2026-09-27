import { NextRequest, NextResponse } from 'next/server'
import { ingestTelemetryEvent, getTelemetryEvents, TelemetryEvent } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId') || undefined
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const events = await getTelemetryEvents(gameId, limit)
    return NextResponse.json({
      success: true,
      events,
      count: events.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve telemetry events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      gameId = 'game-01',
      testRunId = 'test-01',
      eventType = 'checkpoint_reached',
      actorType = 'ai',
      actorId = 'agent-01',
      levelId = 'sector-01',
      data = {}
    } = body

    const event = await ingestTelemetryEvent(
      gameId,
      testRunId,
      eventType as TelemetryEvent['eventType'],
      actorType as 'ai' | 'human',
      actorId,
      levelId,
      data
    )

    return NextResponse.json({
      success: true,
      event,
      message: 'Telemetry event ingested successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to ingest telemetry event' }, { status: 500 })
  }
}
