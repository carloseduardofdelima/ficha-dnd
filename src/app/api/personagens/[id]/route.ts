import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  
  // Try finding by ID or Slug
  let character = await prisma.character.findUnique({ where: { id } })
  if (!character) {
    character = await prisma.character.findUnique({ where: { slug: id } })
  }
  
  if (!character) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  // Privacy check: Must be owner OR the character must be public OR be admin
  const ADMIN_EMAILS = ['carloseduardoff12@gmail.com', 'hellendagnysouza@gmail.com']
  const isAdmin = ADMIN_EMAILS.includes(session?.user?.email ?? '')
  const isOwner = session?.user?.id === character.userId
  
  if (!character.isPublic && !isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Check if saved by current user
  let isSaved = false
  if (session?.user?.id) {
    const saved = await prisma.savedCharacter.findUnique({
      where: {
        userId_characterId: {
          userId: session?.user?.id,
          characterId: id
        }
      }
    })
    isSaved = !!saved
  }
  
  const parsedCharacter = {
    ...character,
    isAdmin,
    isOwner,
    sessionUserId: session?.user?.id,
    isSaved,
    skills: character.skills ? JSON.parse(character.skills) : null,
    inventory: character.inventory ? JSON.parse(character.inventory) : null,
    spells: character.spells ? JSON.parse(character.spells) : null,
    traits: character.traits ? JSON.parse(character.traits) : null,
    defenses: (character as any).defenses ? JSON.parse((character as any).defenses) : null,
    spellSlots: character.spellSlots,
    resources: character.resources,
    companions: character.companions ? JSON.parse(character.companions) : null,
  }

  return NextResponse.json(parsedCharacter)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const existing = await prisma.character.findUnique({ where: { id } })
  const ADMIN_EMAILS = ['carloseduardoff12@gmail.com', 'hellendagnysouza@gmail.com']
  const isAdmin = ADMIN_EMAILS.includes(session?.user?.email ?? '')
  if (!existing || (existing.userId !== session?.user?.id && !isAdmin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const updated = await prisma.character.update({
    where: { id },
    data: {
      name: body.name,
      race: body.race,
      subrace: body.subrace,
      class: body.class,
      subclass: body.subclass,
      level: body.level,
      background: body.background,
      avatarUrl: body.avatarUrl,
      playerName: body.playerName,
      strength: body.strength,
      dexterity: body.dexterity,
      constitution: body.constitution,
      intelligence: body.intelligence,
      wisdom: body.wisdom,
      charisma: body.charisma,
      maxHp: body.maxHp,
      currentHp: body.currentHp,
      armorClass: body.armorClass,
      speed: body.speed,
      initiative: body.initiative,
      proficiencyBonus: body.proficiencyBonus,
      ruleset: body.ruleset,
      isPublic: body.isPublic,
      notes: body.notes,
      spellSlots: body.spellSlots,
      resources: body.resources,
      exp: body.exp,
      skills: body.skills,
      inventory: body.inventory,
      spells: body.spells,
      traits: body.traits,
      appearance: body.appearance,
      backstory: body.backstory,
      personalityTraits: body.personalityTraits,
      ideals: body.ideals,
      bonds: body.bonds,
      flaws: body.flaws,
      defenses: body.defenses,
      companions: body.companions,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const existing = await prisma.character.findUnique({ where: { id } })
  const ADMIN_EMAILS = ['carloseduardoff12@gmail.com', 'hellendagnysouza@gmail.com']
  const isAdmin = ADMIN_EMAILS.includes(session?.user?.email ?? '')
  if (!existing || (existing.userId !== session?.user?.id && !isAdmin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.character.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
