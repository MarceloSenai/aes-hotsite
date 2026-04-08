import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const data = await prisma.associado.findMany({
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        telefone: true,
        tipo: true,
        ativo: true,
        created_at: true,
      },
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/auth/associado:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
    if (msg.includes('Unique')) {
      return NextResponse.json({ ok: false, error: 'CPF já cadastrado.' }, { status: 409 })
    }
    console.error('POST /api/auth/associado:', error)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, novaSenha, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const data: Record<string, unknown> = {}
    if (updates.nome !== undefined) data.nome = updates.nome
    if (updates.email !== undefined) data.email = updates.email
    if (updates.telefone !== undefined) data.telefone = updates.telefone
    if (updates.tipo !== undefined) data.tipo = updates.tipo
    if (updates.ativo !== undefined) data.ativo = updates.ativo
    if (novaSenha) data.senha_hash = await bcrypt.hash(novaSenha, 12)

    await prisma.associado.update({ where: { id }, data })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PATCH /api/auth/associado:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
