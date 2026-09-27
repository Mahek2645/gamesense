import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('auth_token')

  // Admin routes protection - completely hidden from non-admin users
  if (path.startsWith('/admin')) {
    if (token) {
      try {
        const decoded = JSON.parse(Buffer.from(token.value, 'base64').toString())
        if (decoded.role !== 'admin') {
          // Normal users are never allowed to view admin dashboard or admin login
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      } catch {
        if (path !== '/admin/login') {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
      }
    } else if (path !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Dashboard routes protection
  if (path.startsWith('/dashboard') && !path.startsWith('/dashboard/projects')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
}