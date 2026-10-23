'use client'

import React from 'react'
import { X, ChevronDown } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CompanionModal() {
  const {
    isCompanionModalOpen,
    setIsCompanionModalOpen,
    newCompanion,
    setNewCompanion,
    isCompTypeSelectOpen,
    setIsCompTypeSelectOpen,
    handleAddCompanion
  } = useCharacterSheet()

  if (!isCompanionModalOpen) return null

  const isFormValid = !!(
    newCompanion.name &&
    newCompanion.type &&
    newCompanion.ac !== undefined &&
    newCompanion.maxHp !== undefined &&
    newCompanion.speed
  )

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
        padding: 20
      }}
      onClick={() => setIsCompanionModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 450,
          borderRadius: 16,
          overflow: 'visible',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Novo Companheiro</h3>
          <button className="btn btn-ghost" onClick={() => setIsCompanionModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Nome</label>
            <input
              type="text"
              className="card"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
              placeholder="Ex: Faísca, o Lobo"
              value={newCompanion.name || ''}
              onChange={e => setNewCompanion({ ...newCompanion, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Tipo / Classe</label>
              <div style={{ position: 'relative' }}>
                <div
                  className="card"
                  onClick={() => setIsCompTypeSelectOpen(!isCompTypeSelectOpen)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: newCompanion.type ? 'var(--fg)' : 'var(--fg3)',
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {newCompanion.type || 'Selecione...'}
                  <ChevronDown size={16} style={{ transform: isCompTypeSelectOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>

                {isCompTypeSelectOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      right: 0,
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      zIndex: 100,
                      overflowY: 'auto',
                      maxHeight: '200px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      animation: 'fadeUp 0.2s ease-out'
                    }}
                  >
                    {[
                      "Familiar", "Companheiro Primal", "Montaria Espiritual",
                      "Invocação", "Montaria", "Pet / Animal", "Outro"
                    ].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setNewCompanion({ ...newCompanion, type: opt })
                          setIsCompTypeSelectOpen(false)
                        }}
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: 'var(--fg2)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderBottom: '1px solid rgba(255,255,255,0.03)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accentGlow)'
                          e.currentTarget.style.color = 'var(--fg)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--fg2)'
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>CA</label>
              <input
                type="number"
                className="card"
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                value={newCompanion.ac || 10}
                onChange={e => setNewCompanion({ ...newCompanion, ac: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>HP Máximo</label>
              <input
                type="number"
                className="card"
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                value={newCompanion.maxHp || 10}
                onChange={e => {
                  const val = parseInt(e.target.value) || 0
                  setNewCompanion({ ...newCompanion, maxHp: val, hp: val })
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Deslocamento</label>
              <input
                type="text"
                className="card"
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                placeholder="Ex: 9m"
                value={newCompanion.speed || ''}
                onChange={e => setNewCompanion({ ...newCompanion, speed: e.target.value })}
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: '100%',
              marginTop: 8,
              justifyContent: 'center',
              opacity: isFormValid ? 1 : 0.5,
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
            disabled={!isFormValid}
            onClick={() => handleAddCompanion(newCompanion)}
          >
            Criar Companheiro
          </button>
        </div>
      </div>
    </div>
  )
}
