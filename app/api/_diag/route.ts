import { NextResponse } from 'next/server'

// TEMPORÁRIO: diagnóstico de conexão com o banco. Remover após uso.
export const dynamic = 'force-dynamic'

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL
  const hasSecret = !!process.env.NEXTAUTH_SECRET
  let dbOk = false
  let dbError: string | null = null

  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.$queryRaw`SELECT 1 AS ok`
    dbOk = true
  } catch (e) {
    dbError = e instanceof Error ? `${e.name}: ${e.message}`.slice(0, 400) : String(e).slice(0, 400)
  }

  return NextResponse.json({ hasDbUrl, hasSecret, dbOk, dbError })
}
