import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const createSchema = z.object({
  cpf: z.string().transform(v => v.replace(/\D/g, '')).pipe(z.string().length(11, 'CPF deve ter 11 dígitos')),
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  telefone: z.string().optional().or(z.literal('')),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  tipo: z.enum(['titular', 'dependente', 'agregado']).default('titular'),
})

const updateSchema = z.object({
  id: z.string().min(1, 'ID obrigatório'),
  nome: z.string().min(2).optional(),
  email: z.string().email().optional().or(z.literal('')),
  telefone: z.string().optional().or(z.literal('')),
  tipo: z.enum(['titular', 'dependente', 'agregado']).optional(),
  ativo: z.boolean().optional(),
  novaSenha: z.string().min(6).optional(),
})

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
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { cpf, nome, email, telefone, senha, tipo } = parsed.data
    const hash = await bcrypt.hash(senha, 12)

    await prisma.associado.create({
      data: {
        cpf,
        nome,
        email: email || null,
        telefone: telefone || null,
        senha_hash: hash,
        tipo,
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
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { id, novaSenha, ...updates } = parsed.data

    const data: Record<string, unknown> = {}
    if (updates.nome !== undefined) data.nome = updates.nome
    if (updates.email !== undefined) data.email = updates.email || null
    if (updates.telefone !== undefined) data.telefone = updates.telefone || null
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
