import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const associadoId = searchParams.get('associado_id')
  const all = searchParams.get('all')

  try {
    if (all === 'true') {
      const data = await prisma.reserva.findMany({
        include: { acomodacao: true, associado: { select: { nome: true, cpf: true, email: true } } },
        orderBy: { created_at: 'desc' },
      })
      return NextResponse.json(data)
    }

    if (associadoId) {
      const data = await prisma.reserva.findMany({
        where: { associado_id: associadoId },
        include: { acomodacao: true },
        orderBy: { check_in: 'desc' },
      })
      return NextResponse.json(data)
    }

    return NextResponse.json([])
  } catch (error) {
    console.error('GET /api/reservas:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const reserva = await prisma.reserva.create({
      data: {
        associado_id: body.associado_id,
        acomodacao_id: body.acomodacao_id,
        nucleo_id: body.nucleo_id,
        check_in: new Date(body.check_in),
        check_out: new Date(body.check_out),
        num_hospedes: body.num_hospedes || 1,
        observacoes: body.observacoes || null,
        status: 'pendente',
      },
    })
    return NextResponse.json({ ok: true, reserva })
  } catch (error) {
    console.error('POST /api/reservas:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
    }

    await prisma.reserva.update({
      where: { id },
      data: { status, updated_at: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PATCH /api/reservas:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
