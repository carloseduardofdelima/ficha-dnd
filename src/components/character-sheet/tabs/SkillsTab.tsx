'use client'

import React from 'react'
import { Plus, Settings } from 'lucide-react'
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

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Perícias</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--fg1)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span style={{ color: 'var(--fgM)', fontSize: 10, textTransform: 'uppercase' }}>Percepção Passiva:</span>
            <span style={{ color: 'var(--accentL)', fontSize: 14 }}>{passivePerception}</span>
          </div>
          <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
          <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 15 }}>
        <div style={{ display: 'flex', color: 'var(--fgM)', fontWeight: 700, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 8, fontSize: 10 }}>
          <div style={{ flex: 1 }}>PERÍCIA</div>
          <div style={{ width: 45, textAlign: 'center' }}>DADOS</div>
          <div style={{ width: 45, textAlign: 'center' }}>BÔNUS</div>
          <div style={{ width: 45, textAlign: 'center' }}>TREINO</div>
        </div>

        {SKILL_DEFINITIONS.map(skill => {
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
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.02)',
                color: isTrained ? 'var(--accentL)' : 'var(--fg)',
                opacity: isTrained ? 1 : 0.7,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ flex: 1, fontWeight: isTrained ? 600 : 400, display: 'flex', alignItems: 'center', gap: 8 }}>
                {skill.name}
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
        })}
      </div>
    </div>
  )
}
