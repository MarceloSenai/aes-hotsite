import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const nucleoId = req.nextUrl.searchParams.get('nucleo_id')

  try {
    const where: Record<string, unknown> = { ativo: true }
    if (nucleoId) where.nucleo_id = nucleoId

    const data = await prisma.acomodacao.findMany({
      where,
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/reservas/acomodacoes:', error)
    return NextResponse.json([], { status: 500 })
  }
}
