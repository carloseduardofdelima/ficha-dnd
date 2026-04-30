import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('No user found to associate campaign with.')
    return
  }

  console.log(`Seeding campaign for user: ${user.email}`)

  const campaign = await prisma.campaign.create({
    data: {
      userId: user.id,
      name: 'O Despertar da Forja Ancestral',
      description: 'Uma jornada épica pelas montanhas de Kazad-Gathol, onde os heróis devem impedir que um antigo mal desperte as máquinas de guerra dos anões.',
      type: 'campaign',
      status: 'active',
      progress: 35,
      system: 'D&D 5e',
      averageLevel: 5,
      startDate: new Date(),
      tags: 'Épico, Exploração, Combate',
      notes: 'Lembrar de introduzir o NPC Balin na próxima taverna. Os jogadores estão desconfiados do mercador.',
      
      sessions: {
        create: [
          {
            number: 1,
            title: 'O Encontro na Taverna do Dragão Dorminhoco',
            summary: 'Os heróis se conhecem e aceitam a missão de escoltar um carregamento de runas até a fronteira.',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          },
          {
            number: 2,
            title: 'Emboscada no Desfiladeiro',
            summary: 'Um grupo de goblins montados em lobos atacou a caravana. Os jogadores descobriram que as runas eram falsas.',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          }
        ]
      },

      notes_list: {
        create: [
          {
            title: 'A Profecia das Runas',
            content: 'Quando o sol se puser no solstício, a forja clamará pelo sangue dos justos.',
            isPublic: true,
            isFixed: true
          },
          {
            title: 'Itens de Missão',
            content: '- Chave de Latão\n- Mapa de Couro de Troll\n- Frasco de Óleo de Fogo',
            isPublic: false
          }
        ]
      }
    }
  })

  // Link some characters if any exist
  const chars = await prisma.character.findMany({ take: 3 })
  for (const char of chars) {
    await prisma.characterCampaignLink.create({
      data: {
        campaignId: campaign.id,
        characterId: char.id
      }
    })
  }

  console.log('Campaign seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
