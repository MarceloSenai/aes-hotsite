import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/security/rate-limiter'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Assunto obrigatório'),
  message: z.string().min(5, 'Mensagem obrigatória').max(5000, 'Mensagem muito longa (máx. 5000 caracteres)'),
})

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const limit = checkRateLimit(`contact:${ip}`)
    if (!limit.allowed) {
      return NextResponse.json({ error: 'Muitas mensagens enviadas. Tente novamente mais tarde.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('POST /api/contact:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
