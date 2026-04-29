import { PrismaClient } from '@prisma/client'
import { CLASSES_2014 } from '../src/lib/classes-2014'
import { RACES_2014 } from '../src/lib/races-2014'
import { CLASS_LEVEL1_DATA_2014 } from '../src/lib/class-features-2014'
import { nanoid } from 'nanoid'
import { getStartingInventory } from '../src/lib/inventory'
import { getSpellsForClass, getSpellSlots, SPELLCASTING_CLASSES } from '../src/lib/spells'
import { calculateAC } from '../src/lib/dnd-rules'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Semeadura de Personagens Completos (D&D 2014) ---')

  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({ data: { name: 'Mestre D&D', email: 'mestre@exemplo.com' } })
  }

  const subclassesMap: Record<string, string> = {
    'Bárbaro': 'Caminho do Guerreiro Totêmico',
    'Bardo': 'Colégio do Conhecimento',
    'Clérigo': 'Domínio da Vida',
    'Druida': 'Círculo da Lua',
    'Guerreiro': 'Campeão',
    'Monge': 'Caminho da Mão Aberta',
    'Paladino': 'Juramento de Devoção',
    'Patrulheiro': 'Caçador',
    'Ladino': 'Ladrão',
    'Feiticeiro': 'Linhagem Dracônica',
    'Bruxo': 'O Ínfero',
    'Mago': 'Escola de Evocação'
  }

  const backgroundsMap: Record<string, string> = {
    'Bárbaro': 'Forasteiro',
    'Bardo': 'Artista',
    'Clérigo': 'Acólito',
    'Druida': 'Hermitão',
    'Guerreiro': 'Soldado',
    'Monge': 'Hermitão',
    'Paladino': 'Nobre',
    'Patrulheiro': 'Forasteiro',
    'Ladino': 'Criminoso',
    'Feiticeiro': 'Hermitão',
    'Bruxo': 'Charlatão',
    'Mago': 'Sábio'
  }

  const skillMapping: Record<string, string[]> = {
    'Bárbaro': ['athletics', 'survival', 'intimidation', 'perception'],
    'Bardo': ['acrobatics', 'performance', 'persuasion', 'insight'],
    'Clérigo': ['insight', 'religion', 'history', 'medicine'],
    'Druida': ['medicine', 'religion', 'nature', 'survival'],
    'Guerreiro': ['athletics', 'intimidation', 'perception', 'survival'],
    'Monge': ['medicine', 'religion', 'acrobatics', 'stealth'],
    'Paladino': ['history', 'persuasion', 'athletics', 'religion'],
    'Patrulheiro': ['athletics', 'survival', 'perception', 'stealth'],
    'Ladino': ['deception', 'stealth', 'acrobatics', 'sleightOfHand'],
    'Feiticeiro': ['medicine', 'religion', 'arcana', 'persuasion'],
    'Bruxo': ['deception', 'sleightOfHand', 'arcana', 'intimidation'],
    'Mago': ['arcana', 'history', 'investigation', 'religion']
  }

  const raceConfig: Record<string, { race: string, subrace: string }> = {
    'Bárbaro': { race: 'Meio-Orc', subrace: '' },
    'Bardo': { race: 'Meio-Elfo', subrace: '' },
    'Clérigo': { race: 'Anão', subrace: 'Anão da Colina' },
    'Druida': { race: 'Elfo', subrace: 'Elfo da Floresta' },
    'Guerreiro': { race: 'Humano', subrace: '' },
    'Monge': { race: 'Halfling', subrace: 'Pés-Leves' },
    'Paladino': { race: 'Draconato', subrace: 'Dragão de Ouro (Fogo)' },
    'Patrulheiro': { race: 'Elfo', subrace: 'Elfo da Floresta' },
    'Ladino': { race: 'Halfling', subrace: 'Pés-Leves' },
    'Feiticeiro': { race: 'Tiefling', subrace: '' },
    'Bruxo': { race: 'Humano', subrace: '' },
    'Mago': { race: 'Elfo', subrace: 'Alto Elfo' }
  }

  for (const dndClass of CLASSES_2014) {
    const charName = `${dndClass.name} Lendário`
    const config = raceConfig[dndClass.name]
    const background = backgroundsMap[dndClass.name]
    const level = 3
    
    await prisma.character.deleteMany({ where: { name: charName, userId: user.id } })

    console.log(`Criando ${charName}...`)

    let base = { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }
    if (dndClass.name === 'Bárbaro') base = { strength: 15, dexterity: 13, constitution: 14, intelligence: 8, wisdom: 12, charisma: 10 }
    else if (dndClass.name === 'Bardo') base = { strength: 8, dexterity: 14, constitution: 12, intelligence: 10, wisdom: 13, charisma: 15 }
    else if (dndClass.name === 'Clérigo') base = { strength: 14, dexterity: 8, constitution: 13, intelligence: 10, wisdom: 15, charisma: 12 }
    else if (dndClass.name === 'Druida') base = { strength: 10, dexterity: 12, constitution: 14, intelligence: 13, wisdom: 15, charisma: 8 }
    else if (dndClass.name === 'Guerreiro') base = { strength: 15, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 13, charisma: 8 }
    else if (dndClass.name === 'Monge') base = { strength: 10, dexterity: 15, constitution: 13, intelligence: 8, wisdom: 14, charisma: 12 }
    else if (dndClass.name === 'Paladino') base = { strength: 15, dexterity: 8, constitution: 13, intelligence: 10, wisdom: 12, charisma: 14 }
    else if (dndClass.name === 'Patrulheiro') base = { strength: 10, dexterity: 15, constitution: 13, intelligence: 8, wisdom: 14, charisma: 12 }
    else if (dndClass.name === 'Ladino') base = { strength: 8, dexterity: 15, constitution: 13, intelligence: 14, wisdom: 12, charisma: 10 }
    else if (dndClass.name === 'Feiticeiro') base = { strength: 8, dexterity: 13, constitution: 14, intelligence: 10, wisdom: 12, charisma: 15 }
    else if (dndClass.name === 'Bruxo') base = { strength: 8, dexterity: 14, constitution: 13, intelligence: 10, wisdom: 12, charisma: 15 }
    else if (dndClass.name === 'Mago') base = { strength: 8, dexterity: 13, constitution: 14, intelligence: 15, wisdom: 12, charisma: 10 }

    const race = RACES_2014.find(r => r.name === config.race)
    const traits: any[] = []

    if (race) {
        if (race.attributeBonuses) {
            Object.entries(race.attributeBonuses).forEach(([k, v]) => (base as any)[k] += v)
        }
        const lineage = race.lineages?.find(l => l.name === config.subrace)
        if (lineage?.attributeBonuses) {
            Object.entries(lineage.attributeBonuses).forEach(([k, v]) => (base as any)[k] += v)
        }
        
        // Adicionar traços raciais
        race.traits.forEach(t => traits.push({ name: t.name, description: t.description, source: race.name }))
        if (lineage) {
            lineage.traits.forEach(t => traits.push({ name: t.name, description: t.description, source: lineage.name }))
        }
    }

    // Adicionar traços de classe
    const classData = CLASS_LEVEL1_DATA_2014[dndClass.name]
    if (classData) {
        classData.passiveFeatures.forEach(f => traits.push({ name: f.name, description: f.description, source: dndClass.name }))
    }

    const conMod = Math.floor((base.constitution - 10) / 2)
    const hitDie = parseInt(dndClass.hitDie.replace('d', ''))
    const maxHp = hitDie + conMod + (Math.floor(hitDie/2) + 1 + conMod) * 2

    const inventory = getStartingInventory(dndClass.name, background)
    const slots = getSpellSlots(dndClass.name, level, '2014')
    
    const resources: Record<string, number> = {}
    if (dndClass.name === 'Bárbaro') resources['Fúrias'] = 3
    if (dndClass.name === 'Monge') resources['Pontos de Foco'] = level
    if (dndClass.name === 'Feiticeiro') resources['Pontos de Feitiçaria'] = level
    if (dndClass.name === 'Paladino') resources['Imposição de Mãos'] = level * 5
    if (dndClass.name === 'Bardo') resources['Inspiração Bárdica'] = Math.max(1, Math.floor((base.charisma - 10) / 2))

    const ac = calculateAC(dndClass.name, base, inventory)

    let spellIds: string[] = []
    if (SPELLCASTING_CLASSES.includes(dndClass.name) || dndClass.name === 'Paladino' || dndClass.name === 'Patrulheiro') {
        const availableSpells = getSpellsForClass(dndClass.name, '2014')
        const cantrips = availableSpells.filter(s => s.level === 0).slice(0, slots?.cantrips || 0)
        const lvl1 = availableSpells.filter(s => s.level === 1).slice(0, 4)
        spellIds = [...cantrips.map(s => s.id), ...lvl1.map(s => s.id)]
    }

    const skills: Record<string, boolean> = {}
    skillMapping[dndClass.name]?.forEach(s => skills[s] = true)

    await prisma.character.create({
      data: {
        userId: user.id,
        slug: `${dndClass.id}-${nanoid(5)}`,
        name: charName,
        class: dndClass.name,
        subclass: subclassesMap[dndClass.name],
        race: config.race,
        subrace: config.subrace,
        background: background,
        avatarUrl: dndClass.image, // Usar a foto da classe
        level: level,
        ...base,
        maxHp,
        currentHp: maxHp,
        armorClass: ac,
        proficiencyBonus: 2,
        speed: race?.speed || 30,
        ruleset: '2014',
        inventory: JSON.stringify(inventory),
        resources: JSON.stringify(resources),
        skills: JSON.stringify(skills),
        traits: JSON.stringify(traits),
        spellSlots: slots ? JSON.stringify(slots.slots) : null,
        spells: JSON.stringify(spellIds),
        isPublic: true,
      }
    })
  }

  console.log('--- Semeadura concluída! ---')
}

main().finally(() => prisma.$disconnect())
