'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { X, Sparkles, Search, Check, Wand2, BookOpen, AlertCircle } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'
import { getSpellsForClass, ALL_SPELLS, Spell } from '@/lib/spells'
import { calcModifier } from '@/types/character'

const MAGIC_INITIATE_CLASSES = [
  { name: 'Bardo', attr: 'Carisma', attrKey: 'charisma' as const },
  { name: 'Bruxo', attr: 'Carisma', attrKey: 'charisma' as const },
  { name: 'Clérigo', attr: 'Sabedoria', attrKey: 'wisdom' as const },
  { name: 'Druida', attr: 'Sabedoria', attrKey: 'wisdom' as const },
  { name: 'Feiticeiro', attr: 'Carisma', attrKey: 'charisma' as const },
  { name: 'Mago', attr: 'Inteligência', attrKey: 'intelligence' as const },
  { name: 'Artífice', attr: 'Inteligência', attrKey: 'intelligence' as const },
]

export default function FeatSpellsModal() {
  const {
    isFeatSpellsModalOpen,
    setIsFeatSpellsModalOpen,
    selectedFeatForSpells,
    setSelectedFeatForSpells,
    character,
    effectiveStats,
    handleSaveFeatSpells
  } = useCharacterSheet()

  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedCantrips, setSelectedCantrips] = useState<string[]>([])
  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'cantrips' | 'level1'>('cantrips')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Initialize or reset when modal opens or selectedFeatForSpells changes
  useEffect(() => {
    if (selectedFeatForSpells && isFeatSpellsModalOpen) {
      setSelectedClass(selectedFeatForSpells.chosenClass || '')
      const prevSpells: string[] = selectedFeatForSpells.chosenSpells || []
      
      const cantrips = prevSpells.filter(id => {
        const s = ALL_SPELLS.find(sp => sp.id === id)
        return s && s.level === 0
      })
      const lvl1 = prevSpells.find(id => {
        const s = ALL_SPELLS.find(sp => sp.id === id)
        return s && s.level === 1
      })

      setSelectedCantrips(cantrips.slice(0, 2))
      setSelectedLevel1(lvl1 || null)
      setSearchTerm('')
      setActiveTab('cantrips')
    }
  }, [selectedFeatForSpells, isFeatSpellsModalOpen])

  // Get spells for the chosen class
  const classSpells = useMemo<Spell[]>(() => {
    if (!selectedClass) return []
    const ruleset = (character?.ruleset as any) || '2014'
    const spells = getSpellsForClass(selectedClass, ruleset)
    if (spells.length > 0) return spells
    // Fallback search in ALL_SPELLS if needed
    return ALL_SPELLS.filter(s => s.classes.includes(selectedClass))
  }, [selectedClass, character?.ruleset])

  const cantripsList = useMemo(() => {
    const list = classSpells.filter(s => s.level === 0)
    if (!searchTerm.trim()) return list
    const term = searchTerm.toLowerCase()
    return list.filter(s => s.name.toLowerCase().includes(term) || s.school.toLowerCase().includes(term))
  }, [classSpells, searchTerm])

  const level1List = useMemo(() => {
    const list = classSpells.filter(s => s.level === 1)
    if (!searchTerm.trim()) return list
    const term = searchTerm.toLowerCase()
    return list.filter(s => s.name.toLowerCase().includes(term) || s.school.toLowerCase().includes(term))
  }, [classSpells, searchTerm])

  if (!isFeatSpellsModalOpen || !selectedFeatForSpells) return null

  // Spellcasting stats preview
  const currentClassMeta = MAGIC_INITIATE_CLASSES.find(c => c.name === selectedClass)
  const stats = effectiveStats || character
  const attrScore = currentClassMeta ? (stats ? (stats as any)[currentClassMeta.attrKey] : 10) : 10
  const attrMod = calcModifier(attrScore)
  const pb = character?.proficiencyBonus || 2
  const spellDC = 8 + pb + attrMod
  const spellAtk = pb + attrMod

  const handleToggleCantrip = (spellId: string) => {
    if (selectedCantrips.includes(spellId)) {
      setSelectedCantrips(prev => prev.filter(id => id !== spellId))
    } else {
      if (selectedCantrips.length >= 2) {
        // Swap out the second cantrip for a smooth user experience
        setSelectedCantrips([selectedCantrips[0], spellId])
      } else {
        setSelectedCantrips(prev => [...prev, spellId])
      }
    }
  }

  const handleToggleLevel1 = (spellId: string) => {
    if (selectedLevel1 === spellId) {
      setSelectedLevel1(null)
    } else {
      setSelectedLevel1(spellId)
    }
  }

  const handleSave = async () => {
    if (!selectedClass) {
      alert('Por favor, selecione uma classe para o talento Iniciado em Magia.')
      return
    }
    if (selectedCantrips.length < 2 || !selectedLevel1) {
      const confirmIncomplete = confirm(
        `Você selecionou ${selectedCantrips.length}/2 truques e ${selectedLevel1 ? '1/1' : '0/1'} magia de 1º nível.\nDeseja salvar mesmo assim?`
      )
      if (!confirmIncomplete) return
    }

    setIsSaving(true)
    try {
      const chosenIds = [...selectedCantrips, selectedLevel1].filter(Boolean) as string[]
      await handleSaveFeatSpells(selectedFeatForSpells.name, selectedClass, chosenIds)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(8px)',
        padding: 16
      }}
      onClick={() => {
        setIsFeatSpellsModalOpen(false)
        setSelectedFeatForSpells(null)
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              background: 'var(--accentGlow)',
              border: '1px solid var(--accentL)',
              padding: 8,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Wand2 size={22} color="var(--accentL)" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 19, color: 'var(--fg)' }}>
                {selectedFeatForSpells.name}
              </h3>
              <span style={{ fontSize: 11, color: 'var(--fg2)' }}>
                Escolha a classe, 2 truques e 1 magia de 1º círculo
              </span>
            </div>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setIsFeatSpellsModalOpen(false)
              setSelectedFeatForSpells(null)
            }}
            style={{ padding: 8, borderRadius: '50%', color: 'var(--fg2)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Class Select Card */}
          <div style={{
            background: 'var(--card)',
            padding: 16,
            borderRadius: 12,
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                1. Selecione a Classe Conjuradora
              </label>
              {currentClassMeta && (
                <span style={{ fontSize: 11, color: 'var(--fg2)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>
                  Atributo Chave: <strong style={{ color: 'var(--accentL)' }}>{currentClassMeta.attr}</strong> ({attrMod >= 0 ? `+${attrMod}` : attrMod})
                </span>
              )}
            </div>

            <select
              value={selectedClass}
              onChange={(e) => {
                const nextClass = e.target.value
                setSelectedClass(nextClass)
                // Clear selected spells if switching class
                setSelectedCantrips([])
                setSelectedLevel1(null)
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                background: 'var(--bg2)',
                color: 'var(--fg)',
                border: '1px solid var(--border)',
                fontSize: 14,
                outline: 'none',
                cursor: 'pointer',
                colorScheme: 'dark'
              }}
            >
              <option value="">-- Escolha uma classe para o talento --</option>
              {MAGIC_INITIATE_CLASSES.map(cls => (
                <option key={cls.name} value={cls.name}>
                  {cls.name} (Atributo: {cls.attr})
                </option>
              ))}
            </select>

            {currentClassMeta && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 8,
                marginTop: 4,
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Atributo Chave</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{currentClassMeta.attr}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>CD de Resistência</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#f59e0b' }}>{spellDC}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800 }}>Ataque Mágico</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8' }}>{spellAtk >= 0 ? `+${spellAtk}` : spellAtk}</div>
                </div>
              </div>
            )}
          </div>

          {/* Spell Selection Section */}
          {!selectedClass ? (
            <div style={{
              textAlign: 'center',
              padding: '36px 20px',
              border: '1px dashed var(--border)',
              borderRadius: 12,
              color: 'var(--fg3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10
            }}>
              <BookOpen size={32} style={{ opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>
                Selecione uma classe acima para listar os truques e magias disponíveis.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              {/* Tabs & Search */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn"
                    onClick={() => setActiveTab('cantrips')}
                    style={{
                      height: 36,
                      fontSize: 12,
                      padding: '0 14px',
                      background: activeTab === 'cantrips' ? 'var(--accentGlow)' : 'var(--card)',
                      color: activeTab === 'cantrips' ? 'var(--accentL)' : 'var(--fg2)',
                      border: `1px solid ${activeTab === 'cantrips' ? 'var(--accentL)' : 'var(--border)'}`,
                      fontWeight: 700,
                      gap: 6
                    }}
                  >
                    <span>Truques</span>
                    <span style={{
                      fontSize: 10,
                      background: selectedCantrips.length === 2 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                      color: selectedCantrips.length === 2 ? '#4ade80' : 'inherit',
                      padding: '1px 6px',
                      borderRadius: 10,
                      fontWeight: 800
                    }}>
                      {selectedCantrips.length}/2
                    </span>
                  </button>

                  <button
                    className="btn"
                    onClick={() => setActiveTab('level1')}
                    style={{
                      height: 36,
                      fontSize: 12,
                      padding: '0 14px',
                      background: activeTab === 'level1' ? 'var(--accentGlow)' : 'var(--card)',
                      color: activeTab === 'level1' ? 'var(--accentL)' : 'var(--fg2)',
                      border: `1px solid ${activeTab === 'level1' ? 'var(--accentL)' : 'var(--border)'}`,
                      fontWeight: 700,
                      gap: 6
                    }}
                  >
                    <span>1º Círculo</span>
                    <span style={{
                      fontSize: 10,
                      background: selectedLevel1 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                      color: selectedLevel1 ? '#4ade80' : 'inherit',
                      padding: '1px 6px',
                      borderRadius: 10,
                      fontWeight: 800
                    }}>
                      {selectedLevel1 ? '1/1' : '0/1'}
                    </span>
                  </button>
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 280 }}>
                  <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }} />
                  <input
                    type="text"
                    placeholder={`Buscar em ${activeTab === 'cantrips' ? 'truques' : 'magias de 1º círculo'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      borderRadius: 8,
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--fg)',
                      fontSize: 12,
                      outline: 'none'
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg3)', cursor: 'pointer', padding: 4 }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Requirement Hint Banner */}
              <div style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8,
                fontSize: 11,
                color: 'var(--fg2)',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Sparkles size={14} color="var(--accentL)" />
                {activeTab === 'cantrips' ? (
                  <span>
                    Selecione <strong>2 truques</strong> de {selectedClass}. Eles podem ser conjurados à vontade.
                  </span>
                ) : (
                  <span>
                    Selecione <strong>1 magia de 1º círculo</strong> de {selectedClass}. Você pode conjurá-la 1 vez por descanso longo.
                  </span>
                )}
              </div>

              {/* Spells Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 10,
                maxHeight: 380,
                overflowY: 'auto',
                paddingRight: 4
              }}>
                {activeTab === 'cantrips' ? (
                  cantripsList.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', padding: 24, textAlign: 'center', color: 'var(--fg3)', fontSize: 13 }}>
                      Nenhum truque encontrado para a classe {selectedClass}.
                    </div>
                  ) : (
                    cantripsList.map(spell => {
                      const isSelected = selectedCantrips.includes(spell.id)
                      return (
                        <div
                          key={spell.id}
                          className="card"
                          onClick={() => handleToggleCantrip(spell.id)}
                          style={{
                            padding: 12,
                            background: isSelected ? 'var(--accentGlow)' : 'var(--card)',
                            border: `1px solid ${isSelected ? 'var(--accentL)' : 'var(--border)'}`,
                            borderRadius: 10,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                                {spell.name}
                              </div>
                              <span style={{ fontSize: 9, color: 'var(--accentL)', fontWeight: 700, textTransform: 'uppercase' }}>
                                {spell.school} • Truque
                              </span>
                            </div>
                            <div style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              border: `1px solid ${isSelected ? 'var(--accentL)' : 'var(--border)'}`,
                              background: isSelected ? 'var(--accentL)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {isSelected && <Check size={14} color="#000" strokeWidth={3} />}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--fg2)' }}>
                            <span><strong>Tempo:</strong> {spell.castingTime}</span>
                            <span><strong>Alcance:</strong> {spell.range}</span>
                          </div>

                          <p style={{
                            fontSize: 11,
                            color: 'var(--fg2)',
                            margin: 0,
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {spell.description}
                          </p>
                        </div>
                      )
                    })
                  )
                ) : (
                  level1List.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', padding: 24, textAlign: 'center', color: 'var(--fg3)', fontSize: 13 }}>
                      Nenhuma magia de 1º círculo encontrada para a classe {selectedClass}.
                    </div>
                  ) : (
                    level1List.map(spell => {
                      const isSelected = selectedLevel1 === spell.id
                      return (
                        <div
                          key={spell.id}
                          className="card"
                          onClick={() => handleToggleLevel1(spell.id)}
                          style={{
                            padding: 12,
                            background: isSelected ? 'var(--accentGlow)' : 'var(--card)',
                            border: `1px solid ${isSelected ? 'var(--accentL)' : 'var(--border)'}`,
                            borderRadius: 10,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                                {spell.name}
                              </div>
                              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                                <span style={{ fontSize: 9, color: 'var(--accentL)', fontWeight: 700, textTransform: 'uppercase' }}>
                                  {spell.school} • 1º Círculo
                                </span>
                                {spell.concentration && (
                                  <span style={{ fontSize: 8, background: '#a78bfa', color: '#000', padding: '0 4px', borderRadius: 2, fontWeight: 800 }}>
                                    CONC.
                                  </span>
                                )}
                                {spell.ritual && (
                                  <span style={{ fontSize: 8, background: '#fbbf24', color: '#000', padding: '0 4px', borderRadius: 2, fontWeight: 800 }}>
                                    RITUAL
                                  </span>
                                )}
                              </div>
                            </div>
                            <div style={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              border: `1px solid ${isSelected ? 'var(--accentL)' : 'var(--border)'}`,
                              background: isSelected ? 'var(--accentL)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {isSelected && <Check size={14} color="#000" strokeWidth={3} />}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--fg2)' }}>
                            <span><strong>Tempo:</strong> {spell.castingTime}</span>
                            <span><strong>Alcance:</strong> {spell.range}</span>
                          </div>

                          <p style={{
                            fontSize: 11,
                            color: 'var(--fg2)',
                            margin: 0,
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {spell.description}
                          </p>
                        </div>
                      )
                    })
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'var(--bg3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          {/* Summary Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 12 }}>
            <span style={{ color: 'var(--fg3)' }}>Resumo:</span>
            <span style={{
              background: selectedClass ? 'var(--accentGlow)' : 'rgba(255,255,255,0.05)',
              color: selectedClass ? 'var(--accentL)' : 'var(--fg3)',
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 700
            }}>
              Classe: {selectedClass || 'Não escolhida'}
            </span>
            <span style={{
              background: selectedCantrips.length === 2 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
              color: selectedCantrips.length === 2 ? '#4ade80' : 'var(--fg3)',
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 700
            }}>
              Truques: {selectedCantrips.length}/2
            </span>
            <span style={{
              background: selectedLevel1 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
              color: selectedLevel1 ? '#4ade80' : 'var(--fg3)',
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 700
            }}>
              1º Nível: {selectedLevel1 ? '1/1' : '0/1'}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setIsFeatSpellsModalOpen(false)
                setSelectedFeatForSpells(null)
              }}
              disabled={isSaving}
              style={{ fontSize: 13, height: 38 }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving || !selectedClass}
              style={{
                fontSize: 13,
                height: 38,
                padding: '0 20px',
                gap: 8,
                opacity: (!selectedClass || isSaving) ? 0.5 : 1
              }}
            >
              <Sparkles size={16} />
              {isSaving ? 'Salvando...' : 'Confirmar Magias'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

