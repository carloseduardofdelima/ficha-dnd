import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        OR: [
          { userId: session?.user?.id },
          {
            characters: {
              some: {
                character: {
                  userId: session?.user?.id
                }
              }
            }
          }
        ]
      },
      include: {
        sessions: {
          select: { id: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    const campaignsWithProgress = campaigns.map(campaign => {
      const sessionsCount = campaign.sessions.length
      const progress = campaign.targetSessions > 0
        ? Math.min(Math.round((sessionsCount / campaign.targetSessions) * 100), 100)
        : campaign.progress // fallback to DB value if targetSessions is 0
      
      return {
        ...campaign,
        progress,
        sessions: undefined // remove the relation list to save payload size
      }
    })

    return NextResponse.json(campaignsWithProgress)
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const campaign = await prisma.campaign.create({
      data: {
        ...data,
        userId: session?.user?.id
      }
    })
    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
