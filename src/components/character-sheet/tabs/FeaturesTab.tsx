'use client'

import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { RACES } from '@/lib/races'
import { RACES_2014 } from '@/lib/races-2014'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { BACKGROUNDS_2014 } from '@/lib/backgrounds-2014'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { CLASS_LEVEL1_DATA_2014 } from '@/lib/class-features-2014'
import { CLASS_PROGRESSION_2024 } from '@/lib/dnd-progression-2024'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { getFeatureDescription } from '@/lib/features'
import { CLASSES } from '@/lib/classes'
import { CLASSES_2014 } from '@/lib/classes-2014'
import { BEAST_FORMS } from '@/lib/beast-forms'
import { SUBCLASS_EXCLUDED_FEATURES_2014 } from '../utils/subclass-spells'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function FeaturesTab() {
  const {
    id,
    character,
    isOwner,
    parsedTraits,
    selectedInfusions,
    setSelectedInfusions,
    setSelectedBeast,
    setDetailFeature,
    setIsFeatModalOpen,
    handleRemoveFeat,
  } = useCharacterSheet()

  if (!character) return null

  const is2014 = character.ruleset === '2014' || character.ruleset === '5e-custom'
  const characterClass = is2014
    ? CLASSES_2014.find(c => c.name === character.class)
    : CLASSES.find(c => c.name === character.class)

  return (
    <div className="fade-up">
      <div className="features-header">
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Habilidades & Características</h2>
        {isOwner && (
          <button
            className="btn btn-primary"
            style={{ height: 40, fontSize: 13, gap: 6 }}
            onClick={() => setIsFeatModalOpen(true)}
          >
            <Plus size={16} />
            Adicionar Talento
          </button>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
          {(() => {
            const race = RACES.find(r => r.name === character.race)
            const subTitle = race?.subRaceTitle || 'Sub-raça'
            return (
              <>
                Raça: {character.race}
                {character.subrace && (
                  <div style={{ fontSize: 13, color: 'var(--fg2)', textTransform: 'none', fontWeight: 500, marginTop: 4 }}>
                    {subTitle}: {character.subrace}
                  </div>
                )}
              </>
            )
          })()}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(() => {
            const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
            const raceData = is2014
              ? RACES_2014.find(r => r.name === character.race)
              : RACES.find(r => r.name === character.race)

            const raceTraits = raceData?.traits || []

            // If it's a subrace, add subrace traits too for 2014
            let allTraits: any[] = []
            if (character.race === 'Draconato' && character.subrace && raceData?.lineages) {
              const lineage = raceData.lineages.find(l => l.name === character.subrace)
              if (lineage) {
                allTraits = [...lineage.traits]
              }
            } else {
              allTraits = [...raceTraits]
              if (is2014 && character.subrace && raceData?.lineages) {
                const lineage = raceData.lineages.find(l => l.name === character.subrace)
                if (lineage) {
                  allTraits = [...allTraits, ...lineage.traits]
                }
              }
            }

            // Filter out attribute increase traits and merge duplicate names (like Arma de Sopro)
            const traitMap = new Map<string, string>()
            allTraits.forEach(t => {
              if (t.name.includes('+')) return
              let desc = t.description
              if (character.race === 'Draconato' && t.name === 'Arma de Sopro') {
                desc = `Você usa sua ação para exalar energia destrutiva. O dano é de 2d6 (aumentando para 3d6 no nível 6, 4d6 no nível 11 e 5d6 no nível 16), sofrendo metade em caso de sucesso no teste de salvaguarda. Área/Resistência: ${t.description} Recarrega com um descanso curto ou longo.`
              }
              const existing = traitMap.get(t.name)
              if (existing) {
                traitMap.set(t.name, `${existing} ${desc}`)
              } else {
                traitMap.set(t.name, desc)
              }
            })

            const filteredTraits = Array.from(traitMap.entries()).map(([name, description]) => ({
              name,
              description
            }))

            return filteredTraits.map((trait, i) => (
              <div
                key={i}
                className="card clickable"
                style={{ padding: 16, background: 'var(--bg2)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => setDetailFeature({ ...trait, source: 'Raça', level: 1 })}
              >
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{trait.name}</div>
                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {trait.description}
                </p>
              </div>
            ))
          })()}
        </div>
      </div>

      {/* Background Feature */}
      {(() => {
        const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
        const backgroundName = character.background
        if (!backgroundName) return null

        const bg = (is2014 ? BACKGROUNDS_2014 : BACKGROUNDS).find(b =>
          b.name.toLowerCase().trim() === backgroundName.toLowerCase().trim() ||
          b.id.toLowerCase() === backgroundName.toLowerCase().trim()
        )

        if (!bg) return null
        return (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
              Antecedente: {backgroundName}
            </h3>
            <div
              className="card clickable"
              style={{ padding: 16, background: 'var(--bg2)', borderLeft: '2px solid var(--border)', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setDetailFeature({ ...bg.feature, source: 'Antecedente', level: 1 })}
            >
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{bg.feature.name}</div>
              <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {bg.feature.description}
              </p>
            </div>
          </div>
        )
      })()}

      {/* Classe Base Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
          Classe: {character.class}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(() => {
            const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
            const level1Data = is2014 ? CLASS_LEVEL1_DATA_2014 : CLASS_LEVEL1_DATA
            const features: any[] = []

            // 1. Habilidades Passivas Iniciais
            level1Data[character.class]?.passiveFeatures.forEach((feat: any) => {
              features.push({ ...feat, source: 'Classe Base', level: feat.level || 1 })
            })

            // 2. Escolhas de Nível 1 (2014) - Importante para Inimigo Favorito, Estilo de Luta, etc.
            if (is2014 && level1Data[character.class]?.choices) {
              level1Data[character.class].choices.forEach((choice: any) => {
                const selectedId = parsedTraits[choice.id]
                if (selectedId) {
                  const selectedIds = Array.isArray(selectedId) ? selectedId : [selectedId]
                  selectedIds.forEach((sid: string) => {
                    const option = choice.options.find((opt: any) => opt.id === sid)
                    if (option) {
                      features.push({
                        name: `${choice.label}: ${option.name}`,
                        description: option.description,
                        source: 'Classe (Escolha)',
                        level: 1
                      })
                    }
                  })
                }
              })
            }

            // 3. Progressão de Nível
            for (let lvl = 1; lvl <= character.level; lvl++) {
              // Base Class Features
              const classFeats = is2014
                ? (characterClass?.features.filter((f: any) => f.level === lvl).map((f: any) => f.name) || [])
                : (CLASS_PROGRESSION_2024[character.class]?.features[lvl] || [])

              classFeats.forEach((f: string) => {
                if (is2014 && SUBCLASS_EXCLUDED_FEATURES_2014.has(f)) {
                  return
                }
                // Avoid duplicates if already added in passiveFeatures or as a Choice (Choice names usually start with the feature name)
                if (!features.some(ex => ex.name === f || ex.name.startsWith(`${f}:`))) {
                  const baseFeat = characterClass?.features.find((feat: any) => feat.name === f)
                  features.push({
                    name: f,
                    description: baseFeat?.description || getFeatureDescription(f),
                    source: 'Classe Base',
                    level: lvl
                  })
                }
              })
            }

            return features
              .filter(feat => feat.level <= character.level)
              .map((feat, i) => (
                <div
                  key={`${feat.name}-${i}`}
                  className="card clickable"
                  style={{
                    padding: 16,
                    background: 'var(--bg2)',
                    borderLeft: `3px solid var(--border)`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setDetailFeature(feat)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>
                      {feat.name}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--fg3)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Nível {feat.level}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {feat.description}
                  </p>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <span style={{ fontSize: 10, color: 'var(--fg4)', fontWeight: 700 }}>
                      {feat.source}
                    </span>
                  </div>
                </div>
              ))
          })()}
        </div>
      </div>

      {/* Subclass Section */}
      {character.subclass && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
            Subclasse: {character.subclass}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(() => {
              const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
              const subclassSource = is2014 ? SUBCLASSES_2014 : SUBCLASSES_2024
              const subfeatures: any[] = []

              if (subclassSource[character.class]?.[character.subclass]) {
                for (let lvl = 1; lvl <= character.level; lvl++) {
                  const subFeats = subclassSource[character.class][character.subclass].features[lvl] || []
                  subFeats.forEach((sf: any) => {
                    subfeatures.push({ ...sf, source: character.subclass, level: lvl })
                  })
                }
              }

              if (subfeatures.length === 0) {
                return <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic', padding: 8 }}>Nenhuma habilidade de subclasse desbloqueada no nível {character.level} ainda.</div>
              }

              return subfeatures
                .map((feat, i) => (
                  <div
                    key={`${feat.name}-${i}`}
                    className="card clickable"
                    style={{
                      padding: 16,
                      background: 'var(--bg2)',
                      borderLeft: `3px solid var(--border)`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setDetailFeature(feat)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>
                        {feat.name}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--fg3)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Nível {feat.level}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {feat.description}
                    </p>
                    <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {feat.source}
                      </span>
                    </div>
                  </div>
                ))
            })()}
          </div>
        </div>
      )}

      {/* Forma Selvagem (Bestiário) */}
      {character.class === 'Druida' && character.level >= 2 && (
        <div style={{ marginBottom: 24, marginTop: 24 }}>
          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
            Forma Selvagem (Bestiário)
          </h3>
          <p style={{ fontSize: 11, color: 'var(--fg3)', marginBottom: 16 }}>
            De acordo com as regras de 2014, você pode se transformar em feras que já viu.{' '}
            {character.subclass === 'Círculo da Lua' 
              ? 'Como Druida do Círculo da Lua, você pode assumir formas de ND muito maior (ND 1 no nível 2, ou Nível/3 a partir do nível 6).'
              : 'Seu ND máximo para formas selvagens é 1/4 no nível 2, 1/2 no nível 4 e 1 no nível 8.'
            }{' '}
            {character.level < 4 && 'Limitações atuais: Sem voo e sem natação.'}
            {character.level >= 4 && character.level < 8 && 'Limitações atuais: Sem voo (Natação permitida).'}
            {character.level >= 8 && 'Nenhuma limitação de movimentação (Voo e Natação permitidos).'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {(() => {
              const isMoon = character.subclass === 'Círculo da Lua'
              const lvl = character.level
              
              const available = BEAST_FORMS.filter(beast => {
                if (beast.moonOnly && !isMoon) return false
                if (beast.minLevel && lvl < beast.minLevel) return false
                if (beast.fly && lvl < 8) return false
                if (beast.swim && lvl < 4) return false

                if (isMoon) {
                  const maxCr = lvl >= 6 ? Math.floor(lvl / 3) : 1
                  return beast.crVal <= maxCr
                } else {
                  const maxCr = lvl >= 8 ? 1.0 : (lvl >= 4 ? 0.5 : 0.25)
                  return beast.crVal <= maxCr
                }
              })

              if (available.length === 0) {
                return <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma fera disponível.</div>
              }

              return available.map((beast, idx) => (
                <div
                  key={idx}
                  className="card clickable"
                  onClick={() => setSelectedBeast(beast)}
                  style={{
                    padding: 16,
                    background: 'var(--bg2)',
                    borderLeft: '3px solid var(--accent)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{beast.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--accentL)', fontWeight: 800, background: 'var(--accentGlow)', padding: '2px 6px', borderRadius: 4 }}>
                      ND {beast.cr}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: 'var(--fg3)' }}>
                    <div><strong>PV:</strong> {beast.hp}</div>
                    <div><strong>CA:</strong> {beast.ac}</div>
                    <div><strong>Desl.:</strong> {beast.speed}</div>
                    {beast.swim && <div><strong>Natação:</strong> Sim</div>}
                    {beast.fly && <div><strong>Voo:</strong> Sim</div>}
                  </div>

                  <div style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.4 }}>
                    <strong>Ataques:</strong> {beast.attacks}
                  </div>

                  <div style={{ fontSize: 12, color: 'var(--fg3)', lineHeight: 1.4, fontStyle: 'italic' }}>
                    <strong>Características:</strong> {beast.features}
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      )}

      {/* Artificer Infusions Selection */}
      {character?.class === 'Artífice' && character.level >= 2 && (
        <div style={{ marginBottom: 24, marginTop: 24 }}>
          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
            Infusões de Artífice (Escolha {(() => {
              const lvl = character.level
              if (lvl < 6) return 4
              if (lvl < 10) return 6
              if (lvl < 14) return 8
              if (lvl < 18) return 10
              return 12
            })()})
          </h3>
          <p style={{ fontSize: 11, color: 'var(--fg3)', marginBottom: 12 }}>
            Você pode infundir até {character.level < 6 ? 2 : character.level < 10 ? 3 : character.level < 14 ? 4 : character.level < 18 ? 5 : 6} itens ativos simultaneamente (escolhidos ao final de um descanso longo).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: 'defesa_aprimorada', name: 'Defesa Aprimorada', item: 'Armadura/Escudo', req: 2, desc: 'Concede +1 de bônus na CA (+2 no nível 10).' },
              { id: 'arma_aprimorada', name: 'Arma Aprimorada', item: 'Arma', req: 2, desc: 'Concede +1 de bônus em rolagens de ataque e dano mágicos (+2 no nível 10).' },
              { id: 'tiro_repetitivo', name: 'Tiro Repetitivo', item: 'Arma de Ataque à Distância', req: 2, desc: '+1 em ataque/dano, gera munição mágica infinita e ignora propriedade de recarga.' },
              { id: 'foco_aprimorado', name: 'Foco Arcano Aprimorado', item: 'Foco Arcano', req: 2, desc: 'Concede +1 em ataques de magia e ignora meia cobertura.' },
              { id: 'arma_retornavel', name: 'Arma Retornável', item: 'Arma de Arremesso', req: 2, desc: '+1 em ataque/dano e retorna para sua mão imediatamente após ser arremessada.' },
              { id: 'mente_afiada', name: 'Mente Afiada (Mind Sharpener)', item: 'Armadura/Veste', req: 2, desc: 'Permite gastar 1 carga (máx 4) para passar automaticamente em testes de concentração para manter magia.' },
              { id: 'servo_homunculo', name: 'Servo Homúnculo', item: 'Item com Gema de 100po', req: 2, desc: 'Cria um homúnculo mecânico servo obediente sob seu comando.' },
              { id: 'item_replicado', name: 'Réplica de Item Mágico', item: 'Item Comum/Incomum', req: 2, desc: 'Cria uma réplica de um item mágico menor (ex: Bolsa de Carga, Botas de Saltar).' },
              { id: 'armadura_resistencia', name: 'Armadura de Resistência', item: 'Armadura', req: 6, desc: 'Escolha um tipo de dano (Ácido, Frio, Fogo, Relâmpago, Trovão, etc.) para ganhar resistência.' },
              { id: 'arma_radiante', name: 'Arma Radiante', item: 'Arma', req: 6, desc: '+1 de bônus mágico, emite luz e pode usar reação para cegar um oponente.' },
              { id: 'escudo_repulsao', name: 'Escudo de Repulsão', item: 'Escudo', req: 6, desc: '+1 na CA e permite empurrar um atacante a 4,5 metros de distância como reação.' },
              { id: 'elmo_alerta', name: 'Elmo de Alerta', item: 'Elmo', req: 10, desc: 'Vantagem em testes de iniciativa e impede que o usuário seja surpreendido.' }
            ].map(opt => {
              const isSelected = selectedInfusions.includes(opt.id)
              const isReqMet = character.level >= opt.req
              const limit = (() => {
                const lvl = character.level
                if (lvl < 6) return 4
                if (lvl < 10) return 6
                if (lvl < 14) return 8
                if (lvl < 18) return 10
                return 12
              })()
              return (
                <div
                  key={opt.id}
                  className="card"
                  onClick={() => {
                    if (!isReqMet) {
                      alert(`Esta infusão requer nível ${opt.req} de Artífice!`)
                      return
                    }
                    let newSel = [...selectedInfusions]
                    if (isSelected) {
                      newSel = newSel.filter(id => id !== opt.id)
                    } else {
                      if (newSel.length >= limit) {
                        alert(`Você já selecionou o limite máximo de ${limit} infusões conhecidas!`)
                        return
                      }
                      newSel.push(opt.id)
                    }
                    setSelectedInfusions(newSel)
                    localStorage.setItem(`selected_infusions_${id}`, JSON.stringify(newSel))
                  }}
                  style={{
                    padding: 14,
                    cursor: isReqMet ? 'pointer' : 'not-allowed',
                    opacity: isReqMet ? 1 : 0.4,
                    background: isSelected ? 'var(--accentGlow)' : 'rgba(255,255,255,0.01)',
                    borderColor: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    borderLeft: isSelected ? '3px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: isSelected ? 'var(--fg)' : 'var(--fg2)' }}>{opt.name}</span>
                    <span style={{ fontSize: 9, color: isReqMet ? 'var(--fg3)' : 'var(--danger)', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>
                      {isReqMet ? opt.item : `Nível ${opt.req}`}
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

      {/* Talentos (Feats) */}
      <div style={{ marginBottom: 24, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
            Talentos
          </h3>
        </div>

        {(() => {
          const feats = parsedTraits?.feats || []
          if (feats.length === 0) {
            return (
              <div className="card" style={{ padding: 16, background: 'var(--bg2)', border: '1px dashed var(--border)', textAlign: 'center', color: 'var(--fg3)', fontSize: 13, fontStyle: 'italic' }}>
                Nenhum talento selecionado.
              </div>
            )
          }

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {feats.map((feat: any, i: number) => {
                const featSource = feat.source || ((character?.ruleset === '2014' || character?.ruleset === '5e-custom') ? 'Livro do Jogador (2014)' : "Player's Handbook (2024)")
                return (
                  <div
                    key={i}
                    className="card clickable"
                    style={{ padding: 16, background: 'var(--bg2)', borderLeft: '3px solid var(--ok)', cursor: 'pointer', transition: 'transform 0.2s', position: 'relative' }}
                    onClick={() => setDetailFeature({ ...feat, source: featSource, level: undefined })}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{feat.name}</div>
                        <span style={{ display: 'inline-block', fontSize: 8, color: 'var(--accentL)', fontWeight: 800, textTransform: 'uppercase', background: 'var(--accentGlow)', padding: '1px 4px', borderRadius: 3, marginTop: 2 }}>
                          {featSource}
                        </span>
                      </div>
                      {isOwner && (
                        <button
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm(`Deseja remover o talento ${feat.name}?`)) {
                              handleRemoveFeat(feat.name)
                            }
                          }}
                        >
                          <Trash2 size={14} color="var(--danger)" />
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {feat.description}
                    </p>
                  </div>
                )
              })}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
