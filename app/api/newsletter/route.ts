import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    await prisma.newsletterSubscription.upsert({
      where: { email },
      create: { email, name: name || null },
      update: { isActive: true, unsubscribedAt: null },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('POST /api/newsletter:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/newsletter:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
