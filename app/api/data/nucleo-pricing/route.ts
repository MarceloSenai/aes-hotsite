import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // sort_order importa: a home mostra o primeiro preço da lista como
    // "a partir de", então a linha de hospedagem precisa vir antes da diarista.
    const data = await prisma.nucleoPricing.findMany({
      include: { precos: { orderBy: { sort_order: 'asc' } } },
    })

    // Rename 'precos' → 'nucleo_precos' for backward compatibility
    const result = data.map(({ precos, ...rest }) => ({
      ...rest,
      nucleo_precos: precos,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/data/nucleo-pricing:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
