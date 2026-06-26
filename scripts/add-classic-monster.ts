import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Defina o monstro clássico que deseja adicionar aqui:
const MONSTER_TO_ADD = {
  name: "Pixie",
  threatType: "monster",
  description: "Medindo apenas 20 centímetros de altura, os pixies lembram elfos diminutos com finas asas como as de libélulas ou borboletas, brilhantes como o amanhecer claro e tão luminosos quanto o nascer da lua cheia.\n\nCuriosos como gatos e tímidos como cervos, os pixies vão onde querem. Eles gostam de espiar as outras criaturas e dificilmente conseguem conter sua agitação em volta delas. O desejo de se apresentar e iniciar uma amizade é quase esmagador; apenas o medo de ser capturado ou atacado mantém o pixie alerta. Aqueles que vagam por uma clareira de um pixie podem nunca ver a criatura, ainda assim ouvem os risinhos ricos, risadas ou suspiros.\n\nOs pixies se vestem como príncipes e princesas das fadas, vestindo roupas leves e parilhas de seda que brilham como o luar em uma lagoa. Alguns vestem-se com bolotas, folhas, cascas e peles de pequenos animais da floresta. Eles tem grande orgulho de sua regalia e brilham de alegria quando complementam seus conjuntos.\n\nPovo Feérico Mágico. Com seu poder inato de invisibilidade, os pixies raramente aparecem, a não ser que desejem ser vistos. Em Faéria e no Plano Material, os pixies gravam padrões de geada nas lagoas durante o inverno e despertam os brotos na primavera. Eles fazem as flores brilharem com o orvalho no verão e colorem as folhas com tons quentes no outono.\n\nPó de Fada. Quando os pixies voam visíveis, uma rabeira de pó cintilante segue seu rastro como a cauda brilhante de uma estrela cadente. Uma mera pitada de pó de fada dizem ser capaz de conceder o poder de voar, confundir uma criatura irremediavelmente ou fazer inimigos caírem em um sono mágico. Apenas os pixies podem usar seu pó com o potencial máximo, mas essas fadas são constantemente caçadas por magos e monstros que buscam estudar ou dominar seus poderes.\n\nBrincadeiras Místicas. Embora a chegada de visitantes desperte sua curiosidade, os pixies são muito tímidos para se revelarem de primeira. Eles estudam seus visitantes de longe avaliando seu temperamento e fazendo truques inofensivos com eles para medir suas reações. Por exemplo, os pixies poderiam amarrar as botas de um anão juntas, criar ilusões de criaturas estranhas e teimosas ou usar globos de luz para desencurralar intrusos. Se os visitantes responderem com hostilidade, os pixies irão se afastar. Se os visitantes forem de boa índole, os pixies serão mais corajosos e mais amigáveis. A fada pode até surgir e oferecer-se para guiar seus \"convidados\" por uma rota segura ou convidá-los para um diminuto, porém satisfatório, banquete preparado em sua homenagem.\n\nAversão à Violência. Diferentes dos seus primos sprites, os pixies abominam armas e preferirão fugir a entrar em confronto físico com qualquer inimigo.",
  challengeRating: 0.25,
  isTemplate: true,
  isPublic: true,
  attributes: {
    strength: 2, dexterity: 20, constitution: 8,
    intelligence: 10, wisdom: 14, charisma: 15,
    hp: 1, ac: 15, speed: "3 m, voo 9 m", initiativeBonus: 5
  },
  combat: {
    attackBonus: 0, damage: "0", damageType: "nenhum",
    multiattack: "",
    abilities: JSON.stringify({
      "Conjuração Inata": "A habilidade de conjuração de um pixie é Carisma (CD de resistência de magia 12, +4 para atingir com ataques de magia). Ele pode conjurar, inatamente, as seguintes magias, necessitando apenas de seu pó de fada como componente:\n\nÀ vontade: druidismo\n1/dia cada: confusão, constrição, detectar bem e mal, detectar pensamentos, dissipar magia, força fantasmagórica, globos de luz, metamorfose, sono, voo",
      "Resistência à Magia": "O pixie possui vantagem nos testes de resistência contra magias e outros efeitos mágicos.",
      "Perícias": "Furtividade +7, Percepção +4",
      "Sentidos": "Percepção passiva 14",
      "Idiomas": "Silvestre"
    }),
    resistances: "",
    immunities: "",
    vulnerabilities: ""
  },
  actions: [
    { name: "Invisibilidade Superior", description: "O pixie torna-se magicamente invisível até sua concentração acabar (como se estivesse se concentrando em uma magia). Qualquer equipamento que o pixie esteja vestindo ou carregando fica invisível com ele.", actionType: "action" }
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
