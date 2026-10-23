'use client'

import React from 'react'
import { TrendingUp, X } from 'lucide-react'
import { formatModifier } from '@/types/character'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function ProgressionModal() {
  const { isProgressionModalOpen, setIsProgressionModalOpen, character, progressionData } = useCharacterSheet()

  if (!isProgressionModalOpen || !character) return null

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
      onClick={() => setIsProgressionModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 700,
          maxHeight: '90vh',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10 }}>
              <TrendingUp size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Progressão do Personagem</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Nível 1 ao 20 — {character.class}</span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setIsProgressionModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--fgM)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Nvl</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>B.P.</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Vida (Média)</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Características</th>
              </tr>
            </thead>
            <tbody>
              {progressionData.map((lvl) => (
                <tr
                  key={lvl.level}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    background: lvl.level === character.level ? 'rgba(225,29,72,0.1)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <td style={{ padding: '12px', fontWeight: 700, color: lvl.level === character.level ? 'var(--accentL)' : 'var(--fg2)' }}>{lvl.level}</td>
                  <td style={{ padding: '12px', color: 'var(--ok)' }}>+{lvl.pb}</td>
                  <td style={{ padding: '12px', color: 'var(--fg2)' }}>{lvl.hp} <span style={{ fontSize: 10, color: 'var(--fg3)' }}>PV</span></td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {lvl.features.length > 0 ? lvl.features.map((f: string, idx: number) => (
                        <span
                          key={idx}
                          style={{
                            padding: '2px 8px',
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 6,
                            fontSize: 11,
                            color: 'var(--fg)'
                          }}
                        >
                          {f}
                        </span>
                      )) : <span style={{ color: 'var(--fg3)', fontStyle: 'italic', fontSize: 11 }}>—</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--fg3)', textAlign: 'center' }}>
          ℹ️ A vida é calculada com base na média dos dados por nível + modificador de Constituição ({formatModifier(character.constitution)}).
        </div>
      </div>
    </div>
  )
}
