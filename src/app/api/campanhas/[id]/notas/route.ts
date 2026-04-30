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
  const { title, content, isPublic, isFixed } = await req.json()

  try {
    const note = await prisma.campaignNote.create({
      data: {
        campaignId: id,
        title,
        content,
        isPublic: isPublic || false,
        isFixed: isFixed || false
      }
    })
    return NextResponse.json(note)
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
