import { PrismaClient } from '@prisma/client'
import { CLASSES_2014 } from '../src/lib/classes-2014'
import { nanoid } from 'nanoid'
import { getStartingInventory } from '../src/lib/inventory'
import { getSpellsForClass, getSpellSlots, SPELLCASTING_CLASSES } from '../src/lib/spells'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Semeadura de Personagens Completa (D&D 2014) ---')

  // 1. Garantir que exista um usuário
  let user = await prisma.user.findFirst()
  if (!user) {
    console.log('Nenhum usuário encontrado. Criando usuário "Carlos Eduardo"...')
    user = await prisma.user.create({
      data: {
        name: 'Carlos Eduardo',
        email: 'mestre@exemplo.com',
      }
    })
  }

  console.log(`Usando usuário: ${user.name} (ID: ${user.id})`)

  // 2. Criar um personagem para cada classe de 2014
  for (const dndClass of CLASSES_2014) {
    const charName = `Exemplo: ${dndClass.name} Completo`
    const background = 'Acólito'
    
    // Deletar o existente para garantir que as magias venham agora
    await prisma.character.deleteMany({
      where: { name: charName, userId: user.id }
    })

    console.log(`Criando ${charName}...`)
    
    const slug = `${dndClass.id}-full-${nanoid(5)}`

    // Gerar Inventário
    const inventory = getStartingInventory(dndClass.name, background)
    
    // Gerar Magias (se for classe conjuradora)
    let spellIds: string[] = []
    let spellSlotsStr = null

    if (SPELLCASTING_CLASSES.includes(dndClass.name)) {
      const allPossibleSpells = getSpellsForClass(dndClass.name, '2014')
      const slots = getSpellSlots(dndClass.name, 1, '2014')
      
      if (slots) {
        // Obter número de magias conhecidas/preparadas
        let preparedCount = 0
        if (typeof slots.prepared === 'number') preparedCount = slots.prepared
        else if (typeof (slots as any).known === 'number') preparedCount = (slots as any).known
        else preparedCount = 4 // Default para strings como "Int + Lvl" no nível 1

        const cantripCount = typeof slots.cantrips === 'number' ? slots.cantrips : 3

        // Pegar cantrips
        const cantrips = allPossibleSpells.filter(s => s.level === 0).slice(0, cantripCount)
        // Pegar magias de 1º nível
        const level1 = allPossibleSpells.filter(s => s.level === 1).slice(0, preparedCount)
        
        // SALVAR APENAS OS IDS
        spellIds = [...cantrips, ...level1].map(s => s.id)
        spellSlotsStr = JSON.stringify(slots.slots)
        
        console.log(`  - ${dndClass.name}: ${cantrips.length} truques, ${level1.length} magias lvl 1`)
      }
    }

    await prisma.character.create({
      data: {
        userId: user.id,
        slug: slug,
        name: charName,
        class: dndClass.name,
        race: 'Humano',
        level: 1,
        strength: 12,
        dexterity: 12,
        constitution: 12,
        intelligence: 12,
        wisdom: 12,
        charisma: 12,
        maxHp: parseInt(dndClass.hitDie.replace('d', '')) + 1, // Con mod +1
        currentHp: parseInt(dndClass.hitDie.replace('d', '')) + 1,
        armorClass: 10,
        speed: 9,
        initiative: 0,
        proficiencyBonus: 2,
        avatarUrl: dndClass.image,
        background: background,
        isPublic: true,
        ruleset: '2014',
        inventory: JSON.stringify(inventory),
        spells: JSON.stringify(spellIds), // IDs apenas!
        spellSlots: spellSlotsStr,
        appearance: 'Um aventureiro exemplar pronto para a jornada com equipamento completo.',
        backstory: `Este personagem foi criado automaticamente para demonstrar a classe ${dndClass.name} com inventário e magias iniciais.`,
        personalityTraits: 'Dedicado ao seu treinamento e sempre pronto para ajudar.',
        ideals: 'Crescimento. O conhecimento e a força devem ser compartilhados.',
        bonds: 'Minha ordem/família é o meu porto seguro.',
        flaws: 'Às vezes confio demais em estranhos.',
        notes: 'Personagem de demonstração completa.',
      }
    })
  }

  console.log('--- Semeadura Concluída com Sucesso! ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
