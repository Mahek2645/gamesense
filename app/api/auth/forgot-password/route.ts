import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await getUserByEmail(email)
    // Always return success for security (avoid enumeration)
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, password recovery instructions have been sent.',
      userFound: !!user
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
