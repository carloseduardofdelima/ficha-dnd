export function calcModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function formatModifier(score: number): string {
  const mod = calcModifier(score)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export const DND_CLASSES = [
  'Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida',
  'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge',
  'Paladino', 'Patrulheiro',
]

export const DND_RACES = [
  'Anão', 'Draconato', 'Elfo', 'Gnomo', 'Halfling',
  'Humano', 'Meio-Elfo', 'Meio-Orc', 'Tiefling',
]

export const DND_ALIGNMENTS = [
  'Leal e Bom', 'Neutro e Bom', 'Caótico e Bom',
  'Leal e Neutro', 'Neutro', 'Caótico e Neutro',
  'Leal e Mau', 'Neutro e Mau', 'Caótico e Mau',
]

export const SKILL_LABELS: Record<string, string> = {
  acrobatics: 'Acrobacia (Des)', animalHandling: 'Adestrar Animais (Sab)',
  arcana: 'Arcanismo (Int)', athletics: 'Atletismo (For)',
  deception: 'Enganação (Car)', history: 'História (Int)',
  insight: 'Intuição (Sab)', intimidation: 'Intimidação (Car)',
  investigation: 'Investigação (Int)', medicine: 'Medicina (Sab)',
  nature: 'Natureza (Int)', perception: 'Percepção (Sab)',
  performance: 'Atuação (Car)', persuasion: 'Persuasão (Car)',
  religion: 'Religião (Int)', sleightOfHand: 'Prestidigitação (Des)',
  stealth: 'Furtividade (Des)', survival: 'Sobrevivência (Sab)',
}

export const ATTR_LABELS: Record<string, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
}

export interface Defense {
  type: string
  value: string | number
  detail?: string
}

export interface Character {
  id: string
  slug: string
  userId: string
  name: string
  race: string
  class: string
  subclass?: string | null
  level: number
  background?: string | null
  alignment?: string | null
  avatarUrl?: string | null
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  maxHp: number
  currentHp: number
  maxMana: number
  currentMana: number
  armorClass: number
  speed: number
  initiative: number
  proficiencyBonus: number
  exp?: string | null
  defenses?: Defense[] | null
  skills?: Record<string, boolean> | null
  inventory?: Array<{ id: string; name: string; quantity: number }> | null
  spells?: unknown
  traits?: Record<string, string> | null
  appearance?: string | null
  backstory?: string | null
  playerName?: string | null
  notes?: string | null
  isPublic: boolean
  createdAt: string | Date
  updatedAt: string | Date
}
