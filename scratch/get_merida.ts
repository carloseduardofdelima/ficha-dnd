import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const merida = await prisma.character.findFirst({
    where: { name: { contains: 'Merida' } }
  })
  
  if (!merida) {
    console.log('Merida not found.')
    return
  }

  console.log(JSON.stringify(merida, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
