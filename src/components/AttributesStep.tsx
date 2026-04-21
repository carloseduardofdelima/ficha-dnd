'use client'
import { useMemo } from 'react'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { CLASSES } from '@/lib/classes'
import { RACES } from '@/lib/races'
import { ChevronUp, ChevronDown, Star } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
export type Attrs = {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export type ASI = {
  primary: keyof Attrs | null    // +2
  secondary: keyof Attrs | null  // +1
}

// ── Constants ───────────────────────────────────────────────────────────────
const ATTR_INFO: { key: keyof Attrs; label: string; abbr: string }[] = [
  { key: 'strength', label: 'Força', abbr: 'FOR' },
  { key: 'dexterity', label: 'Destreza', abbr: 'DES' },
  { key: 'constitution', label: 'Constituição', abbr: 'CON' },
  { key: 'intelligence', label: 'Inteligência', abbr: 'INT' },
  { key: 'wisdom', label: 'Sabedoria', abbr: 'SAB' },
  { key: 'charisma', label: 'Carisma', abbr: 'CAR' },
]

// Point-buy cost table (score → cost to reach from 8)
export const POINT_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
}
export const BUDGET = 27
const MIN_SCORE = 8
const MAX_SCORE = 15

// ── Skill definitions ───────────────────────────────────────────────────────
const ALL_SKILLS: { key: string; label: string; attr: string }[] = [
  { key: 'acrobatics', label: 'Acrobacia', attr: 'DES' },
  { key: 'animalHandling', label: 'Adestrar Animais', attr: 'SAB' },
  { key: 'arcana', label: 'Arcanismo', attr: 'INT' },
  { key: 'athletics', label: 'Atletismo', attr: 'FOR' },
  { key: 'deception', label: 'Enganação', attr: 'CAR' },
  { key: 'history', label: 'História', attr: 'INT' },
  { key: 'insight', label: 'Intuição', attr: 'SAB' },
  { key: 'intimidation', label: 'Intimidação', attr: 'CAR' },
  { key: 'investigation', label: 'Investigação', attr: 'INT' },
  { key: 'medicine', label: 'Medicina', attr: 'SAB' },
  { key: 'nature', label: 'Natureza', attr: 'INT' },
  { key: 'perception', label: 'Percepção', attr: 'SAB' },
  { key: 'performance', label: 'Atuação', attr: 'CAR' },
  { key: 'persuasion', label: 'Persuasão', attr: 'CAR' },
  { key: 'religion', label: 'Religião', attr: 'INT' },
  { key: 'sleightOfHand', label: 'Prestidigitação', attr: 'DES' },
  { key: 'stealth', label: 'Furtividade', attr: 'DES' },
  { key: 'survival', label: 'Sobrevivência', attr: 'SAB' },
]

// Map PT skill label → skill key
const SKILL_PT_TO_KEY: Record<string, string> = {
  'Acrobacia': 'acrobatics',
  'Adestrar Animais': 'animalHandling',
  'Arcanismo': 'arcana',
  'Atletismo': 'athletics',
  'Enganação': 'deception',
  'História': 'história',
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
// fix the history key collision
SKILL_PT_TO_KEY['História'] = 'history'

// Map class name → primary attribute keys (for highlighting)
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
}

// ── Class Skill Data (Count and Allowed Options) ───────────────────────────
type ClassSkillInfo = {
  count: number
  options?: string[] // if undefined, any skill can be chosen
}

const CLASS_SKILL_DATA: Record<string, ClassSkillInfo> = {
  'Artesão Arcano': { count: 2, options: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleightOfHand'] },
  'Bárbaro': { count: 2, options: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'] },
  'Bardo': { count: 3 }, // Any 3 skills
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

// ── Helpers ─────────────────────────────────────────────────────────────────
function calcMod(score: number) { return Math.floor((score - 10) / 2) }
function fmtMod(m: number) { return m >= 0 ? `+${m}` : `${m}` }
function totalSpent(attrs: Attrs) {
  return Object.values(attrs).reduce((sum, v) => sum + (POINT_COST[v] ?? 0), 0)
}

// ── Props ───────────────────────────────────────────────────────────────────
interface AttributesStepProps {
  className: string         // selected class name
  raceName: string          // selected race name
  subRaceName: string       // selected sub-race name
  backgroundName: string    // selected background name
  level: number
  attrs: Attrs
  skills: Record<string, boolean>
  expertises: Record<string, boolean>
  asi: ASI
  onAttrsChange: (a: Attrs) => void
  onSkillsChange: (s: Record<string, boolean>) => void
  onExpertisesChange: (e: Record<string, boolean>) => void
  onAsiChange: (asi: ASI) => void
}

const EXPERTISE_LIMITS: Record<string, (lv: number) => number> = {
  'Ladino': (lv) => (lv >= 6 ? 4 : 2),
  'Bardo': (lv) => (lv >= 9 ? 4 : lv >= 2 ? 2 : 0),
  'Patrulheiro': (lv) => 1, // 2024 Ranger / Deft Explorer
}

// ── Component ───────────────────────────────────────────────────────────────
export default function AttributesStep({
  className, raceName, subRaceName, backgroundName, level, attrs, skills, expertises, asi, onAttrsChange, onSkillsChange, onExpertisesChange, onAsiChange
}: AttributesStepProps) {

  const spent = totalSpent(attrs)
  const remaining = BUDGET - spent

  // Background and Race auto-selected skills (locked)
  const lockedSkillKeys = useMemo<Set<string>>(() => {
    const bg = BACKGROUNDS.find(b => b.name === backgroundName)
    const race = RACES.find(r => r.name === raceName)
    const keys = new Set<string>()
    
    // BG Skills
    bg?.skills.forEach(s => {
      const k = SKILL_PT_TO_KEY[s]
      if (k) keys.add(k)
    })
    
    // Fixed Race Skills
    race?.skillProf?.forEach(s => {
      const k = SKILL_PT_TO_KEY[s]
      if (k) keys.add(k)
    })
    
    return keys
  }, [backgroundName, raceName])

  // Racial skill choice info
  const raceSkillChoice = useMemo(() => {
    return RACES.find(r => r.name === raceName)?.skillChoice
  }, [raceName])

  const classSkillInfo = useMemo(() => CLASS_SKILL_DATA[className], [className])

  // Collision Logic: If a locked skill is also in class options, user gets a "free" choice
  const collisionCount = useMemo(() => {
    if (!classSkillInfo?.options) return 0
    let count = 0
    lockedSkillKeys.forEach(k => {
      if (classSkillInfo.options?.includes(k)) count++
    })
    return count
  }, [lockedSkillKeys, classSkillInfo])

  // Primary attrs for the selected class
  const primaryAttrs = useMemo<Set<keyof Attrs>>(() => {
    return new Set(CLASS_PRIMARY_ATTRS[className] ?? [])
  }, [className])

  // Saving throws for selected class
  const classSavingThrows = useMemo<string[]>(() => {
    const cls = CLASSES.find(c => c.name === className)
    return cls?.savingThrows ?? []
  }, [className])

  // Attr → save throw mapping
  const ATTR_SAVE_PT: Record<string, keyof Attrs> = {
    'Força': 'strength', 'Destreza': 'dexterity', 'Constituição': 'constitution',
    'Inteligência': 'intelligence', 'Sabedoria': 'wisdom', 'Carisma': 'charisma'
  }
  const proficientSaves = useMemo(() => {
    const s = new Set<keyof Attrs>()
    classSavingThrows.forEach(st => {
      const k = ATTR_SAVE_PT[st]
      if (k) s.add(k)
    })
    return s
  }, [classSavingThrows])

  // Point-buy: adjust a score
  const adjust = (key: keyof Attrs, delta: number) => {
    const curr = attrs[key]
    const next = curr + delta
    if (next < MIN_SCORE || next > MAX_SCORE) return
    const costDelta = (POINT_COST[next] ?? 0) - (POINT_COST[curr] ?? 0)
    if (remaining - costDelta < 0) return
    onAttrsChange({ ...attrs, [key]: next })
  }

  // Toggle a skill (locked skills cannot be changed)
  const toggleSkill = (key: string) => {
    if (lockedSkillKeys.has(key)) return 

    const totalAllowedCount = (classSkillInfo?.count || 0) + (raceSkillChoice?.count || 0) + collisionCount
    const currentSelectedCount = Object.entries(skills).filter(([k, v]) => v && !lockedSkillKeys.has(k)).length

    // If trying to select a new skill
    if (!skills[key]) {
      // Check if skill is allowed for the class OR for the race
      const isAllowedByClass = !classSkillInfo?.options || classSkillInfo.options.includes(key)
      const isAllowedByRace = !raceSkillChoice?.options || raceSkillChoice.options.map(o => SKILL_PT_TO_KEY[o]).includes(key)
      
      // If we have collisions, the user effectively has "floating" points from class
      // In 5e/2024, if you have a collision, you pick ANY other skill.
      const hasFloatingChoice = collisionCount > 0
      
      if (!isAllowedByClass && !isAllowedByRace && !hasFloatingChoice) {
        return
      }
      
      // Check if already at the combined limit
      if (currentSelectedCount >= totalAllowedCount) {
        return
      }
    }

    onSkillsChange({ ...skills, [key]: !skills[key] })
  }

  // Toggle Expertise
  const toggleExpertise = (key: string) => {
    const max = EXPERTISE_LIMITS[className]?.(level) || 0
    const current = Object.values(expertises).filter(Boolean).length

    if (!expertises[key] && current >= max) return
    onExpertisesChange({ ...expertises, [key]: !expertises[key] })
  }

  const totalAllowedCount = (classSkillInfo?.count || 0) + (raceSkillChoice?.count || 0) + collisionCount
  const selectedCount = Object.entries(skills).filter(([k, v]) => v && !lockedSkillKeys.has(k)).length
  
  const isSkillDisabled = (key: string) => {
    if (lockedSkillKeys.has(key)) return false 
    if (skills[key]) return false 
    
    // If we have any "Any Skill" source (like Human or Bard or Collision), it's never disabled by options
    const skipOptionsCheck = (classSkillInfo && !classSkillInfo.options) || (raceSkillChoice && !raceSkillChoice.options) || collisionCount > 0
    
    if (!skipOptionsCheck) {
      const isAllowedByClass = classSkillInfo?.options?.includes(key)
      const isAllowedByRace = raceSkillChoice?.options?.map(o => SKILL_PT_TO_KEY[o]).includes(key)
      if (!isAllowedByClass && !isAllowedByRace) return true
    }

    // Disabled if at the combined limit
    if (selectedCount >= totalAllowedCount) return true

    return false
  }

  const handleAsiSelect = (type: 'primary' | 'secondary', attr: keyof Attrs) => {
    if (type === 'primary') {
      const newSecondary = asi.secondary === attr ? null : asi.secondary
      onAsiChange({ primary: attr, secondary: newSecondary })
    } else {
      const newPrimary = asi.primary === attr ? null : asi.primary
      onAsiChange({ primary: newPrimary, secondary: attr })
    }
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8 }}>Atributos & Perícias</h2>
        <p style={{ color: 'var(--fg2)' }}>
          Distribua 27 pontos entre seus atributos básicos. Em seguida, escolha os <strong>Bônus de Origem</strong> (+2 e +1) para definir sua herança.
        </p>
      </div>

      {/* ── ASI Selection (Style 2024) ── */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32
      }} className="asi-section">
        <div>
          <h3 style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Bônus Primário (+2)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ATTR_INFO.map(({ key, abbr }) => (
              <button
                key={`p-${key}`}
                onClick={() => handleAsiSelect('primary', key)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  border: `1px solid ${asi.primary === key ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                  backgroundColor: asi.primary === key ? 'rgba(var(--accent-rgb, 191,155,48), 0.15)' : 'rgba(255,255,255,0.03)',
                  color: asi.primary === key ? 'var(--accent)' : 'var(--fg3)',
                  cursor: 'pointer'
                }}
              >
                {abbr}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 13, color: 'var(--accentL)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Bônus Secundário (+1)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ATTR_INFO.map(({ key, abbr }) => (
              <button
                key={`s-${key}`}
                onClick={() => handleAsiSelect('secondary', key)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  border: `1px solid ${asi.secondary === key ? 'var(--accentL)' : 'rgba(255,255,255,0.08)'}`,
                  backgroundColor: asi.secondary === key ? 'rgba(251,113,133,0.15)' : 'rgba(255,255,255,0.03)',
                  color: asi.secondary === key ? 'var(--accentL)' : 'var(--fg3)',
                  cursor: 'pointer'
                }}
              >
                {abbr}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="attrs-layout" style={{ gap: 32, alignItems: 'start' }}>
        {/* ── LEFT: Attributes ───────────────────────────────────────────────── */}
        <div>
          {/* Point budget indicator */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'var(--bg2)', borderRadius: 12, padding: '14px 20px',
            border: `1px solid ${remaining === 0 ? 'var(--accent)' : remaining < 5 ? 'rgba(251,113,133,0.4)' : 'rgba(255,255,255,0.07)'}`,
            marginBottom: 20, transition: 'all 0.3s'
          }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>Pontos Disponíveis</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: remaining === 0 ? 'var(--accent)' : remaining <= 5 ? 'var(--accentL)' : 'var(--fg)', lineHeight: 1 }}>
                {remaining} <span style={{ fontSize: 14, color: 'var(--fg3)', fontWeight: 400 }}>/ {BUDGET}</span>
              </div>
            </div>
            {/* Mini bar */}
            <div style={{ width: 120 }}>
              <div style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${(spent / BUDGET) * 100}%`,
                  background: remaining === 0
                    ? 'linear-gradient(90deg, var(--accent2), var(--accent))'
                    : 'linear-gradient(90deg, #7c3aed, var(--accentL))',
                  transition: 'width 0.2s ease'
                }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4, textAlign: 'right' }}>{spent} usados</div>
            </div>
          </div>

          {/* Attribute rows */}
          <div className='attr-row' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ATTR_INFO.map(({ key, label, abbr }) => {
              const baseScore = attrs[key]
              const bonus = (asi.primary === key ? 2 : 0) + (asi.secondary === key ? 1 : 0)
              const score = baseScore + bonus
              const mod = calcMod(score)
              const isPrimary = primaryAttrs.has(key)
              const isSave = proficientSaves.has(key)
              const canInc = score < MAX_SCORE && remaining >= ((POINT_COST[score + 1] ?? 99) - POINT_COST[score])
              const canDec = score > MIN_SCORE

              return (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  backgroundColor: isPrimary ? 'rgba(147,51,234,0.12)' : 'var(--bg2)',
                  border: `1px solid ${isPrimary ? 'rgba(147,51,234,0.4)' : bonus > 0 ? 'rgba(var(--accent-rgb, 191,155,48), 0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12, padding: '12px 16px',
                  transition: 'all 0.2s',
                  boxShadow: isPrimary ? '0 0 12px rgba(147,51,234,0.15)' : bonus > 0 ? '0 0 10px rgba(var(--accent-rgb, 191,155,48), 0.1)' : 'none'
                }}>
                  {/* Abbr + label */}
                  <div style={{ width: 100, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: isPrimary ? '#c084fc' : 'var(--fg3)', letterSpacing: '0.1em' }}>{abbr}</span>
                      {isPrimary && <Star size={10} color="#c084fc" fill="#c084fc" />}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fg2)', fontWeight: 500 }}>{label}</div>
                    {isSave && (
                      <div style={{ fontSize: 9, color: 'var(--accentL)', fontWeight: 700, textTransform: 'uppercase', marginTop: 1 }}>✓ Salv.</div>
                    )}
                  </div>

                  {/* Score + stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                    <button
                      onClick={() => adjust(key, -1)}
                      disabled={!canDec}
                      style={{
                        width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent', cursor: canDec ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: canDec ? 1 : 0.3, color: 'var(--fg2)', transition: 'all 0.15s'
                      }}
                    >
                      <ChevronDown size={14} />
                    </button>

                    <div style={{ textAlign: 'center', minWidth: 48 }}>
                      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, color: bonus > 0 ? 'var(--accent)' : isPrimary ? '#c084fc' : 'var(--fg)' }}>{score}</div>
                      <div style={{ fontSize: 11, color: bonus > 0 ? 'var(--accentL)' : 'var(--accentL)', fontWeight: 600 }}>{fmtMod(mod)}</div>
                      {bonus > 0 && <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--accentL)' }}>+{bonus} bônus</div>}
                    </div>

                    <button
                      onClick={() => adjust(key, 1)}
                      disabled={!canInc}
                      style={{
                        width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent', cursor: canInc ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: canInc ? 1 : 0.3, color: 'var(--fg2)', transition: 'all 0.15s'
                      }}
                    >
                      <ChevronUp size={14} />
                    </button>
                  </div>

                  {/* Cost badge */}
                  <div style={{
                    width: 32, textAlign: 'right', fontSize: 10, fontWeight: 700,
                    color: 'var(--fg3)', flexShrink: 0
                  }}>
                    {baseScore} <span style={{ opacity: 0.5 }}>bás.</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cost reference */}
          <div style={{ marginTop: 16, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Tabela de Custos</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Object.entries(POINT_COST).map(([score, cost]) => (
                <div key={score} style={{
                  padding: '3px 8px', borderRadius: 6,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  fontSize: 11, color: 'var(--fg2)'
                }}>
                  {score} = <span style={{ color: 'var(--accentL)', fontWeight: 700 }}>{cost}pt</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Skills ───────────────────────────────────────────────────── */}
        <div>
          <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 30 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
               <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>Perícias</div>
               <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                 <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#c084fc', whiteSpace: 'nowrap' }}>
                   <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#c084fc', display: 'inline-block' }} />
                   Origem (Raça/BG)
                 </span>
                 <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accentL)', whiteSpace: 'nowrap' }}>
                   <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accentL)', display: 'inline-block' }} />
                   Selecionada
                 </span>
               </div>
             </div>
             {(classSkillInfo || raceSkillChoice) && (
               <div style={{
                 fontSize: 12,
                 color: selectedCount === totalAllowedCount ? 'var(--ok)' : 'var(--fg3)',
                 backgroundColor: 'rgba(255,255,255,0.03)',
                 padding: '6px 12px',
                 borderRadius: 6,
                 borderLeft: `3px solid ${selectedCount === totalAllowedCount ? 'var(--ok)' : 'var(--accent)'}`
               }}>
                 Você possui <strong>{totalAllowedCount}</strong> seleções disponíveis ({selectedCount} de {totalAllowedCount} usadas).
                 <div style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>
                   Fontes: {className} ({classSkillInfo?.count || 0}) 
                   {raceSkillChoice && ` + ${raceName} (${raceSkillChoice.count})`}
                   {collisionCount > 0 && ` + Colisão de Origem (${collisionCount})`}
                 </div>
               </div>
             )}

             {EXPERTISE_LIMITS[className] && EXPERTISE_LIMITS[className](level) > 0 && (
               <div style={{
                 fontSize: 11,
                 backgroundColor: 'rgba(147,51,234,0.1)',
                 padding: '8px 12px',
                 borderRadius: 6,
                 border: '1px solid rgba(147,51,234,0.3)',
                 marginTop: 8,
                 color: '#c084fc'
               }}>
                 <strong>{className}:</strong> Você pode escolher <strong>{EXPERTISE_LIMITS[className](level)}</strong> especializações. 
                 Marque o ícone de <Star size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> nas perícias desejadas.
               </div>
             )}
          </div>

          <div className="skills-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ALL_SKILLS.map(({ key, label, attr }) => {
              const isFromOrigin = lockedSkillKeys.has(key)
              const isChecked = isFromOrigin || !!skills[key]
              const isExpert = !!expertises[key] && isChecked
              const baseAttr = getAttrForSkill(attr)
              const score = attrs[baseAttr] + (asi.primary === baseAttr ? 2 : 0) + (asi.secondary === baseAttr ? 1 : 0)
              const pb = Math.ceil(level / 4) + 1
              const mod = calcMod(score)
              const disabled = isSkillDisabled(key)

              // Final bonus: Stat + (isProf ? PB : 0) + (isExpert ? PB : 0)
              const finalBonus = mod + (isChecked ? pb : 0) + (isExpert ? pb : 0)

              return (
                <button
                  key={key}
                  onClick={() => toggleSkill(key)}
                  disabled={disabled && !isFromOrigin}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px', borderRadius: 8,
                    border: `1px solid ${isFromOrigin ? 'rgba(192,132,252,0.35)' : isChecked ? 'rgba(251,113,133,0.35)' : 'rgba(255,255,255,0.06)'}`,
                    backgroundColor: isFromOrigin ? 'rgba(192,132,252,0.08)' : isChecked ? 'rgba(225,29,72,0.06)' : 'var(--bg2)',
                    cursor: isFromOrigin ? 'default' : disabled ? 'not-allowed' : 'pointer',
                    textAlign: 'left', width: '100%', transition: 'all 0.15s',
                    opacity: disabled && !isFromOrigin ? 0.4 : 1,
                  }}
                >
                  {/* Checkbox circle */}
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isFromOrigin ? '#c084fc' : isChecked ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                    backgroundColor: isFromOrigin ? '#c084fc' : isChecked ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}>
                    {isChecked && <svg width="9" height="9" viewBox="0 0 9 9"><polyline points="1.5,4.5 3.5,6.5 7.5,2.5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>

                  {/* Label + modifier */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: isChecked ? 600 : 400, color: isChecked ? 'var(--fg)' : 'var(--fg2)' }}>{label}</span>
                    <span style={{ fontSize: 10, color: 'var(--fg3)', marginLeft: 4 }}>({attr})</span>
                  </div>

                  {/* Modifier */}
                  <div style={{
                    fontSize: 13, fontWeight: 700, textAlign: 'right', minWidth: 24,
                    color: isExpert ? 'var(--accent)' : isChecked ? 'var(--accentL)' : 'var(--fg3)',
                    display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    {isExpert && <Star size={10} fill="var(--accent)" />}
                    {fmtMod(finalBonus)}
                  </div>

                  {/* Expertise Toggle */}
                  {isChecked && EXPERTISE_LIMITS[className] && EXPERTISE_LIMITS[className](level) > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpertise(key); }}
                      style={{
                        padding: 4, borderRadius: 4, background: isExpert ? 'rgba(var(--accent-rgb, 191,155,48), 0.2)' : 'transparent',
                        border: `1px solid ${isExpert ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      title="Marcar Especialização"
                    >
                      <Star size={12} color={isExpert ? 'var(--accent)' : 'var(--fg3)'} fill={isExpert ? 'var(--accent)' : 'none'} />
                    </button>
                  )}

                  {/* Lock for bg/race skills */}
                  {isFromOrigin && (
                    <div style={{ fontSize: 9, color: '#c084fc', fontWeight: 700 }}>ORIGEM</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .attrs-layout {
            grid-template-columns: 1fr !important;
          }
          .skills-list {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            max-height: none !important;
            overflow-y: visible !important;
          }
          .attr-row {
            grid-template-columns: 1fr !important;
          }
          .asi-section {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 600px) {
          .skills-list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

// ── Helper: map attr abbr -> Attrs key ──────────────────────────────────────
function getAttrForSkill(attr: string): keyof Attrs {
  const map: Record<string, keyof Attrs> = {
    'FOR': 'strength', 'DES': 'dexterity', 'CON': 'constitution',
    'INT': 'intelligence', 'SAB': 'wisdom', 'CAR': 'charisma'
  }
  return map[attr] ?? 'strength'
}
