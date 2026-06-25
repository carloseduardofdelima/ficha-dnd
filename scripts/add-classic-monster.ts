import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Defina o monstro clássico que deseja adicionar aqui:
const MONSTER_TO_ADD = {
  name: "Carniçal",
  threatType: "monster",
  description: "Os carniçais são mortos-vivos repulsivos guiados por uma fome insaciável e eterna por carne humanoide fresca ou em decomposição. Vagam pela noite em bandos selvagens, assombrando cemitérios, criptas e campos de batalha. Seus corpos ágeis desferem ataques com garras imundas capazes de paralisar temporariamente suas vítimas com um toque peçonhento, deixando-as indefesas enquanto eles começam a devorá-las.",
  challengeRating: 1.0,
  isTemplate: true,
  isPublic: true,
  attributes: {
    strength: 13, dexterity: 15, constitution: 10,
    intelligence: 7, wisdom: 10, charisma: 6,
    hp: 22, ac: 12, speed: "9m", initiativeBonus: 0
  },
  combat: {
    attackBonus: 4, damage: "2d4+2", damageType: "cortante",
    multiattack: "",
    abilities: JSON.stringify({
      "Sentidos": "Visão no escuro 18 m, Percepção passiva 10",
      "Idiomas": "Comum"
    }),
    resistances: "",
    immunities: "Veneno (Dano); Enfeitiçado, Envenenado, Exausto (Condições)",
    vulnerabilities: ""
  },
  actions: [
    { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +2 para atingir, alcance 1,5 m, uma criatura. Dano: 9 (2d6 + 2) de dano perfurante.", actionType: "action" },
    { name: "Garras", description: "Ataque Corpo-a-Corpo com Arma: +4 para atingir, alcance 1,5 m, um alvo. Dano: 7 (2d4 + 2) de dano cortante. Se o alvo for uma criatura diferente de um elfo ou morto-vivo, ela deve passar num teste de Constituição CD 10 ou fica paralisada por 1 minuto (pode repetir o teste no final de cada um dos seus turnos).", actionType: "action" }
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
