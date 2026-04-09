import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME, CSRF_COOKIE } from '@/lib/security/jwt'

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/api/auth/associado/login', '/api/auth/associado/logout']

// Routes that require auth — API returns 401 JSON
const PROTECTED_API_PREFIXES = [
  '/api/auth/associado',
  '/api/reservas',
  '/api/upload',
  '/api/admin',
]

// Routes that require auth — pages redirect to /login
const PROTECTED_PAGE_PREFIXES = ['/area-do-associado', '/admin']

// Methods that require CSRF validation
const CSRF_METHODS = new Set(['POST', 'PATCH', 'DELETE', 'PUT'])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname === route)) {
    return NextResponse.next()
  }

  // Allow public GET on /api/data/* (read-only public data)
  if (pathname.startsWith('/api/data') && request.method === 'GET') {
    return NextResponse.next()
  }

  // Allow public routes: contact, newsletter
  if (pathname === '/api/contact' || pathname === '/api/newsletter') {
    return NextResponse.next()
  }

  // Check if this route needs protection
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p))
  const isProtectedPage = PROTECTED_PAGE_PREFIXES.some((p) => pathname.startsWith(p))

  if (!isProtectedApi && !isProtectedPage) {
    return NextResponse.next()
  }

  // Verify JWT
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.json({ ok: false, error: 'Não autenticado.' }, { status: 401 })
  }

  let payload
  try {
    payload = await verifyToken(token)
  } catch {
    // Invalid or expired token
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.json({ ok: false, error: 'Sessão expirada.' }, { status: 401 })
  }

  // CSRF validation for state-changing API requests
  if (isProtectedApi && CSRF_METHODS.has(request.method)) {
    const csrfCookie = request.cookies.get(CSRF_COOKIE)?.value
    const csrfHeader = request.headers.get('x-csrf-token')
    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return NextResponse.json({ ok: false, error: 'CSRF inválido.' }, { status: 403 })
    }
  }

  // Inject user info into request headers for downstream route handlers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-associado-id', payload.sub!)
  requestHeaders.set('x-associado-cpf', payload.cpf)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    '/api/auth/associado/:path*',
    '/api/reservas/:path*',
    '/api/upload/:path*',
    '/api/admin/:path*',
    '/api/data/:path*',
    '/area-do-associado/:path*',
    '/admin',
  ],
}
