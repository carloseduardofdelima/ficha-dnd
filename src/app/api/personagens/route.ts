import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { isUserAdmin } from '@/lib/admin'
import { uploadBase64ToStorage } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const forCampaign = searchParams.get('forCampaign') === 'true'
  const allParam = searchParams.get('all') === 'true'

  // Define minimal fields for list view to avoid Payload Too Large (413)
  const listFields = {
    id: true,
    name: true,
    race: true,
    class: true,
    level: true,
    avatarUrl: true,
    slug: true,
    createdAt: true,
    isPublic: true,
    ruleset: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      }
    }
  }

  const isAdmin = isUserAdmin(session?.user?.email)

  // System admin sees all characters without restriction
  if (isAdmin) {
    const allCharacters = await prisma.character.findMany({
      select: listFields,
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(allCharacters)
  }

  // Check if user is a dungeon master (has created at least one campaign)
  let isMaster = false
  if (forCampaign || allParam) {
    const campaignCount = await prisma.campaign.count({
      where: { userId: session.user.id }
    })
    isMaster = campaignCount > 0
  }

  // For Dungeon Masters (or when linking characters to a campaign):
  // ONLY public characters from other users + user's own characters
  if (isMaster || forCampaign || allParam) {
    const characters = await prisma.character.findMany({
      where: {
        OR: [
          { isPublic: true },
          { userId: session.user.id }
        ]
      },
      select: listFields,
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(characters)
  }

  // Regular user sees owned and saved characters
  const owned = await prisma.character.findMany({
    where: { userId: session?.user?.id },
    select: listFields,
    orderBy: { updatedAt: 'desc' },
  })

  const savedEntries = await prisma.savedCharacter.findMany({
    where: { userId: session?.user?.id },
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

  const allCharacters = [...owned, ...saved]

  return NextResponse.json(allCharacters)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const avatarUrl = await uploadBase64ToStorage(body.avatarUrl, 'avatars', session.user.id)

  const character = await prisma.character.create({
    data: {
      slug: nanoid(10),
      userId: session?.user?.id,
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
      avatarUrl,
      isPublic: body.isPublic || false,
      notes: body.notes,
      spellSlots: body.spellSlots,
      resources: body.resources,
      ruleset: body.ruleset,
    } as any,
  })

  return NextResponse.json(character, { status: 201 })
}
