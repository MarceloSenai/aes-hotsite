import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const nucleoId = req.nextUrl.searchParams.get('nucleo_id')
  const checkIn = req.nextUrl.searchParams.get('check_in')
  const checkOut = req.nextUrl.searchParams.get('check_out')

  if (!nucleoId || !checkIn || !checkOut) {
    return NextResponse.json({ error: 'nucleo_id, check_in, check_out required' }, { status: 400 })
  }

  try {
    // All active acomodações for this núcleo
    const todas = await prisma.acomodacao.findMany({
      where: { nucleo_id: nucleoId, ativo: true },
      orderBy: { nome: 'asc' },
    })

    // Reservations that overlap
    const reservasOcupadas = await prisma.reserva.findMany({
      where: {
        nucleo_id: nucleoId,
        status: { in: ['pendente', 'confirmada'] },
        check_in: { lt: new Date(checkOut) },
        check_out: { gt: new Date(checkIn) },
      },
      select: { acomodacao_id: true },
    })

    const idsOcupados = new Set(reservasOcupadas.map(r => r.acomodacao_id))
    const disponiveis = todas.filter(a => !idsOcupados.has(a.id))

    return NextResponse.json(disponiveis)
  } catch (error) {
    console.error('GET /api/reservas/disponibilidade:', error)
    return NextResponse.json([], { status: 500 })
  }
}
