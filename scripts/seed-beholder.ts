import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('Nenhum usuário encontrado para associar o Beholder.')
    return
  }

  const beholder = await prisma.threat.create({
    data: {
      userId: user.id,
      name: "Beholder (Observador)",
      threatType: "boss",
      description: "Uma abominação flutuante com um grande olho central e dez pedúnculos oculares, cada um capaz de disparar um raio mágico mortal.",
      level: 13,
      challengeRating: 13,
      isTemplate: true,
      isPublic: true,
      attributes: {
        create: {
          strength: 10,
          dexterity: 14,
          constitution: 18,
          intelligence: 17,
          wisdom: 15,
          charisma: 17,
          hp: 180,
          ac: 18,
          speed: "0ft, voo 20ft (flutuar)",
          initiativeBonus: 2
        }
      },
      combat: {
        create: {
          attackBonus: 5,
          damage: "4d6",
          damageType: "perfurante (mordida)",
          multiattack: "O beholder faz um ataque de mordida e usa seus Raios Oculares.",
          abilities: JSON.stringify({
            "Cone Antimágia": "O olho central do beholder cria um cone de 150 pés de antimágica.",
            "Raios Oculares": "O beholder dispara aleatoriamente três dos seguintes raios..."
          })
        }
      },
      actions: {
        create: [
          { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +5 para atingir, alcance 1,5m, um alvo. Dano: 14 (4d6) perfurante.", actionType: "action" },
          { name: "Raios Oculares", description: "O beholder usa três raios oculares aleatórios em um a três alvos que ele possa ver dentro de 120 pés: Raio de Charme, Paralisia, Medo, Lentidão, Enervação, Telecinésia, Sono, Petrificação, Desintegração e Morte.", actionType: "action" }
        ]
      },
      skills: {
        create: [
          { name: "Percepção", description: "+12 de bônus em testes de Percepção." }
        ]
      }
    }
  })

  console.log('Beholder criado com sucesso:', beholder.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
