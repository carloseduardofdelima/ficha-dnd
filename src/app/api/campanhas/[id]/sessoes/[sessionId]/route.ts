import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, sessionId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, sessionId } = await params
  const data = await req.json()

  try {
    // Check if user owns the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const campaignSession = await prisma.campaignSession.update({
      where: { id: sessionId },
      data
    })
    return NextResponse.json(campaignSession)
  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, sessionId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, sessionId } = await params

  try {
    // Check if user owns the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.campaignSession.delete({
      where: { id: sessionId }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
