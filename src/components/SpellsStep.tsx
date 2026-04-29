'use client'
import { useState, useMemo } from 'react'
import { Check, ChevronDown, ChevronUp, BookOpen, Zap, Clock, Target, Shield } from 'lucide-react'
import SPELLS, { Spell, getSpellsForClass, SPELLCASTING_CLASSES, getSpellSlots } from '@/lib/spells'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'

// ── Types ─────────────────────────────────────────────────────────────────────
interface SpellsStepProps {
  className: string
  selectedSpells: string[]
  onSpellsChange: (ids: string[]) => void
  featureChoices: Record<string, string | string[]>
  onFeatureChoicesChange: (c: Record<string, string | string[]>) => void
  ruleset: '2014' | '2024'
  level: number
}

// ── School color map ──────────────────────────────────────────────────────────
const SCHOOL_COLORS: Record<string, string> = {
  'Abjuração': '#60a5fa', 'Adivinhação': '#a78bfa', 'Conjuração': '#34d399',
  'Encantamento': '#f472b6', 'Evocação': '#f87171', 'Ilusão': '#c084fc',
  'Necromancia': '#94a3b8', 'Transmutação': '#fbbf24',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SpellsStep({
  className, selectedSpells, onSpellsChange, featureChoices, onFeatureChoicesChange, ruleset, level
}: SpellsStepProps) {
  const [expandedSpell, setExpandedSpell] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<'all' | 0 | 1>('all')
  const [search, setSearch] = useState('')

  const isCaster = SPELLCASTING_CLASSES.includes(className)
  const slots = useMemo(() => getSpellSlots(className, level, ruleset), [className, level, ruleset])
  const classData = ruleset === '2014' ? CLASS_LEVEL1_DATA_2014[className] : CLASS_LEVEL1_DATA[className]

  // Spells available to this class, filtered by character level
  const availableSpells = useMemo(() => {
    const allClassSpells = getSpellsForClass(className, ruleset);
    if (!slots) return allClassSpells;

    // Determine max spell level allowed for this character level
    const lastSlotIdx = slots.slots ? [...slots.slots].reduce((acc: number, curr: number, idx: number) => curr > 0 ? idx : acc, 0) : 0;
    const maxLevel = slots.slot_level || (slots.slots && slots.slots.some((s: number) => s > 0) ? lastSlotIdx + 1 : 1);
    
    return allClassSpells.filter(s => s.level <= maxLevel);
  }, [className, ruleset, slots]);

  const cantripsSelected = selectedSpells.filter(id => {
    const s = availableSpells.find(sp => sp.id === id)
    return s?.level === 0
  })
  const lvl1Selected = selectedSpells.filter(id => {
    const s = availableSpells.find(sp => sp.id === id)
    return s && s.level > 0
  })

  const filtered = useMemo(() => {
    const base = availableSpells.filter(s => {
      const matchLvl = filterLevel === 'all' || s.level === filterLevel
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase())
      return matchLvl && matchSearch
    })
    // Selected first
    return [
      ...base.filter(s => selectedSpells.includes(s.id)),
      ...base.filter(s => !selectedSpells.includes(s.id)),
    ]
  }, [availableSpells, filterLevel, search, selectedSpells])

  const toggleSpell = (spell: Spell) => {
    const already = selectedSpells.includes(spell.id)
    if (already) {
      onSpellsChange(selectedSpells.filter(id => id !== spell.id))
      return
    }
    if (!slots) return
    
    // Legacy 2014 uses slots array, 2024 uses direct properties for lvl1
    const maxCantrips = slots.cantrips || 0
    const maxLvl1 = (slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)

    if (spell.level === 0 && maxCantrips > 0 && cantripsSelected.length >= maxCantrips) return
    if (spell.level === 1 && lvl1Selected.length >= maxLvl1) return
    onSpellsChange([...selectedSpells, spell.id])
  }

  const isSelected = (id: string) => selectedSpells.includes(id)

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

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 6 }}>Magias & Habilidades</h2>
        <p style={{ color: 'var(--fg2)', fontSize: 14 }}>
          {isCaster
            ? `Selecione suas magias iniciais. ${className} começa com ${slots?.cantrips ?? 0} truques e ${slots?.lvl1 ?? 0} espaços de magia de 1º nível.`
            : `${className} não usa magia conjurada. Confira as habilidades de classe abaixo.`}
        </p>
      </div>

      {/* ── Spell list (only for casters) ──────────────────────────────────── */}
      {isCaster && (
        <div style={{ marginBottom: 32 }}>
          {/* Quota bars */}
          {slots && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              {slots.cantrips > 0 && (
                <div style={{ flex: 1, backgroundColor: 'var(--bg2)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Truques</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {Array.from({ length: slots.cantrips }).map((_, i) => (
                      <div key={i} style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: i < cantripsSelected.length ? '#a78bfa' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4 }}>{cantripsSelected.length}/{slots.cantrips} selecionados</div>
                </div>
              )}
              {(() => {
                const maxLvl1 = (slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)
                if (maxLvl1 === 0) return null
                return (
                  <div style={{ flex: 1, backgroundColor: 'var(--bg2)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Espaços 1º Nível</div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {Array.from({ length: maxLvl1 }).map((_, i) => (
                        <div key={i} style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: i < lvl1Selected.length ? 'var(--accent)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--fg3)', marginTop: 4 }}>{lvl1Selected.length}/{maxLvl1} selecionados</div>
                  </div>
                )
              })()}
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
                const selected = isSelected(spell.id)
                const expanded = expandedSpell === spell.id
                const schoolColor = SCHOOL_COLORS[spell.school] ?? 'var(--fg3)'
                const maxCantrips = slots?.cantrips || 0
                const maxLvl1 = slots ? ((slots as any).lvl1 || (slots.slots ? slots.slots[0] : 0)) : 0
                const cantripFull = spell.level === 0 && maxCantrips > 0 && !selected && cantripsSelected.length >= maxCantrips
                const lvl1Full = spell.level === 1 && maxLvl1 > 0 && !selected && lvl1Selected.length >= maxLvl1
                const locked = !!(cantripFull || lvl1Full)

                return (
                  <div key={spell.id}>
                    <div
                      className="spell-grid-row"
                      style={{
                        display: 'grid', gap: 8,
                        padding: '10px 14px', alignItems: 'center', cursor: 'pointer',
                        backgroundColor: selected ? 'rgba(225,29,72,0.07)' : 'transparent',
                        borderLeft: selected ? '3px solid var(--accent)' : '3px solid transparent',
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
                          width: 24, height: 24, borderRadius: 6, border: `2px solid ${selected ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                          backgroundColor: selected ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                          cursor: locked ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {selected && <Check size={14} color="#fff" strokeWidth={3} />}
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
                          {spell.ritual && <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, backgroundColor: 'rgba(167,139,250,0.2)', color: '#a78bfa', fontWeight: 800 }}>R</span>}
                          {spell.concentration && <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, backgroundColor: 'rgba(251,191,36,0.2)', color: '#fbbf24', fontWeight: 800 }}>C</span>}
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
                      <div style={{ padding: '12px 14px 14px 14px', backgroundColor: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
                          gap: '12px 8px', 
                          marginBottom: 14,
                          padding: '10px',
                          backgroundColor: 'rgba(0,0,0,0.15)',
                          borderRadius: 8
                        }}>
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Conjuração</span>
                             <span style={{ fontSize: 12, fontWeight: 600 }}>{spell.castingTime}</span>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Duração</span>
                             <span style={{ fontSize: 12, fontWeight: 600 }}>{spell.duration}</span>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Alcance</span>
                             <span style={{ fontSize: 12, fontWeight: 600 }}>{spell.range}</span>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Componentes</span>
                             <span style={{ fontSize: 12, fontWeight: 600 }}>{spell.components}</span>
                           </div>
                           {spell.attackSave && (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Atq/Res</span>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#f87171' }}>{spell.attackSave}</span>
                            </div>
                           )}
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Efeito</span>
                             <span style={{ fontSize: 12, fontWeight: 600 }}>{spell.damageEffect}</span>
                           </div>
                        </div>
                        
                        <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.5, margin: '8px 0', opacity: 0.9 }}>{spell.description}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            onClick={e => { e.stopPropagation(); toggleSpell(spell) }}
                            disabled={locked}
                            className="btn btn-primary"
                            style={{ marginTop: 8, fontSize: 11, padding: '5px 16px', opacity: locked ? 0.4 : 1, minHeight: 'auto' }}
                          >
                            {selected ? 'Remover Magia' : 'Adicionar Magia'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Class Features ─────────────────────────────────────────────────── */}
      {classData && (
        <div>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={18} color="var(--accentL)" />
            Habilidades de Classe — {className}
          </h3>

          {/* Passive features */}
          {classData.passiveFeatures.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {classData.passiveFeatures.map(feat => (
                <div key={feat.name} style={{ backgroundColor: 'var(--bg2)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: 'var(--accentL)' }}>{feat.name}</div>
                  <p style={{ fontSize: 13, color: 'var(--fg2)', margin: 0, lineHeight: 1.6 }}>{feat.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Interactive choices */}
          {classData.choices.map(choice => {
            const current = featureChoices[choice.id]
            return (
              <div key={choice.id} style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{choice.label}</div>
                  <p style={{ fontSize: 13, color: 'var(--fg2)', margin: 0 }}>{choice.description}</p>
                  {choice.type === 'multi' && choice.maxSelections && (
                    <div style={{ fontSize: 11, color: 'var(--accentL)', marginTop: 4, fontWeight: 700 }}>
                      Escolha {choice.maxSelections} — {((current as string[] | undefined) ?? []).length}/{choice.maxSelections} selecionadas
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {choice.options.map(opt => {
                    const isChosen = choice.type === 'radio'
                      ? current === opt.id
                      : ((current as string[] | undefined) ?? []).includes(opt.id)
                    const maxed = choice.type === 'multi' && !isChosen &&
                      ((current as string[] | undefined) ?? []).length >= (choice.maxSelections ?? 1)

                    return (
                      <button
                        key={opt.id}
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
