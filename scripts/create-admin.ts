import { PrismaClient } from '@prisma/client'
import { PrismaMssql } from '@prisma/adapter-mssql'
import bcrypt from 'bcryptjs'

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')

const adapter = new PrismaMssql(url)
const prisma = new PrismaClient({ adapter })

async function main() {
  // List existing
  const existing = await prisma.associado.findMany({
    select: { id: true, cpf: true, nome: true, tipo: true, ativo: true },
  })
  console.log('Associados existentes:', existing.length)
  existing.forEach((a) => console.log(`  - ${a.cpf} | ${a.nome} | ${a.tipo} | ativo=${a.ativo}`))

  // Create admin associado
  const cpf = '00000000000'
  const senha = 'Admin@2026'

  const exists = await prisma.associado.findUnique({ where: { cpf } })
  if (exists) {
    console.log(`\nAdmin já existe: CPF ${cpf}`)
  } else {
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
    console.log(`\nAdmin criado!`)
  }

  console.log(`\n  CPF: ${cpf}`)
  console.log(`  Senha: ${senha}`)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
