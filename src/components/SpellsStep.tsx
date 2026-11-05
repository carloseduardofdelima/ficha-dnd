'use client'
import { useState, useMemo, useEffect } from 'react'
import { Check, ChevronDown, ChevronUp, BookOpen, Zap, Clock, Target, Shield } from 'lucide-react'
import SPELLS, { Spell, getSpellsForClass, SPELLCASTING_CLASSES, getSpellSlots } from '@/lib/spells'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'
import { Attrs, ASI } from '@/components/AttributesStep'
import { RACES_2014 } from '@/lib/races-2014'
import { getUnlockedSubclassSpells } from '@/components/character-sheet/utils/subclass-spells'

// ── Types ─────────────────────────────────────────────────────────────────────
interface SpellsStepProps {
  className: string
  selectedSpells: string[]
  onSpellsChange: (ids: string[]) => void
  featureChoices: Record<string, string | string[]>
  onFeatureChoicesChange: (c: Record<string, string | string[]>) => void
  ruleset: '2014' | '2024' | '5e-custom'
  level: number
  attrs?: Attrs
  asi?: ASI
  raceName?: string
  subRaceName?: string
}

// ── School color map ──────────────────────────────────────────────────────────
const SCHOOL_COLORS: Record<string, string> = {
  'Abjuração': '#60a5fa', 'Adivinhação': '#a78bfa', 'Conjuração': '#34d399',
  'Encantamento': '#f472b6', 'Evocação': '#f87171', 'Ilusão': '#c084fc',
  'Necromancia': '#94a3b8', 'Transmutação': '#fbbf24',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SpellsStep({
  className, selectedSpells, onSpellsChange, featureChoices, onFeatureChoicesChange, ruleset, level,
  attrs, asi, raceName, subRaceName
}: SpellsStepProps) {
  const [expandedSpell, setExpandedSpell] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<'all' | 0 | 1>('all')
  const [search, setSearch] = useState('')

  const isCaster = SPELLCASTING_CLASSES.includes(className)
  const classData = (ruleset === '2014' || ruleset === '5e-custom') ? CLASS_LEVEL1_DATA_2014[className] : CLASS_LEVEL1_DATA[className]

  // Resolve subclass name from featureChoices
  const subclassName = useMemo(() => {
    if (!classData || !classData.choices) return ''
    const subclassChoiceIds = [
      'cleric-domain-2014', 'sorcerous-origin-2014', 'warlock-patron-2014',
      'Especialista Artesão', 'Caminho Primitivo', 'Juramento Sagrado', 'Tradição Monástica', 
      'Arquétipo Marcial', 'Origem de Feitiçaria', 'Patrono do Além', 'Tradição Arcana', 
      'Domínio Divino', 'Círculo Druídico', 'Colégio Bárdico', 'Conclave de Patrulheiro', 
      'Arquétipo de Ladino'
    ]
    for (const id of subclassChoiceIds) {
      const val = featureChoices[id]
      if (val && typeof val === 'string') {
        const choice = classData.choices.find((c: any) => c.id === id)
        if (choice) {
          const opt = choice.options.find((o: any) => o.id === val)
          if (opt) return opt.name
        }
        return val
      }
    }
    return ''
  }, [classData, featureChoices])

  // Modifiers from attrs
  const modifiers = useMemo(() => {
    if (!attrs) return undefined
    const finalAttrs: Attrs = { ...attrs }
    if (ruleset === '2024') {
      if (asi?.primary) finalAttrs[asi.primary] += 2
      if (asi?.secondary) finalAttrs[asi.secondary] += 1
    } else {
      const race = RACES_2014.find(r => r.name === raceName)
      if (race) {
        if (race.attributeBonuses && subRaceName !== 'Humano Variante') {
          Object.entries(race.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val
          })
        }
        const lineage = race.lineages?.find(l => l.name === subRaceName)
        if (lineage?.attributeBonuses) {
          Object.entries(lineage.attributeBonuses).forEach(([attr, val]) => {
            finalAttrs[attr as keyof Attrs] += val
          })
        }
        if (raceName === 'Meio-Elfo' || subRaceName === 'Humano Variante') {
          if (asi?.primary) finalAttrs[asi.primary] += 1
          if (asi?.secondary) finalAttrs[asi.secondary] += 1
        }
      }
    }
    return {
      strength: Math.floor((finalAttrs.strength - 10) / 2),
      dexterity: Math.floor((finalAttrs.dexterity - 10) / 2),
      constitution: Math.floor((finalAttrs.constitution - 10) / 2),
      intelligence: Math.floor((finalAttrs.intelligence - 10) / 2),
      wisdom: Math.floor((finalAttrs.wisdom - 10) / 2),
      charisma: Math.floor((finalAttrs.charisma - 10) / 2),
    }
  }, [attrs, asi, ruleset, raceName, subRaceName])

  const slots = useMemo(() => getSpellSlots(className, level, ruleset, modifiers, subclassName), [className, level, ruleset, modifiers, subclassName])

  // Subclass domain spells (e.g. Life Domain: Bênção, Curar Ferimentos)
  const domainSpells = useMemo(() => {
    if (!subclassName) return []
    return getUnlockedSubclassSpells(className, subclassName, level, ruleset)
  }, [className, subclassName, level, ruleset])

  const domainSpellIds = useMemo(() => new Set(domainSpells.map(s => s.id)), [domainSpells])

  // Automatically sync domain spells into selectedSpells so they are saved
  useEffect(() => {
    if (domainSpells.length > 0) {
      const missing = domainSpells.filter(s => !selectedSpells.includes(s.id)).map(s => s.id)
      if (missing.length > 0) {
        onSpellsChange([...selectedSpells, ...missing])
      }
    }
  }, [domainSpells, selectedSpells, onSpellsChange])

  // Spells available to this class, filtered by character level, plus any domain spells
  const availableSpells = useMemo(() => {
    const allClassSpells = getSpellsForClass(className, ruleset);
    const combined = [...allClassSpells]
    domainSpells.forEach(ds => {
      if (!combined.some(s => s.id === ds.id)) {
        combined.push(ds)
      }
    })
    if (!slots) return combined;

    // Determine max spell level allowed for this character level
    const lastSlotIdx = slots.slots ? [...slots.slots].reduce((acc: number, curr: number, idx: number) => curr > 0 ? idx : acc, 0) : 0;
    const maxLevel = slots.slot_level || (slots.slots && slots.slots.some((s: number) => s > 0) ? lastSlotIdx + 1 : 1);
    
    return combined.filter(s => s.level <= maxLevel);
  }, [className, ruleset, slots, domainSpells]);

  const cantripsSelected = useMemo(() => {
    return selectedSpells.filter(id => {
      const s = availableSpells.find(sp => sp.id === id)
      return s?.level === 0
    })
  }, [selectedSpells, availableSpells])

  // User-chosen leveled spells (excluding always-prepared domain spells)
  const userLvl1Selected = useMemo(() => {
    return selectedSpells.filter(id => {
      if (domainSpellIds.has(id)) return false
      const s = availableSpells.find(sp => sp.id === id)
      return s && s.level > 0
    })
  }, [selectedSpells, domainSpellIds, availableSpells])

  const maxCantrips = slots?.cantrips || 0
  const maxLvl1 = useMemo(() => {
    if (!slots) return 0
    if (className === 'Mago' && level === 1) return 6
    if (typeof slots.prepared === 'number') return slots.prepared
    if (typeof slots.known === 'number') return slots.known
    return (slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)
  }, [slots, className, level])

  const filtered = useMemo(() => {
    const base = availableSpells.filter(s => {
      const matchLvl = filterLevel === 'all' || s.level === filterLevel
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase())
      return matchLvl && matchSearch
    })
    // Selected / Domain first
    return [
      ...base.filter(s => selectedSpells.includes(s.id) || domainSpellIds.has(s.id)),
      ...base.filter(s => !selectedSpells.includes(s.id) && !domainSpellIds.has(s.id)),
    ]
  }, [availableSpells, filterLevel, search, selectedSpells, domainSpellIds])

  const toggleSpell = (spell: Spell) => {
    // Domain spells cannot be unselected (they are always prepared)
    if (domainSpellIds.has(spell.id)) return

    const already = selectedSpells.includes(spell.id)
    if (already) {
      onSpellsChange(selectedSpells.filter(id => id !== spell.id))
      return
    }
    if (!slots) return
    
    if (spell.level === 0 && maxCantrips > 0 && cantripsSelected.length >= maxCantrips) return
    if (spell.level > 0 && maxLvl1 > 0 && userLvl1Selected.length >= maxLvl1) return
    onSpellsChange([...selectedSpells, spell.id])
  }

  const isSelected = (id: string) => selectedSpells.includes(id) || domainSpellIds.has(id)

  // Feature choice helpers
  const setRadioChoice = (choiceId: string, value: string) => {
    onFeatureChoicesChange({ ...featureChoices, [choiceId]: value })
  }
  const setMultiChoice = (choiceId: string, optId: string, max: number) => {
    const current = (featureChoices[choiceId] as string[] | undefined) ?? []
    if (current.includes(optId)) {
      onFeatureChoicesChange({ ...featureChoices, [choiceId]: current.filter(x => x !== optId) })
    } else if (current.length < max) {
      onFeatureChoicesChange({ ...featureChoices, [choiceId]: [...current, optId] })
    }
  }

  const hasSpellChoices = useMemo(() => {
    return !!(isCaster && slots && (
      (slots.cantrips && slots.cantrips > 0) || 
      maxLvl1 > 0 || 
      (slots.slots && slots.slots.some((s: number) => s > 0))
    ))
  }, [isCaster, slots, maxLvl1])

  const lvl1Label = className === 'Mago'
    ? 'Grimório (1º Nível)'
    : (typeof slots?.prepared === 'number' || (slots && 'prepared' in slots))
      ? 'Magias Preparadas'
      : 'Magias Conhecidas'

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 6 }}>Magias & Habilidades</h2>
        <p style={{ color: 'var(--fg2)', fontSize: 14 }}>
          {hasSpellChoices
            ? `Selecione suas magias iniciais. ${className} começa com ${slots?.cantrips ?? 0} truques e ${maxLvl1} magias de 1º nível ${slots?.prepared ? 'preparadas' : 'conhecidas'}${domainSpells.length > 0 ? ` (+${domainSpells.length} do Domínio)` : ''}.`
            : isCaster
              ? `${className} não possui escolhas de magia neste nível. Configure as habilidades de classe abaixo.`
              : `${className} não usa magia conjurada. Confira as habilidades de classe abaixo.`}
        </p>
      </div>

      {/* ── Spell list (only for casters) ──────────────────────────────────── */}
      {hasSpellChoices && (
        <div style={{ marginBottom: 32 }}>
          {/* Quota bars */}
          {slots && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {slots.cantrips > 0 && (
                <div style={{ flex: 1, minWidth: 160, backgroundColor: 'var(--bg2)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Truques</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {Array.from({ length: slots.cantrips }).map((_, i) => (
                      <div key={i} style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: i < cantripsSelected.length ? '#a78bfa' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4 }}>{cantripsSelected.length}/{slots.cantrips} selecionados</div>
                </div>
              )}
              {maxLvl1 > 0 && (
                <div style={{ flex: 1, minWidth: 160, backgroundColor: 'var(--bg2)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{lvl1Label}</div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {Array.from({ length: maxLvl1 }).map((_, i) => (
                      <div key={i} style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: i < userLvl1Selected.length ? 'var(--accent)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4 }}>{userLvl1Selected.length}/{maxLvl1} selecionadas</div>
                </div>
              )}
              {domainSpells.length > 0 && (
                <div style={{ flex: 1, minWidth: 200, backgroundColor: 'rgba(34,197,94,0.05)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div style={{ fontSize: 10, color: '#4ade80', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Magias de Domínio</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
                    {domainSpells.map(s => s.name).join(', ')}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4 }}>Sempre preparadas (não gastam vagas)</div>
                </div>
              )}
            </div>
          )}

          {/* Search + filter row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar magia..." className="input"
              style={{ flex: 1, minWidth: 140, fontSize: 13, padding: '7px 12px', height: 34 }}
            />
            {['all', 0, 1].map(lvl => (
              <button
                key={String(lvl)}
                onClick={() => setFilterLevel(lvl as typeof filterLevel)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  backgroundColor: filterLevel === lvl ? 'var(--accent)' : 'var(--bg2)',
                  color: filterLevel === lvl ? '#fff' : 'var(--fg3)',
                  transition: 'all 0.15s'
                }}
              >
                {lvl === 'all' ? 'Todos' : lvl === 0 ? 'Truques' : '1º Nível'}
              </button>
            ))}
          </div>

          {/* Spell table */}
          <div style={{ backgroundColor: 'var(--bg2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            {/* Header */}
            <div className="spell-grid-header" style={{ display: 'grid', gap: 8, padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: 10, color: 'var(--fg3)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <div />
              <div className="hide-mobile">Nível</div>
              <div>Magia</div>
              <div className="hide-mobile">Conjuração</div>
              <div className="hide-mobile">Duração</div>
              <div className="hide-mobile">Alcance</div>
              <div className="hide-mobile">Efeito</div>
            </div>

            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {filtered.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--fg3)', fontSize: 13 }}>Nenhuma magia encontrada</div>
              )}
              {filtered.map(spell => {
                const isDomain = domainSpellIds.has(spell.id)
                const selected = isSelected(spell.id)
                const expanded = expandedSpell === spell.id
                const schoolColor = SCHOOL_COLORS[spell.school] ?? 'var(--fg3)'
                const cantripFull = spell.level === 0 && maxCantrips > 0 && !selected && cantripsSelected.length >= maxCantrips
                const lvl1Full = spell.level > 0 && maxLvl1 > 0 && !selected && userLvl1Selected.length >= maxLvl1
                const locked = !isDomain && !!(cantripFull || lvl1Full)

                return (
                  <div key={spell.id}>
                    <div
                      className="spell-grid-row"
                      style={{
                        display: 'grid', gap: 8,
                        padding: '10px 14px', alignItems: 'center', cursor: 'pointer',
                        backgroundColor: isDomain ? 'rgba(34,197,94,0.06)' : selected ? 'rgba(225,29,72,0.07)' : 'transparent',
                        borderLeft: isDomain ? '3px solid #4ade80' : selected ? '3px solid var(--accent)' : '3px solid transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        transition: 'all 0.15s', opacity: locked ? 0.4 : 1,
                      }}
                      onClick={() => setExpandedSpell(expanded ? null : spell.id)}
                    >
                      {/* Checkbox */}
                      <div 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (!locked) toggleSpell(spell); 
                        }}
                        style={{
                          width: 24, height: 24, borderRadius: 6,
                          border: `2px solid ${isDomain ? '#4ade80' : selected ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                          backgroundColor: isDomain ? 'rgba(34,197,94,0.2)' : selected ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                          cursor: isDomain ? 'default' : locked ? 'not-allowed' : 'pointer'
                        }}
                        title={isDomain ? 'Magia de Domínio (Sempre preparada)' : undefined}
                      >
                        {selected && <Check size={14} color={isDomain ? '#4ade80' : '#fff'} strokeWidth={3} />}
                      </div>
                      {/* Level (Mobile: hidden from main row, moved inside name col or detail) */}
                      <div className="hide-mobile" style={{ fontSize: 11, fontWeight: 700, color: schoolColor }}>
                        {spell.level === 0 ? 'Truque' : `${spell.level}º`}
                      </div>
                      {/* Name + school + flags */}
                      <div>
                        <div style={{ fontSize: 13, fontWeight: selected ? 700 : 500, display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                          <span className="show-mobile-inline" style={{ fontSize: 10, fontWeight: 800, color: schoolColor, opacity: 0.8 }}>
                            {spell.level === 0 ? 'TRUQUE' : `${spell.level}º`}
                          </span>
                          {spell.name}
                          {isDomain && (
                            <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', fontWeight: 800 }}>
                              DOMÍNIO
                            </span>
                          )}
                          {spell.ritual && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, backgroundColor: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontWeight: 800 }}>RITUAL</span>}
                          {spell.concentration && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, backgroundColor: 'rgba(167,139,250,0.2)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)', fontWeight: 800 }}>CONCENTRAÇÃO</span>}
                        </div>
                        <div style={{ fontSize: 10, color: schoolColor, fontWeight: 600 }}>{spell.school}</div>
                      </div>
                      {/* Casting time */}
                      <div className="hide-mobile" style={{ fontSize: 11, color: 'var(--fg2)' }}>{spell.castingTime}</div>
                      {/* Duration */}
                      <div className="hide-mobile" style={{ fontSize: 11, color: 'var(--fg2)' }}>{spell.duration}</div>
                      {/* Range */}
                      <div className="hide-mobile" style={{ fontSize: 11, color: 'var(--fg2)' }}>{spell.range}</div>
                      {/* Effect */}
                      <div className="hide-mobile" style={{ fontSize: 11, color: spell.attackSave ? '#f87171' : 'var(--fg2)' }}>{spell.damageEffect}</div>
                      
                      <div style={{ marginLeft: 'auto', color: 'var(--fg3)' }}>
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {/* Expanded description */}
                    {expanded && (
                      <div style={{ padding: '12px 16px 14px 48px', backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: 'var(--fg2)', lineHeight: 1.6 }}>
                        <div style={{ marginBottom: 6, color: 'var(--fg3)', fontSize: 11 }}>
                          <strong>Componentes:</strong> {spell.components}
                        </div>
                        <p style={{ margin: 0 }}>{spell.description}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Level-1 Feature Choices ─────────────────────────────────────────── */}
      {classData && classData.choices && classData.choices.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 16 }}>Escolhas de Classe</h3>
          {classData.choices.map(choice => {
            const currentVal = featureChoices[choice.id]
            const isRadio = choice.type === 'radio'
            const currentArr = (currentVal as string[] | undefined) ?? []

            return (
              <div key={choice.id} style={{ marginBottom: 24, backgroundColor: 'var(--bg2)', borderRadius: 12, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{choice.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg3)', marginTop: 2 }}>{choice.description}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                  {choice.options.map(opt => {
                    const isChosen = isRadio ? currentVal === opt.id : currentArr.includes(opt.id)
                    const maxed = !isRadio && !isChosen && currentArr.length >= (choice.maxSelections ?? 1)

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={maxed}
                        onClick={() => {
                          if (choice.type === 'radio') setRadioChoice(choice.id, opt.id)
                          else setMultiChoice(choice.id, opt.id, choice.maxSelections ?? 1)
                        }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          padding: '12px 14px', borderRadius: 10, cursor: maxed ? 'not-allowed' : 'pointer',
                          border: `1px solid ${isChosen ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                          backgroundColor: isChosen ? 'rgba(225,29,72,0.08)' : 'var(--bg2)',
                          textAlign: 'left', transition: 'all 0.15s', opacity: maxed ? 0.4 : 1,
                        }}
                      >
                        {/* Indicator dot */}
                        <div style={{
                          width: 18, height: 18, borderRadius: choice.type === 'radio' ? '50%' : 5,
                          border: `2px solid ${isChosen ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                          backgroundColor: isChosen ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 1, transition: 'all 0.15s'
                        }}>
                          {isChosen && <Check size={10} color="#fff" />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{opt.name}</div>
                          {opt.description && <div style={{ fontSize: 11, color: 'var(--fg2)', lineHeight: 1.4 }}>{opt.description}</div>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!isCaster && !classData && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--fg3)' }}>
          Selecione uma classe para ver as habilidades disponíveis.
        </div>
      )}
      <style jsx>{`
        .spell-grid-header, .spell-grid-row {
          grid-template-columns: 36px 45px 1fr 90px 90px 80px 80px 24px;
        }

        .show-mobile-inline { display: none; }

        @media (max-width: 900px) {
          .spell-grid-header, .spell-grid-row {
            grid-template-columns: 36px 45px 1fr 90px 90px 24px;
          }
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-inline { display: inline-block; margin-right: 4px; }
          .spell-grid-header, .spell-grid-row {
            grid-template-columns: 40px 1fr 32px !important;
          }
        }
      `}</style>
    </div>
  )
}
