import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const campaign = await prisma.campaign.findFirst({
    where: { name: { contains: "Forja Ancestral", mode: 'insensitive' } }
  })

  if (!campaign) {
    console.error('Campanha não encontrada.')
    return
  }

  await prisma.campaign.update({
    where: { id: campaign.id },
    data: { coverUrl: '/campaigns/forja-ancestral-bg.jpg' }
  })

  console.log('Capa da campanha atualizada com sucesso para:', campaign.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
