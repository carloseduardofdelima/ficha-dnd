import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const combat = await prisma.combat.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            stats: true
          },
          orderBy: { turnOrder: 'asc' }
        }
      }
    })

    if (!combat) {
      return NextResponse.json({ error: 'Combat not found' }, { status: 404 })
    }

    // Hydrate Player HP and avatarUrl from Character table
    const playerIds = combat.participants
      .filter(p => p.entityType === 'player')
      .map(p => p.entityId)

    const characters = await prisma.character.findMany({
      where: { id: { in: playerIds } },
      select: { id: true, currentHp: true, maxHp: true, armorClass: true, avatarUrl: true }
    })

    const charMap = new Map(characters.map(c => [c.id, c]))

    // Hydrate Threat imageUrl from Threat table
    const threatIds = combat.participants
      .filter(p => p.entityType === 'threat')
      .map(p => p.entityId)

    const threats = await prisma.threat.findMany({
      where: { id: { in: threatIds } },
      select: { id: true, imageUrl: true }
    })

    const threatMap = new Map(threats.map(t => [t.id, t]))

    // Hydrate Npc avatarUrl from Npc table
    const npcIds = combat.participants
      .filter(p => p.entityType === 'npc')
      .map(p => p.entityId)

    const npcs = await prisma.npc.findMany({
      where: { id: { in: npcIds } },
      select: { id: true, avatarUrl: true }
    })

    const npcMap = new Map(npcs.map(n => [n.id, n]))

    const hydratedParticipants = combat.participants.map(p => {
      if (p.entityType === 'player') {
        const charData = charMap.get(p.entityId)
        return {
          ...p,
          avatarUrl: charData?.avatarUrl,
          playerStats: charData
        }
      }
      if (p.entityType === 'threat') {
        const threatData = threatMap.get(p.entityId)
        return {
          ...p,
          avatarUrl: threatData?.imageUrl
        }
      }
      if (p.entityType === 'npc') {
        const npcData = npcMap.get(p.entityId)
        return {
          ...p,
          avatarUrl: npcData?.avatarUrl
        }
      }
      return p
    })

    return NextResponse.json({ ...combat, participants: hydratedParticipants })
  } catch (error) {
    console.error('Error fetching combat details:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  try {
    const combat = await prisma.combat.update({
      where: { id },
      data: {
        status: body.status,
        currentTurnIndex: body.currentTurnIndex,
        name: body.name
      }
    })

    return NextResponse.json(combat)
  } catch (error) {
    console.error('Error updating combat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await prisma.combat.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting combat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
