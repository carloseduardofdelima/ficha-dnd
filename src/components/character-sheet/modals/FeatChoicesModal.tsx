'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { X, Sparkles, Check, Shield, Sword, Award, Flame, AlertCircle } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'
import { FEATS_2014 } from '@/lib/feats-2014'
import { calcModifier } from '@/types/character'

const ALL_ATTRIBUTES = [
  { key: 'strength', label: 'Força', abbr: 'FOR' },
  { key: 'dexterity', label: 'Destreza', abbr: 'DES' },
  { key: 'constitution', label: 'Constituição', abbr: 'CON' },
  { key: 'intelligence', label: 'Inteligência', abbr: 'INT' },
  { key: 'wisdom', label: 'Sabedoria', abbr: 'SAB' },
  { key: 'charisma', label: 'Carisma', abbr: 'CAR' },
]

const ELEMENTAL_TYPES = [
  { id: 'Fogo', name: 'Fogo', icon: '🔥' },
  { id: 'Frio', name: 'Frio', icon: '❄️' },
  { id: 'Elétrico', name: 'Elétrico', icon: '⚡' },
  { id: 'Ácido', name: 'Ácido', icon: '🧪' },
  { id: 'Trovão', name: 'Trovão', icon: '💥' },
]

const ALL_SKILLS = [
  { key: 'acrobatics', name: 'Acrobacia', attr: 'Destreza' },
  { key: 'animalHandling', name: 'Adestramento', attr: 'Sabedoria' },
  { key: 'arcana', name: 'Arcanismo', attr: 'Inteligência' },
  { key: 'athletics', name: 'Atletismo', attr: 'Força' },
  { key: 'performance', name: 'Atuação', attr: 'Carisma' },
  { key: 'deception', name: 'Enganação', attr: 'Carisma' },
  { key: 'stealth', name: 'Furtividade', attr: 'Destreza' },
  { key: 'history', name: 'História', attr: 'Inteligência' },
  { key: 'intimidation', name: 'Intimidação', attr: 'Carisma' },
  { key: 'insight', name: 'Intuição', attr: 'Sabedoria' },
  { key: 'investigation', name: 'Investigação', attr: 'Inteligência' },
  { key: 'medicine', name: 'Medicina', attr: 'Sabedoria' },
  { key: 'nature', name: 'Natureza', attr: 'Inteligência' },
  { key: 'perception', name: 'Percepção', attr: 'Sabedoria' },
  { key: 'persuasion', name: 'Persuasão', attr: 'Carisma' },
  { key: 'sleightOfHand', name: 'Prestidigitação', attr: 'Destreza' },
  { key: 'religion', name: 'Religião', attr: 'Inteligência' },
  { key: 'survival', name: 'Sobrevivência', attr: 'Sabedoria' },
]

const WEAPON_GROUPS = [
  {
    group: 'Armas Marciais Corpo a Corpo',
    items: [
      'Espada Longa', 'Espada Curta', 'Espada Grande', 'Rapieira', 'Cimitarra',
      'Machado de Batalha', 'Machado Grande', 'Alabarda', 'Glaive', 'Malho',
      'Martelo de Guerra', 'Mangual', 'Estrela da Manhã', 'Pique', 'Tridente',
      'Picareta de Guerra', 'Lança Montada', 'Chicote'
    ]
  },
  {
    group: 'Armas Marciais à Distância',
    items: [
      'Arco Longo', 'Besta de Mão', 'Besta Pesada', 'Zarabatana', 'Rede'
    ]
  },
  {
    group: 'Armas Simples Corpo a Corpo',
    items: [
      'Adaga', 'Lança', 'Maça', 'Machado de Mão', 'Martelo Leve', 'Bordão', 'Cajado',
      'Clava', 'Clava Grande', 'Foice Curta'
    ]
  },
  {
    group: 'Armas Simples à Distância',
    items: [
      'Arco Curto', 'Besta Leve', 'Dardo', 'Funda'
    ]
  }
]

export default function FeatChoicesModal() {
  const {
    isFeatChoicesModalOpen,
    setIsFeatChoicesModalOpen,
    selectedFeatForChoices,
    setSelectedFeatForChoices,
    character,
    handleSaveFeatChoices
  } = useCharacterSheet()

  const [chosenAttribute, setChosenAttribute] = useState<string>('')
  const [chosenAttributes, setChosenAttributes] = useState<string[]>([])
  const [asiMode, setAsiMode] = useState<'+2' | '+1+1'>('+2')
  const [chosenProficiencies, setChosenProficiencies] = useState<string[]>([])
  const [chosenDamageType, setChosenDamageType] = useState<string>('')
  const [chosenSkills, setChosenSkills] = useState<string[]>([])
  const [chosenExpertise, setChosenExpertise] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)

  // Find feat definition
  const featDef = useMemo(() => {
    if (!selectedFeatForChoices) return null
    const name = selectedFeatForChoices.name.toLowerCase()
    return FEATS_2014.find(f => f.name.toLowerCase() === name || f.id === selectedFeatForChoices.id)
  }, [selectedFeatForChoices])

  // Determine feat type / requirements
  const isASI = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('incremento') || name.includes('melhoria no valor') || featDef?.id === 'asi-2014' || featDef?.id === 'asi'
  }, [selectedFeatForChoices, featDef])

  const isWeaponMaster = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('mestre de armas') || featDef?.id === 'mestre-de-armas'
  }, [selectedFeatForChoices, featDef])

  const isResilient = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('resiliente') || featDef?.id === 'resiliente'
  }, [selectedFeatForChoices, featDef])

  const isElementalAdept = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('adepto elemental') || featDef?.id === 'adepto-elemental'
  }, [selectedFeatForChoices, featDef])

  const isSkillExpert = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('especialista em perícia') || featDef?.id === 'especialista-em-pericia'
  }, [selectedFeatForChoices, featDef])

  const isSkilled = useMemo(() => {
    if (!selectedFeatForChoices) return false
    const name = selectedFeatForChoices.name.toLowerCase()
    return name.includes('habilidoso') || featDef?.id === 'habilidoso'
  }, [selectedFeatForChoices, featDef])

  // Allowed attribute choices for half-feats
  const allowedAttributes = useMemo(() => {
    if (isASI || isResilient || isSkillExpert) {
      return ALL_ATTRIBUTES
    }
    if (featDef?.attributeBonus?.choice && featDef.attributeBonus.choice.length > 0) {
      const allowed = new Set(featDef.attributeBonus.choice)
      return ALL_ATTRIBUTES.filter(a => allowed.has(a.key))
    }
    // Fallback: check description for keywords
    if (selectedFeatForChoices) {
      const text = `${selectedFeatForChoices.description || ''} ${(featDef?.benefits || []).join(' ')}`.toLowerCase()
      if (text.includes('força ou destreza') || text.includes('for/des')) {
        return ALL_ATTRIBUTES.filter(a => a.key === 'strength' || a.key === 'dexterity')
      }
      if (text.includes('força ou constituição') || text.includes('for/con')) {
        return ALL_ATTRIBUTES.filter(a => a.key === 'strength' || a.key === 'constitution')
      }
      if (text.includes('inteligência ou sabedoria') || text.includes('int/sab')) {
        return ALL_ATTRIBUTES.filter(a => a.key === 'intelligence' || a.key === 'wisdom')
      }
      if (text.includes('inteligência, sabedoria ou carisma') || text.includes('int/sab/car')) {
        return ALL_ATTRIBUTES.filter(a => a.key === 'intelligence' || a.key === 'wisdom' || a.key === 'charisma')
      }
    }
    return ALL_ATTRIBUTES
  }, [isASI, isResilient, isSkillExpert, featDef, selectedFeatForChoices])

  const hasAttributeChoice = isASI || (featDef?.attributeBonus?.choice && featDef.attributeBonus.choice.length > 0) || isWeaponMaster || isResilient || isSkillExpert || allowedAttributes.length < 6

  // Initialize values when modal opens
  useEffect(() => {
    if (selectedFeatForChoices && isFeatChoicesModalOpen) {
      setChosenAttribute(selectedFeatForChoices.chosenAttribute || '')
      const prevAttrs: string[] = selectedFeatForChoices.chosenAttributes || []
      setChosenAttributes(prevAttrs)
      if (prevAttrs.length === 2 && prevAttrs[0] === prevAttrs[1]) {
        setAsiMode('+2')
      } else if (prevAttrs.length === 2) {
        setAsiMode('+1+1')
      } else if (prevAttrs.length === 1) {
        setAsiMode('+2')
      } else {
        setAsiMode('+2')
      }
      setChosenProficiencies(selectedFeatForChoices.chosenProficiencies || [])
      setChosenDamageType(selectedFeatForChoices.chosenDamageType || '')
      setChosenSkills(selectedFeatForChoices.chosenSkills || [])
      setChosenExpertise(selectedFeatForChoices.chosenExpertise || '')
    }
  }, [selectedFeatForChoices, isFeatChoicesModalOpen])

  if (!isFeatChoicesModalOpen || !selectedFeatForChoices) return null

  // Base stats without this feat
  const baseStats: Record<string, number> = {
    strength: character?.strength ?? 10,
    dexterity: character?.dexterity ?? 10,
    constitution: character?.constitution ?? 10,
    intelligence: character?.intelligence ?? 10,
    wisdom: character?.wisdom ?? 10,
    charisma: character?.charisma ?? 10,
  }

  const handleToggleWeapon = (wpn: string) => {
    if (chosenProficiencies.includes(wpn)) {
      setChosenProficiencies(prev => prev.filter(w => w !== wpn))
    } else {
      if (chosenProficiencies.length >= 4) {
        // Replace the last one
        setChosenProficiencies(prev => [...prev.slice(0, 3), wpn])
      } else {
        setChosenProficiencies(prev => [...prev, wpn])
      }
    }
  }

  const handleToggleSkill = (skillKey: string) => {
    const maxSkills = isSkillExpert ? 1 : 3
    if (chosenSkills.includes(skillKey)) {
      setChosenSkills(prev => prev.filter(s => s !== skillKey))
    } else {
      if (chosenSkills.length >= maxSkills) {
        setChosenSkills(prev => [...prev.slice(1), skillKey])
      } else {
        setChosenSkills(prev => [...prev, skillKey])
      }
    }
  }

  const handleSelectAsiAttribute = (attrKey: string) => {
    if (asiMode === '+2') {
      setChosenAttributes([attrKey, attrKey])
    } else {
      // +1 and +1
      if (chosenAttributes.includes(attrKey)) {
        setChosenAttributes(prev => prev.filter(a => a !== attrKey))
      } else {
        if (chosenAttributes.length >= 2) {
          setChosenAttributes([chosenAttributes[1], attrKey])
        } else {
          setChosenAttributes(prev => [...prev, attrKey])
        }
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const choices: any = {}
      if (isASI) {
        choices.chosenAttributes = chosenAttributes
      } else if (hasAttributeChoice) {
        choices.chosenAttribute = chosenAttribute
      }
      if (isWeaponMaster) {
        choices.chosenProficiencies = chosenProficiencies
      }
      if (isElementalAdept) {
        choices.chosenDamageType = chosenDamageType
      }
      if (isSkillExpert) {
        choices.chosenSkills = chosenSkills
        choices.chosenExpertise = chosenExpertise
      }
      if (isSkilled) {
        choices.chosenSkills = chosenSkills
      }

      await handleSaveFeatChoices(selectedFeatForChoices.name, choices)
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2100,
        backdropFilter: 'blur(8px)',
        padding: 16
      }}
      onClick={() => setIsFeatChoicesModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 620,
          maxHeight: '90vh',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 50px rgba(0, 0, 0, 0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), transparent)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px var(--accentGlow)'
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', fontFamily: 'Cinzel, serif' }}>
                Configurar: {selectedFeatForChoices.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg3)' }}>
                {selectedFeatForChoices.source || 'Livro do Jogador'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsFeatChoicesModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--fg3)',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 6
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: 20,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          flex: 1
        }}>

          {/* ASI Section */}
          {isASI && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase' }}>
                  Aumento de Habilidade
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAsiMode('+2')
                      if (chosenAttributes.length > 0) {
                        setChosenAttributes([chosenAttributes[0], chosenAttributes[0]])
                      }
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: asiMode === '+2' ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                      background: asiMode === '+2' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      color: asiMode === '+2' ? '#fff' : 'var(--fg2)'
                    }}
                  >
                    +2 em um Atributo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAsiMode('+1+1')
                      if (chosenAttributes.length === 2 && chosenAttributes[0] === chosenAttributes[1]) {
                        setChosenAttributes([chosenAttributes[0]])
                      }
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: asiMode === '+1+1' ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                      background: asiMode === '+1+1' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      color: asiMode === '+1+1' ? '#fff' : 'var(--fg2)'
                    }}
                  >
                    +1 em dois Atributos
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {ALL_ATTRIBUTES.map(attr => {
                  const currentScore = baseStats[attr.key] || 10
                  const isSelected = chosenAttributes.includes(attr.key)
                  const count = chosenAttributes.filter(a => a === attr.key).length
                  const bonus = count * (asiMode === '+2' ? 2 : 1)
                  const newScore = Math.min(20, currentScore + bonus)

                  return (
                    <div
                      key={attr.key}
                      onClick={() => handleSelectAsiAttribute(attr.key)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 8,
                        background: isSelected ? 'rgba(var(--accent-rgb), 0.15)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                          {attr.label}
                        </span>
                        {isSelected && (
                          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)', background: 'rgba(var(--accent-rgb), 0.25)', padding: '1px 6px', borderRadius: 4 }}>
                            +{bonus}
                          </span>
                        )}
                      </div>
                      <div style={{ marginTop: 6, fontSize: 12, color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{currentScore}</span>
                        {bonus > 0 && (
                          <>
                            <span>➔</span>
                            <span style={{ color: '#4ade80', fontWeight: 700 }}>
                              {newScore} ({calcModifier(newScore) >= 0 ? `+${calcModifier(newScore)}` : calcModifier(newScore)})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Single Attribute Choice (Half-Feats) */}
          {!isASI && hasAttributeChoice && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase' }}>
                  Aumento de Atributo (+1)
                </span>
                <span style={{ fontSize: 11, color: 'var(--fg3)' }}>
                  Máximo até 20
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: allowedAttributes.length <= 3 ? `repeat(${allowedAttributes.length}, 1fr)` : 'repeat(3, 1fr)', gap: 10 }}>
                {allowedAttributes.map(attr => {
                  const currentScore = baseStats[attr.key] || 10
                  const isSelected = chosenAttribute === attr.key
                  const newScore = isSelected ? Math.min(20, currentScore + 1) : currentScore

                  return (
                    <div
                      key={attr.key}
                      onClick={() => setChosenAttribute(attr.key)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 8,
                        background: isSelected ? 'rgba(var(--accent-rgb), 0.15)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                          {attr.label}
                        </span>
                        {isSelected && <Check size={14} color="var(--accentL)" />}
                      </div>
                      <div style={{ marginTop: 6, fontSize: 12, color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{currentScore}</span>
                        {isSelected && (
                          <>
                            <span>➔</span>
                            <span style={{ color: '#4ade80', fontWeight: 700 }}>
                              {newScore} ({calcModifier(newScore) >= 0 ? `+${calcModifier(newScore)}` : calcModifier(newScore)})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Resilient Saving Throw Notice */}
          {isResilient && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <Shield size={20} color="#60a5fa" />
              <div style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.4 }}>
                <strong style={{ color: '#60a5fa' }}>Salvaguarda Concedida: </strong>
                {chosenAttribute
                  ? `Você ganhará proficiência nos testes de resistência de ${ALL_ATTRIBUTES.find(a => a.key === chosenAttribute)?.label || chosenAttribute}.`
                  : 'Selecione um atributo acima para receber proficiência no seu teste de resistência.'}
              </div>
            </div>
          )}

          {/* Weapon Master 4 Weapons Choice */}
          {isWeaponMaster && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sword size={16} color="var(--accentL)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase' }}>
                    Proficiência com 4 Armas
                  </span>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: chosenProficiencies.length === 4 ? '#4ade80' : 'var(--accentL)',
                  background: chosenProficiencies.length === 4 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(var(--accent-rgb), 0.15)',
                  padding: '2px 8px',
                  borderRadius: 4
                }}>
                  {chosenProficiencies.length} / 4 selecionadas
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {WEAPON_GROUPS.map((group, gIdx) => (
                  <div key={gIdx}>
                    <div style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                      {group.group}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {group.items.map(wpn => {
                        const isSelected = chosenProficiencies.includes(wpn)
                        return (
                          <button
                            key={wpn}
                            type="button"
                            onClick={() => handleToggleWeapon(wpn)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: isSelected ? 700 : 500,
                              cursor: 'pointer',
                              border: isSelected ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                              background: isSelected ? 'rgba(var(--accent-rgb), 0.2)' : 'rgba(255,255,255,0.03)',
                              color: isSelected ? 'var(--accentL)' : 'var(--fg2)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isSelected && <Check size={12} color="var(--accentL)" />}
                            {wpn}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elemental Adept Choice */}
          {isElementalAdept && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Flame size={16} color="#f87171" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase' }}>
                  Tipo de Dano
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {ELEMENTAL_TYPES.map(elem => {
                  const isSelected = chosenDamageType === elem.name
                  return (
                    <button
                      key={elem.id}
                      type="button"
                      onClick={() => setChosenDamageType(elem.name)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 8,
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                        background: isSelected ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: isSelected ? '#f87171' : 'var(--fg2)',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: 12
                      }}
                    >
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{elem.icon}</div>
                      <div>{elem.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Skill Expert or Skilled Choice */}
          {(isSkillExpert || isSkilled) && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Award size={16} color="var(--accentL)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase' }}>
                    {isSkillExpert ? 'Proficiência em 1 Perícia' : 'Proficiência em 3 Perícias'}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--accentL)', fontWeight: 700 }}>
                  {chosenSkills.length} / {isSkillExpert ? 1 : 3}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {ALL_SKILLS.map(sk => {
                  const isSelected = chosenSkills.includes(sk.key)
                  return (
                    <div
                      key={sk.key}
                      onClick={() => handleToggleSkill(sk.key)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 6,
                        background: isSelected ? 'rgba(var(--accent-rgb), 0.15)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                          {sk.name}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--fg3)' }}>{sk.attr}</div>
                      </div>
                      {isSelected && <Check size={14} color="var(--accentL)" />}
                    </div>
                  )
                })}
              </div>

              {isSkillExpert && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)', marginBottom: 8, textTransform: 'uppercase' }}>
                    Especialização (Expertise - Dobro de Proficiência)
                  </div>
                  <select
                    value={chosenExpertise}
                    onChange={e => setChosenExpertise(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'var(--bg)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 8,
                      color: 'var(--fg)',
                      fontSize: 13
                    }}
                  >
                    <option value="">Selecione uma perícia para Especialização...</option>
                    {ALL_SKILLS.map(sk => (
                      <option key={sk.key} value={sk.key}>
                        {sk.name} ({sk.attr})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12,
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setIsFeatChoicesModalOpen(false)}
            style={{ fontSize: 13 }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '0 20px',
              height: 38,
              fontSize: 13,
              fontWeight: 700,
              gap: 8,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Check size={16} />
            {isSaving ? 'Salvando...' : 'Salvar Escolhas'}
          </button>
        </div>
      </div>
    </div>
  )
}

