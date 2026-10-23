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
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--fg3)' }}>
            Personagens 2024 começam com Comum + 2 idiomas padrão à escolha.
          </div>
        </div>

        {/* Equipment Proficiencies */}
        <div className="card" style={{ padding: 20, background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Shield size={18} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Equipamento</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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

              return (
                <>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>Armaduras</div>
                    <div style={{ color: 'var(--fg2)', fontSize: 14, fontWeight: 700 }}>
                      {characterClass?.armorProf || 'Nenhuma'}
                    </div>

                    {/* Racial Armor Proficiencies */}
                    {armorTraining.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        {armorTraining.map((t, idx) => (
                          <div key={idx} style={{ padding: '6px 10px', background: 'rgba(var(--accent-rgb), 0.05)', borderLeft: '2px solid var(--accent)', borderRadius: '0 4px 4px 0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)' }}>{t.name} (Racial)</div>
                            <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{t.description}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {characterClass?.armorProf && !characterClass.armorProf.toLowerCase().includes('nenhuma') && (
                      <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 8, lineHeight: 1.4 }}>
                        {characterClass.armorProf.toLowerCase().includes('pesadas')
                          ? (
                            <>
                              <div style={{ marginBottom: 4 }}><strong>Leves/Médias:</strong> Couro, Acolchoada, Peitoral, Cota de Malha, Meia-Placa.</div>
                              <div><strong>Pesadas:</strong> Cota de Anéis, Cotas de Talas, Placas (Full Plate).</div>
                            </>
                          )
                          : characterClass.armorProf.toLowerCase().includes('médias')
                            ? 'Leves (Couro, Acolchoada) e Médias (Gibão, Cota de Malha, Peitoral, Meia-Placa).'
                            : 'Apenas Armaduras Leves (Couro, Acolchoada, Couro Batido).'}
                      </div>
                    )}
                  </div>

                  <div style={{ height: 1, background: 'var(--border)', opacity: 0.5 }} />

                  <div>
                    <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>Armas</div>
                    <div style={{ color: 'var(--fg2)', fontSize: 14, fontWeight: 700 }}>
                      {characterClass?.weaponProf || 'Simples'}
                    </div>

                    {/* Racial Weapon Proficiencies */}
                    {weaponTraining.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                        {weaponTraining.map((t, idx) => (
                          <div key={idx} style={{ padding: '6px 10px', background: 'rgba(var(--accent-rgb), 0.05)', borderLeft: '2px solid var(--accent)', borderRadius: '0 4px 4px 0' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)' }}>{t.name} (Racial)</div>
                            <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{t.description}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 8, lineHeight: 1.4 }}>
                      {characterClass?.weaponProf?.toLowerCase().includes('marciais')
                        ? (
                          <>
                            <div style={{ marginBottom: 4 }}><strong>Simples:</strong> Adaga, Clava, Lança, Maça, Bordão, Machadinha, Besta Leve, Arco Curto.</div>
                            <div><strong>Marciais:</strong> Espada (Curta, Longa, Grande), Rapieira, Machado, Arco Longo, Besta (Pesada, Mão), Alabarda, Martelo de Guerra, Tridente, Chicote.</div>
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <Settings size={12} style={{ opacity: 0.5 }} />
                      {tool}
                    </div>
                  )) : (
                    !racialToolTraits.length && <div style={{ fontSize: 13, color: 'var(--fg3)', fontStyle: 'italic' }}>Nenhuma ferramenta registrada.</div>
                  )}
                </div>

                {racialToolTraits.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {racialToolTraits.map((t, idx) => (
                      <div key={idx} style={{ padding: '8px 12px', background: 'rgba(var(--accent-rgb), 0.05)', borderLeft: '2px solid var(--accent)', borderRadius: '0 4px 4px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <Settings size={14} color="var(--accentL)" />
                          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accentL)', textTransform: 'uppercase' }}>{t.name} (Racial)</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--fg3)', lineHeight: 1.4 }}>{t.description}</div>
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
