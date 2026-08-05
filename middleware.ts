import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME, CSRF_COOKIE } from '@/lib/security/jwt'

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/api/auth/associado/login',
  '/api/auth/associado/logout',
  '/api/auth/admin/login',
  '/api/auth/admin/logout',
]

// Routes that require auth — API returns 401 JSON
const PROTECTED_API_PREFIXES = [
  '/api/auth/associado',
  '/api/reservas',
  '/api/upload',
  '/api/admin',
]

// Routes that require auth — pages redirect to /admin/login (admin) or /login (associado)
const PROTECTED_PAGE_PREFIXES = ['/area-do-associado']
const ADMIN_PAGE_PREFIXES = ['/admin']

// Methods that require CSRF validation
const CSRF_METHODS = new Set(['POST', 'PATCH', 'DELETE', 'PUT'])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname === route)) {
    return NextResponse.next()
  }

  // /admin/login must stay public (it's the gate to the protected /admin panel)
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Allow public GET on /api/data/* (read-only public data)
  if (pathname.startsWith('/api/data') && request.method === 'GET') {
    return NextResponse.next()
  }

  // Allow public GET on /api/admin/theme — the theme must apply to all visitors,
  // not just logged-in admins. Writes (PUT) are protected below (require admin
  // session + CSRF), since the /admin panel now enforces login.
  if (pathname === '/api/admin/theme' && request.method === 'GET') {
    return NextResponse.next()
  }

  // Allow public routes: contact, newsletter
  if (pathname === '/api/contact' || pathname === '/api/newsletter') {
    return NextResponse.next()
  }

  // Check if this route needs protection
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p))
  const isProtectedPage = PROTECTED_PAGE_PREFIXES.some((p) => pathname.startsWith(p))
  const isAdminPage = ADMIN_PAGE_PREFIXES.some((p) => pathname.startsWith(p))

  // Writes to /api/data/* (POST/PUT/PATCH/DELETE) mutate site content and must
  // require an admin session — they are the main write path used by the /admin panel.
  const isDataWrite = pathname.startsWith('/api/data') && request.method !== 'GET'

  if (!isProtectedApi && !isProtectedPage && !isAdminPage && !isDataWrite) {
    return NextResponse.next()
  }

  // Admin pages, /api/admin/* and /api/data writes require tipo='admin'; everything else is associado auth.
  const requiresAdmin = isAdminPage || pathname.startsWith('/api/admin') || isDataWrite

  // Verify JWT
  const token = request.cookies.get(COOKIE_NAME)?.value

  function loginRedirect() {
    const loginUrl = new URL(requiresAdmin ? '/admin/login' : '/login', request.url)
    if (!requiresAdmin) loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!token) {
    if (isProtectedPage || isAdminPage) return loginRedirect()
    return NextResponse.json({ ok: false, error: 'Não autenticado.' }, { status: 401 })
  }

  let payload
  try {
    payload = await verifyToken(token)
  } catch {
    // Invalid or expired token
    if (isProtectedPage || isAdminPage) return loginRedirect()
    return NextResponse.json({ ok: false, error: 'Sessão expirada.' }, { status: 401 })
  }

  // Enforce admin role where required
  if (requiresAdmin && payload.tipo !== 'admin') {
    if (isAdminPage) return loginRedirect()
    return NextResponse.json({ ok: false, error: 'Acesso restrito ao administrador.' }, { status: 403 })
  }

  // CSRF validation for state-changing API requests (including /api/data writes)
  if ((isProtectedApi || isDataWrite) && CSRF_METHODS.has(request.method)) {
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
    '/api/auth/admin/:path*',
    '/api/reservas/:path*',
    '/api/upload/:path*',
    '/api/admin/:path*',
    '/api/data/:path*',
    '/area-do-associado/:path*',
    // /admin page (and subpaths). /admin/login is explicitly allowed above.
    '/admin',
    '/admin/:path*',
  ],
}
