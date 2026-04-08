import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type ModelName = keyof typeof prisma & string

const TABLE_MODEL_MAP: Record<string, ModelName> = {
  site_config: 'siteConfig',
  site_emails: 'siteEmail',
  social_links: 'socialLink',
  carousel_slides: 'carouselSlide',
  eventos: 'evento',
  boletins: 'boletim',
  representantes: 'representante',
  galeria: 'galeria',
  documentos: 'documento',
  parcerias: 'parceria',
  planos_saude: 'planoSaude',
  plano_faixas: 'planoFaixa',
  parceiros_seguro: 'parceiroSeguro',
  farmacia: 'farmacia',
  nucleo_pricing: 'nucleoPricing',
  nucleo_precos: 'nucleoPreco',
  nucleo_videos: 'nucleoVideo',
}

const INCLUDE_MAP: Record<string, Record<string, boolean>> = {
  planos_saude: { faixas: true },
  nucleo_pricing: { precos: true },
}

const RELATION_RENAME: Record<string, Record<string, string>> = {
  planos_saude: { faixas: 'plano_faixas' },
  nucleo_pricing: { precos: 'nucleo_precos' },
}

function getModel(table: string) {
  const modelName = TABLE_MODEL_MAP[table]
  if (!modelName) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[modelName]
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const table = searchParams.get('table')
  const id = searchParams.get('id')
  const orderBy = searchParams.get('orderBy')
  const include = searchParams.get('include')

  if (!table) return NextResponse.json({ error: 'table required' }, { status: 400 })

  const model = getModel(table)
  if (!model) return NextResponse.json({ error: 'unknown table' }, { status: 400 })

  try {
    if (id) {
      const data = await model.findUnique({ where: { id } })
      if (!data) return NextResponse.json(null, { status: 404 })
      return NextResponse.json(data)
    }

    // Build query args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const args: any = {}
    if (orderBy) args.orderBy = { [orderBy]: 'asc' }
    if (include && INCLUDE_MAP[table]) args.include = INCLUDE_MAP[table]

    // Handle filters (filter_<field>=value)
    const where: Record<string, unknown> = {}
    searchParams.forEach((value, key) => {
      if (key.startsWith('filter_')) {
        where[key.replace('filter_', '')] = value
      }
    })
    if (Object.keys(where).length > 0) args.where = where

    let data = await model.findMany(args)

    // Rename relation fields for backward compat
    if (RELATION_RENAME[table]) {
      const renames = RELATION_RENAME[table]
      data = data.map((item: Record<string, unknown>) => {
        const result = { ...item }
        for (const [from, to] of Object.entries(renames)) {
          if (result[from] !== undefined) {
            result[to] = result[from]
            delete result[from]
          }
        }
        return result
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`GET /api/data [${table}]:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { table, data } = body

  if (!table || !data) return NextResponse.json({ error: 'table and data required' }, { status: 400 })

  const model = getModel(table)
  if (!model) return NextResponse.json({ error: 'unknown table' }, { status: 400 })

  try {
    const result = await model.create({ data })
    return NextResponse.json(result)
  } catch (error) {
    console.error(`POST /api/data [${table}]:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { table, id, data } = body

  if (!table || !id || !data) return NextResponse.json({ error: 'table, id, and data required' }, { status: 400 })

  const model = getModel(table)
  if (!model) return NextResponse.json({ error: 'unknown table' }, { status: 400 })

  try {
    const result = await model.update({ where: { id }, data })
    return NextResponse.json(result)
  } catch (error) {
    console.error(`PUT /api/data [${table}]:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { table, id } = body

  if (!table || !id) return NextResponse.json({ error: 'table and id required' }, { status: 400 })

  const model = getModel(table)
  if (!model) return NextResponse.json({ error: 'unknown table' }, { status: 400 })

  try {
    await model.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(`DELETE /api/data [${table}]:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { table, data } = body

  if (!table || !data) return NextResponse.json({ error: 'table and data required' }, { status: 400 })

  const model = getModel(table)
  if (!model) return NextResponse.json({ error: 'unknown table' }, { status: 400 })

  const id = data.id ?? 'main'

  try {
    const result = await model.upsert({
      where: { id },
      update: data,
      create: data,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error(`PATCH /api/data [${table}]:`, error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
