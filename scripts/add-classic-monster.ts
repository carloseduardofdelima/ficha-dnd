import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Defina o monstro clássico que deseja adicionar aqui:
const MONSTER_TO_ADD = {
  name: "Espantalho",
  threatType: "monster",
  description: "Na época da colheita, misteriosos espantalhos tecem uma vigília silenciosa sobre os campos vazios. Com uma paciência imortal, essas sentinelas estritas mantêm seus postos, vinculados ao comando do seu mestre, ansiosos para rasgar vítimas com suas garras afiadas.\n\nConstructos Alimentados por Espíritos. Um espantalho é animado ao se vincular ao espírito de uma criatura maligna assassinada, concedendo a ele propósito e mobilidade. Ele é focado apenas em servir seu criador.\n\nNatureza de Constructo. Um espantalho não precisa respirar, comer, beber ou dormir.",
  challengeRating: 1,
  isTemplate: true,
  isPublic: true,
  attributes: {
    strength: 11, dexterity: 13, constitution: 11,
    intelligence: 10, wisdom: 10, charisma: 13,
    hp: 36, ac: 11, speed: "9 m", initiativeBonus: 1
  },
  combat: {
    attackBonus: 3, damage: "2d4 + 1", damageType: "cortante",
    multiattack: "O espantalho realiza dois ataques com garra.",
    abilities: JSON.stringify({
      "Aparência Falsa": "Enquanto o espantalho se mantiver imóvel, ele é indistinguível de um espantalho comum e inanimado.",
      "Vulnerabilidades a Dano": "Fogo",
      "Resistências a Dano": "Concussão, cortante e perfurante de ataques não-mágicos",
      "Imunidades a Dano": "Veneno",
      "Imunidades a Condição": "Amedrontado, enfeitiçado, envenenado, exausto, inconsciente, paralisado",
      "Sentidos": "Visão no Escuro 18 m, Percepção passiva 10",
      "Idiomas": "Compreende o idioma do seu criador, mas não pode falar"
    }),
    resistances: "concussão de ataques não-mágicos, cortante de ataques não-mágicos, perfurante de ataques não-mágicos",
    immunities: "veneno",
    vulnerabilities: "fogo"
  },
  actions: [
    { name: "Garra", description: "Ataque Corpo-a-Corpo com Arma: +3 para atingir, alcance 1,5 m, um alvo. Acerto: 6 (2d4 + 1) de dano cortante. Se o alvo for uma criatura, ela deve ser bem sucedida num teste de resistência de Sabedoria CD 11 ou ficará amedrontada até o final do próximo turno do espantalho.", actionType: "action" },
    { name: "Olhar Aterrorizante", description: "O espantalho afeta uma criatura que ele possa ver a até 9 metros dele. Se o alvo puder ver o espantalho, ele deve ser bem sucedido num teste de resistência de Sabedoria CD 11 ou ficará magicamente amedrontado até o final do próximo turno do espantalho. O alvo amedrontado fica paralisado.", actionType: "action" }
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
