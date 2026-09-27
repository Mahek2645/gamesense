import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, verifyUserPassword, createUser, debugDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    debugDatabase()

    let user = await getUserByEmail(cleanEmail)

    if (!user) {
      // Auto-provision new user account so any email entered by the user works seamlessly
      const derivedName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ')
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
      user = await createUser(
        cleanEmail,
        password,
        formattedName || 'GameSense Explorer',
        'user'
      )
      console.log('Auto-provisioned new user:', user.email)
    } else {
      // Existing user: verify password
      const isValidPassword = await verifyUserPassword(user, password)
      if (!isValidPassword) {
        // If it's the demo account and password was wrong, offer clear hint, otherwise invalid password
        return NextResponse.json(
          { error: 'Invalid password. Please check your credentials.' },
          { status: 401 }
        )
      }
    }

    const { password: _, ...userWithoutPassword } = user
    const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64')

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    })

    // Set cookie on response
    response.cookies.set('auth_token', token, {
      httpOnly: false, // Accessible to client-side auth handlers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    )
  }
}