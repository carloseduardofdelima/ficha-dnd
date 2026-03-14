'use client'
import { useMemo } from 'react'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { CLASSES } from '@/lib/classes'
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
const POINT_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
}
const BUDGET = 27
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

// ── Helpers ─────────────────────────────────────────────────────────────────
function calcMod(score: number) { return Math.floor((score - 10) / 2) }
function fmtMod(m: number) { return m >= 0 ? `+${m}` : `${m}` }
function totalSpent(attrs: Attrs) {
  return Object.values(attrs).reduce((sum, v) => sum + (POINT_COST[v] ?? 0), 0)
}

// ── Props ───────────────────────────────────────────────────────────────────
interface AttributesStepProps {
  className: string         // selected class name
  backgroundName: string    // selected background name
  attrs: Attrs
  skills: Record<string, boolean>
  onAttrsChange: (a: Attrs) => void
  onSkillsChange: (s: Record<string, boolean>) => void
}

// ── Component ───────────────────────────────────────────────────────────────
export default function AttributesStep({
  className, backgroundName, attrs, skills, onAttrsChange, onSkillsChange
}: AttributesStepProps) {

  const spent = totalSpent(attrs)
  const remaining = BUDGET - spent

  // Background auto-selected skills (locked)
  const bgSkillKeys = useMemo<Set<string>>(() => {
    const bg = BACKGROUNDS.find(b => b.name === backgroundName)
    const keys = new Set<string>()
    bg?.skills.forEach(s => {
      const k = SKILL_PT_TO_KEY[s]
      if (k) keys.add(k)
    })
    return keys
  }, [backgroundName])

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

  // Toggle a skill (bg skills are locked)
  const toggleSkill = (key: string) => {
    if (bgSkillKeys.has(key)) return // can't uncheck background skills
    onSkillsChange({ ...skills, [key]: !skills[key] })
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8 }}>Atributos & Perícias</h2>
        <p style={{ color: 'var(--fg2)' }}>
          Distribua 27 pontos entre seus atributos. Suas proficiências em salvaguardas e perícias base foram marcadas automaticamente.
        </p>
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
              const score = attrs[key]
              const mod = calcMod(score)
              const isPrimary = primaryAttrs.has(key)
              const isSave = proficientSaves.has(key)
              const canInc = score < MAX_SCORE && remaining >= ((POINT_COST[score + 1] ?? 99) - POINT_COST[score])
              const canDec = score > MIN_SCORE

              return (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  backgroundColor: isPrimary ? 'rgba(147,51,234,0.12)' : 'var(--bg2)',
                  border: `1px solid ${isPrimary ? 'rgba(147,51,234,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12, padding: '12px 16px',
                  transition: 'all 0.2s',
                  boxShadow: isPrimary ? '0 0 12px rgba(147,51,234,0.15)' : 'none'
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
                      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, color: isPrimary ? '#c084fc' : 'var(--fg)' }}>{score}</div>
                      <div style={{ fontSize: 11, color: 'var(--accentL)', fontWeight: 600 }}>{fmtMod(mod)}</div>
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
                    width: 28, textAlign: 'center', fontSize: 10, fontWeight: 700,
                    color: 'var(--fg3)', flexShrink: 0
                  }}>
                    {POINT_COST[score]}pt
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
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>Perícias</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#c084fc' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#c084fc', display: 'inline-block' }} />
                Antecedente
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accentL)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accentL)', display: 'inline-block' }} />
                Selecionada
              </span>
            </div>
          </div>

          <div className="skills-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ALL_SKILLS.map(({ key, label, attr }) => {
              const isFromBg = bgSkillKeys.has(key)
              const isChecked = isFromBg || !!skills[key]
              const mod = calcMod(attrs[getAttrForSkill(attr)])

              return (
                <button
                  key={key}
                  onClick={() => toggleSkill(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px', borderRadius: 8,
                    border: `1px solid ${isFromBg ? 'rgba(192,132,252,0.35)' : isChecked ? 'rgba(251,113,133,0.35)' : 'rgba(255,255,255,0.06)'}`,
                    backgroundColor: isFromBg ? 'rgba(192,132,252,0.08)' : isChecked ? 'rgba(225,29,72,0.06)' : 'var(--bg2)',
                    cursor: isFromBg ? 'default' : 'pointer',
                    textAlign: 'left', width: '100%', transition: 'all 0.15s',
                  }}
                >
                  {/* Checkbox circle */}
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isFromBg ? '#c084fc' : isChecked ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                    backgroundColor: isFromBg ? '#c084fc' : isChecked ? 'var(--accent)' : 'transparent',
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
                    fontSize: 13, fontWeight: 700, textAlign: 'right',
                    color: isChecked ? 'var(--accentL)' : 'var(--fg3)'
                  }}>
                    {fmtMod(isChecked ? mod + 2 : mod)}
                  </div>

                  {/* Lock for bg skills */}
                  {isFromBg && (
                    <div style={{ fontSize: 9, color: '#c084fc', fontWeight: 700 }}>BG</div>
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
