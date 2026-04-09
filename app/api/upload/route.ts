import { NextRequest, NextResponse } from 'next/server'
import { uploadBlob, deleteBlob } from '@/lib/azure-storage'

const ALLOWED_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
])
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_BUCKETS = new Set(['aes-galeria', 'aes-documentos', 'aes-boletins', 'aes-uploads'])

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const bucket = formData.get('bucket') as string | null
    const path = formData.get('path') as string | null

    if (!file || !bucket || !path) {
      return NextResponse.json({ error: 'file, bucket, and path are required' }, { status: 400 })
    }

    // Validate bucket (prevent arbitrary container access)
    if (!ALLOWED_BUCKETS.has(bucket)) {
      return NextResponse.json({ error: 'Bucket não permitido.' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Tipo de arquivo não permitido.' }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Arquivo excede o limite de 10 MB.' }, { status: 400 })
    }

    // Sanitize path (prevent directory traversal)
    const safePath = path.replace(/\.\./g, '').replace(/^\/+/, '')

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadBlob(bucket, safePath, buffer, file.type)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('POST /api/upload:', error)
    const msg = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { bucket, path } = await req.json()
    if (!bucket || !path) {
      return NextResponse.json({ error: 'bucket and path required' }, { status: 400 })
    }

    if (!ALLOWED_BUCKETS.has(bucket)) {
      return NextResponse.json({ error: 'Bucket não permitido.' }, { status: 400 })
    }

    const ok = await deleteBlob(bucket, path)
    return NextResponse.json({ ok })
  } catch (error) {
    console.error('DELETE /api/upload:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
