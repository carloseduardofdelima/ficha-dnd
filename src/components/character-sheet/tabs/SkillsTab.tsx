'use client'

import React, { useState } from 'react'
import { Pencil, Check, RotateCcw } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

const SKILL_DEFINITIONS = [
  { key: 'acrobatics', name: 'Acrobacia', attr: 'dexterity', label: 'DES' },
  { key: 'animalHandling', name: 'Adestramento', attr: 'wisdom', label: 'SAB' },
  { key: 'arcana', name: 'Arcanismo', attr: 'intelligence', label: 'INT' },
  { key: 'athletics', name: 'Atletismo', attr: 'strength', label: 'FOR' },
  { key: 'performance', name: 'Atuação', attr: 'charisma', label: 'CAR' },
  { key: 'deception', name: 'Enganação', attr: 'charisma', label: 'CAR' },
  { key: 'stealth', name: 'Furtividade', attr: 'dexterity', label: 'DES' },
  { key: 'history', name: 'História', attr: 'intelligence', label: 'INT' },
  { key: 'intimidation', name: 'Intimidação', attr: 'charisma', label: 'CAR' },
  { key: 'insight', name: 'Intuição', attr: 'wisdom', label: 'SAB' },
  { key: 'investigation', name: 'Investigação', attr: 'intelligence', label: 'INT' },
  { key: 'medicine', name: 'Medicina', attr: 'wisdom', label: 'SAB' },
  { key: 'nature', name: 'Natureza', attr: 'intelligence', label: 'INT' },
  { key: 'perception', name: 'Percepção', attr: 'wisdom', label: 'SAB' },
  { key: 'persuasion', name: 'Persuasão', attr: 'charisma', label: 'CAR' },
  { key: 'sleightOfHand', name: 'Prestidigitação', attr: 'dexterity', label: 'DES' },
  { key: 'religion', name: 'Religião', attr: 'intelligence', label: 'INT' },
  { key: 'survival', name: 'Sobrevivência', attr: 'wisdom', label: 'SAB' },
]

export default function SkillsTab() {
  const { character, parsedSkills, expertises, effectiveStats, parsedTraits, isOwner, updateValue } = useCharacterSheet()

  const [isEditingAll, setIsEditingAll] = useState(false)
  const [editingSkillKey, setEditingSkillKey] = useState<string | null>(null)
  const [draftValues, setDraftValues] = useState<Record<string, string>>({})

  if (!character) return null

  const skillBonusOverrides: Record<string, number> =
    parsedTraits?.skillBonusOverrides && typeof parsedTraits.skillBonusOverrides === 'object'
      ? parsedTraits.skillBonusOverrides
      : {}

  const hasAnyOverride = Object.keys(skillBonusOverrides).length > 0

  const isBardJackOfAllTrades = character.class === 'Bardo' && character.level >= 2
  const stats = effectiveStats || character

  const getAutoTotal = (skill: typeof SKILL_DEFINITIONS[0]) => {
    const attrVal = (stats as any)[skill.attr] ?? (character as any)[skill.attr] ?? 10
    const mod = Math.floor((attrVal - 10) / 2)
    const isTrained = parsedSkills[skill.key] || false
    const isExpert = !!expertises[skill.key]
    const trainingBonus = isTrained ? character.proficiencyBonus : 0
    const extraBonus = isExpert ? character.proficiencyBonus : 0
    const jackBonus = (!isTrained && isBardJackOfAllTrades) ? Math.floor(character.proficiencyBonus / 2) : 0
    return {
      mod,
      isTrained,
      isExpert,
      trainingBonus,
      extraBonus,
      jackBonus,
      autoTotal: mod + trainingBonus + extraBonus + jackBonus,
    }
  }

  const perceptionInfo = getAutoTotal(SKILL_DEFINITIONS.find(s => s.key === 'perception')!)
  const hasPerceptionOverride =
    typeof skillBonusOverrides['perception'] === 'number' && Number.isFinite(skillBonusOverrides['perception'])
  const effectivePerceptionTotal = hasPerceptionOverride
    ? skillBonusOverrides['perception']
    : perceptionInfo.autoTotal
  const passivePerception = 10 + effectivePerceptionTotal

  const saveOverrides = (nextOverrides: Record<string, number>) => {
    const nextTraits = { ...(parsedTraits || {}) }
    if (Object.keys(nextOverrides).length > 0) {
      nextTraits.skillBonusOverrides = nextOverrides
    } else {
      delete nextTraits.skillBonusOverrides
    }
    updateValue('traits', nextTraits, true)
  }

  const commitSkillValue = (skillKey: string, rawInput: string, autoTotal: number) => {
    const trimmed = rawInput.trim()
    const nextOverrides = { ...skillBonusOverrides }

    if (trimmed === '') {
      if (skillKey in nextOverrides) {
        delete nextOverrides[skillKey]
        saveOverrides(nextOverrides)
      }
      return
    }

    if (!/^[+-]?\d+$/.test(trimmed)) {
      return
    }

    const parsed = parseInt(trimmed, 10)
    if (!Number.isFinite(parsed)) return

    if (parsed === autoTotal && !(skillKey in nextOverrides)) {
      return
    }

    nextOverrides[skillKey] = parsed
    saveOverrides(nextOverrides)
  }

  const resetSkillOverride = (skillKey: string) => {
    if (!(skillKey in skillBonusOverrides)) return
    const nextOverrides = { ...skillBonusOverrides }
    delete nextOverrides[skillKey]
    saveOverrides(nextOverrides)
    setDraftValues(prev => {
      const next = { ...prev }
      delete next[skillKey]
      return next
    })
  }

  const resetAllOverrides = () => {
    saveOverrides({})
    setDraftValues({})
  }

  const startEditingAll = () => {
    const initialDrafts: Record<string, string> = {}
    for (const skill of SKILL_DEFINITIONS) {
      const { autoTotal } = getAutoTotal(skill)
      const hasOverride = typeof skillBonusOverrides[skill.key] === 'number' && Number.isFinite(skillBonusOverrides[skill.key])
      const val = hasOverride ? skillBonusOverrides[skill.key] : autoTotal
      initialDrafts[skill.key] = String(val)
    }
    setDraftValues(initialDrafts)
    setEditingSkillKey(null)
    setIsEditingAll(true)
  }

  const finishEditingAll = () => {
    const nextOverrides = { ...skillBonusOverrides }
    let changed = false

    for (const skill of SKILL_DEFINITIONS) {
      if (!(skill.key in draftValues)) continue
      const { autoTotal } = getAutoTotal(skill)
      const trimmed = draftValues[skill.key].trim()

      if (trimmed === '') {
        if (skill.key in nextOverrides) {
          delete nextOverrides[skill.key]
          changed = true
        }
      } else if (/^[+-]?\d+$/.test(trimmed)) {
        const parsed = parseInt(trimmed, 10)
        if (Number.isFinite(parsed)) {
          if (parsed !== autoTotal || skill.key in nextOverrides) {
            if (nextOverrides[skill.key] !== parsed) {
              nextOverrides[skill.key] = parsed
              changed = true
            }
          }
        }
      }
    }

    if (changed) {
      saveOverrides(nextOverrides)
    }
    setIsEditingAll(false)
    setDraftValues({})
  }

  const mid = Math.ceil(SKILL_DEFINITIONS.length / 2)
  const firstCol = SKILL_DEFINITIONS.slice(0, mid)
  const secondCol = SKILL_DEFINITIONS.slice(mid)

  const renderSkillRow = (skill: typeof SKILL_DEFINITIONS[0]) => {
    const { isTrained, isExpert, trainingBonus, extraBonus, jackBonus, autoTotal } = getAutoTotal(skill)
    const hasOverride = typeof skillBonusOverrides[skill.key] === 'number' && Number.isFinite(skillBonusOverrides[skill.key])
    const total = hasOverride ? skillBonusOverrides[skill.key] : autoTotal
    const isRowEditing = isOwner && (isEditingAll || editingSkillKey === skill.key)

    return (
      <div
        key={skill.name}
        className="skill-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 6px',
          borderBottom: '1px solid rgba(255,255,255,0.02)',
          color: isTrained ? 'var(--accentL)' : 'var(--fg)',
          opacity: isTrained || hasOverride ? 1 : 0.7,
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ flex: 1, fontWeight: isTrained ? 600 : 400, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span>{skill.name}</span>
          {skill.key === 'perception' && (
            <span style={{ fontSize: 12, color: 'var(--fg2)', fontWeight: 500 }}>
              (passiva: <strong style={{ color: 'var(--accentL)' }}>{passivePerception}</strong>)
            </span>
          )}
          {isExpert && (
            <span style={{ fontSize: 9, background: 'rgba(234,179,8,0.15)', color: '#facc15', border: '1px solid rgba(234,179,8,0.3)', padding: '1px 4px', borderRadius: 4 }}>
              Especialista
            </span>
          )}
          {!isTrained && jackBonus > 0 && (
            <span style={{ fontSize: 9, background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)', padding: '1px 4px', borderRadius: 4 }}>
              Pau p/ Toda Obra
            </span>
          )}
        </div>
        <div style={{ width: 45, textAlign: 'center', color: 'var(--fg3)', fontSize: 10 }}>({skill.label})</div>
        <div style={{
          width: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}>
          {isRowEditing ? (
            <>
              <input
                type="text"
                inputMode="numeric"
                aria-label={`Bônus de ${skill.name}`}
                value={draftValues[skill.key] ?? String(total)}
                autoFocus={editingSkillKey === skill.key}
                onFocus={e => e.currentTarget.select()}
                onChange={e => {
                  const val = e.target.value
                  if (val === '' || /^[+-]?\d*$/.test(val)) {
                    setDraftValues(prev => ({ ...prev, [skill.key]: val }))
                  }
                }}
                onBlur={e => {
                  commitSkillValue(skill.key, e.target.value, autoTotal)
                  if (!isEditingAll) {
                    setEditingSkillKey(null)
                    setDraftValues(prev => {
                      const next = { ...prev }
                      delete next[skill.key]
                      return next
                    })
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                  } else if (e.key === 'Escape') {
                    if (!isEditingAll) {
                      setEditingSkillKey(null)
                      setDraftValues(prev => {
                        const next = { ...prev }
                        delete next[skill.key]
                        return next
                      })
                    } else {
                      setDraftValues(prev => ({ ...prev, [skill.key]: String(total) }))
                    }
                  }
                }}
                title={`Digite qualquer valor inteiro (ou deixe vazio para automático: ${autoTotal >= 0 ? `+${autoTotal}` : autoTotal})`}
                className="skill-bonus-input"
              />
              {hasOverride && (
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => resetSkillOverride(skill.key)}
                  title={`Restaurar automático (${autoTotal >= 0 ? `+${autoTotal}` : autoTotal})`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--fg3)',
                    cursor: 'pointer',
                    padding: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <RotateCcw size={11} />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              disabled={!isOwner}
              onClick={() => {
                if (!isOwner) return
                setEditingSkillKey(skill.key)
                setDraftValues(prev => ({ ...prev, [skill.key]: String(total) }))
              }}
              title={
                isOwner
                  ? hasOverride
                    ? `Bônus personalizado (automático: ${autoTotal >= 0 ? `+${autoTotal}` : autoTotal}) — clique para editar`
                    : 'Clique para editar o bônus'
                  : undefined
              }
              className={`skill-bonus-btn ${isOwner ? 'editable' : ''} ${hasOverride ? 'overridden' : ''}`}
              style={{
                fontWeight: isTrained || hasOverride ? 800 : 400,
                fontSize: 14,
                color: hasOverride ? '#f59e0b' : (isTrained ? 'var(--accentL)' : 'inherit'),
              }}
            >
              {total >= 0 ? `+${total}` : total}
            </button>
          )}
        </div>
        <div style={{
          width: 45,
          textAlign: 'center',
          color: 'var(--fg3)',
          fontSize: 11,
          fontWeight: isTrained ? 700 : 400
        }}>
          {isTrained ? `+${trainingBonus + extraBonus}` : (jackBonus > 0 ? `+${jackBonus}` : '0')}
        </div>
      </div>
    )
  }

  const renderHeader = (extraClassName = '') => (
    <div className={`skills-header-row ${extraClassName}`}>
      <div style={{ flex: 1 }}>PERÍCIA</div>
      <div style={{ width: 45, textAlign: 'center' }}>DADOS</div>
      <div style={{ width: 56, textAlign: 'center' }}>BÔNUS</div>
      <div style={{ width: 45, textAlign: 'center' }}>TREINO</div>
    </div>
  )

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Perícias</h2>
          {isOwner && (
            <p style={{ fontSize: 11, color: 'var(--fg3)', margin: '4px 0 0' }}>
              {isEditingAll
                ? 'Digite qualquer valor nos bônus (deixe vazio para restaurar o cálculo automático)'
                : 'Clique em qualquer bônus para editar'}
            </p>
          )}
        </div>
        {isOwner && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasAnyOverride && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetAllOverrides}
                style={{ padding: '6px 10px', fontSize: 12, height: 'auto', gap: 5 }}
                title="Restaurar todos os bônus para o cálculo automático"
              >
                <RotateCcw size={13} />
                Restaurar
              </button>
            )}
            <button
              type="button"
              className={`btn ${isEditingAll ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => (isEditingAll ? finishEditingAll() : startEditingAll())}
              style={{ padding: '6px 12px', fontSize: 12, height: 'auto', gap: 6 }}
            >
              {isEditingAll ? <Check size={14} /> : <Pencil size={13} />}
              {isEditingAll ? 'Concluir' : 'Editar Bônus'}
            </button>
          </div>
        )}
      </div>

      <div className="skills-grid-container">
        <div className="skills-column">
          {renderHeader()}
          {firstCol.map(renderSkillRow)}
        </div>
        <div className="skills-column">
          {renderHeader('skills-header-col2')}
          {secondCol.map(renderSkillRow)}
        </div>
      </div>

      <style>{`
        .skills-grid-container {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 0px !important;
          font-size: 15px;
        }
        .skills-column {
          display: flex !important;
          flex-direction: column !important;
          gap: 1px !important;
          min-width: 0 !important;
        }
        .skills-header-row {
          display: flex;
          align-items: center;
          color: var(--fgM);
          font-weight: 700;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 8px;
          font-size: 10px;
        }
        .skills-header-col2 {
          display: none !important;
        }
        .skill-row:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          border-radius: 4px;
        }
        .skill-bonus-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 2px 6px;
          min-width: 38px;
          text-align: center;
          cursor: default;
          transition: all 0.15s ease;
        }
        .skill-bonus-btn.editable {
          cursor: pointer;
        }
        .skill-bonus-btn.editable:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--border);
        }
        .skill-bonus-btn.overridden {
          border-bottom: 1px dashed rgba(245, 158, 11, 0.6);
        }
        .skill-bonus-input {
          width: 40px;
          padding: 2px 4px;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          color: var(--fg);
          background: var(--bg2);
          border: 1px solid var(--accent);
          border-radius: 6px;
          outline: none;
        }
        @media (min-width: 600px) {
          .skills-grid-container {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
            gap: 28px !important;
          }
          .skills-header-col2 {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
