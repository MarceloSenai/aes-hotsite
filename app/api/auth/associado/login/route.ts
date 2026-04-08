import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { cpf, senha } = await request.json()
    const cpfLimpo = cpf.replace(/\D/g, '')

    const associado = await prisma.associado.findUnique({ where: { cpf: cpfLimpo } })

    if (!associado) {
      return NextResponse.json({ ok: false, error: 'CPF não encontrado.' }, { status: 401 })
    }

    if (!associado.ativo) {
      return NextResponse.json(
        { ok: false, error: 'Conta desativada. Entre em contato com a AES.' },
        { status: 401 }
      )
    }

    const senhaValida = await bcrypt.compare(senha, associado.senha_hash)
    if (!senhaValida) {
      return NextResponse.json({ ok: false, error: 'Senha incorreta.' }, { status: 401 })
    }

    // Exclude senha_hash from response
    const { senha_hash: _, ...safe } = associado
    return NextResponse.json({ ok: true, associado: safe })
  } catch (error) {
    console.error('POST /api/auth/associado/login:', error)
    return NextResponse.json({ ok: false, error: 'Erro interno.' }, { status: 500 })
  }
}
