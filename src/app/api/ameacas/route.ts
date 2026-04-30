import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const campaignId = searchParams.get('campaignId')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  try {
    const threats = await prisma.threat.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { isPublic: true }
        ],
        AND: [
          campaignId ? { campaignId } : { isTemplate: true },
          type ? { threatType: type } : {},
          search ? { name: { contains: search, mode: 'insensitive' } } : {}
        ]
      },
      include: {
        attributes: true,
        combat: true,
        actions: true,
        skills: true
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(threats)
  } catch (error) {
    console.error('Error fetching threats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  try {
    const threat = await prisma.threat.create({
      data: {
        userId: session.user.id,
        campaignId: body.campaignId,
        name: body.name,
        description: body.description,
        threatType: body.threatType || 'monster',
        level: body.level,
        challengeRating: body.challengeRating,
        isTemplate: body.isTemplate || false,
        isPublic: body.isPublic || false,
        attributes: {
          create: body.attributes || {}
        },
        combat: {
          create: body.combat || {}
        },
        actions: {
          create: body.actions || []
        },
        skills: {
          create: body.skills || []
        }
      },
      include: {
        attributes: true,
        combat: true,
        actions: true,
        skills: true
      }
    })

    return NextResponse.json(threat)
  } catch (error) {
    console.error('Error creating threat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
