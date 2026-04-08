import { NextRequest, NextResponse } from 'next/server'
import { uploadBlob, deleteBlob } from '@/lib/azure-storage'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const bucket = formData.get('bucket') as string | null
    const path = formData.get('path') as string | null

    if (!file || !bucket || !path) {
      return NextResponse.json({ error: 'file, bucket, and path are required' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadBlob(bucket, path, buffer, file.type)

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

    const ok = await deleteBlob(bucket, path)
    return NextResponse.json({ ok })
  } catch (error) {
    console.error('DELETE /api/upload:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
