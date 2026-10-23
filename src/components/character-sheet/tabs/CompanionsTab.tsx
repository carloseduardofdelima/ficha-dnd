'use client'

import React from 'react'
import { Plus, Trash2, User } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CompanionsTab() {
  const {
    isOwner,
    setNewCompanion,
    setIsCompanionModalOpen,
    parsedCompanions,
    handleRemoveCompanion,
    handleUpdateCompanionHP
  } = useCharacterSheet()

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, margin: 0 }}>Companheiros & Invocações</h2>
        {isOwner && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setNewCompanion({ ac: 10, maxHp: 10, hp: 10 })
              setIsCompanionModalOpen(true)
            }}
            style={{ gap: 8 }}
          >
            <Plus size={18} /> Adicionar
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {parsedCompanions.map((comp) => (
          <div key={comp.id} className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--bg2)', padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{comp.name}</h3>
                <span style={{ fontSize: 11, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800 }}>{comp.type}</span>
              </div>
              {isOwner && (
                <button
                  onClick={() => handleRemoveCompanion(comp.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--fg3)', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>CA</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{comp.ac}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Desloc.</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{comp.speed}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Percepção</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{comp.perception}</div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg2)' }}>Pontos de Vida</span>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{comp.hp} / {comp.maxHp}</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{
                    width: `${(comp.hp / comp.maxHp) * 100}%`,
                    height: '100%',
                    background: comp.hp < comp.maxHp * 0.3 ? 'var(--accent)' : 'var(--ok)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                {isOwner && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, height: 32, fontSize: 12 }}
                      onClick={() => handleUpdateCompanionHP(comp.id, -1)}
                    >-1</button>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, height: 32, fontSize: 12 }}
                      onClick={() => handleUpdateCompanionHP(comp.id, 1)}
                    >+1</button>
                  </div>
                )}
              </div>

              {comp.attacks && comp.attacks.length > 0 && (
                <div style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Ataques</span>
                  {comp.attacks.map((atk, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{atk.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{atk.type}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--accentL)', fontWeight: 800 }}>{atk.bonus}</div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{atk.damage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {comp.notes && (
                <div style={{ marginTop: 16 }}>
                  <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Notas</span>
                  <p style={{ fontSize: 12, color: 'var(--fg2)', margin: '4px 0 0', lineHeight: 1.5 }}>{comp.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {parsedCompanions.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.01)', borderRadius: 16, border: '2px dashed var(--border)' }}>
            <User size={48} color="var(--fg3)" style={{ marginBottom: 16, opacity: 0.5 }} />
            <h3 style={{ margin: 0, color: 'var(--fg2)' }}>Nenhum companheiro</h3>
            <p style={{ fontSize: 14, color: 'var(--fg3)', marginTop: 8 }}>Adicione pets, montarias ou espíritos invocados aqui.</p>
          </div>
        )}
      </div>
    </div>
  )
}
