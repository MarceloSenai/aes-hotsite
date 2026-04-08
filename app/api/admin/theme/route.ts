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

export async function PUT(req: NextRequest) {
  try {
    const { theme_config } = await req.json()

    await prisma.siteConfig.upsert({
      where: { id: 'main' },
      update: {
        theme_config: JSON.stringify(theme_config),
        updated_at: new Date(),
      },
      create: {
        id: 'main',
        theme_config: JSON.stringify(theme_config),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PUT /api/admin/theme:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
