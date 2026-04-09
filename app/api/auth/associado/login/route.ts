import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken, COOKIE_NAME, CSRF_COOKIE } from '@/lib/security/jwt'
import { checkRateLimit } from '@/lib/security/rate-limiter'

const GENERIC_ERROR = 'Credenciais inválidas.'
const MAX_AGE = 8 * 60 * 60 // 8 hours in seconds

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const limit = checkRateLimit(`ip:${ip}`)
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

    const { cpf, senha } = await request.json()
    if (!cpf || !senha) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    const cpfLimpo = cpf.replace(/\D/g, '')
    if (cpfLimpo.length !== 11) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    // Rate limiting by CPF (prevents targeted brute force on specific account)
    const cpfLimit = checkRateLimit(`cpf:${cpfLimpo}`)
    if (!cpfLimit.allowed) {
      const retryAfter = Math.ceil((cpfLimit.resetAt - Date.now()) / 1000)
      return NextResponse.json(
        { ok: false, error: 'Muitas tentativas. Tente novamente mais tarde.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const associado = await prisma.associado.findUnique({ where: { cpf: cpfLimpo } })

    if (!associado) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    if (!associado.ativo) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    const senhaValida = await bcrypt.compare(senha, associado.senha_hash)
    if (!senhaValida) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 })
    }

    // Sign JWT
    const token = await signToken({ sub: associado.id, cpf: associado.cpf, tipo: associado.tipo })
    const csrfToken = crypto.randomUUID()

    // Build response
    const { senha_hash: _, ...safe } = associado
    const response = NextResponse.json({ ok: true, associado: safe })

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
    console.error('POST /api/auth/associado/login:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
