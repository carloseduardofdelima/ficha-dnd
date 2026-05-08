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
  const body = await req.json()

  try {
    const data = { ...body }
    if (data.date) data.date = new Date(data.date)

    const campaignSession = await prisma.campaignSession.create({
      data: {
        ...data,
        campaignId: id
      }
    })
    return NextResponse.json(campaignSession)
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
