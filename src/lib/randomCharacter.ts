import { RACES } from './races'
import { RACES_2014 } from './races-2014'
import { CLASSES } from './classes'
import { CLASSES_2014 } from './classes-2014'
import { BACKGROUNDS } from './backgrounds'
import { BACKGROUNDS_2014 } from './backgrounds-2014'
import { getSpellsForClass, getSpellSlots } from './spells'
import CLASS_LEVEL1_DATA from './class-features'
import { CLASS_LEVEL1_DATA_2014 } from './class-features-2014'
import type { Attrs, ASI } from '@/components/AttributesStep'
import { getStartingInventory, type InventoryEntry } from './inventory'

const NAMES = [
  'Aethelgard', 'Galdor', 'Valerius', 'Kaelen', 'Thorgar', 'Elysia', 'Lyra', 'Morrigan', 'Zephyr', 'Rowan',
  'Orion', 'Sariel', 'Gideon', 'Thalia', 'Balthazar', 'Seraphina', 'Ignis', 'Vesper', 'Dante', 'Beatrix',
  'Kaelith', 'Sylas', 'Finnian', 'Maeve', 'Garrick', 'Freya', 'Cassian', 'Aurelia', 'Doran', 'Isolde',
  'Ragnar', 'Lagertha', 'Bjorn', 'Ivar', 'Floki', 'Astrid', 'Haldor', 'Sigrid', 'Torstein', 'Gudrun',
  'Eldar', 'Faelar', 'Galen', 'Hadrian', 'Kaelen', 'Lucius', 'Marius', 'Valen', 'Alaric', 'Bram'
]

const SKILL_PT_TO_KEY: Record<string, string> = {
  'Acrobacia': 'acrobatics',
  'Adestrar Animais': 'animalHandling',
  'Arcanismo': 'arcana',
  'Atletismo': 'athletics',
  'Enganação': 'deception',
  'História': 'history',
  'Intuição': 'insight',
  'Intimidação': 'intimidation',
  'Investigação': 'investigation',
  'Medicina': 'medicine',
  'Natureza': 'nature',
  'Percepção': 'perception',
  'Atuação': 'performance',
  'Persuasão': 'persuasion',
  'Religião': 'religion',
  'Prestidigitação': 'sleightOfHand',
  'Furtividade': 'stealth',
  'Sobrevivência': 'survival',
}

const CLASS_PRIMARY_ATTRS: Record<string, (keyof Attrs)[]> = {
  'Bárbaro': ['strength'],
  'Bardo': ['charisma'],
  'Clérigo': ['wisdom'],
  'Druida': ['wisdom'],
  'Guerreiro': ['strength', 'dexterity'],
  'Monge': ['dexterity', 'wisdom'],
  'Paladino': ['strength', 'charisma'],
  'Patrulheiro': ['dexterity', 'wisdom'],
  'Ladino': ['dexterity'],
  'Feiticeiro': ['charisma'],
  'Bruxo': ['charisma'],
  'Mago': ['intelligence'],
  'Artesão Arcano': ['intelligence'],
  'Artífice': ['intelligence'],
}

const CLASS_SKILL_DATA: Record<string, { count: number; options?: string[] }> = {
  'Artesão Arcano': { count: 2, options: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleightOfHand'] },
  'Artífice': { count: 2, options: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleightOfHand'] },
  'Bárbaro': { count: 2, options: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'] },
  'Bardo': { count: 3 },
  'Bruxo': { count: 2, options: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'] },
  'Clérigo': { count: 2, options: ['history', 'insight', 'medicine', 'persuasion', 'religion'] },
  'Druida': { count: 2, options: ['animalHandling', 'arcana', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'] },
  'Feiticeiro': { count: 2, options: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'] },
  'Guerreiro': { count: 2, options: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'] },
  'Ladino': { count: 4, options: ['acrobatics', 'athletics', 'deception', 'stealth', 'intimidation', 'insight', 'investigation', 'perception', 'persuasion', 'sleightOfHand'] },
  'Mago': { count: 2, options: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'] },
  'Monge': { count: 2, options: ['acrobatics', 'athletics', 'stealth', 'history', 'insight', 'religion'] },
  'Paladino': { count: 2, options: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'] },
  'Patrulheiro': { count: 3, options: ['animalHandling', 'athletics', 'stealth', 'investigation', 'nature', 'perception', 'survival'] },
}

export function generateRandomCharacter(ruleset: '2014' | '2024') {
  const availableRaces = ruleset === '2014' ? RACES_2014 : RACES
  const availableClasses = ruleset === '2014' ? CLASSES_2014 : CLASSES
  const availableBackgrounds = ruleset === '2014' ? BACKGROUNDS_2014 : BACKGROUNDS

  // 1. Pick ruleset, race, class, background
  const name = ''
  const raceObj = availableRaces[Math.floor(Math.random() * availableRaces.length)]
  const classObj = availableClasses[Math.floor(Math.random() * availableClasses.length)]
  const bgObj = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)]

  // Lineage / Subrace
  let subRace = ''
  if (raceObj.lineages && raceObj.lineages.length > 0) {
    const lineage = raceObj.lineages[Math.floor(Math.random() * raceObj.lineages.length)]
    subRace = lineage.name
  }

  // 2. Roll attributes using d20 (minimum 4)
  const rollD20 = () => Math.max(4, Math.floor(Math.random() * 20) + 1)
  const attrs: Attrs = {
    strength: rollD20(),
    dexterity: rollD20(),
    constitution: rollD20(),
    intelligence: rollD20(),
    wisdom: rollD20(),
    charisma: rollD20(),
  }

  // 3. ASI Assignment
  const asi: ASI = { primary: null, secondary: null }
  const classPrimaryKeys = CLASS_PRIMARY_ATTRS[classObj.name] || ['strength']
  
  if (ruleset === '2024') {
    // 2024 style: +2 and +1. Primary goes to one of class primary attributes. Secondary goes to another.
    const prim = classPrimaryKeys[Math.floor(Math.random() * classPrimaryKeys.length)]
    asi.primary = prim
    
    const possibleSecondaries = (Object.keys(attrs) as Array<keyof Attrs>).filter(k => k !== prim)
    asi.secondary = possibleSecondaries[Math.floor(Math.random() * possibleSecondaries.length)]
  } else if (ruleset === '2014' && raceObj.name === 'Meio-Elfo') {
    // Meio-Elfo gets +2 Charisma (fixed) and two other attributes get +1.
    // In our model, we can assign secondary as one +1 and primary as another +1 (since charisma is fixed in calculations)
    const possiblePluses = (Object.keys(attrs) as Array<keyof Attrs>).filter(k => k !== 'charisma')
    const idx1 = Math.floor(Math.random() * possiblePluses.length)
    const plus1 = possiblePluses[idx1]
    possiblePluses.splice(idx1, 1)
    const plus2 = possiblePluses[Math.floor(Math.random() * possiblePluses.length)]
    
    asi.primary = plus1
    asi.secondary = plus2
  }

  // 4. Skills selection
  const skills: Record<string, boolean> = {}
  
  // Locked skills from Background
  bgObj.skills.forEach(s => {
    const k = SKILL_PT_TO_KEY[s]
    if (k) skills[k] = true
  })

  // Locked skills from Race (2014 fixedSkills or 2024 skillProf)
  const fixedRaceSkills = ruleset === '2014' ? raceObj.fixedSkills : raceObj.skillProf
  fixedRaceSkills?.forEach(s => {
    const k = SKILL_PT_TO_KEY[s]
    if (k) skills[k] = true
  })

  // Collisions / Class Skills
  const classSkillInfo = ruleset === '2014'
    ? { count: classObj.skillCount || 0, options: classObj.skillOptions?.map(s => SKILL_PT_TO_KEY[s] || s) }
    : CLASS_SKILL_DATA[classObj.name]

  const raceSkillChoice = ruleset === '2014'
    ? (raceObj.bonusSkillCount ? { count: raceObj.bonusSkillCount } : undefined)
    : raceObj.skillChoice

  // Helper to select skills randomly from options
  const selectRandomSkills = (count: number, options?: string[]) => {
    let chosen = 0
    let candidates = options 
      ? options.map(o => SKILL_PT_TO_KEY[o] || o).filter(k => !skills[k])
      : Object.values(SKILL_PT_TO_KEY).filter(k => !skills[k])

    while (chosen < count && candidates.length > 0) {
      const idx = Math.floor(Math.random() * candidates.length)
      const key = candidates[idx]
      skills[key] = true
      candidates.splice(idx, 1)
      chosen++
    }
  }

  // Choose class skills
  if (classSkillInfo) {
    selectRandomSkills(classSkillInfo.count, classSkillInfo.options)
  }

  // Choose race skills
  if (raceSkillChoice) {
    const options = raceSkillChoice.options?.map(o => SKILL_PT_TO_KEY[o] || o)
    selectRandomSkills(raceSkillChoice.count, options)
  }

  // 5. Expertises
  const expertises: Record<string, boolean> = {}
  if (classObj.name === 'Ladino' || classObj.name === 'Bardo' || classObj.name === 'Patrulheiro') {
    const limit = classObj.name === 'Ladino' ? 2 : classObj.name === 'Bardo' ? 2 : 1
    const eligible = Object.keys(skills).filter(k => skills[k])
    let count = 0
    while (count < limit && eligible.length > 0) {
      const idx = Math.floor(Math.random() * eligible.length)
      const key = eligible[idx]
      expertises[key] = true
      eligible.splice(idx, 1)
      count++
    }
  }

  // 6. Feature Choices (Subclass, fighting styles, weapon masteries)
  const featureChoices: Record<string, string | string[]> = {}
  const classData = ruleset === '2014' ? CLASS_LEVEL1_DATA_2014[classObj.name] : CLASS_LEVEL1_DATA[classObj.name]
  
  if (classData && classData.choices) {
    classData.choices.forEach(choice => {
      if (choice.type === 'radio') {
        const opt = choice.options[Math.floor(Math.random() * choice.options.length)]
        featureChoices[choice.id] = opt.id
      } else if (choice.type === 'multi' && choice.maxSelections) {
        const count = choice.maxSelections
        const selected: string[] = []
        const pool = [...choice.options]
        for (let i = 0; i < count && pool.length > 0; i++) {
          const idx = Math.floor(Math.random() * pool.length)
          selected.push(pool[idx].id)
          pool.splice(idx, 1)
        }
        featureChoices[choice.id] = selected
      }
    })
  }

  // 7. Spells
  const selectedSpells: string[] = []
  const spellClass = classObj.name === 'Artesão Arcano' ? 'Artífice' : classObj.name
  const slots = getSpellSlots(spellClass, 1, ruleset)
  
  if (slots) {
    const availableSpells = getSpellsForClass(spellClass, ruleset)
    
    // Cantrips
    const cantrips = availableSpells.filter(s => s.level === 0)
    const maxCantrips = slots.cantrips || 0
    for (let i = 0; i < maxCantrips && cantrips.length > 0; i++) {
      const idx = Math.floor(Math.random() * cantrips.length)
      selectedSpells.push(cantrips[idx].id)
      cantrips.splice(idx, 1)
    }

    // Level 1 spells
    const lvl1Spells = availableSpells.filter(s => s.level === 1)
    const maxLvl1 = (slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)
    for (let i = 0; i < maxLvl1 && lvl1Spells.length > 0; i++) {
      const idx = Math.floor(Math.random() * lvl1Spells.length)
      selectedSpells.push(lvl1Spells[idx].id)
      lvl1Spells.splice(idx, 1)
    }
  }

  // 8. Inventory
  const inventory = getStartingInventory(classObj.name, bgObj.name)

  return {
    form: {
      name,
      class: classObj.name,
      race: raceObj.name,
      subRace,
      background: bgObj.name,
      level: 1,
      avatarUrl: '',
      isPublic: false,
      playerName: '',
      appearance: 'Um herói misterioso e imprevisível.',
      backstory: 'Seu destino foi selado pelas rolagens da sorte e do caos.',
      personalityTraits: 'Imprevisível, reativo e adaptável.',
      ideals: 'Liberdade e Autodeterminação.',
      bonds: 'Seus companheiros de jornada.',
      flaws: 'Deixa as decisões críticas nas mãos da sorte.',
      ruleset
    },
    attrs,
    asi,
    skills,
    expertises,
    selectedSpells,
    featureChoices,
    inventory
  }
}
