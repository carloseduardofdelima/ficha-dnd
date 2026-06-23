import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, noteId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, noteId } = await params
  const body = await req.json()

  try {
    // Check if user owns the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Clean data for Prisma
    const { id: _id, campaignId: _cid, createdAt: _ca, updatedAt: _ua, ...data } = body

    const campaignNote = await prisma.campaignNote.update({
      where: { id: noteId },
      data
    })
    return NextResponse.json(campaignNote)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, noteId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, noteId } = await params

  try {
    // Check if user owns the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.campaignNote.delete({
      where: { id: noteId }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
