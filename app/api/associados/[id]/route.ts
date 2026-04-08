import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await req.json()

    const data: Record<string, unknown> = {}
    if (updates.nome !== undefined) data.nome = updates.nome
    if (updates.email !== undefined) data.email = updates.email
    if (updates.telefone !== undefined) data.telefone = updates.telefone
    if (updates.tipo !== undefined) data.tipo = updates.tipo
    if (updates.ativo !== undefined) data.ativo = updates.ativo
    if (updates.novaSenha) data.senha_hash = await bcrypt.hash(updates.novaSenha, 12)

    await prisma.associado.update({ where: { id }, data })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PATCH /api/associados/[id]:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
