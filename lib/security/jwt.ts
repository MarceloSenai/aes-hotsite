import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export const COOKIE_NAME = 'aes-token'
export const CSRF_COOKIE = 'aes-csrf'
const TOKEN_TTL = '8h'

export interface TokenPayload extends JWTPayload {
  sub: string
  cpf: string
  tipo: string
}

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function signToken(payload: { sub: string; cpf: string; tipo: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  return payload as TokenPayload
}
