import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { cpf, senha } = await req.json()
    const cpfLimpo = cpf.replace(/\D/g, '')

    const associado = await prisma.associado.findUnique({ where: { cpf: cpfLimpo } })

    if (!associado) {
      return NextResponse.json({ ok: false, error: 'CPF não encontrado.' })
    }

    if (!associado.ativo) {
      return NextResponse.json({ ok: false, error: 'Conta desativada. Entre em contato com a AES.' })
    }

    const senhaValida = await bcrypt.compare(senha, associado.senha_hash)
    if (!senhaValida) {
      return NextResponse.json({ ok: false, error: 'Senha incorreta.' })
    }

    const { senha_hash: _, ...safe } = associado
    return NextResponse.json({ ok: true, associado: safe })
  } catch (error) {
    console.error('POST /api/associados/login:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
