const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const campaignId = 'cmoktdo6a0001ca281ba5a80b'
  
  // Find the campaign to get the userId
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId }
  })

  if (!campaign) {
    console.error('Campanha não encontrada')
    return
  }

  const userId = campaign.userId

  const npcs = [
    {
      name: 'Grogmar "Mão-de-Ferro"',
      title: 'Ferreiro da Cidade',
      type: 'comerciante',
      description: 'Um anão robusto com braços grossos como troncos de carvalho.',
      appearance: 'Sempre coberto de fuligem, usa um avental de couro reforçado e carrega um martelo de guerra no cinto.',
      personality: 'Bruto mas honesto. Odeia negociar preços, mas respeita quem entende de armas.',
      notes: 'Pode consertar armas mágicas se tiver os materiais certos.',
      secrets: 'Ele é um mestre rúnico exilado das montanhas do norte.',
      status: 'vivo',
      tags: 'anão, ferreiro, porto-real',
      userId,
      campaignId
    },
    {
      name: 'Elara Valandril',
      title: 'Arquivista Real',
      type: 'aliado',
      description: 'Uma elfa de olhar penetrante que parece saber mais do que diz.',
      appearance: 'Veste mantos de seda azul-celeste e usa um monóculo de prata pendurado no pescoço.',
      personality: 'Calma, metódica e extremamente inteligente. Fala em enigmas ocasionalmente.',
      notes: 'Pode identificar itens mágicos por um pequeno custo.',
      secrets: 'Ela faz parte da Ordem da Estrela de Prata, vigiando ameaças extra-planares.',
      status: 'vivo',
      tags: 'elfo, mago, conhecimento',
      userId,
      campaignId
    },
    {
      name: 'Capitão Kaelen',
      title: 'Comandante da Guarda',
      type: 'neutro',
      description: 'Um veterano de guerra que preza pela ordem acima de tudo.',
      appearance: 'Armadura de placas impecável com o emblema da cidade. Cicatriz profunda no olho esquerdo.',
      personality: 'Rígido, segue as leis ao pé da letra. Não gosta de aventureiros "bagunceiros".',
      notes: 'Pode fornecer passes para áreas restritas da cidade.',
      secrets: 'Ele está sendo chantageado por um grupo de contrabandistas local.',
      status: 'vivo',
      tags: 'humano, guarda, ordem',
      userId,
      campaignId
    },
    {
      name: 'Zezinho "Pé-Ligeiro"',
      title: 'Informante das Ruas',
      type: 'quest_giver',
      description: 'Um garoto órfão que conhece cada beco da cidade.',
      appearance: 'Roupas rasgadas e rosto sujo, mas olhos muito vivos e rápidos.',
      personality: 'Sempre alerta, fala rápido e adora um suborno em forma de doces ou moedas.',
      notes: 'Sabe boatos sobre o paradeiro do Culto das Sombras.',
      secrets: 'Na verdade é um Halfling disfarçado de criança humana.',
      status: 'vivo',
      tags: 'halfling, ladino, informante',
      userId,
      campaignId
    },
    {
      name: 'Lord Valerius',
      title: 'Nobre Decadente',
      type: 'inimigo',
      description: 'Um aristocrata que busca recuperar a fortuna da família a qualquer custo.',
      appearance: 'Roupas luxuosas mas levemente gastas. Sempre carrega uma taça de vinho fino.',
      personality: 'Arrogante, manipulador e vingativo. Vê as classes baixas como ferramentas.',
      notes: 'Hostil aos personagens se eles interferirem em seus negócios.',
      secrets: 'Fez um pacto com um demônio para salvar suas terras da falência.',
      status: 'vivo',
      tags: 'humano, nobre, antagonista',
      userId,
      campaignId
    }
  ]

  console.log(`Adicionando 5 NPCs à campanha ${campaignId}...`)

  for (const npc of npcs) {
    await prisma.npc.create({ data: npc })
  }

  console.log('NPCs adicionados com sucesso!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
