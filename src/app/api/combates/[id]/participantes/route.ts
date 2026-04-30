import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json() // { entityType, entityId, name, initiative, maxHp, currentHp, ac }

  try {
    const participant = await prisma.combatParticipant.create({
      data: {
        combatId: id,
        entityType: body.entityType,
        entityId: body.entityId,
        name: body.name,
        initiative: body.initiative || 0,
        turnOrder: body.turnOrder || 0,
        isAlive: true,
        stats: (body.entityType !== 'player') ? {
          create: {
            maxHp: body.maxHp || 10,
            currentHp: body.currentHp || body.maxHp || 10,
            ac: body.ac || 10
          }
        } : undefined
      },
      include: {
        stats: true
      }
    })

    return NextResponse.json(participant)
  } catch (error) {
    console.error('Error adding participant:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
