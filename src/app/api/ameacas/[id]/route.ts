import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  try {
    const threat = await prisma.threat.findUnique({
      where: { id },
      include: {
        attributes: true,
        combat: true,
        actions: true,
        skills: true
      }
    })

    if (!threat) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Permission check
    if (!threat.isPublic && threat.userId !== session?.user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(threat)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
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
    const existing = await prisma.threat.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.threat.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        threatType: body.threatType,
        level: body.level,
        challengeRating: body.challengeRating,
        isTemplate: body.isTemplate,
        isPublic: body.isPublic,
        attributes: body.attributes ? {
          update: body.attributes
        } : undefined,
        combat: body.combat ? {
          update: body.combat
        } : undefined,
        // For actions and skills, a simple update might be complex, 
        // usually we delete and recreate or use separate endpoints
      },
      include: {
        attributes: true,
        combat: true
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const existing = await prisma.threat.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.threat.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
