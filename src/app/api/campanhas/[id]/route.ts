import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        sessions: { orderBy: { number: 'desc' } },
        characters: { include: { character: { include: { user: true } } } },
        notes_list: true,
        threats: { include: { attributes: true, combat: true, actions: true, skills: true } },
        combats: { include: { participants: true } },
        npcs: { include: { combat: true, sessions: true }, orderBy: { createdAt: 'desc' } }
      }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const isOwner = campaign.userId === session?.user?.id
    const isPlayer = campaign.characters.some(link => link.character.userId === session?.user?.id)

    if (!isOwner && !isPlayer) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // If it's a player (and not owner), filter the data
    if (!isOwner) {
      campaign.notes = null // Hide master notes from players
      // Filter notes
      campaign.notes_list = campaign.notes_list.filter(n => n.isPublic)
      
      // Hide NPC secrets and private info
      campaign.npcs = campaign.npcs.map(npc => ({
        ...npc,
        secrets: null, // Hide secrets
        notes: null,   // Hide private DM notes
      }))

      // Hide some details of threats (optional, but safer)
      // campaign.threats = campaign.threats.map(t => ({ ...t, attributes: null, combat: null }))
    }

    return NextResponse.json({
      ...campaign,
      isOwner,
      isPlayer
    })
  } catch (error) {
    console.error('Error fetching campaign:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const data = await req.json()

  try {
    const campaign = await prisma.campaign.update({
      where: { id, userId: session?.user?.id },
      data
    })
    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Error updating campaign:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await prisma.campaign.delete({
      where: { id, userId: session?.user?.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting campaign:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
