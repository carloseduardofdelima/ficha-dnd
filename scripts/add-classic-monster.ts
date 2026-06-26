import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Defina o monstro clássico que deseja adicionar aqui:
const MONSTER_TO_ADD = {
  name: "Pantera Deslocadora",
  threatType: "monster",
  description: "Esse predador monstruoso recebe seu nome por sua habilidade de deslocar a luz fazendo com que pareça estar a alguns metros da sua localização atual. Ela lembra um grande felino lustroso de pelagem azul escura, com seis patas e dois tentáculos que brotam de seus ombros, terminados em pontas afiadas.\n\nOrigens Sombrias. As panteras deslocadoras percorrem as terras crepusculares de Faéria por eras, até serem capturadas e treinadas pela Corte Sombria, de onde muitas escaparam e migraram para o Plano Material.\n\nAmor pela Matança. Elas não matam apenas para comer, mas também por esporte, frequentemente caçando em emboscadas bem planejadas.",
  challengeRating: 3,
  isTemplate: true,
  isPublic: true,
  attributes: {
    strength: 18, dexterity: 15, constitution: 16,
    intelligence: 6, wisdom: 12, charisma: 8,
    hp: 85, ac: 13, speed: "12 m", initiativeBonus: 2
  },
  combat: {
    attackBonus: 6, damage: "1d6 + 4", damageType: "concussivo",
    multiattack: "A pantera realiza dois ataques com seus tentáculos.",
    abilities: JSON.stringify({
      "Evasão": "Se a pantera for alvo de um efeito que permita realizar um teste de resistência para sofrer apenas metade do dano, ela não recebe nenhum dano se for bem sucedida, e apenas metade se fracassar.",
      "Deslocamento": "A pantera projeta uma ilusão mágica que faz com que ela pareça estar próxima de sua localização real, aplicando desvantagem em todas as jogadas de ataque contra ela. Esse traço é interrompido até o fim do próximo turno da pantera se ela for atingida por um ataque, ou enquanto estiver incapacitada ou com deslocamento 0.",
      "Sentidos": "Visão no Escuro 18 m, Percepção passiva 11",
      "Idiomas": "—"
    }),
    resistances: "",
    immunities: "",
    vulnerabilities: ""
  },
  actions: [
    { name: "Tentáculo", description: "Ataque Corpo-a-Corpo com Arma: +6 para atingir, alcance 3 m, um alvo. Acerto: 7 (1d6 + 4) de dano de concussão mais 3 (1d6) de dano perfurante.", actionType: "action" }
  ]
}

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('Nenhum usuário encontrado no banco de dados para associar o monstro.')
    return
  }

  // Verifica se o monstro já existe com este nome
  const existing = await prisma.threat.findFirst({
    where: {
      name: MONSTER_TO_ADD.name,
      isPublic: true,
      isTemplate: true
    }
  })

  if (existing) {
    console.log(`O monstro "${MONSTER_TO_ADD.name}" já está cadastrado como monstro clássico.`)
    return
  }

  const { attributes, combat, actions, ...threatBase } = MONSTER_TO_ADD

  await prisma.threat.create({
    data: {
      ...threatBase,
      userId: user.id,
      attributes: { create: attributes },
      combat: { create: combat },
      actions: { create: actions }
    }
  })
  console.log(`Monstro clássico "${MONSTER_TO_ADD.name}" adicionado com sucesso!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
