'use client'

import React from 'react'
import { Footprints, X } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function BeastDetailsModal() {
  const { selectedBeast, setSelectedBeast } = useCharacterSheet()

  if (!selectedBeast) return null

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
      onClick={() => setSelectedBeast(null)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 450,
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
              <Footprints size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{selectedBeast.name}</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                Fera • ND {selectedBeast.cr}
              </span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setSelectedBeast(null)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            background: 'rgba(255,255,255,0.02)',
            padding: 16,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Pontos de Vida</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)' }}>{selectedBeast.hp} PV</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Classe de Armadura</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)' }}>{selectedBeast.ac} CA</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>Deslocamento</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{selectedBeast.speed}</div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Ataques</span>
            <p style={{
              fontSize: 14,
              color: 'var(--fg)',
              lineHeight: 1.5,
              margin: 0,
              background: 'rgba(255,255,255,0.02)',
              padding: 12,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {selectedBeast.attacks}
            </p>
          </div>

          <div>
            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Características Especiais</span>
            <p style={{
              fontSize: 13,
              color: 'var(--fg2)',
              lineHeight: 1.5,
              margin: 0,
              background: 'rgba(255,255,255,0.02)',
              padding: 12,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.05)',
              fontStyle: 'italic'
            }}>
              {selectedBeast.features}
            </p>
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 8 }}
            onClick={() => setSelectedBeast(null)}
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}
