import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.character.updateMany({
    where: { name: { contains: 'Adim' } },
    data: {
      maxHp: 31,
      currentHp: 31
    }
  })

  console.log(`Updated ${result.count} characters named Adim to 31 max HP and 31 current HP.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
