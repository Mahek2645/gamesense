import { NextRequest, NextResponse } from 'next/server'
import { createInquiry } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, studio, engine, projectStage, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and inquiry message are required.' },
        { status: 400 }
      )
    }

    const inquiry = await createInquiry({
      name,
      email,
      studio,
      engine,
      projectStage,
      message,
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry transmitted successfully to GameSense architecture team.',
      inquiry,
    })
  } catch (error) {
    console.error('Error handling contact inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry submission.' },
      { status: 500 }
    )
  }
}
