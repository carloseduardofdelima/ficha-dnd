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
    const npcs = await prisma.npc.findMany({
      where: { campaignId: id, userId: session.user.id },
      include: { combat: true, sessions: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(npcs)
  } catch (error) {
    console.error('Error fetching NPCs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
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
    const npc = await prisma.npc.create({
      data: {
        ...data,
        campaignId: id,
        userId: session.user.id
      },
      include: { combat: true }
    })
    return NextResponse.json(npc)
  } catch (error) {
    console.error('Error creating NPC:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
