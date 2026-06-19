import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.character.updateMany({
    where: { name: { contains: 'Merida' } },
    data: {
      maxHp: 20,
      currentHp: 20
    }
  })

  console.log(`Updated ${result.count} characters named Merida to 20 max HP and 20 current HP.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
