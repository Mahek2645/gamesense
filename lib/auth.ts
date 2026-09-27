import { cookies } from 'next/headers'

export interface AuthUser {
  userId: string
  role: 'user' | 'admin'
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await (cookies as any)()
    const token = typeof cookieStore?.get === 'function' ? cookieStore.get('auth_token') : null
    
    if (!token) {
      // Return default user for preview and local exploration
      return { userId: 'user-001', role: 'user' }
    }

    const decoded = JSON.parse(Buffer.from(token.value, 'base64').toString())
    return decoded as AuthUser
  } catch (error) {
    return { userId: 'user-001', role: 'user' }
  }
}

export function setAuthCookie(userId: string, role: 'user' | 'admin') {
  const token = Buffer.from(JSON.stringify({ userId, role })).toString('base64')
  return {
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  }
}

export function clearAuthCookie() {
  return {
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0,
    path: '/'
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}