import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = req.headers.get('content-type') || ''
    let fileBuffer: Buffer
    let mimeType = 'image/jpeg'
    let folder = 'uploads'

    if (contentType.includes('application/json')) {
      const body = await req.json()
      if (!body.base64) {
        return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 })
      }

      folder = body.folder || 'avatars'

      // Extract mime type and base64 data
      const matches = body.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      if (matches && matches.length === 3) {
        mimeType = matches[1]
        fileBuffer = Buffer.from(matches[2], 'base64')
      } else {
        fileBuffer = Buffer.from(body.base64, 'base64')
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      folder = (formData.get('folder') as string) || 'avatars'

      if (!file) {
        return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
      }

      mimeType = file.type || 'image/jpeg'
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    } else {
      return NextResponse.json({ error: 'Content-Type não suportado' }, { status: 400 })
    }

    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg'
    const fileName = `${folder}/${session.user.id}/${nanoid(12)}_${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (error) {
      console.error('Erro no Supabase Storage:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrlData.publicUrl })
  } catch (error: any) {
    console.error('Erro no upload de imagem:', error)
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 })
  }
}
