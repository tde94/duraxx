import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if it's an admin route, but not the login page
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    // Check for the admin_token cookie
    const token = request.cookies.get('admin_token')?.value
    
    // If no token exists, redirect to login
    if (token !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // If visiting login page but already authenticated, redirect to dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value
    if (token === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
