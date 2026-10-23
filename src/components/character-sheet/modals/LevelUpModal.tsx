'use client'

import React from 'react'
import { TrendingUp, ArrowRight, Star } from 'lucide-react'
import { Character } from '@/types/character'
import { CLASS_PROGRESSION_2024, getProficiencyBonus, SPECIES_PROGRESSION_2024 } from '@/lib/dnd-progression-2024'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { FEATS_2024 } from '@/lib/dnd-feats-2024'
import { INVOCATIONS_2014 } from '@/lib/invocations-2014'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'
import { getSpellSlots } from '@/lib/spells'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function LevelUpModal() {
  const {
    isLevelUpModalOpen,
    setIsLevelUpModalOpen,
    character,
    setCharacter,
    levelUpStep,
    setLevelUpStep,
    levelUpRoll,
    setLevelUpRoll,
    isRolling,
    setIsRolling,
    useAverageHP,
    setUseAverageHP,
    showCelebration,
    selectedRuleset,
    setSelectedRuleset,
    selectedSubclass,
    setSelectedSubclass,
    selectedFeatId,
    setSelectedFeatId,
    featAttr1,
    setFeatAttr1,
    featAttr2,
    setFeatAttr2,
    setIsDraconicModalOpen,
    selectedInvocations,
    setSelectedInvocations,
    selectedFightingStyle,
    setSelectedFightingStyle,
    selectedPactBoon,
    setSelectedPactBoon,
    handleLevelUpPersistence
  } = useCharacterSheet()

  if (!isLevelUpModalOpen || !character) {
    if (showCelebration && character) {
      return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 48, fontWeight: 900, color: 'var(--accent)', textShadow: '0 0 20px rgba(225,29,72,0.5)' }}>LEVEL UP!</h1>
            <p style={{ fontSize: 18, color: '#fff', fontWeight: 600 }}>Você alcançou o Nível {character.level}!</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />

        <div className="card fade-up" style={{ position: 'relative', width: '100%', maxWidth: 460, padding: 0, overflow: 'hidden', border: '1px solid var(--accent)' }}>
          {/* Header */}
          <div style={{ background: 'var(--accent)', padding: '24px 32px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: '50%' }}>
                <TrendingUp size={32} color="#fff" className={isRolling ? 'animate-bounce' : ''} />
              </div>
            </div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>Subir de Nível</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500 }}>{character.name} está ficando mais forte!</p>
          </div>

          <div style={{ padding: 32 }}>
            {/* Passo 0: Escolha do Ruleset (Se não houver) */}
            {levelUpStep === 0 && (
              <div className="fade-up">
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Versão das Regras</h3>
                <p style={{ fontSize: 13, color: 'var(--fg3)', textAlign: 'center', marginBottom: 24 }}>Escolha qual versão do Player&apos;s Handbook seguir para este personagem.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  <button
                    onClick={() => setSelectedRuleset('2024')}
                    style={{
                      padding: 16, borderRadius: 12, border: '2px solid',
                      borderColor: selectedRuleset === '2024' ? 'var(--accent)' : 'var(--border)',
                      background: selectedRuleset === '2024' ? 'var(--accentGlow)' : 'transparent',
                      textAlign: 'left', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: selectedRuleset === '2024' ? 'var(--accentL)' : 'var(--fg1)' }}>D&D 2024 (Revised)</div>
                    <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>Subclasses no nível 3, novas habilidades e equilíbrio atualizado.</p>
                  </button>

                  <button
                    onClick={() => setSelectedRuleset('2014')}
                    style={{
                      padding: 16, borderRadius: 12, border: '2px solid',
                      borderColor: selectedRuleset === '2014' ? 'var(--accent)' : 'var(--border)',
                      background: selectedRuleset === '2014' ? 'var(--accentGlow)' : 'transparent',
                      textAlign: 'left', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: selectedRuleset === '2014' ? 'var(--fg1)' : 'var(--fg1)' }}>D&D 2014 (Classic)</div>
                    <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>Progressão clássica das subclasses (Nível 1, 2 ou 3).</p>
                  </button>
                </div>

                <button
                  className="btn bg-accent"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={!selectedRuleset}
                  onClick={() => setLevelUpStep(1)}
                >
                  Confirmar e Continuar
                </button>
              </div>
            )}

            {levelUpStep === 1 && (
              <div className="fade-up">
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--accentL)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                    {character.level}
                    <ArrowRight size={32} color="var(--fg3)" style={{ margin: '0 4px' }} />
                    {character.level + 1}
                  </div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--fg3)', fontWeight: 700, marginTop: 4 }}>Novo Nível</div>
                </div>

                <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 24 }}>
                  <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)', textTransform: 'uppercase', marginBottom: 12 }}>Novas Características</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(() => {
                      const nextLevel = character.level + 1
                      const classFeatures = CLASS_PROGRESSION_2024[character.class]?.features[nextLevel] || []
                      const speciesFeatures = SPECIES_PROGRESSION_2024[character.race]?.[nextLevel] || []

                      let subclassFeatures: string[] = []
                      if (character.subclass && SUBCLASSES_2024[character.class]?.[character.subclass]) {
                        subclassFeatures = SUBCLASSES_2024[character.class][character.subclass].features[nextLevel]?.map((f: any) => f.name) || []
                      }

                      const allFeatures = [...classFeatures, ...speciesFeatures, ...subclassFeatures]

                      const oldProf = getProficiencyBonus(character.level)
                      const newProf = getProficiencyBonus(nextLevel)
                      if (newProf > oldProf) allFeatures.unshift(`Bônus de Proficiência aumenta para +${newProf}!`)

                      if (allFeatures.length === 0) return <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma característica automática este nível.</div>

                      return allFeatures.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                          <Star size={14} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                          <span>{f}</span>
                        </div>
                      ))
                    })()}
                  </div>
                </div>

                <button
                  className="btn bg-accent hover:bg-accent hover:scale-[1.02]"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setLevelUpStep(2)}
                >
                  Continuar
                </button>
              </div>
            )}

            {levelUpStep === 2 && (
              <div className="fade-up">
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>Aumento de Pontos de Vida</h3>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
                  <button
                    onClick={() => setUseAverageHP(true)}
                    style={{
                      flex: 1, padding: 16, borderRadius: 12, border: '2px solid',
                      borderColor: useAverageHP ? 'var(--accent)' : 'var(--border)',
                      background: useAverageHP ? 'var(--accentGlow)' : 'transparent',
                      textAlign: 'center', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 900, color: useAverageHP ? 'var(--accentL)' : 'var(--fg2)' }}>
                      {Math.floor(CLASS_PROGRESSION_2024[character.class]?.hitDie / 2) + 1}
                    </div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg3)' }}>Média</div>
                  </button>

                  <button
                    onClick={() => {
                      setUseAverageHP(false)
                      if (levelUpRoll === null && !isRolling) {
                        setIsRolling(true)
                        let count = 0
                        const die = CLASS_PROGRESSION_2024[character.class]?.hitDie || 10
                        const interval = setInterval(() => {
                          setLevelUpRoll(Math.floor(Math.random() * die) + 1)
                          count++
                          if (count > 15) {
                            clearInterval(interval)
                            setIsRolling(false)
                          }
                        }, 60)
                      }
                    }}
                    style={{
                      flex: 1, padding: 16, borderRadius: 12, border: '2px solid',
                      borderColor: !useAverageHP && levelUpRoll !== null ? 'var(--accent)' : 'var(--border)',
                      background: !useAverageHP && levelUpRoll !== null ? 'var(--accentGlow)' : 'transparent',
                      textAlign: 'center', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 900, color: !useAverageHP && levelUpRoll !== null ? 'var(--accentL)' : 'var(--fg2)' }}>
                      {isRolling ? '?' : (levelUpRoll || `d${CLASS_PROGRESSION_2024[character.class]?.hitDie}`)}
                    </div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg3)' }}>Rolar</div>
                  </button>
                </div>

                {(useAverageHP || levelUpRoll !== null) && !isRolling && (
                  <div className="card" style={{ background: 'var(--bg2)', padding: 12, textAlign: 'center', marginBottom: 24, animation: 'scale-up 0.3s ease-out' }}>
                    <div style={{ fontSize: 13, color: 'var(--fg2)' }}>
                      Ganho Total: <span style={{ fontWeight: 800, color: 'var(--accentL)' }}>
                        {(useAverageHP ? (Math.floor(CLASS_PROGRESSION_2024[character.class]?.hitDie / 2) + 1) : levelUpRoll!) + Math.floor((character.constitution - 10) / 2)} PV
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 2 }}>
                      ({useAverageHP ? 'Média' : 'Dado'} + Mod. CON)
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(1)}>Voltar</button>
                  <button
                    className="btn bg-accent"
                    style={{ flex: 2, justifyContent: 'center' }}
                    disabled={isRolling || (!useAverageHP && levelUpRoll === null)}
                    onClick={() => {
                      const hitDie = CLASS_PROGRESSION_2024[character.class]?.hitDie || 10
                      const hpIncrease = (useAverageHP ? (Math.floor(hitDie / 2) + 1) : levelUpRoll!) + Math.floor((character.constitution - 10) / 2)
                      const finalIncrease = Math.max(1, hpIncrease)

                      const newLevel = character.level + 1
                      const newMaxHp = character.maxHp + finalIncrease
                      const newProf = getProficiencyBonus(newLevel)

                      const newSpellSlotsRaw = getSpellSlots(character.class, newLevel, character.ruleset || '2024')
                      const newSpellSlots: Record<string, number> = {}
                      if (newSpellSlotsRaw?.slots) {
                        newSpellSlotsRaw.slots.forEach((s: number, i: number) => {
                          if (s > 0) newSpellSlots[String(i + 1)] = s
                        })
                      }

                      const newResources: Record<string, number> = character.resources ? JSON.parse(character.resources as string) : {}
                      if (character.class === 'Paladino') newResources['Imposição de Mãos'] = newLevel * 5
                      if (character.class === 'Monge') newResources['Pontos de Foco'] = newLevel
                      if (character.class === 'Feiticeiro') newResources['Pontos de Feitiçaria'] = newLevel
                      if (character.class === 'Bárbaro') {
                        if (newLevel >= 20) newResources['Fúrias'] = 99
                        else if (newLevel >= 17) newResources['Fúrias'] = 6
                        else if (newLevel >= 12) newResources['Fúrias'] = 5
                        else if (newLevel >= 6) newResources['Fúrias'] = 4
                        else if (newLevel >= 3) newResources['Fúrias'] = 3
                        else newResources['Fúrias'] = 2
                      }
                      if (character.class === 'Artífice') {
                        const modInt = Math.max(1, Math.floor((character.intelligence - 10) / 2))
                        newResources['Engenharia Mágica'] = modInt
                        
                        if (newLevel >= 7) {
                          newResources['Brilho de Gênio'] = modInt
                        } else {
                          delete newResources['Brilho de Gênio']
                        }

                        if (newLevel >= 2) {
                          let maxInfused = 2
                          if (newLevel >= 18) maxInfused = 6
                          else if (newLevel >= 14) maxInfused = 5
                          else if (newLevel >= 10) maxInfused = 4
                          else if (newLevel >= 6) maxInfused = 3

                          if (character.subclass === 'Armeiro') {
                            if (newLevel >= 10) {
                              maxInfused += 2
                            }
                          }
                          newResources['Itens Infundidos Ativos'] = maxInfused
                        } else {
                          delete newResources['Itens Infundidos Ativos']
                        }
                      }

                      const updated = {
                        ...character,
                        level: newLevel,
                        maxHp: newMaxHp,
                        currentHp: character.currentHp + finalIncrease,
                        proficiencyBonus: newProf,
                        ruleset: character.ruleset || selectedRuleset,
                        spellSlots: JSON.stringify(newSpellSlots),
                        resources: JSON.stringify(newResources)
                      }

                      const rulesetToUse = character.ruleset || selectedRuleset
                      const needsSubclass = (rulesetToUse === '2024' && newLevel >= 3 && !character.subclass)
                      const needsFeat = [4, 8, 12, 16, 19].includes(newLevel)
                      const needsSpecialChoice = (rulesetToUse === '2014' || rulesetToUse === '5e-custom') && (
                        (['Paladino', 'Patrulheiro'].includes(character.class) && newLevel === 2) ||
                        (character.class === 'Bruxo' && (newLevel === 2 || newLevel === 3))
                      )

                      if (needsSubclass) {
                        setLevelUpStep(3)
                        setCharacter(updated)
                      } else if (needsSpecialChoice) {
                        setLevelUpStep(5)
                        setCharacter(updated)
                      } else if (needsFeat) {
                        setLevelUpStep(4)
                        setCharacter(updated)
                      } else {
                        handleLevelUpPersistence(updated, [])
                      }
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Passo 3: Escolha da Subclasse */}
            {levelUpStep === 3 && (
              <div className="fade-up">
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Escolha sua Subclasse</h3>
                <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center', marginBottom: 20 }}>Como {character.class}, você desbloqueou uma especialização!</p>

                <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {(() => {
                    const rulesetToUse = character.ruleset || selectedRuleset
                    const subclassData = rulesetToUse === '2024' ? SUBCLASSES_2024 : SUBCLASSES_2014
                    let options = Object.keys(subclassData[character.class] || {})

                    if (rulesetToUse === '2014') {
                      options = options.filter(opt => {
                        const sub = subclassData[character.class]?.[opt] as any
                        return !sub?.source || sub.source === "Player's Handbook 2014"
                      })
                    }

                    if (options.length === 0) return <div style={{ textAlign: 'center', padding: 20, color: 'var(--fg3)' }}>Nenhuma subclasse cadastrada para {character.class} {rulesetToUse}.</div>

                    return options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedSubclass(opt)}
                        style={{
                          padding: 12, borderRadius: 10, border: '1px solid',
                          borderColor: selectedSubclass === opt ? 'var(--accent)' : 'var(--border)',
                          background: selectedSubclass === opt ? 'var(--accentGlow)' : 'var(--bg2)',
                          textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12
                        }}
                      >
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: selectedSubclass === opt ? 'var(--accent)' : 'transparent',
                          border: '1px solid var(--accent)'
                        }} />
                        <span style={{ fontWeight: 600, color: selectedSubclass === opt ? 'var(--fg1)' : 'var(--fg2)' }}>{opt}</span>
                      </button>
                    ))
                  })()}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(2)}>Voltar</button>
                  <button
                    className="btn bg-accent"
                    style={{ flex: 2, justifyContent: 'center' }}
                    disabled={!selectedSubclass}
                    onClick={() => {
                      const updated = {
                        ...character,
                        subclass: selectedSubclass,
                        ruleset: character.ruleset || selectedRuleset
                      }

                      if (selectedSubclass === 'Linhagem Dracônica' || selectedSubclass === 'Draconic Bloodline') {
                        setIsDraconicModalOpen(true)
                        return
                      }

                      const newSpellSlotsRaw = getSpellSlots(updated.class, updated.level, updated.ruleset as any)
                      const newSpellSlots: Record<string, number> = {}
                      if (newSpellSlotsRaw?.slots) {
                        newSpellSlotsRaw.slots.forEach((s: number, i: number) => {
                          if (s > 0) newSpellSlots[String(i + 1)] = s
                        })
                      }

                      const newResources: Record<string, number> = updated.resources ? JSON.parse(updated.resources as string) : {}
                      if (updated.class === 'Artífice') {
                        const modInt = Math.max(1, Math.floor((updated.intelligence - 10) / 2))
                        const rulesetToUse = updated.ruleset || '2024'
                        const is2014 = (rulesetToUse === '2014' || rulesetToUse === '5e-custom')
                        const pb = updated.proficiencyBonus

                        if (updated.level >= 2) {
                          let maxInfused = 2
                          if (updated.level >= 18) maxInfused = 6
                          else if (updated.level >= 14) maxInfused = 5
                          else if (updated.level >= 10) maxInfused = 4
                          else if (updated.level >= 6) maxInfused = 3

                          if (updated.subclass === 'Armeiro') {
                            if (is2014 && updated.level >= 9) {
                              maxInfused += 2
                            } else if (!is2014 && updated.level >= 10) {
                              maxInfused += 2
                            }
                          }
                          newResources['Itens Infundidos Ativos'] = maxInfused
                        }

                        if (updated.subclass === 'Alquimista') {
                          if (updated.level >= 3) newResources['Elixires Experimentais'] = 1
                          if (updated.level >= 10) newResources['Restauração Menor Grátis'] = modInt
                          if (updated.level >= 14) {
                            newResources['Curar (Heal)'] = 1
                            newResources['Restauração Maior Grátis'] = 1
                          }
                        } else if (updated.subclass === 'Artilheiro') {
                          if (updated.level >= 3) newResources['Canhão Élfico'] = 1
                        } else if (updated.subclass === 'Armeiro') {
                          if (updated.level >= 3) {
                            newResources['Campo Defensivo'] = pb
                            newResources['Estatura Gigante'] = modInt
                          }
                        } else if (updated.subclass === 'Serralheiro de Batalha') {
                          if (updated.level >= 10) newResources['Choque Arcano'] = modInt
                        }
                      }

                      const finalUpdated = {
                        ...updated,
                        spellSlots: JSON.stringify(newSpellSlots),
                        resources: JSON.stringify(newResources)
                      }

                      const needsFeat = [4, 8, 12, 16, 19].includes(updated.level)
                      const needsSpecialChoice = (updated.ruleset === '2014' || updated.ruleset === '5e-custom') && (
                        (['Paladino', 'Patrulheiro'].includes(updated.class) && updated.level === 2) ||
                        (updated.class === 'Bruxo' && (updated.level === 2 || updated.level === 3))
                      )

                      const alerts = [`✨ Nova Subclasse: ${selectedSubclass}!`]
                      if (needsSpecialChoice) {
                        setLevelUpStep(5)
                        setCharacter(finalUpdated)
                      } else if (needsFeat) {
                        setLevelUpStep(4)
                        setCharacter(finalUpdated)
                      } else {
                        handleLevelUpPersistence(finalUpdated, alerts)
                      }
                    }}
                  >
                    Finalizar Level Up
                  </button>
                </div>
              </div>
            )}

            {/* Passo 4: Escolha de Talento / ASI */}
            {levelUpStep === 4 && (
              <div className="fade-up">
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>
                  {character.level === 19 ? 'Bênção Épica' : 'Melhoria de Atributo ou Talento'}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center', marginBottom: 20 }}>
                  Você atingiu o nível {character.level}! Escolha como seu personagem evoluiu.
                </p>

                <div style={{ maxHeight: 350, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {(() => {
                    const available = FEATS_2024.filter(f => character.level >= f.minLevel)
                    const sorted = [...available].sort((a, b) => {
                      if (character.level === 19) {
                        if (a.category === 'Epic Boon' && b.category !== 'Epic Boon') return -1
                        if (a.category !== 'Epic Boon' && b.category === 'Epic Boon') return 1
                      }
                      return a.name.localeCompare(b.name)
                    })

                    return sorted.map(feat => (
                      <button
                        key={feat.id}
                        onClick={() => {
                          setSelectedFeatId(feat.id)
                          setFeatAttr1(null)
                          setFeatAttr2(null)
                        }}
                        style={{
                          padding: 12, borderRadius: 10, border: '1px solid',
                          borderColor: selectedFeatId === feat.id ? 'var(--accent)' : 'var(--border)',
                          background: selectedFeatId === feat.id ? 'var(--accentGlow)' : 'var(--bg2)',
                          textAlign: 'left', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontWeight: 800, color: selectedFeatId === feat.id ? 'var(--accentL)' : 'var(--fg1)' }}>{feat.name}</span>
                          <span style={{ fontSize: 9, opacity: 0.6, textTransform: 'uppercase' }}>{feat.category}</span>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--fg3)', margin: 0 }}>{feat.description}</p>
                        {feat.requirement && <p style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4, fontStyle: 'italic' }}>Req: {feat.requirement}</p>}
                      </button>
                    ))
                  })()}
                </div>

                {selectedFeatId && (
                  <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 24, border: '1px solid var(--accent)' }}>
                    {selectedFeatId === 'asi' ? (
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Escolha os Atributos (+2 ou +1/+1)</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <select
                            className="input"
                            style={{ width: '100%', padding: 8, fontSize: 12 }}
                            value={featAttr1 || ''}
                            onChange={e => setFeatAttr1(e.target.value)}
                          >
                            <option value="">Selecione o 1º Atributo (+1)</option>
                            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                          </select>
                          <select
                            className="input"
                            style={{ width: '100%', padding: 8, fontSize: 12 }}
                            value={featAttr2 || ''}
                            onChange={e => setFeatAttr2(e.target.value)}
                          >
                            <option value="">Selecione o 2º Atributo (+1)</option>
                            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                          </select>
                          <p style={{ fontSize: 10, color: 'var(--fg3)', textAlign: 'center', marginTop: 4 }}>Dica: Se escolher o mesmo duas vezes, ganha +2 nele.</p>
                        </div>
                      </div>
                    ) : (
                      FEATS_2024.find(f => f.id === selectedFeatId)?.description.includes('+1') && (
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Escolha o Atributo para aumentar (+1)</p>
                          <select
                            className="input"
                            style={{ width: '100%', padding: 8, fontSize: 12 }}
                            value={featAttr1 || ''}
                            onChange={e => setFeatAttr1(e.target.value)}
                          >
                            <option value="">Selecione o Atributo</option>
                            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(a => (
                              <option key={a} value={a}>{a.toUpperCase()}</option>
                            ))}
                          </select>
                        </div>
                      )
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(character.subclass ? 3 : 2)}>Voltar</button>
                  <button
                    className="btn bg-accent"
                    style={{ flex: 2, justifyContent: 'center' }}
                    disabled={!selectedFeatId || (selectedFeatId === 'asi' && (!featAttr1 || !featAttr2)) || (FEATS_2024.find(f => f.id === selectedFeatId)?.description.includes('+1') && !featAttr1)}
                    onClick={() => {
                      const feat = FEATS_2024.find(f => f.id === selectedFeatId)!
                      const updatedAttrs = {
                        strength: (character.strength || 10) + (featAttr1 === 'strength' ? 1 : 0) + (featAttr2 === 'strength' ? 1 : 0),
                        dexterity: (character.dexterity || 10) + (featAttr1 === 'dexterity' ? 1 : 0) + (featAttr2 === 'dexterity' ? 1 : 0),
                        constitution: (character.constitution || 10) + (featAttr1 === 'constitution' ? 1 : 0) + (featAttr2 === 'constitution' ? 1 : 0),
                        intelligence: (character.intelligence || 10) + (featAttr1 === 'intelligence' ? 1 : 0) + (featAttr2 === 'intelligence' ? 1 : 0),
                        wisdom: (character.wisdom || 10) + (featAttr1 === 'wisdom' ? 1 : 0) + (featAttr2 === 'wisdom' ? 1 : 0),
                        charisma: (character.charisma || 10) + (featAttr1 === 'charisma' ? 1 : 0) + (featAttr2 === 'charisma' ? 1 : 0),
                      }

                      const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {})
                      const newTraits = {
                        ...currentTraits,
                        feats: [...(currentTraits.feats || []), { name: feat.name, description: feat.description }]
                      }

                      const updated = {
                        ...character,
                        ...updatedAttrs,
                        traits: newTraits
                      }

                      handleLevelUpPersistence(updated as Character, [`🎉 Novo Talento: ${feat.name}!`])
                    }}
                  >
                    Finalizar Level Up
                  </button>
                </div>
              </div>
            )}

            {/* Passo 5: Escolhas de Classe (Estilos, Invocações, Pactos) */}
            {levelUpStep === 5 && character && (
              <div className="fade-up">
                {(() => {
                  if (character.class === 'Bruxo') {
                    if (character.level === 2) {
                      return (
                        <>
                          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Invocações Místicas</h3>
                          <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center', marginBottom: 20 }}>Escolha 2 invocações para moldar seu poder oculto.</p>
                          <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                            {INVOCATIONS_2014.filter(inv => !inv.level || inv.level <= character.level).map(inv => (
                              <button
                                key={inv.id}
                                onClick={() => {
                                  if (selectedInvocations.includes(inv.id)) {
                                    setSelectedInvocations(selectedInvocations.filter(id => id !== inv.id))
                                  } else if (selectedInvocations.length < 2) {
                                    setSelectedInvocations([...selectedInvocations, inv.id])
                                  }
                                }}
                                style={{
                                  padding: 12, borderRadius: 10, border: '1px solid',
                                  borderColor: selectedInvocations.includes(inv.id) ? 'var(--accent)' : 'var(--border)',
                                  background: selectedInvocations.includes(inv.id) ? 'var(--accentGlow)' : 'var(--bg2)',
                                  textAlign: 'left', transition: 'all 0.2s'
                                }}
                              >
                                <div style={{ fontWeight: 800, color: selectedInvocations.includes(inv.id) ? 'var(--accentL)' : 'var(--fg1)' }}>{inv.name}</div>
                                <p style={{ fontSize: 11, color: 'var(--fg3)', margin: '4px 0 0' }}>{inv.description}</p>
                                {inv.prerequisite && <p style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4 }}><em>Requisito: {inv.prerequisite}</em></p>}
                              </button>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(2)}>Voltar</button>
                            <button
                              className="btn bg-accent"
                              style={{ flex: 2, justifyContent: 'center' }}
                              disabled={selectedInvocations.length < 2}
                              onClick={() => {
                                const invs = selectedInvocations.map(id => INVOCATIONS_2014.find(i => i.id === id)).filter(Boolean)
                                const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {})
                                const updatedTraits = {
                                  ...currentTraits,
                                  invocations: [...(currentTraits.invocations || []), ...invs.map(i => ({ name: i!.name, description: i!.description }))]
                                }
                                const updated = { ...character, traits: updatedTraits }
                                const needsFeat = [4, 8, 12, 16, 19].includes(character.level)
                                if (needsFeat) {
                                  setLevelUpStep(4)
                                  setCharacter(updated)
                                } else {
                                  handleLevelUpPersistence(updated as Character, ['👁️ Novas Invocações Místicas!'])
                                }
                              }}
                            >
                              Finalizar
                            </button>
                          </div>
                        </>
                      )
                    } else if (character.level === 3) {
                      const pactOptions = CLASS_LEVEL1_DATA_2014['Bruxo']?.choices?.find((c: any) => c.id === 'warlock-pact-boon-2014')?.options || []
                      return (
                        <>
                          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Dádiva do Pacto</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                            {pactOptions.map((opt: any) => (
                              <button
                                key={opt.id}
                                onClick={() => setSelectedPactBoon(opt.name)}
                                style={{
                                  padding: 16, borderRadius: 12, border: '2px solid',
                                  borderColor: selectedPactBoon === opt.name ? 'var(--accent)' : 'var(--border)',
                                  background: selectedPactBoon === opt.name ? 'var(--accentGlow)' : 'transparent',
                                  textAlign: 'left', transition: 'all 0.2s'
                                }}
                              >
                                <div style={{ fontWeight: 800, color: selectedPactBoon === opt.name ? 'var(--accentL)' : 'var(--fg1)' }}>{opt.name}</div>
                                <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>{opt.description}</p>
                              </button>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(2)}>Voltar</button>
                            <button
                              className="btn bg-accent"
                              style={{ flex: 2, justifyContent: 'center' }}
                              disabled={!selectedPactBoon}
                              onClick={() => {
                                const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {})
                                const updatedTraits = {
                                  ...currentTraits,
                                  pactBoon: selectedPactBoon
                                }
                                const updated = { ...character, traits: updatedTraits }
                                handleLevelUpPersistence(updated as Character, [`📜 Pacto Selado: ${selectedPactBoon}!`])
                              }}
                            >
                              Finalizar
                            </button>
                          </div>
                        </>
                      )
                    }
                  }

                  if (['Paladino', 'Patrulheiro'].includes(character.class) && character.level === 2) {
                    const styleOptions = character.class === 'Paladino'
                      ? [
                        { id: 'def', name: 'Defesa', description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.' },
                        { id: 'due', name: 'Duelismo', description: 'Ao empunhar uma arma corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 no dano.' },
                        { id: 'gwf', name: 'Combate com Armas Grandes', description: 'Ao rolar 1 ou 2 no dano de arma de duas mãos, você pode rolar de novo.' },
                        { id: 'pro', name: 'Proteção', description: 'Use sua reação para impor desvantagem em um ataque contra um aliado a até 1,5m (requer escudo).' }
                      ]
                      : [
                        { id: 'arc', name: 'Arquearia', description: 'Bônus de +2 nas jogadas de ataque com armas à distância.' },
                        { id: 'def', name: 'Defesa', description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.' },
                        { id: 'due', name: 'Duelismo', description: 'Ao empunhar uma arma corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 no dano.' },
                        { id: 'twf', name: 'Combate com Duas Armas', description: 'Adiciona seu modificador de habilidade no dano do segundo ataque.' }
                      ]

                    return (
                      <>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: 'var(--accentL)' }}>Estilo de Luta</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                          {styleOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedFightingStyle(opt.name)}
                              style={{
                                padding: 16, borderRadius: 12, border: '2px solid',
                                borderColor: selectedFightingStyle === opt.name ? 'var(--accent)' : 'var(--border)',
                                background: selectedFightingStyle === opt.name ? 'var(--accentGlow)' : 'transparent',
                                textAlign: 'left', transition: 'all 0.2s'
                              }}
                            >
                              <div style={{ fontWeight: 800, color: selectedFightingStyle === opt.name ? 'var(--accentL)' : 'var(--fg1)' }}>{opt.name}</div>
                              <p style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 4 }}>{opt.description}</p>
                            </button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setLevelUpStep(2)}>Voltar</button>
                          <button
                            className="btn bg-accent"
                            style={{ flex: 2, justifyContent: 'center' }}
                            disabled={!selectedFightingStyle}
                            onClick={() => {
                              const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {})
                              const styleData = styleOptions.find(o => o.name === selectedFightingStyle)
                              const updatedTraits = {
                                ...currentTraits,
                                fightingStyle: selectedFightingStyle,
                                feats: [...(currentTraits.feats || []), { name: `Estilo de Luta: ${selectedFightingStyle}`, description: styleData?.description }]
                              }
                              const updated = { ...character, traits: updatedTraits }
                              handleLevelUpPersistence(updated as Character, [`⚔️ Estilo de Luta: ${selectedFightingStyle}!`])
                            }}
                          >
                            Finalizar
                          </button>
                        </div>
                      </>
                    )
                  }

                  return null
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
