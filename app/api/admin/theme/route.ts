import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { id: 'main' } })
    if (!config) return NextResponse.json({})

    return NextResponse.json({
      theme_config: config.theme_config ? JSON.parse(config.theme_config) : null,
    })
  } catch (error) {
    console.error('GET /api/admin/theme:', error)
    return NextResponse.json({}, { status: 500 })
  }
}

// Este endpoint é público (ver middleware.ts). Como não há autenticação, a
// validação abaixo é a única barreira contra gravação de lixo arbitrário.
const MAX_PAYLOAD_BYTES = 20_000

export async function PUT(req: NextRequest) {
  try {
    const raw = await req.text()

    if (raw.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: 'Payload muito grande' }, { status: 413 })
    }

    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
    }

    // Forma mínima de um ThemeConfig: precisa ter um objeto `colors`.
    const colors = (body as { colors?: unknown } | null)?.colors
    if (typeof body !== 'object' || body === null || typeof colors !== 'object' || colors === null) {
      return NextResponse.json({ error: 'Formato de tema inválido' }, { status: 400 })
    }

    await prisma.siteConfig.upsert({
      where: { id: 'main' },
      update: {
        theme_config: JSON.stringify(body),
        updated_at: new Date(),
      },
      create: {
        id: 'main',
        theme_config: JSON.stringify(body),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PUT /api/admin/theme:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
