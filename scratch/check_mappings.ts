import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const npcs = await prisma.npc.findMany({
    select: { id: true, name: true }
  })
  console.log('=== NPCs ===')
  for (const n of npcs) {
    console.log(`ID: ${n.id} | Name: ${n.name}`)
  }

  const threats = await prisma.threat.findMany({
    select: { id: true, name: true }
  })
  console.log('\n=== THREATS ===')
  for (const t of threats) {
    console.log(`ID: ${t.id} | Name: ${t.name}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
