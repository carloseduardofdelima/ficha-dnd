import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { SPELLS, SPELLS_2014 } from '@/lib/spells'

export const SUBCLASS_EXCLUDED_FEATURES_2014 = new Set([
  'Caminho Primitivo',
  'Colégio de Bardo',
  'Domínio Divino',
  'Círculo Druídico',
  'Arquétipo Marcial',
  'Tradição Monástica',
  'Juramento Sagrado',
  'Conclave de Patrulheiro',
  'Arquétipo Ladino',
  'Origem de Feitiçaria',
  'Patrono Transcendental',
  'Tradição Arcana',
  'Especialização de Artífice',
  'Característica de Arquétipo',
  'Característica de Círculo',
  'Característica de Origem',
  'Característica de Patrono Transcendental',
  'Característica de Juramento Sagrado',
  'Característica de Conclave',
  'Característica de Tradição Monástica',
  'Característica de Especialização',
])

export function getSubclassUnlockLevel(className: string, ruleset: string): number {
  if (ruleset === '2014' || ruleset === '5e-custom') {
    const nameLower = className?.toLowerCase() || ''
    if (['clérigo', 'cleric', 'feiticeiro', 'sorcerer', 'bruxo', 'warlock'].includes(nameLower)) return 1
    if (['druida', 'druid', 'mago', 'wizard'].includes(nameLower)) return 2
    return 3
  }
  return 3 // 2024 ruleset is level 3 for all
}

export function getUnlockedSubclassSpells(
  className: string,
  subclassName: string,
  level: number,
  ruleset: '2014' | '2024' | '5e-custom'
): any[] {
  const subclassSource = (ruleset === '2014' || ruleset === '5e-custom') ? SUBCLASSES_2014 : SUBCLASSES_2024
  const subclassData = subclassSource[className]?.[subclassName]
  if (!subclassData || !subclassData.spells) return []

  let unlockedCount = 0
  const isHalfCaster = className === 'Artífice' || className === 'Paladino' || className === 'Patrulheiro'

  if (isHalfCaster) {
    if (level >= 3) unlockedCount = 2
    if (level >= 5) unlockedCount = 4
    if (level >= 9) unlockedCount = 6
    if (level >= 13) unlockedCount = 8
    if (level >= 17) unlockedCount = 10
  } else if (className === 'Clérigo') {
    if (level >= 1) unlockedCount = 2
    if (level >= 3) unlockedCount = 4
    if (level >= 5) unlockedCount = 6
    if (level >= 7) unlockedCount = 8
    if (level >= 9) unlockedCount = 10
  } else {
    if (level >= 3) unlockedCount = subclassData.spells.length
  }

  const spellNames = subclassData.spells.slice(0, unlockedCount)
  const availableSpellsList = (ruleset === '2014' || ruleset === '5e-custom') ? SPELLS_2014 : SPELLS

  return spellNames.map(name => {
    let normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")
    
    // Naming mapping to resolve translation discrepancies between subclass lists and the spells database
    const mappings: Record<string, string> = {
      "ondatrovejante": "ondadetrovao",
      "raioescaldante": "raioardente",
      "fragmentar": "despedacar",
      "tempestadeglacial": "tempestadedegelo",
      "murodefogo": "muralhadefogo",
      "murodevento": "muralhadevento",
      "murodeforca": "muralhadeenergia",
      "muralhadeforca": "muralhadeenergia",
    }
    
    if (mappings[normName]) {
      normName = mappings[normName]
    }

    return availableSpellsList.find(s => {
      const dbNorm = s.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")
      return dbNorm === normName || dbNorm.includes(normName) || normName.includes(dbNorm)
    })
  }).filter(Boolean)
}
