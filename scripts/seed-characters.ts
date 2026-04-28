import { PrismaClient } from '@prisma/client'
import { CLASSES_2014 } from '../src/lib/classes-2014'
import { RACES_2014 } from '../src/lib/races-2014'
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

    // Mapeamento de perícias (PT -> EN)
    const skillMap: Record<string, string> = {
      'Acrobacia': 'acrobatics', 'Adestrar Animais': 'animalHandling', 'Arcanismo': 'arcana',
      'Atletismo': 'athletics', 'Atuação': 'performance', 'Enganação': 'deception',
      'Furtividade': 'stealth', 'História': 'history', 'Intimidação': 'intimidation',
      'Intuição': 'insight', 'Investigação': 'investigation', 'Medicina': 'medicine',
      'Natureza': 'nature', 'Percepção': 'perception', 'Persuasão': 'persuasion',
      'Prestidigitação': 'sleightOfHand', 'Religião': 'religion', 'Sobrevivência': 'survival'
    }

    // Definir perícias iniciais
    const selectedSkills: Record<string, boolean> = {
      insight: true, // Do Antecedente Acólito
      religion: true // Do Antecedente Acólito
    }

    // Pegar as primeiras N perícias da classe
    const options = dndClass.skillOptions || []
    options.slice(0, dndClass.skillCount || 2).forEach(s => {
      const key = skillMap[s]
      if (key) selectedSkills[key] = true
    })

    // Mapeamento de raças lógicas para cada classe
    const classRaceMap: Record<string, { race: string; subrace?: string }> = {
      'Bárbaro': { race: 'Meio-Orc' },
      'Bardo': { race: 'Meio-Elfo' },
      'Clérigo': { race: 'Anão', subrace: 'Anão da Colina' },
      'Druida': { race: 'Elfo', subrace: 'Elfo da Floresta' },
      'Guerreiro': { race: 'Anão', subrace: 'Anão da Montanha' },
      'Monge': { race: 'Humano' },
      'Paladino': { race: 'Draconato' },
      'Patrulheiro': { race: 'Elfo', subrace: 'Elfo da Floresta' },
      'Ladino': { race: 'Halfling', subrace: 'Pés-Leves' },
      'Feiticeiro': { race: 'Tiefling' },
      'Bruxo': { race: 'Tiefling' },
      'Mago': { race: 'Gnomo', subrace: 'Gnomo das Rochas' }
    }

    const { race, subrace } = classRaceMap[dndClass.name] || { race: 'Humano' }

    // Calcular Atributos Finais (Base 12 + Bônus Raciais)
    const finalAttrs: Record<string, number> = {
      strength: 12, dexterity: 12, constitution: 12,
      intelligence: 12, wisdom: 12, charisma: 12
    }

    const raceData = RACES_2014.find(r => r.name === race)
    if (raceData) {
      if (raceData.attributeBonuses) {
        Object.entries(raceData.attributeBonuses).forEach(([attr, val]) => {
          finalAttrs[attr] += val
        })
      }
      if (subrace) {
        const lineage = raceData.lineages?.find(l => l.name === subrace)
        if (lineage?.attributeBonuses) {
          Object.entries(lineage.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr] += val
          })
        }
      }
    }

    await prisma.character.create({
      data: {
        userId: user.id,
        slug: slug,
        name: charName,
        class: dndClass.name,
        race: race,
        subrace: subrace || '',
        level: 1,
        ...finalAttrs,
        maxHp: parseInt(dndClass.hitDie.replace('d', '')) + Math.floor((finalAttrs.constitution - 10) / 2),
        currentHp: parseInt(dndClass.hitDie.replace('d', '')) + Math.floor((finalAttrs.constitution - 10) / 2),
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
        skills: JSON.stringify(selectedSkills),
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
