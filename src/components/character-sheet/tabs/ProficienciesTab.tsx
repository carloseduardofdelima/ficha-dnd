'use client'

import React from 'react'
import { Brain, Shield, Settings } from 'lucide-react'
import { RACES } from '@/lib/races'
import { RACES_2014 } from '@/lib/races-2014'
import { CLASSES } from '@/lib/classes'
import { CLASSES_2014 } from '@/lib/classes-2014'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { BACKGROUNDS_2014 } from '@/lib/backgrounds-2014'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function ProficienciesTab() {
  const { character, parsedTraits } = useCharacterSheet()

  if (!character) return null

  const characterClass = (character.ruleset === '2014' || character.ruleset === '5e-custom')
    ? CLASSES_2014.find(c => c.name === character.class)
    : CLASSES.find(c => c.name === character.class)

  return (
    <div className="fade-up">
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Idiomas e Proficiências</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Languages Card */}
        <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Brain size={18} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Idiomas</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(() => {
              const traitLangs = Array.isArray(parsedTraits?.languages) ? parsedTraits.languages : []
              const allLangs = [...new Set(['Comum', ...traitLangs])]

              if (character.race === 'Draconato' && !allLangs.includes('Dracônico')) {
                allLangs.push('Dracônico')
              }

              return allLangs.map((lang: string) => (
                <div key={lang} style={{
                  background: 'rgba(var(--accent-rgb), 0.1)',
                  border: '1px solid rgba(var(--accent-rgb), 0.2)',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 13,
                  color: 'var(--accentL)',
                  fontWeight: 600
                }}>
                  {lang}
                </div>
              ))
            })()}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--fg2)' }}>
            Personagens 2024 começam com Comum + 2 idiomas padrão à escolha.
          </div>
        </div>

        {/* Equipment Proficiencies */}
        <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Shield size={18} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Equipamento</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(() => {
              const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
              const raceData = is2014
                ? RACES_2014.find(r => r.name === character.race)
                : RACES.find(r => r.name === character.race)

              let racialTraits = raceData?.traits || []
              if (is2014 && character.subrace && raceData?.lineages) {
                const lineage = raceData.lineages.find(l => l.name === character.subrace)
                if (lineage) racialTraits = [...racialTraits, ...lineage.traits]
              }

              const weaponTraining = racialTraits.filter(t =>
                (t.name.toLowerCase().includes('treinamento') || t.name.toLowerCase().includes('proficiência')) &&
                (t.name.toLowerCase().includes('armas') || t.name.toLowerCase().includes('combate'))
              )

              const armorTraining = racialTraits.filter(t =>
                (t.name.toLowerCase().includes('treinamento') || t.name.toLowerCase().includes('proficiência')) &&
                t.name.toLowerCase().includes('armadura')
              )

              const subLower = (character.subclass || '').toLowerCase()
              const heavyArmorSubclasses = ['vida', 'guerra', 'tempestade', 'natureza', 'ordem', 'crepúsculo', 'crepusculo']
              const hasSubclassHeavyArmor = character.class === 'Clérigo' && heavyArmorSubclasses.some(s => subLower.includes(s))
              const hasSubclassMartialWeapons = character.class === 'Clérigo' && ['guerra', 'tempestade'].some(s => subLower.includes(s))

              let displayArmorProf = characterClass?.armorProf || 'Nenhuma'
              if (hasSubclassHeavyArmor && !displayArmorProf.toLowerCase().includes('pesadas')) {
                displayArmorProf = `${displayArmorProf}, Armaduras Pesadas`
              }

              let displayWeaponProf = characterClass?.weaponProf || 'Simples'
              if (hasSubclassMartialWeapons && !displayWeaponProf.toLowerCase().includes('marciais')) {
                displayWeaponProf = `${displayWeaponProf}, Armas Marciais`
              }

              return (
                <>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--fg2)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700, letterSpacing: '0.05em' }}>Armaduras</div>
                    <div style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 700 }}>
                      {displayArmorProf}
                    </div>

                    {/* Subclass Armor Proficiencies */}
                    {hasSubclassHeavyArmor && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        <div style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderLeft: '3px solid var(--accent)', borderRadius: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accentL)' }}>{character.subclass} (Domínio Divino)</div>
                          <div style={{ fontSize: 12, color: 'var(--fg)', marginTop: 2 }}>Proficiência adicional em Armaduras Pesadas.</div>
                        </div>
                      </div>
                    )}

                    {/* Racial Armor Proficiencies */}
                    {armorTraining.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        {armorTraining.map((t, idx) => (
                          <div key={idx} style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderLeft: '3px solid var(--accent)', borderRadius: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accentL)' }}>{t.name} (Racial)</div>
                            <div style={{ fontSize: 12, color: 'var(--fg)', marginTop: 2 }}>{t.description}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {displayArmorProf && !displayArmorProf.toLowerCase().includes('nenhuma') && (
                      <div style={{ fontSize: 12, color: 'var(--fg2)', marginTop: 8, lineHeight: 1.5 }}>
                        {displayArmorProf.toLowerCase().includes('pesadas')
                          ? (
                            <>
                              <div style={{ marginBottom: 4 }}><strong style={{ color: 'var(--fg)' }}>Leves/Médias:</strong> Couro, Acolchoada, Peitoral, Cota de Malha, Meia-Placa.</div>
                              <div><strong style={{ color: 'var(--fg)' }}>Pesadas:</strong> Cota de Anéis, Cotas de Talas, Placas (Full Plate).</div>
                            </>
                          )
                          : displayArmorProf.toLowerCase().includes('médias')
                            ? <span><strong style={{ color: 'var(--fg)' }}>Leves e Médias:</strong> Leves (Couro, Acolchoada) e Médias (Gibão, Cota de Malha, Peitoral, Meia-Placa).</span>
                            : <span><strong style={{ color: 'var(--fg)' }}>Apenas Leves:</strong> Couro, Acolchoada, Couro Batido.</span>}
                      </div>
                    )}
                  </div>

                  <div style={{ height: 1, background: 'var(--border)', opacity: 0.5 }} />

                  <div>
                    <div style={{ fontSize: 11, color: 'var(--fg2)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700, letterSpacing: '0.05em' }}>Armas</div>
                    <div style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 700 }}>
                      {displayWeaponProf}
                    </div>

                    {/* Subclass Weapon Proficiencies */}
                    {hasSubclassMartialWeapons && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        <div style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderLeft: '3px solid var(--accent)', borderRadius: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accentL)' }}>{character.subclass} (Domínio Divino)</div>
                          <div style={{ fontSize: 12, color: 'var(--fg)', marginTop: 2 }}>Proficiência adicional em Armas Marciais.</div>
                        </div>
                      </div>
                    )}

                    {/* Racial Weapon Proficiencies */}
                    {weaponTraining.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        {weaponTraining.map((t, idx) => (
                          <div key={idx} style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderLeft: '3px solid var(--accent)', borderRadius: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accentL)' }}>{t.name} (Racial)</div>
                            <div style={{ fontSize: 12, color: 'var(--fg)', marginTop: 2 }}>{t.description}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ fontSize: 12, color: 'var(--fg2)', marginTop: 8, lineHeight: 1.5 }}>
                      {characterClass?.weaponProf?.toLowerCase().includes('marciais')
                        ? (
                          <>
                            <div style={{ marginBottom: 4 }}><strong style={{ color: 'var(--fg)' }}>Simples:</strong> Adaga, Clava, Lança, Maça, Bordão, Machadinha, Besta Leve, Arco Curto.</div>
                            <div><strong style={{ color: 'var(--fg)' }}>Marciais:</strong> Espada (Curta, Longa, Grande), Rapieira, Machado, Arco Longo, Besta (Pesada, Mão), Alabarda, Martelo de Guerra, Tridente, Chicote.</div>
                          </>
                        )
                        : 'Adaga, Clava, Lança, Maça, Bordão, Machadinha, Besta Leve, Arco Curto.'}
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>

        {/* Tool Proficiencies */}
        <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Settings size={18} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Ferramentas</span>
          </div>

          {(() => {
            const is2014 = (character.ruleset === '2014' || character.ruleset === '5e-custom')
            const raceData = is2014 ? RACES_2014.find(r => r.name === character.race) : RACES.find(r => r.name === character.race)
            let racialTraits = raceData?.traits || []
            if (is2014 && character.subrace && raceData?.lineages) {
              const lineage = raceData.lineages.find(l => l.name === character.subrace)
              if (lineage) racialTraits = [...racialTraits, ...lineage.traits]
            }

            const racialToolTraits = racialTraits.filter(t =>
              t.name.toLowerCase().includes('ferramenta') ||
              t.description.toLowerCase().includes('ferramenta') ||
              t.name.toLowerCase().includes('engenhoca')
            )

            const backgroundName = character.background
            const bg = (is2014 ? BACKGROUNDS_2014 : BACKGROUNDS).find(b =>
              b.name.toLowerCase().trim() === backgroundName?.toLowerCase().trim() ||
              b.id.toLowerCase() === backgroundName?.toLowerCase().trim()
            )
            const bgTools = bg?.toolProf ? bg.toolProf.split(',').map(s => s.trim()) : []
            const classTools = characterClass?.toolProf ? characterClass.toolProf.split(',').map(s => s.trim()) : []
            const traitTools = Array.isArray(parsedTraits?.tools) ? parsedTraits.tools : []
            const allTools = [...new Set([...bgTools, ...classTools, ...traitTools])]

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {allTools.length > 0 ? allTools.map((tool: string) => (
                    <div key={tool} style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 13,
                      color: 'var(--fg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <Settings size={12} style={{ opacity: 0.7, color: 'var(--accentL)' }} />
                      {tool}
                    </div>
                  )) : (
                    !racialToolTraits.length && <div style={{ fontSize: 13, color: 'var(--fg2)', fontStyle: 'italic' }}>Nenhuma ferramenta registrada.</div>
                  )}
                </div>

                {racialToolTraits.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {racialToolTraits.map((t, idx) => (
                      <div key={idx} style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderLeft: '3px solid var(--accent)', borderRadius: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <Settings size={14} color="var(--accentL)" />
                          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accentL)', textTransform: 'uppercase' }}>{t.name} (Racial)</div>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.4, marginTop: 2 }}>{t.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
