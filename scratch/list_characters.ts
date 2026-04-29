import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      class: true,
      level: true,
      createdAt: true
    }
  })
  console.log(JSON.stringify(characters, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
