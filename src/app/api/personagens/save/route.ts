import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { characterId } = await req.json()
  if (!characterId) return NextResponse.json({ error: 'Missing characterId' }, { status: 400 })

  let character = await prisma.character.findUnique({
    where: { id: characterId }
  })

  if (!character) {
    character = await prisma.character.findUnique({
      where: { slug: characterId }
    })
  }

  if (!character) return NextResponse.json({ error: 'Character not found' }, { status: 404 })
  
  // Can't save your own character (it's already yours)
  if (character.userId === session.user.id) {
    return NextResponse.json({ error: 'Cannot save your own character' }, { status: 400 })
  }

  // Can only save public characters
  if (!character.isPublic) {
    return NextResponse.json({ error: 'Character is private' }, { status: 403 })
  }

  // Toggle save
  const existing = await prisma.savedCharacter.findUnique({
    where: {
      userId_characterId: {
        userId: session.user.id,
        characterId: character.id
      }
    }
  })

  if (existing) {
    await prisma.savedCharacter.delete({
      where: { id: existing.id }
    })
    return NextResponse.json({ saved: false })
  } else {
    await prisma.savedCharacter.create({
      data: {
        userId: session.user.id,
        characterId: character.id
      }
    })
    return NextResponse.json({ saved: true })
  }
}
