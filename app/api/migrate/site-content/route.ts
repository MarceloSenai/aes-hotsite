import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// TEMPORARY: cria a tabela site_content (se não existir) e popula os textos
// padrão. Idempotente — pode ser chamado várias vezes sem duplicar dados.
// Remover depois que a tabela estiver criada em produção.

const ROWS = [
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

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('key')
  if (secret !== 'aes-seed-2026') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await prisma.$executeRawUnsafe(`
      IF NOT EXISTS (
          SELECT 1 FROM sys.tables
          WHERE name = 'site_content' AND schema_id = SCHEMA_ID('dbo')
      )
      BEGIN
          CREATE TABLE [dbo].[site_content] (
              [id]         NVARCHAR(1000) NOT NULL,
              [section]    NVARCHAR(1000) NOT NULL,
              [key]        NVARCHAR(1000) NOT NULL,
              [label]      NVARCHAR(1000) NOT NULL,
              [value]      NVARCHAR(max)  NOT NULL,
              [sort_order] INT      NOT NULL CONSTRAINT [site_content_sort_order_df] DEFAULT 0,
              [updated_at] DATETIME2 NOT NULL CONSTRAINT [site_content_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT [site_content_pkey] PRIMARY KEY CLUSTERED ([id]),
              CONSTRAINT [site_content_section_key_uq] UNIQUE ([section], [key])
          );
      END
    `)

    let seeded = 0
    for (const row of ROWS) {
      await prisma.siteContent.upsert({
        where: { section_key: { section: row.section, key: row.key } },
        update: {},
        create: { id: `${row.section}-${row.key}`, ...row },
      })
      seeded++
    }

    return NextResponse.json({ ok: true, seeded })
  } catch (error) {
    console.error('GET /api/migrate/site-content:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
