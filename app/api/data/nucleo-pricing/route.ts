import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.nucleoPricing.findMany({
      include: { precos: true },
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
