import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const tipoPlano = request.nextUrl.searchParams.get('tipo_plano')

    const data = await prisma.planoSaude.findMany({
      where: tipoPlano ? { tipo_plano: tipoPlano } : undefined,
      include: { faixas: true },
    })

    // Rename 'faixas' → 'plano_faixas' for backward compatibility
    const result = data.map(({ faixas, ...rest }) => ({
      ...rest,
      plano_faixas: faixas,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/data/planos-saude:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
