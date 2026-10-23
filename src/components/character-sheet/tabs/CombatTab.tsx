'use client'

import React from 'react'
import { Heart, Zap, RotateCcw, Shield, Footprints, Info } from 'lucide-react'
import ResourceTracker from '@/components/ResourceTracker'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CombatTab() {
  const {
    id,
    character,
    setCharacter,
    isOwner,
    parsedTraits,
    currentProgression,
    ac,
    parsedInventory,
    selectedInfusions,
    parsedDefenses,
    updateValue,
  } = useCharacterSheet()

  if (!character) return null

  return (
    <div className="fade-up attributes-tab-container">
      <div className="resources-section">
        <h3 className="section-subtitle">Vida & Recursos</h3>
        <div className="resource-grid">
          {/* HP Section */}
          <div className="card compact-card hp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={16} color="var(--accent)" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Pontos de Vida</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{character.currentHp} <span style={{ color: 'var(--fg3)', fontSize: 14 }}>/ {character.maxHp}</span></div>
            </div>
            <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${(character.currentHp / character.maxHp) * 100}%`, height: '100%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && updateValue('currentHp', -1)} disabled={!isOwner}>-1</button>
              <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && updateValue('currentHp', 1)} disabled={!isOwner}>+1</button>
            </div>
          </div>

          {/* Resource Section */}
          {(() => {
            const slots: Record<string, number> = character.spellSlots ? JSON.parse(character.spellSlots as string) : {}
            const res: Record<string, number> = character.resources ? JSON.parse(character.resources as string) : {}

            const updateSlots = (level: number, newCount: number) => {
              const newSlots = { ...slots, [level]: newCount }
              updateValue('spellSlots', JSON.stringify(newSlots))
            }

            const updateRes = (name: string, newCount: number) => {
              const newRes = { ...res, [name]: newCount }
              updateValue('resources', JSON.stringify(newRes))
            }

            const getInitialResources = () => {
              const initial: any = {}
              const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
              const modCharisma = Math.floor((character.charisma - 10) / 2)
              const modIntelligence = Math.floor((character.intelligence - 10) / 2)
              const modWisdom = Math.floor((character.wisdom - 10) / 2)

              // Racial/Feat Features
              const hasLucky = parsedTraits?.['feat-lucky'] ||
                parsedTraits?.['feat-lucky-2014'] ||
                (typeof character.traits === 'string' && character.traits.includes('Sortudo'))

              if (hasLucky) {
                initial['Pontos de Sorte'] = { max: 3, current: 3, color: '#fbbf24' }
              }

              if (character.class === 'Bárbaro') {
                let rages = 2
                if (character.level >= 17) rages = 6
                else if (character.level >= 12) rages = 5
                else if (character.level >= 6) rages = 4
                else if (character.level >= 3) rages = 3
                if (is2014 && character.level === 20) rages = 99
                initial['Fúria'] = { max: rages, current: rages, color: '#f97316' }
              }

              if (character.class === 'Guerreiro') {
                let uses = is2014 ? 1 : 2
                if (!is2014 && character.level >= 10) uses = 4
                initial['Segundo Fôlego'] = { max: uses, current: uses, color: '#94a3b8' }
                if (character.level >= 2) {
                  initial['Surto de Ação'] = { max: 1, current: 1, color: '#94a3b8' }
                }
                
                // Subclasses 2014 (Disabled for 2014)
                if (character.subclass === 'Mestre de Batalha') {
                  let dice = 4
                  if (character.level >= 15) dice = 6
                  else if (character.level >= 7) dice = 5
                  initial['Dados de Superioridade'] = { max: dice, current: dice, color: '#b45309' }
                }
              }

              if (character.class === 'Monge' && character.level >= 2) {
                initial['Pontos de Foco'] = { max: character.level, current: character.level, color: '#facc15' }
                
                if (!is2014 && character.subclass === 'Caminho da Mão Aberta' && character.level >= 6) {
                  initial['Integridade Corporal'] = { max: 1, current: 1, color: '#10b981' }
                }
              }

              if (character.class === 'Bardo') {
                const maxInspiration = Math.max(1, modCharisma)
                initial['Inspiração Bárdica'] = { max: maxInspiration, current: maxInspiration, color: '#ec4899' }
              }

              if (character.class === 'Clérigo' && character.level >= 2) {
                const uses = character.level >= 18 ? 3 : (character.level >= 6 ? 2 : 1)
                initial['Canalizar Divindade'] = { max: uses, current: uses, color: '#facc15' }
                
                // Subclasses
                if (!is2014 && character.subclass === 'Domínio da Guerra') {
                  initial['Sacerdote da Guerra'] = { max: Math.max(1, modWisdom), current: Math.max(1, modWisdom), color: '#94a3b8' }
                }
                if (!is2014 && character.subclass === 'Domínio da Luz') {
                  initial['Labareda Protetora'] = { max: Math.max(1, modWisdom), current: Math.max(1, modWisdom), color: '#fbbf24' }
                }
                if (!is2014 && character.subclass === 'Domínio da Tempestade') {
                  initial['Ira da Tormenta'] = { max: Math.max(1, modWisdom), current: Math.max(1, modWisdom), color: '#3b82f6' }
                }
              }

              if (character.class === 'Druida' && character.level >= 2) {
                initial['Forma Selvagem'] = { max: 2, current: 2, color: '#22c55e' }
                
                if (!is2014 && character.subclass === 'Círculo da Terra') {
                  initial['Recuperação Natural'] = { max: 1, current: 1, color: '#22c55e' }
                }
              }

              if (character.class === 'Artífice') {
                const maxTinkering = Math.max(1, modIntelligence)
                initial['Engenharia Mágica'] = { max: maxTinkering, current: maxTinkering, color: '#06b6d4' }
                if (character.level >= 7) {
                  initial['Brilho de Gênio'] = { max: maxTinkering, current: maxTinkering, color: '#06b6d4' }
                }
                if (character.level >= 2) {
                  let maxInfused = 2
                  if (character.level >= 18) maxInfused = 6
                  else if (character.level >= 14) maxInfused = 5
                  else if (character.level >= 10) maxInfused = 4
                  else if (character.level >= 6) maxInfused = 3

                  if (!is2014 && character.subclass === 'Armeiro') {
                    if (character.level >= 10) {
                      maxInfused += 2
                    }
                  }
                  initial['Itens Infundidos Ativos'] = { max: maxInfused, current: maxInfused, color: '#06b6d4' }
                }
              }

              if (character.class === 'Paladino') {
                initial['Mãos Curativas'] = { max: character.level * 5, current: character.level * 5, color: '#facc15' }
                initial['Sentido Divino'] = { max: Math.max(1, 1 + modCharisma), current: Math.max(1, 1 + modCharisma), color: '#facc15' }
              }

              if (character.class === 'Feiticeiro' && character.level >= 1) {
                if (!is2014) {
                  initial['Conjuração Inata'] = { max: 2, current: 2, color: '#c084fc' }
                }
                if (character.level >= 2) {
                  initial['Pontos de Feitiçaria'] = { max: character.level, current: character.level, color: '#c084fc' }
                }
                
                if (!is2014 && character.subclass === 'Magia Selvagem') {
                  initial['Marés de Caos'] = { max: 1, current: 1, color: '#f97316' }
                }
              }

              if (character.class === 'Mago') {
                initial['Recuperação Arcana'] = { max: 1, current: 1, color: '#3b82f6' }
                initial['Memória Arcana'] = { max: 1, current: 1, color: '#3b82f6' }
                
                if (!is2014 && character.subclass === 'Escola de Adivinhação') {
                  initial['Dados de Portento'] = { max: character.level >= 14 ? 3 : 2, current: character.level >= 14 ? 3 : 2, color: '#3b82f6' }
                }
              }

              if (character.class === 'Patrulheiro' && !is2014) {
                initial['Marca do Caçador'] = { max: character.proficiencyBonus, current: character.proficiencyBonus, color: '#22c55e' }
              }

              if (character.class === 'Bruxo' && character.level >= 2 && !is2014) {
                initial['Astúcia Mística (Magical Cunning)'] = { max: 1, current: 1, color: '#c084fc' }
              }

              if (character.class === 'Bruxo' && is2014) {
                if (!is2014 && character.subclass === 'O Corruptor' && character.level >= 6) {
                  initial["Sorte do Próprio Obscuro"] = { max: 1, current: 1, color: '#ef4444' }
                }
                if (!is2014 && character.subclass === 'A Arquifada') {
                  initial["Presença Feérica"] = { max: 1, current: 1, color: '#ec4899' }
                }
              }

              if (character.class === 'Clérigo' && character.level >= 10 && !is2014) {
                initial['Intervenção Divina'] = { max: 1, current: 1, color: '#facc15' }
              }

              if (character.class === 'Guerreiro' && character.level >= 9) {
                let uses = 1
                if (character.level >= 17) uses = 3
                else if (character.level >= 13) uses = 2
                initial['Indomável'] = { max: uses, current: uses, color: '#94a3b8' }
              }

              return initial
            }

            const classResources = getInitialResources()
            const isSpellcaster = ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro', 'Bruxo', 'Artífice'].includes(character.class) ||
              (character.class === 'Guerreiro' && character.subclass === 'Cavaleiro Arcano') ||
              (character.class === 'Ladino' && character.subclass === 'Trapaceiro Arcano')

            return (
              <div className="card compact-card resources-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Zap size={16} color="var(--accent)" />
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Recursos & Magia</span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '6px', fontSize: 11 }} disabled={!isOwner} onClick={async () => {
                    if (!isOwner) return
                    const resetSlots: Record<string, number> = {}
                    if (isSpellcaster && currentProgression) {
                      currentProgression.slots.forEach((s: number, i: number) => {
                        if (s > 0) resetSlots[(i + 1).toString()] = s
                      })
                    }
                    const resetRes: Record<string, number> = {}
                    Object.keys(classResources).forEach(k => { resetRes[k] = classResources[k].max })

                    const update = {
                      ...character,
                      currentHp: character.maxHp,
                      spellSlots: JSON.stringify(resetSlots),
                      resources: JSON.stringify(resetRes)
                    }
                    setCharacter(update as any)
                    localStorage.setItem(`char_stats_${id}`, JSON.stringify({
                      currentHp: update.currentHp, maxHp: update.maxHp,
                      spellSlots: update.spellSlots, resources: update.resources
                    }))
                  }}><RotateCcw size={14} /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {isSpellcaster && currentProgression && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {currentProgression.slots.map((max: number, idx: number) => {
                        if (max === 0) return null
                        const lvl = idx + 1
                        return (
                          <ResourceTracker
                            key={lvl}
                            label={character.class === 'Bruxo' ? `Espaços de Pacto (${currentProgression.slot_level}º Nível)` : `Espaços de Magia (Nível ${lvl})`}
                            max={max}
                            current={slots[lvl.toString()] ?? max}
                            onChange={(val) => updateSlots(lvl, val)}
                          />
                        )
                      })}
                    </div>
                  )}
                  {Object.keys(classResources).map(name => (
                    <ResourceTracker
                      key={name} label={name} max={classResources[name].max}
                      current={res[name] ?? classResources[name].max}
                      onChange={(val) => updateRes(name, val)}
                      color={classResources[name].color}
                    />
                  ))}
                  {!isSpellcaster && Object.keys(classResources).length === 0 && (
                    <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic', textAlign: 'center', padding: '12px 0' }}>
                      Nenhum recurso especial.
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      <div className="combat-stats-row">
        <div className="stat-card">
          <div className="stat-label" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', outline: 'none' }} data-tooltip="Define o quão difícil é para um inimigo te acertar em combate. Baseia-se na sua armadura e agilidade (Destreza).">
            CLASSE DE ARMADURA <Info size={12} style={{ opacity: 0.6, flexShrink: 0 }} />
          </div>
          {(() => {
            const acRef = ac

            const inv = parsedInventory
            const dexMod = Math.floor((character.dexterity - 10) / 2)
            const conMod = Math.floor((character.constitution - 10) / 2)
            const wisMod = Math.floor((character.wisdom - 10) / 2)
            const armors = inv.filter(e => e.item.category === 'armor' && e.item.armorType !== 'shield' && e.isEquipped)
            const baseArmor = armors.length > 0 ? armors[0].item : null
            const shield = inv.find(e => e.item.category === 'armor' && e.item.armorType === 'shield' && e.isEquipped)

            const parts = []
            if (baseArmor) {
              parts.push(`${baseArmor.name}: ${baseArmor.ac}`)
              if (baseArmor.armorType === 'light') parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`)
              else if (baseArmor.armorType === 'medium') parts.push(`Des (máx 2): ${Math.min(dexMod, 2) >= 0 ? '+' : ''}${Math.min(dexMod, 2)}`)
            } else {
              const isDraconic = parsedTraits?.['sorcerous-origin-2014'] === 'orig-draconic' || parsedTraits?.['sorcerous-origin'] === 'draconic'
              const baseAC = isDraconic ? 13 : 10
              parts.push(`Base: ${baseAC}`)
              parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`)
              if (character.class === 'Bárbaro') parts.push(`Con: ${conMod >= 0 ? '+' : ''}${conMod}`)
              else if (character.class === 'Monge') parts.push(`Sab: ${wisMod >= 0 ? '+' : ''}${wisMod}`)
            }
            if (shield) parts.push(`${shield.item.name}: +${shield.item.ac}`)
            if (selectedInfusions.includes('defesa_aprimorada')) {
              const bonus = character.level >= 10 ? 2 : 1
              parts.push(`Defesa Aprimorada: +${bonus}`)
            }
            if (selectedInfusions.includes('escudo_repulsao')) {
              parts.push(`Escudo de Repulsão: +1`)
            }
            const acInfo = parts.join(' + ')

            return (
              <>
                <div className="stat-value-box">
                  <div className="stat-value">{acRef}</div>
                  <Shield size={20} color="var(--fg2)" />
                </div>
                <div className="stat-subtext">{acInfo}</div>
              </>
            )
          })()}
        </div>

        <div className="stat-card">
          <div className="stat-label" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', outline: 'none' }} data-tooltip="A distância total em metros que você pode percorrer em um único turno de combate.">
            DESLOCAMENTO (m) <Info size={12} style={{ opacity: 0.6, flexShrink: 0 }} />
          </div>
          <div className="stat-value-box">
            <div className="stat-value">{Math.round((character.speed / 5) * 1.5)}</div>
            <Footprints size={20} color="var(--fg2)" />
          </div>
          <div className="stat-subtext" style={{ opacity: 0 }}>Metros</div>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg2)', padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Shield size={16} color="var(--accent)" />
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Defesas & Resistências</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(() => {
            const defs = [...parsedDefenses]
            // Racial fallbacks
            if (character.race.includes('Tiefling')) {
              if (character.subrace?.includes('Abissal') && !defs.some(d => (d as any).value === 'Veneno')) {
                defs.push({ value: 'Veneno', type: 'resistance', detail: 'Raça' })
              } else if (character.subrace?.includes('Ctônico') && !defs.some(d => (d as any).value === 'Necrótico')) {
                defs.push({ value: 'Necrótico', type: 'resistance', detail: 'Raça' })
              } else if ((!character.subrace || character.subrace.includes('Infernal')) && !defs.some(d => (d as any).value === 'Fogo')) {
                defs.push({ value: 'Fogo', type: 'resistance', detail: 'Raça' })
              }
            }
            if (character.race.includes('Anão') && !defs.some(d => (d as any).value === 'Veneno')) {
              defs.push({ value: 'Veneno', type: 'resistance', detail: 'Raça' })
            }
            if (character.race.includes('Draconato')) {
              const match = character.subrace?.match(/\(([^)]+)\)/)
              let type = match ? match[1] : null

              if (!type && character.subrace) {
                if (/Vermelh|Ouro|Latão/i.test(character.subrace)) type = 'Fogo'
                else if (/Azul|Bronze/i.test(character.subrace)) type = 'Elétrico'
                else if (/Negra|Cobre/i.test(character.subrace)) type = 'Ácido'
                else if (/Prata|Branca/i.test(character.subrace)) type = 'Frio'
                else if (/Verde/i.test(character.subrace)) type = 'Veneno'
              }

              if (type && !defs.some(d => (d as any).value === type)) {
                defs.push({ value: type, type: 'resistance', detail: 'Raça' })
              }
            }

            if (defs.length === 0) return <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma resistência especial registrada.</div>

            return defs.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6,
                background: d.type === 'immunity' || d.type === 'Imunidade' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)',
                border: `1px solid ${d.type === 'immunity' || d.type === 'Imunidade' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'}`,
                fontSize: 11
              }}>
                <span style={{ fontWeight: 700, color: d.type === 'immunity' || d.type === 'Imunidade' ? '#4ade80' : '#60a5fa' }}>
                  {d.type === 'immunity' || d.type === 'Imunidade' ? 'Imunidade' : 'Resistência'}:
                </span>
                <span>{d.value}</span>
                {d.detail && <span style={{ fontSize: 9, opacity: 0.6 }}>({d.detail})</span>}
              </div>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}
