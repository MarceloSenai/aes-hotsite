import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = subscribeSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    await prisma.newsletterSubscription.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email, name: parsed.data.name || null },
      update: { isActive: true, unsubscribedAt: null },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('POST /api/newsletter:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email obrigatório.' }, { status: 400 })
    }

    // Verify the subscription exists before unsubscribing
    const sub = await prisma.newsletterSubscription.findUnique({ where: { email } })
    if (!sub) {
      // Don't reveal whether email exists — return success either way
      return NextResponse.json({ ok: true })
    }

    await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/newsletter:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
