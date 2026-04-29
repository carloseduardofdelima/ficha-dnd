import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Define minimal fields for list view to avoid Payload Too Large (413)
  const listFields = {
    id: true,
    name: true,
    race: true,
    subrace: true,
    class: true,
    level: true,
    avatarUrl: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    isPublic: true,
    playerName: true,
    exp: true,
    proficiencyBonus: true,
    ruleset: true,
  }

  // Fetch characters
  let allCharacters;
  
  // Simple Admin check by email - change this to your email
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "carloseduardoff12@gmail.com";
  const isAdmin = session.user.email === ADMIN_EMAIL;

  if (isAdmin) {
    // Admin sees everything
    allCharacters = await prisma.character.findMany({
      select: listFields,
      orderBy: { updatedAt: 'desc' },
    });
  } else {
    // Regular user sees owned and saved
    const owned = await prisma.character.findMany({
      where: { userId: session.user.id },
      select: listFields,
      orderBy: { updatedAt: 'desc' },
    })

    const savedEntries = await prisma.savedCharacter.findMany({
      where: { userId: session.user.id },
      include: {
        character: {
          select: listFields
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    const saved = savedEntries.map((entry: any) => ({
      ...entry.character,
      isSaved: true
    }))

    allCharacters = [...owned, ...saved]
  }

  return NextResponse.json(allCharacters)
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
      subrace: body.subrace || '',
      class: body.class || '',
      subclass: body.subclass || '',
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
      personalityTraits: body.personalityTraits,
      ideals: body.ideals,
      bonds: body.bonds,
      flaws: body.flaws,
      playerName: body.playerName,
      avatarUrl: body.avatarUrl,
      isPublic: body.isPublic || false,
      notes: body.notes,
      spellSlots: body.spellSlots,
      resources: body.resources,
      ruleset: body.ruleset,
    } as any, // Cast to any to avoid error until prisma generate succeeds
  })

  return NextResponse.json(character, { status: 201 })
}
