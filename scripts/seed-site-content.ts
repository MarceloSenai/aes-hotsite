import { PrismaClient } from '@prisma/client'
import { PrismaMssql } from '@prisma/adapter-mssql'

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')

const adapter = new PrismaMssql(url)
const prisma = new PrismaClient({ adapter })

const ROWS: { section: string; key: string; label: string; value: string; sort_order: number }[] = [
  { section: 'stats', key: 'eyebrow', label: 'Selo acima do título', value: 'Nossos Números', sort_order: 0 },
  { section: 'stats', key: 'subtitle', label: 'Subtítulo da seção', value: 'Décadas de dedicação ao bem-estar e lazer dos associados e seus dependentes', sort_order: 1 },
  { section: 'stats', key: 'label1', label: 'Card 1 — título', value: 'Anos de História', sort_order: 2 },
  { section: 'stats', key: 'description1', label: 'Card 1 — descrição', value: 'Fundada em 1947, promovendo lazer e bem-estar', sort_order: 3 },
  { section: 'stats', key: 'label2', label: 'Card 2 — título', value: 'Núcleos de Lazer', sort_order: 4 },
  { section: 'stats', key: 'description2', label: 'Card 2 — descrição', value: 'Clube de Campo, Náutico Boracéia e Colônia Itanhaém', sort_order: 5 },
  { section: 'stats', key: 'label3', label: 'Card 3 — título', value: 'Membros na Administração', sort_order: 6 },
  { section: 'stats', key: 'description3', label: 'Card 3 — descrição', value: 'Conselho Deliberativo, Fiscal e Diretoria Executiva', sort_order: 7 },
  { section: 'stats', key: 'label4', label: 'Card 4 — título', value: 'Anos de Utilidade Pública', sort_order: 8 },
  { section: 'stats', key: 'description4', label: 'Card 4 — descrição', value: 'Reconhecida desde 1966 pelo poder público', sort_order: 9 },
]

async function main() {
  for (const row of ROWS) {
    await prisma.siteContent.upsert({
      where: { section_key: { section: row.section, key: row.key } },
      update: {},
      create: row,
    })
    console.log(`ok: ${row.section}.${row.key}`)
  }
  console.log(`\n${ROWS.length} textos verificados/criados.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
