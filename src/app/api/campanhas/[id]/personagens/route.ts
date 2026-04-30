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
