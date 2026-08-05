import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signToken, COOKIE_NAME, CSRF_COOKIE } from '@/lib/security/jwt'
import { checkRateLimit } from '@/lib/security/rate-limiter'

const GENERIC_ERROR = 'Credenciais inválidas.'
const MAX_AGE = 8 * 60 * 60 // 8 hours in seconds

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const limit = checkRateLimit(`admin-ip:${ip}`)
    if (!limit.allowed) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000)
      return NextResponse.json(
        { ok: false, error: 'Muitas tentativas. Tente novamente mais tarde.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    // Optional IP allowlist (ADMIN_ALLOWED_IPS = comma-separated)
    const allowedIps = process.env.ADMIN_ALLOWED_IPS?.split(',').map((s) => s.trim()).filter(Boolean)
    if (allowedIps && allowedIps.length > 0 && !allowedIps.includes(ip)) {
      // Do not reveal that IP filtering is in place — return generic error.
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    const { senha } = await request.json()
    if (!senha || typeof senha !== 'string') {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    const hash = process.env.ADMIN_PASSWORD_HASH
    if (!hash) {
      // Server misconfiguration — fail closed.
      console.error('POST /api/auth/admin/login: ADMIN_PASSWORD_HASH não definida.')
      return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
    }

    const senhaValida = await bcrypt.compare(senha, hash)
    if (!senhaValida) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    // Sign JWT — tipo='admin' distinguishes from associado sessions.
    const token = await signToken({ sub: 'admin', cpf: 'admin', tipo: 'admin' })
    const csrfToken = crypto.randomUUID()

    const response = NextResponse.json({ ok: true })

    // Set httpOnly JWT cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    })

    // Set CSRF cookie (readable by JS)
    response.cookies.set(CSRF_COOKIE, csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    })

    return response
  } catch (error) {
    console.error('POST /api/auth/admin/login:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
