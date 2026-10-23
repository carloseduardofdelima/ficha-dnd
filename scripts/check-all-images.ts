import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const users = await prisma.user.count({ where: { image: { startsWith: 'data:image' } } })
  const chars = await prisma.character.count({ where: { avatarUrl: { startsWith: 'data:image' } } })
  const campaigns = await prisma.campaign.count({ where: { coverUrl: { startsWith: 'data:image' } } })
  const notes = await prisma.campaignNote.count({ where: { imageUrl: { startsWith: 'data:image' } } })
  const npcs = await prisma.npc.count({ where: { avatarUrl: { startsWith: 'data:image' } } })
  const threats = await prisma.threat.count({ where: { imageUrl: { startsWith: 'data:image' } } })

  console.log({
    users,
    chars,
    campaigns,
    notes,
    npcs,
    threats
  })
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
