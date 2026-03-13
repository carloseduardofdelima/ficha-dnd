import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const characters = await prisma.character.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(characters)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  const character = await prisma.character.create({
    data: {
      slug: nanoid(10),
      userId: session.user.id,
      name: body.name || 'Novo Personagem',
      race: body.race || '',
      class: body.class || '',
      level: body.level || 1,
      strength: body.strength || 10,
      dexterity: body.dexterity || 10,
      constitution: body.constitution || 10,
      intelligence: body.intelligence || 10,
      wisdom: body.wisdom || 10,
      charisma: body.charisma || 10,
      maxHp: body.maxHp || 10,
      currentHp: body.maxHp || 10,
      armorClass: body.armorClass || 10,
      isPublic: body.isPublic || false,
      notes: body.notes,
      avatarUrl: body.avatarUrl,
    },
  })

  return NextResponse.json(character, { status: 201 })
}
