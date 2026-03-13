import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(character)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const existing = await prisma.character.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const updated = await prisma.character.update({
    where: { id },
    data: {
      name: body.name,
      race: body.race,
      class: body.class,
      level: body.level,
      strength: body.strength,
      dexterity: body.dexterity,
      constitution: body.constitution,
      intelligence: body.intelligence,
      wisdom: body.wisdom,
      charisma: body.charisma,
      maxHp: body.maxHp,
      currentHp: body.currentHp,
      armorClass: body.armorClass,
      isPublic: body.isPublic,
      notes: body.notes,
      avatarUrl: body.avatarUrl,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const existing = await prisma.character.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.character.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
