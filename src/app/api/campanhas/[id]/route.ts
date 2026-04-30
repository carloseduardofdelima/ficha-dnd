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
        characters: { include: { character: true } },
        notes_list: true,
        threats: { include: { attributes: true, combat: true, actions: true, skills: true } },
        combats: { include: { participants: true } }
      }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Check if user is owner or has access (to be improved with links)
    if (campaign.userId !== session.user.id) {
      // For now only owner can access
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(campaign)
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
      where: { id, userId: session.user.id },
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
      where: { id, userId: session.user.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting campaign:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
