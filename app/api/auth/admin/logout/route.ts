import { NextResponse } from 'next/server'
import { COOKIE_NAME, CSRF_COOKIE } from '@/lib/security/jwt'

export async function POST() {
  const response = NextResponse.json({ ok: true })

  response.cookies.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 })
  response.cookies.set(CSRF_COOKIE, '', { httpOnly: false, path: '/', maxAge: 0 })

  return response
}
