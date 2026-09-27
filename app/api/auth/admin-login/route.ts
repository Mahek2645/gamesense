import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, verifyUserPassword, debugDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Admin email and security key are required' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    debugDatabase()

    const user = await getUserByEmail(cleanEmail)

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Account does not have administrator privileges.' },
        { status: 403 }
      )
    }

    const isValid = await verifyUserPassword(user, password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid administrator password.' },
        { status: 401 }
      )
    }

    const { password: _, ...adminWithoutPassword } = user
    const token = Buffer.from(JSON.stringify({ userId: user.id, role: 'admin' })).toString('base64')

    const response = NextResponse.json({
      success: true,
      user: adminWithoutPassword,
      token,
      message: 'Admin authorization granted'
    })

    response.cookies.set('auth_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error during administrator authentication' },
      { status: 500 }
    )
  }
}
