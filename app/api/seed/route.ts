import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// TEMPORARY: Remove after creating admin user
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('key')
  if (secret !== 'aes-seed-2026') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const cpf = '00000000000'
  const senha = 'Admin@2026'

  const exists = await prisma.associado.findUnique({ where: { cpf } })
  if (exists) {
    return NextResponse.json({ msg: 'Admin já existe', cpf })
  }

  const hash = await bcrypt.hash(senha, 12)
  await prisma.associado.create({
    data: {
      cpf,
      nome: 'Administrador AES',
      email: 'admin@aessenai.org.br',
      senha_hash: hash,
      tipo: 'titular',
      ativo: true,
    },
  })

  return NextResponse.json({ msg: 'Admin criado!', cpf, senha })
}
