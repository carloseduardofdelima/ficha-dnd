import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const combats = await prisma.combat.findMany({
      where: { campaignId: id },
      include: {
        participants: {
          include: {
            stats: true
          },
          orderBy: { turnOrder: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(combats)
  } catch (error) {
    console.error('Error fetching combats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  try {
    const combat = await prisma.combat.create({
      data: {
        campaignId: id,
        name: body.name || 'Novo Combate',
        status: 'ativo',
        currentTurnIndex: 0
      }
    })

    return NextResponse.json(combat)
  } catch (error) {
    console.error('Error creating combat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
