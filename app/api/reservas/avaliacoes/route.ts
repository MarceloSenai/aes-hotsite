import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const reservaId = req.nextUrl.searchParams.get('reserva_id')
  if (!reservaId) return NextResponse.json(null, { status: 400 })

  try {
    const data = await prisma.avaliacao.findFirst({ where: { reserva_id: reservaId } })
    if (!data) return NextResponse.json(null, { status: 404 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { reserva_id, nota, comentario } = await req.json()
    await prisma.avaliacao.create({
      data: { reserva_id, nota, comentario: comentario || null },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('POST /api/reservas/avaliacoes:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
