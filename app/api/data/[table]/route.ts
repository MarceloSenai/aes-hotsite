import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SINGLETONS = new Set(['site_config', 'farmacia'])

const ORDER_BY_MAP: Record<string, Record<string, 'asc' | 'desc'>> = {
  site_emails: { sort_order: 'asc' },
  social_links: { sort_order: 'asc' },
  carousel_slides: { sort_order: 'asc' },
  eventos: { created_at: 'asc' },
  boletins: { numero: 'asc' },
  representantes: { sort_order: 'asc' },
  galeria: { created_at: 'asc' },
  documentos: { created_at: 'asc' },
  parcerias: { sort_order: 'asc' },
  nucleo_videos: { sort_order: 'asc' },
  popup_modals: { sort_order: 'asc' },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getModel(table: string): any {
  switch (table) {
    case 'site_config': return prisma.siteConfig
    case 'site_emails': return prisma.siteEmail
    case 'social_links': return prisma.socialLink
    case 'carousel_slides': return prisma.carouselSlide
    case 'eventos': return prisma.evento
    case 'boletins': return prisma.boletim
    case 'representantes': return prisma.representante
    case 'galeria': return prisma.galeria
    case 'documentos': return prisma.documento
    case 'parcerias': return prisma.parceria
    case 'parceiros_seguro': return prisma.parceiroSeguro
    case 'farmacia': return prisma.farmacia
    case 'nucleo_videos': return prisma.nucleoVideo
    case 'popup_modals': return prisma.popupModal
    default: return null
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params

  const model = getModel(table)
  if (!model) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 404 })
  }

  try {
    // Singletons: return single record
    if (SINGLETONS.has(table)) {
      const data = await model.findUnique({ where: { id: 'main' } })
      return NextResponse.json(data)
    }

    // Build query args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const args: any = {}

    // Apply default ordering
    if (ORDER_BY_MAP[table]) {
      args.orderBy = ORDER_BY_MAP[table]
    }

    // nucleo_videos: optional filter by nucleo_id
    if (table === 'nucleo_videos') {
      const nucleoId = request.nextUrl.searchParams.get('nucleo_id')
      if (nucleoId) {
        args.where = { nucleo_id: nucleoId }
      }
    }

    const data = await model.findMany(args)
    return NextResponse.json(data)
  } catch (error) {
    console.error(`GET /api/data/${table}:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Cria (ou faz upsert quando vem `id`, ex.: singletons site_config/farmacia)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params
  const model = getModel(table)
  if (!model) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 404 })
  }
  try {
    const data = await request.json()
    let result
    if (data && data.id) {
      result = await model.upsert({ where: { id: data.id }, update: data, create: data })
    } else {
      result = await model.create({ data })
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error(`POST /api/data/${table}:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Atualiza por id (body: { id, ...campos })
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params
  const model = getModel(table)
  if (!model) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 404 })
  }
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const result = await model.update({ where: { id }, data })
    return NextResponse.json(result)
  } catch (error) {
    console.error(`PATCH /api/data/${table}:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Remove por id (body: { id })
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params
  const model = getModel(table)
  if (!model) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 404 })
  }
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await model.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(`DELETE /api/data/${table}:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
