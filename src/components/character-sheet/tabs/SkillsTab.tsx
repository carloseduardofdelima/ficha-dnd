'use client'

import React from 'react'
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
  const { character, parsedSkills, expertises, effectiveStats } = useCharacterSheet()

  if (!character) return null

  const isBardJackOfAllTrades = character.class === 'Bardo' && character.level >= 2
  const wisMod = Math.floor(((effectiveStats?.wisdom ?? character.wisdom ?? 10) - 10) / 2)
  const isPerceptionTrained = parsedSkills['perception'] || false
  const isPerceptionExpert = !!expertises['perception']
  const perceptionBonus = isPerceptionTrained 
    ? (character.proficiencyBonus * (isPerceptionExpert ? 2 : 1))
    : (isBardJackOfAllTrades ? Math.floor(character.proficiencyBonus / 2) : 0)
  const passivePerception = 10 + wisMod + perceptionBonus

  const mid = Math.ceil(SKILL_DEFINITIONS.length / 2)
  const firstCol = SKILL_DEFINITIONS.slice(0, mid)
  const secondCol = SKILL_DEFINITIONS.slice(mid)

  const renderSkillRow = (skill: typeof SKILL_DEFINITIONS[0]) => {
    const stats = effectiveStats || character
    const attrVal = (stats as any)[skill.attr] ?? (character as any)[skill.attr] ?? 10
    const mod = Math.floor((attrVal - 10) / 2)
    const isTrained = parsedSkills[skill.key] || false
    const isExpert = !!expertises[skill.key]
    const trainingBonus = isTrained ? character.proficiencyBonus : 0
    const extraBonus = isExpert ? character.proficiencyBonus : 0
    const jackBonus = (!isTrained && isBardJackOfAllTrades) ? Math.floor(character.proficiencyBonus / 2) : 0
    const total = mod + trainingBonus + extraBonus + jackBonus

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
          opacity: isTrained ? 1 : 0.7,
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
          width: 45,
          textAlign: 'center',
          fontWeight: isTrained ? 800 : 400,
          fontSize: 14,
          color: isTrained ? 'var(--accentL)' : 'inherit'
        }}>
          {total >= 0 ? `+${total}` : total}
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
      <div style={{ width: 45, textAlign: 'center' }}>BÔNUS</div>
      <div style={{ width: 45, textAlign: 'center' }}>TREINO</div>
    </div>
  )

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Perícias</h2>
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
