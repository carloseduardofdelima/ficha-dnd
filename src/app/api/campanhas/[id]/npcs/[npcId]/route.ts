import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, npcId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { npcId } = await params
  const data = await req.json()

  try {
    const npc = await prisma.npc.update({
      where: { id: npcId, userId: session.user.id },
      data,
      include: { combat: true }
    })
    return NextResponse.json(npc)
  } catch (error) {
    console.error('Error updating NPC:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, npcId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { npcId } = await params

  try {
    await prisma.npc.delete({
      where: { id: npcId, userId: session.user.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting NPC:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
