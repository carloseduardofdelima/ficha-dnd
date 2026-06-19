import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const deleted = await prisma.deletedCharacter.findMany()
  console.log('=== DELETED CHARACTERS ===')
  for (const d of deleted) {
    console.log(`ID: ${d.id} | Name: ${d.name} | Data:`, JSON.stringify(d.characterData).substring(0, 100))
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
