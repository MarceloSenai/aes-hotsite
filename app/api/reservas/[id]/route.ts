import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { status } = await req.json()
    await prisma.reserva.update({
      where: { id },
      data: { status, updated_at: new Date() },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PATCH /api/reservas/[id]:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
