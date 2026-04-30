import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.error('Nenhum usuário encontrado para associar os monstros.')
    return
  }

  const monsters = [
    {
      name: "Goblin",
      threatType: "monster",
      description: "Uma criatura pequena, malévola e covarde.",
      challengeRating: 0.25,
      isTemplate: true,
      isPublic: true,
      attributes: {
        strength: 8, dexterity: 14, constitution: 10,
        intelligence: 10, wisdom: 8, charisma: 8,
        hp: 7, ac: 15, speed: "30ft", initiativeBonus: 2
      },
      combat: {
        attackBonus: 4, damage: "1d6+2", damageType: "perfurante",
        multiattack: "Nenhum",
        abilities: JSON.stringify({
          "Fuga Ágil": "O goblin pode realizar a ação de Desengajar ou Esconder-se como uma ação bônus em cada um de seus turnos."
        })
      },
      actions: [
        { name: "Cimitarra", description: "Ataque Corpo-a-Corpo com Arma: +4 para atingir, alcance 1,5m, um alvo. Dano: 5 (1d6 + 2) de dano perfurante.", actionType: "action" },
        { name: "Arco Curto", description: "Ataque à Distância com Arma: +4 para atingir, alcance 24/96m, um alvo. Dano: 5 (1d6 + 2) de dano perfurante.", actionType: "action" }
      ]
    },
    {
      name: "Lobo Atroz",
      threatType: "monster",
      description: "Um lobo gigante e feroz.",
      challengeRating: 1,
      isTemplate: true,
      isPublic: true,
      attributes: {
        strength: 17, dexterity: 15, constitution: 15,
        intelligence: 3, wisdom: 12, charisma: 7,
        hp: 37, ac: 14, speed: "50ft", initiativeBonus: 2
      },
      combat: {
        attackBonus: 5, damage: "2d6+3", damageType: "perfurante",
        multiattack: "Nenhum",
        abilities: JSON.stringify({
          "Audição e Olfato Apurados": "O lobo tem vantagem em testes de Sabedoria (Percepção) que dependam da audição ou do olfato.",
          "Tática de Matilha": "O lobo tem vantagem nas jogadas de ataque contra uma criatura se pelo menos um dos aliados do lobo estiver a 1,5 metro da criatura e não estiver incapacitado."
        })
      },
      actions: [
        { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +5 para atingir, alcance 1,5m, um alvo. Dano: 10 (2d6 + 3) de dano perfurante. Se o alvo for uma criatura, ele deve ser bem sucedido num teste de resistência de Força CD 13 ou será derrubado.", actionType: "action" }
      ]
    },
    {
      name: "Manticora",
      threatType: "monster",
      description: "Uma criatura com corpo de leão, asas de morcego e rosto humanoide, com uma cauda cheia de espinhos.",
      challengeRating: 3,
      isTemplate: true,
      isPublic: true,
      attributes: {
        strength: 17, dexterity: 16, constitution: 17,
        intelligence: 7, wisdom: 12, charisma: 8,
        hp: 68, ac: 14, speed: "30ft, voo 50ft", initiativeBonus: 3
      },
      combat: {
        attackBonus: 5, damage: "1d8+3", damageType: "perfurante/concussão",
        multiattack: "A manticora faz três ataques: um com sua mordida e dois com suas garras ou três com seus espinhos de cauda.",
        abilities: JSON.stringify({})
      },
      actions: [
        { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +5 para atingir, alcance 1,5m, um alvo. Dano: 7 (1d8 + 3) de dano perfurante.", actionType: "action" },
        { name: "Garra", description: "Ataque Corpo-a-Corpo com Arma: +5 para atingir, alcance 1,5m, um alvo. Dano: 6 (1d6 + 3) de dano de concussão.", actionType: "action" },
        { name: "Espinho de Cauda", description: "Ataque à Distância com Arma: +5 para atingir, alcance 30/60m, um alvo. Dano: 7 (1d8 + 3) de dano perfurante.", actionType: "action" }
      ]
    },
    {
      name: "Dragão Vermelho Jovem",
      threatType: "boss",
      description: "Um dragão vermelho jovem, poderoso e ganancioso.",
      challengeRating: 10,
      isTemplate: true,
      isPublic: true,
      attributes: {
        strength: 23, dexterity: 10, constitution: 21,
        intelligence: 14, wisdom: 11, charisma: 19,
        hp: 178, ac: 18, speed: "40ft, escalada 40ft, voo 80ft", initiativeBonus: 0
      },
      combat: {
        attackBonus: 10, damage: "2d10+6", damageType: "perfurante",
        multiattack: "O dragão faz três ataques: um com sua mordida e dois com suas garras.",
        abilities: JSON.stringify({
          "Percepção Cega": "O dragão tem percepção cega num raio de 9 metros.",
          "Resistência a Fogo": "O dragão é imune a dano de fogo."
        })
      },
      actions: [
        { name: "Mordida", description: "Ataque Corpo-a-Corpo com Arma: +10 para atingir, alcance 3m, um alvo. Dano: 17 (2d10 + 6) de dano perfurante mais 3 (1d6) de dano de fogo.", actionType: "action" },
        { name: "Garra", description: "Ataque Corpo-a-Corpo com Arma: +10 para atingir, alcance 1,5m, um alvo. Dano: 13 (2d6 + 6) de dano de corte.", actionType: "action" },
        { name: "Sopro de Fogo (Recarrega 5-6)", description: "O dragão exala fogo em um cone de 9 metros. Cada criatura na área deve realizar um teste de resistência de Destreza CD 17, sofrendo 56 (16d6) de dano de fogo se falhar, ou metade desse dano se obtiver sucesso.", actionType: "action" }
      ]
    },
    {
      name: "Lich",
      threatType: "boss",
      description: "Um mestre da necromancia que transcendeu a morte através de rituais sombrios.",
      challengeRating: 21,
      isTemplate: true,
      isPublic: true,
      attributes: {
        strength: 11, dexterity: 16, constitution: 16,
        intelligence: 20, wisdom: 14, charisma: 16,
        hp: 135, ac: 17, speed: "30ft", initiativeBonus: 3
      },
      combat: {
        attackBonus: 12, damage: "3d6", damageType: "gélido",
        multiattack: "O lich usa seu Olhar Paralisante e faz um ataque com seu Toque Paralisante.",
        abilities: JSON.stringify({
          "Resistência Lendária (3/Dia)": "Se o lich falhar em um teste de resistência, ele pode escolher obter sucesso no lugar.",
          "Rejuvenescimento": "Se possuir um filactério, um lich destruído ganha um novo corpo em 1d10 dias.",
          "Conjuração de Magias": "O lich é um conjurador de 20º nível. Sua habilidade de conjuração é Inteligência (CD de resistência de magia 20, +12 para atingir com ataques de magia)."
        })
      },
      actions: [
        { name: "Toque Paralisante", description: "Ataque de Magia Corpo-a-Corpo: +12 para atingir, alcance 1,5m, uma criatura. Dano: 10 (3d6) de dano gélido. O alvo deve ser bem sucedido num teste de resistência de Constituição CD 18 ou ficará paralisado por 1 minuto.", actionType: "action" },
        { name: "Olhar Paralisante", description: "O lich fixa seu olhar em uma criatura que ele possa ver a até 3 metros dele. O alvo deve ser bem sucedido num teste de resistência de Sabedoria CD 18 ou ficará amedrontado por 1 minuto.", actionType: "action" }
      ]
    }
  ]

  for (const monsterData of monsters) {
    const { attributes, combat, actions, ...threatBase } = monsterData
    
    await prisma.threat.create({
      data: {
        ...threatBase,
        userId: user.id,
        attributes: { create: attributes },
        combat: { create: combat },
        actions: { create: actions }
      }
    })
    console.log(`Monstro criado: ${monsterData.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
