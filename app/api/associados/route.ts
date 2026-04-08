import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const data = await prisma.associado.findMany({
      select: { id: true, cpf: true, nome: true, email: true, telefone: true, tipo: true, ativo: true, created_at: true },
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/associados:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const cpfLimpo = body.cpf.replace(/\D/g, '')
    const hash = await bcrypt.hash(body.senha, 12)

    await prisma.associado.create({
      data: {
        cpf: cpfLimpo,
        nome: body.nome,
        email: body.email || null,
        telefone: body.telefone || null,
        senha_hash: hash,
        tipo: body.tipo || 'titular',
        ativo: true,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    if (msg.includes('Unique')) return NextResponse.json({ ok: false, error: 'CPF já cadastrado.' })
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
