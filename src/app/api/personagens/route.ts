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

  const parsedCharacters = characters.map(c => ({
    ...c,
    skills: c.skills ? JSON.parse(c.skills) : null,
    inventory: c.inventory ? JSON.parse(c.inventory) : null,
    spells: c.spells ? JSON.parse(c.spells) : null,
    traits: c.traits ? JSON.parse(c.traits) : null,
    defenses: (c as any).defenses ? JSON.parse((c as any).defenses) : null,
  }))

  return NextResponse.json(parsedCharacters)
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
      background: body.background || '',
      strength: body.strength || 10,
      dexterity: body.dexterity || 10,
      constitution: body.constitution || 10,
      intelligence: body.intelligence || 10,
      wisdom: body.wisdom || 10,
      charisma: body.charisma || 10,
      maxHp: body.maxHp || 10,
      currentHp: body.maxHp || 10,
      armorClass: body.armorClass || 10,
      speed: body.speed || 30,
      initiative: body.initiative || 0,
      proficiencyBonus: body.proficiencyBonus || 2,
      skills: body.skills ? JSON.stringify(body.skills) : null,
      inventory: body.inventory ? JSON.stringify(body.inventory) : null,
      spells: body.spells ? JSON.stringify(body.spells) : null,
      traits: body.traits ? JSON.stringify(body.traits) : null,
      appearance: body.appearance,
      backstory: body.backstory,
      avatarUrl: body.avatarUrl,
      isPublic: body.isPublic || false,
      notes: body.notes,
    } as any, // Cast to any to avoid error until prisma generate succeeds
  })

  return NextResponse.json(character, { status: 201 })
}
