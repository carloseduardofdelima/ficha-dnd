import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { characterId } = await req.json()

  try {
    const link = await prisma.characterCampaignLink.create({
      data: {
        campaignId: id,
        characterId: characterId
      }
    })
    return NextResponse.json(link)
  } catch (error) {
    console.error('Error linking character:', error)
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
  const { searchParams } = new URL(req.url)
  const characterId = searchParams.get('characterId')

  if (!characterId) {
    return NextResponse.json({ error: 'Missing characterId' }, { status: 400 })
  }

  try {
    // Check if user is campaign owner
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId: session.user.id }
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.characterCampaignLink.deleteMany({
      where: {
        characterId,
        campaignId: id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error unlinking character:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
