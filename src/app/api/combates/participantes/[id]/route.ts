import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
    const participant = await prisma.combatParticipant.findUnique({
      where: { id },
      include: { stats: true }
    })

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 })
    }

    // Update basic participant info
    const updatedParticipant = await prisma.combatParticipant.update({
      where: { id },
      data: {
        initiative: body.initiative,
        turnOrder: body.turnOrder,
        isAlive: body.isAlive
      }
    })

    // Update stats ONLY for non-players
    if (participant.entityType !== 'player' && body.stats) {
      await prisma.combatParticipantStats.update({
        where: { participantId: id },
        data: {
          currentHp: body.stats.currentHp,
          maxHp: body.stats.maxHp,
          ac: body.stats.ac
        }
      })
    }

    return NextResponse.json({ ...updatedParticipant, stats: body.stats })
  } catch (error) {
    console.error('Error updating participant:', error)
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
    await prisma.combatParticipant.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting participant:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
