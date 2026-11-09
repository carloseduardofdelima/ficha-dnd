import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const FALLBACK_IMAGE = 'https://www.enworld.org/attachments/dd-tashas-1604041136985-jpg.128081/'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    let character = await prisma.character.findUnique({
      where: { id },
      select: { id: true, avatarUrl: true },
    })

    if (!character) {
      character = await prisma.character.findUnique({
        where: { slug: id },
        select: { id: true, avatarUrl: true },
      })
    }

    if (!character || !character.avatarUrl) {
      return NextResponse.redirect(FALLBACK_IMAGE)
    }

    const { avatarUrl } = character

    if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
      return NextResponse.redirect(avatarUrl)
    }

    if (avatarUrl.startsWith('data:')) {
      const match = avatarUrl.match(/^data:([^;]+);base64,(.+)$/)
      if (match) {
        const contentType = match[1]
        const buffer = Buffer.from(match[2], 'base64')
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          },
        })
      }
    }

    return NextResponse.redirect(FALLBACK_IMAGE)
  } catch (err) {
    console.error('Erro ao buscar avatar do personagem:', err)
    return NextResponse.redirect(FALLBACK_IMAGE)
  }
}

