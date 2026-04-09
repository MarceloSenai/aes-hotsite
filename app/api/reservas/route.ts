import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createReservaSchema = z.object({
  associado_id: z.string().min(1),
  acomodacao_id: z.string().min(1),
  nucleo_id: z.string().min(1),
  check_in: z.string().min(1),
  check_out: z.string().min(1),
  num_hospedes: z.number().int().min(1).default(1),
  observacoes: z.string().optional(),
})

const updateStatusSchema = z.object({
  id: z.string().min(1, 'ID obrigatório'),
  status: z.enum(['pendente', 'confirmada', 'cancelada', 'concluida'], { message: 'Status inválido' }),
})

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
    const parsed = createReservaSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { associado_id, acomodacao_id, nucleo_id, check_in, check_out, num_hospedes, observacoes } = parsed.data

    const reserva = await prisma.reserva.create({
      data: {
        associado_id,
        acomodacao_id,
        nucleo_id,
        check_in: new Date(check_in),
        check_out: new Date(check_out),
        num_hospedes,
        observacoes: observacoes || null,
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
    const body = await req.json()
    const parsed = updateStatusSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { id, status } = parsed.data

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
