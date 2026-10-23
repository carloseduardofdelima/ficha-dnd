'use client'

import React from 'react'
import { Plus, Settings, Sword, Info } from 'lucide-react'
import { formatModifier, calcModifier } from '@/types/character'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function AttributesTab() {
  const {
    character,
    isOwner,
    attributes,
    setEditingAttrs,
    setIsAttrModalOpen,
    parsedInventory,
    setDetailItem
  } = useCharacterSheet()

  if (!character) return null

  return (
    <>
      <div className="fade-up attributes-tab-container">
        <h2 className="attr-title">Atributos</h2>
        <div className="attr-grid-container">
          <div className="attr-grid" style={{ width: '100%' }}>
            {attributes.map(attr => (
              <div
                key={attr.name}
                className="card"
                onClick={() => {
                  if (isOwner) {
                    setEditingAttrs({
                      strength: character.strength,
                      dexterity: character.dexterity,
                      constitution: character.constitution,
                      intelligence: character.intelligence,
                      wisdom: character.wisdom,
                      charisma: character.charisma
                    })
                    setIsAttrModalOpen(true)
                  }
                }}
                style={{
                  padding: '12px 0',
                  textAlign: 'center',
                  background: 'var(--bg2)',
                  width: '100%',
                  cursor: isOwner ? 'pointer' : 'default',
                  transition: 'transform 0.2s',
                  border: '1px solid var(--border)'
                }}
                onMouseEnter={e => isOwner && (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => isOwner && (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fgM)', textTransform: 'uppercase', marginBottom: 12 }}>{attr.name}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
                  <div style={{ width: 48, height: 48, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>
                    {attr.mod}
                  </div>
                  <div style={{ width: 32, height: 32, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'var(--accentL)' }}>
                    {attr.save}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--fgM)' }}>
                  <span style={{ fontSize: 12, color: 'var(--fg2)', fontWeight: 600 }}>{attr.score}</span> Atributo
                </div>
                <div style={{ fontSize: 10, color: 'var(--fgM)' }}>Resistência</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attacks Section */}
      <div className="attacks-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Ataques</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
            <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
          </div>
        </div>
        {/* Desktop Header */}
        <div className="attacks-header hide-mobile">
          <div className="col-atk">Ataque</div>
          <div className="col-range">Alcance</div>
          <div className="col-hit">Acerto / CD</div>
          <div className="col-dmg">Dano</div>
          <div className="col-info"></div>
        </div>

        <div className="attacks-list">
          {/* Unarmed Strike */}
          <div className="attack-row card">
            <div className="col-atk">
              <div className="atk-name">Ataque Desarmado</div>
              <div className="atk-type">Corpo a corpo</div>
            </div>
            <div className="col-range">
              <span className="mobile-label">Alcance: </span>
              1.5 m
            </div>
            <div className="col-hit">
              <div className="hit-badge">
                {formatModifier(character.strength + character.proficiencyBonus - 10)} Ataque
              </div>
            </div>
            <div className="col-dmg">
              <div className="dmg-box">
                <span className="dmg-value">{1 + calcModifier(character.strength)}</span>
                <Sword size={12} color="var(--accentL)" />
                <span className="dmg-type">Concussão</span>
              </div>
            </div>
            <div className="col-info">
              <button className="btn btn-ghost"><Info size={18} /></button>
            </div>
          </div>

          {/* Weapons from Inventory */}
          {parsedInventory
            .filter(e => e.item.category === 'weapon')
            .map((entry, idx) => {
              const weapon = entry.item
              const isFinesse = weapon.properties?.toLowerCase().includes('acuidade')
              const isRange = weapon.properties?.toLowerCase().includes('alcance') || (weapon.category === 'weapon' && (weapon.name.toLowerCase().includes('arco') || weapon.name.toLowerCase().includes('besta')))

              let attackStat = character.strength
              if (isRange || (isFinesse && character.dexterity > character.strength)) {
                attackStat = character.dexterity
              }

              const toHit = calcModifier(attackStat) + character.proficiencyBonus
              const dmgMod = calcModifier(attackStat)
              const dmgParts = weapon.properties?.split(',')[0].trim().split(' ')
              const dice = dmgParts?.[0] || '1d4'
              const type = dmgParts?.[1] || 'dano'
              const rangeMatch = weapon.properties?.match(/alcance\s+([\d\/]+)\s*m/i)
              const range = rangeMatch ? rangeMatch[1] + ' m' : (isRange ? 'Distância' : '1.5 m')

              return (
                <div key={idx} className="attack-row card">
                  <div className="col-atk">
                    <div className="atk-name">{weapon.name}</div>
                    <div className="atk-type">{isRange ? 'À Distância' : 'Corpo a corpo'}</div>
                  </div>
                  <div className="col-range">
                    <span className="mobile-label">Alcance: </span>
                    {range}
                  </div>
                  <div className="col-hit">
                    <div className="hit-badge">
                      {toHit >= 0 ? `+${toHit}` : toHit} Ataque
                    </div>
                  </div>
                  <div className="col-dmg">
                    <div className="dmg-box">
                      <span className="dmg-value">{dice}{dmgMod !== 0 ? (dmgMod > 0 ? `+${dmgMod}` : dmgMod) : ''}</span>
                      <Sword size={12} color="var(--accentL)" />
                      <span className="dmg-type">{type}</span>
                    </div>
                  </div>
                  <div className="col-info">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setDetailItem(weapon)}
                    >
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
