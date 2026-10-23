'use client'

import React from 'react'
import Image from 'next/image'
import { Zap } from 'lucide-react'
import { SPELLS, ALL_SPELLS, SPELLS_2014 } from '@/lib/spells'
import { getUnlockedSubclassSpells } from '../utils/subclass-spells'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function SpellsTab() {
  const {
    id,
    character,
    isOwner,
    isPreparing,
    setIsPreparing,
    currentProgression,
    totalCantripsSelected,
    totalLeveledSpellsSelected,
    parsedSpellSlots,
    selectedMetamagics,
    setSelectedMetamagics,
    parsedSpells,
    ekSchoolFilter,
    setEkSchoolFilter,
    updateValue,
  } = useCharacterSheet()

  if (!character) return null

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Magias</h2>
          <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>
            {isPreparing ? '🛡️ Selecione as magias para o dia' : '📖 Suas magias ativas'}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          {isOwner && (
            <button
              className={`btn ${isPreparing ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setIsPreparing(!isPreparing)}
              style={{ padding: '6px 12px', fontSize: 12, height: 'auto', gap: 6 }}
            >
              <Zap size={14} fill={isPreparing ? 'currentColor' : 'none'} />
              {isPreparing ? 'Finalizar Preparação' : 'Preparar Magias'}
            </button>
          )}

          {currentProgression && (
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Truques</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: totalCantripsSelected > currentProgression.cantrips ? 'var(--error)' : 'var(--accentL)' }}>
                  {totalCantripsSelected}<span style={{ fontSize: 10, color: 'var(--fg3)', fontWeight: 400 }}>/{currentProgression.cantrips}</span>
                </div>
              </div>
              {(currentProgression.prepared !== undefined || currentProgression.known !== undefined) && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>
                    {currentProgression.known ? 'Magias Conhecidas' : 'Magias Preparadas'}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: totalLeveledSpellsSelected > (currentProgression.prepared || currentProgression.known || 0) ? 'var(--error)' : 'var(--accentL)' }}>
                    {totalLeveledSpellsSelected}<span style={{ fontSize: 10, color: 'var(--fg3)', fontWeight: 400 }}>/{currentProgression.prepared || currentProgression.known || 0}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spell Slots Display */}
      {currentProgression && currentProgression.slots.some((s: number) => s > 0) && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: 8 }}>
            Espaços de Magia (Usos Disponíveis)
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
            gap: 8,
            background: 'rgba(255,255,255,0.02)',
            padding: 12,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {currentProgression.slots.map((max: number, idx: number) => {
              if (max === 0) return null
              const lvl = idx + 1
              const current = (parsedSpellSlots as any)[lvl] ?? max
              return (
                <div key={lvl} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', marginBottom: 2 }}>{lvl}º Nvl</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    background: 'var(--bg)',
                    padding: '4px 0',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--accent)' }}>{current}</span>
                    <span style={{ opacity: 0.3, fontSize: 10 }}>/</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{max}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Metamagic Selection for Sorcerers */}
      {character?.class === 'Feiticeiro' && ((character.ruleset === '2014' || character.ruleset === '5e-custom') ? character.level >= 3 : character.level >= 2) && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: 8 }}>
            Metamágica (Escolha 2 Opções)
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12
          }}>
            {[
              {
                id: 'acelerada',
                name: 'Magia Acelerada',
                cost: '2 Pontos',
                desc: 'Muda o tempo de conjuração de uma magia de 1 ação para 1 ação bônus.'
              },
              {
                id: 'duplicada',
                name: 'Magia Duplicada',
                cost: '1 Ponto/Círculo',
                desc: 'Conjura uma magia de alvo único em dois alvos ao mesmo tempo.'
              },
              {
                id: 'sutil',
                name: 'Magia Sutil',
                cost: '1 Ponto',
                desc: 'Conjura a magia sem necessidade de componentes verbais (V) ou somáticos (S).'
              },
              {
                id: 'cuidadosa',
                name: 'Magia Cuidadosa',
                cost: '1 Ponto',
                desc: 'Permite proteger aliados garantindo que passem automaticamente no teste de resistência da magia.'
              }
            ].map(opt => {
              const isSelected = selectedMetamagics.includes(opt.id)
              return (
                <div
                  key={opt.id}
                  className="card"
                  onClick={() => {
                    let newSel = [...selectedMetamagics]
                    if (isSelected) {
                      newSel = newSel.filter(id => id !== opt.id)
                    } else {
                      if (newSel.length >= 2) {
                        alert('Você já selecionou o limite máximo de 2 opções de Metamágica!')
                        return
                      }
                      newSel.push(opt.id)
                    }
                    setSelectedMetamagics(newSel)
                    localStorage.setItem(`selected_metamagic_${id}`, JSON.stringify(newSel))
                  }}
                  style={{
                    padding: 14,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--accentGlow)' : 'rgba(255,255,255,0.01)',
                    borderColor: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: isSelected ? 'var(--fg)' : 'var(--fg2)' }}>{opt.name}</span>
                    <span style={{ fontSize: 9, color: 'var(--accentL)', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(225,29,72,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                      {opt.cost}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: isSelected ? 'var(--fg2)' : 'var(--fg3)', lineHeight: 1.4 }}>
                    {opt.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Warlock Special Slot */}
      {currentProgression && character?.class === 'Bruxo' && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
          background: 'rgba(var(--accent-rgb), 0.05)',
          padding: 16,
          borderRadius: 12,
          border: '1px solid rgba(var(--accent-rgb), 0.2)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Espaços de Pacto ({currentProgression.slot_level}º Nvl)</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)' }}>{((character as any).currentSpellSlots)?.[1] ?? currentProgression.slots[0]}</div>
              <div style={{ fontSize: 20, opacity: 0.3 }}>/</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{currentProgression.slots[0]}</div>
            </div>
          </div>
        </div>
      )}

      {(() => {
        const currentSpells = parsedSpells.filter(sid => {
          const list = (character.ruleset === '2014' || character.ruleset === '5e-custom') ? SPELLS_2014 : SPELLS
          return list.some(s => s.id === sid)
        })
        // Nível máximo que o personagem pode conjurar (Seguro para TypeScript)
        const lastSlotIdx = currentProgression?.slots ? [...currentProgression.slots].reduce((acc: number, curr: number, idx: number) => curr > 0 ? idx : acc, 0) : 0
        const finalMaxLevel = currentProgression?.slot_level || lastSlotIdx + 1

        const subclassSpells = character.subclass 
          ? getUnlockedSubclassSpells(character.class, character.subclass, character.level, character.ruleset || '2024')
          : []

        const spellcastingClass = (character.class === 'Guerreiro' && character.subclass === 'Cavaleiro Arcano') || (character.class === 'Ladino' && character.subclass === 'Trapaceiro Arcano')
          ? 'Mago'
          : character.class

        const restrictedSchools = 
          character.class === 'Guerreiro' && character.subclass === 'Cavaleiro Arcano' ? ['Abjuração', 'Evocação'] :
          character.class === 'Ladino' && character.subclass === 'Trapaceiro Arcano' ? ['Ilusão', 'Encantamento'] :
          null

        // Se estiver preparando, mostramos a lista da classe. Se não, mostramos as salvas.
        const availableSpellsList = (character.ruleset === '2014' || character.ruleset === '5e-custom') ? SPELLS_2014 : SPELLS
        const baseList = isPreparing
          ? availableSpellsList.filter(s => {
              const matchClass = s.classes.includes(spellcastingClass)
              const matchLevel = s.level <= finalMaxLevel
              const isExcluded = subclassSpells.some(ss => ss.id === s.id)
              const matchSchool = !ekSchoolFilter || s.level === 0 || !restrictedSchools || restrictedSchools.includes(s.school)
              return matchClass && matchLevel && !isExcluded && matchSchool
            })
          : currentSpells.map(sid => ALL_SPELLS.find(s => s.id === sid)).filter(Boolean)

        const slots = character.spellSlots ? JSON.parse(character.spellSlots as string) : {}

        const toggleSpell = (spellId: string) => {
          if (!isOwner) return
          const spell = ALL_SPELLS.find(s => s.id === spellId)
          if (!spell) return

          const newSpells = [...currentSpells]
          const index = newSpells.indexOf(spellId)

          if (index > -1) {
            newSpells.splice(index, 1)
          } else {
            const lvl = spell.level

            if (lvl === 0) {
              const selectedCantrips = currentSpells.filter(sid => {
                const s = ALL_SPELLS.find(sp => sp.id === sid)
                return s && s.level === 0
              }).length
              if (currentProgression && selectedCantrips >= (currentProgression?.cantrips || 0)) {
                alert(`Você já atingiu o limite de Truques! (${currentProgression.cantrips})`)
                return
              }
            } else {
              const isPoolBased = lvl > 0 && (currentProgression?.prepared !== undefined || currentProgression?.known !== undefined)

              if (isPoolBased) {
                const selectedLeveled = currentSpells.filter(sid => {
                  const s = ALL_SPELLS.find(sp => sp.id === sid)
                  return s && s.level > 0
                }).length
                const maxPool = currentProgression?.prepared || currentProgression?.known || 0
                if (selectedLeveled >= maxPool) {
                  alert(`Você já atingiu o limite de magias ${currentProgression?.known ? 'conhecidas' : 'preparadas'} (${maxPool})!`)
                  return
                }
              } else {
                // Default logic: Per level (if no global pool defined)
                const selectedInLvl = currentSpells.filter(sid => {
                  const s = ALL_SPELLS.find(sp => sp.id === sid)
                  return s && s.level === lvl
                }).length
                const maxInLvl = slots[lvl.toString()] || 0
                if (selectedInLvl >= maxInLvl) {
                  alert(`Você já atingiu o limite de magias para o ${lvl}º Nível!`)
                  return
                }
              }
            }
            newSpells.push(spellId)
          }
          updateValue('spells', newSpells, true)
        }

        if (baseList.length === 0 && subclassSpells.length === 0 && !isPreparing) {
          const hasFutureSlots = (character.ruleset === '2014' || character.ruleset === '5e-custom') && ['Paladino', 'Patrulheiro'].includes(character.class) && character.level === 1
          return (
            <div style={{ textAlign: 'center', padding: 40, background: 'rgba(255,255,255,0.01)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--fg3)', margin: 0 }}>
                {hasFutureSlots
                  ? '🛡️ Você desbloqueará espaços de magia no Nível 2 (Regras 2014).'
                  : '📖 Nenhuma magia preparada para hoje.'}
              </p>
              {hasFutureSlots && (
                <p style={{ fontSize: 11, color: 'var(--fg4)', marginTop: 8 }}>
                  No D&D 2014, Paladinos e Patrulheiros começam sua jornada mística apenas no segundo nível.
                </p>
              )}
            </div>
          )
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {subclassSpells.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, borderBottom: '1px solid var(--accentL)', paddingBottom: 8 }}>
                  <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                    Magias de {character.subclass} (Preparadas)
                  </h3>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accentL)', textTransform: 'uppercase', background: 'rgba(225,29,72,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                    Sempre Preparadas
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {subclassSpells.map((spell: any) => {
                    return (
                      <div
                        key={spell.id}
                        className="card"
                        style={{
                          padding: 16,
                          background: 'var(--bg2)',
                          borderLeft: '3px solid var(--accentL)',
                          cursor: 'default',
                          transition: 'all 0.2s',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                          {(() => {
                            const icon = spell.icon || (
                              spell.school === 'Abjuração' ? 'protection-field.png' :
                                spell.school === 'Adivinhação' ? 'all-seeing-eye.png' :
                                  spell.school === 'Conjuração' ? 'magic-sparks.png' :
                                    spell.school === 'Encantamento' ? 'heart-heal.png' :
                                      spell.school === 'Evocação' ? 'fire-blast.png' :
                                        spell.school === 'Ilusão' ? 'mirror-image.png' :
                                          spell.school === 'Necromancia' ? 'undead-skull.png' :
                                            spell.school === 'Transmutação' ? 'elemental-spiral.png' :
                                              'magic-scroll.png'
                            )
                            return (
                              <div style={{
                                flexShrink: 0, width: 40, height: 40, borderRadius: 8, overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)'
                              }}>
                                <Image
                                  src={`/assets/spells-icons/${icon}`}
                                  alt={spell.name}
                                  width={40} height={40}
                                  style={{ objectFit: 'cover', opacity: 1 }}
                                />
                              </div>
                            )
                          })()}

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {spell.name}
                                  {spell.ritual && (
                                    <span style={{
                                      fontSize: 9,
                                      fontWeight: 800,
                                      color: '#fbbf24',
                                      background: 'rgba(251, 191, 36, 0.15)',
                                      padding: '2px 6px',
                                      borderRadius: 4,
                                      border: '1px solid rgba(251, 191, 36, 0.3)'
                                    }}>
                                      RITUAL
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--accentL)', fontWeight: 600, textTransform: 'uppercase' }}>
                                  {spell.school} • {spell.level}º Círculo
                                </div>
                              </div>
                              <div style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: 'var(--accentL)',
                                background: 'rgba(225, 29, 72, 0.15)',
                                border: '1px solid var(--accent)',
                                padding: '4px 8px',
                                borderRadius: 6
                              }}>
                                {spell.range}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
                          <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Tempo:</span> {spell.castingTime}</div>
                          <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Duração:</span> {spell.duration}</div>
                          {spell.concentration && <div style={{ fontSize: 9, background: '#fbbf24', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>CONC.</div>}
                          {spell.ritual && <div style={{ fontSize: 9, background: '#a78bfa', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>RITUAL</div>}
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{spell.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {isPreparing && restrictedSchools && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid var(--border)',
                marginBottom: 20
              }}>
                <input
                  type="checkbox"
                  id="ek-school-filter-checkbox"
                  checked={ekSchoolFilter}
                  onChange={(e) => setEkSchoolFilter(e.target.checked)}
                  style={{
                    width: 16,
                    height: 16,
                    cursor: 'pointer',
                    accentColor: 'var(--accent)'
                  }}
                />
                <label htmlFor="ek-school-filter-checkbox" style={{ fontSize: 13, color: 'var(--fg)', cursor: 'pointer', fontWeight: 600 }}>
                  Filtrar por {restrictedSchools.join(' e ')} (Restrição de Subclasse)
                </label>
              </div>
            )}

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
              const lvlSpells = (baseList as any[]).filter(s => s.level === lvl)

              if (lvlSpells.length === 0) return null

              const selectedInLvl = currentSpells.filter(sid => {
                const s = ALL_SPELLS.find(sp => sp.id === sid)
                return s && s.level === lvl
              }).length

              const isPoolBased = lvl > 0 && (currentProgression?.prepared !== undefined || currentProgression?.known !== undefined)

              let headerCounter = ''
              if (lvl === 0) {
                headerCounter = `${selectedInLvl} / ${currentProgression?.cantrips || 0} CONHECIDOS`
              } else if (isPoolBased) {
                headerCounter = `${selectedInLvl} ${isPreparing ? 'SELECIONADA(S)' : 'PREPARADA(S)'}`
              } else {
                const maxInLvl = slots[lvl.toString()] || 0
                headerCounter = `${selectedInLvl} / ${maxInLvl} ${isPreparing ? 'SELECIONADAS' : 'PREPARADAS'}`
              }

              return (
                <div key={lvl}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 8 }}>
                    <h3 style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 12, background: 'var(--accent)', borderRadius: 2 }} />
                      {lvl === 0 ? 'Truques' : `${lvl}º Nível`}
                    </h3>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg3)' }}>
                      {headerCounter}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isPreparing ? 'repeat(2, minmax(0, 1fr))' : '1fr', gap: 12 }}>
                    {lvlSpells.map((spell: any) => {
                      const isSelected = currentSpells.includes(spell.id)
                      return (
                        <div
                          key={spell.id}
                          className="card"
                          onClick={() => isPreparing && toggleSpell(spell.id)}
                          style={{
                            padding: isPreparing ? '10px 12px' : 16,
                            background: isSelected ? 'var(--bg2)' : 'rgba(255,255,255,0.02)',
                            borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid var(--border)',
                            cursor: isPreparing ? 'pointer' : 'default',
                            transition: 'all 0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div style={{ display: 'flex', gap: isPreparing ? 6 : 14, alignItems: 'center' }}>
                            {isPreparing && (
                              <div style={{
                                width: 18, height: 18, borderRadius: 6, border: '2px solid var(--accent)',
                                background: isSelected ? 'var(--accent)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                {isSelected && <Zap size={10} color="#fff" fill="#fff" />}
                              </div>
                            )}

                            {(() => {
                              const icon = spell.icon || (
                                spell.school === 'Abjuração' ? 'protection-field.png' :
                                  spell.school === 'Adivinhação' ? 'all-seeing-eye.png' :
                                    spell.school === 'Conjuração' ? 'magic-sparks.png' :
                                      spell.school === 'Encantamento' ? 'heart-heal.png' :
                                        spell.school === 'Evocação' ? 'fire-blast.png' :
                                          spell.school === 'Ilusão' ? 'mirror-image.png' :
                                            spell.school === 'Necromancia' ? 'undead-skull.png' :
                                              spell.school === 'Transmutação' ? 'elemental-spiral.png' :
                                                'magic-scroll.png'
                              )
                              return (
                                <div style={{
                                  flexShrink: 0,
                                  width: isPreparing ? 32 : 40,
                                  height: isPreparing ? 32 : 40,
                                  borderRadius: 6,
                                  overflow: 'hidden',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  background: 'rgba(0,0,0,0.3)'
                                }}>
                                  <Image
                                    src={`/assets/spells-icons/${icon}`}
                                    alt={spell.name}
                                    width={isPreparing ? 32 : 40}
                                    height={isPreparing ? 32 : 40}
                                    style={{ objectFit: 'cover', opacity: isSelected ? 1 : 0.4 }}
                                  />
                                </div>
                              )
                            })()}

                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                  <div style={{
                                    fontWeight: 700,
                                    fontSize: isPreparing ? 12 : 15,
                                    color: isSelected ? 'var(--fg)' : 'var(--fg2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isPreparing ? 4 : 8,
                                    lineHeight: 1.2
                                  }}>
                                    {spell.name}
                                    {spell.ritual && (
                                      <span style={{
                                        fontSize: isPreparing ? 7 : 9,
                                        fontWeight: 800,
                                        color: '#fbbf24',
                                        background: 'rgba(251, 191, 36, 0.15)',
                                        padding: '1px 4px',
                                        borderRadius: 3,
                                        border: '1px solid rgba(251, 191, 36, 0.3)'
                                      }}>
                                        RITUAL
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: isPreparing ? 8 : 10, color: 'var(--accentL)', fontWeight: 600, textTransform: 'uppercase', marginTop: isPreparing ? 2 : 0 }}>{spell.school}</div>
                                </div>
                                {!isPreparing && (
                                  <div style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: isSelected ? 'var(--accentL)' : 'var(--fg2)',
                                    background: isSelected ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                                    border: isSelected ? '1px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.15)',
                                    padding: '4px 8px',
                                    borderRadius: 6
                                  }}>
                                    {spell.range}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {!isPreparing && (
                            <>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
                                <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Tempo:</span> {spell.castingTime}</div>
                                <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Duração:</span> {spell.duration}</div>
                                {spell.concentration && <div style={{ fontSize: 9, background: '#fbbf24', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>CONC.</div>}
                                {spell.ritual && <div style={{ fontSize: 9, background: '#a78bfa', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>RITUAL</div>}
                              </div>
                              <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{spell.description}</p>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })()}
    </div>
  )
}
