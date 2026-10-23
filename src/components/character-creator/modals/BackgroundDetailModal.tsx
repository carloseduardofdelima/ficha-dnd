'use client'

import React from 'react'
import { X } from 'lucide-react'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function BackgroundDetailModal() {
  const { detailBg, setDetailBg, handleBgSelect } = useCharacterCreator()

  if (!detailBg) return null

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
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
      onClick={() => setDetailBg(null)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ height: 5, background: 'linear-gradient(90deg, var(--accent2), var(--accent))' }} />
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 28 }}>{detailBg.name}</h2>
            <span
              style={{
                fontSize: 13,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {detailBg.source}
            </span>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => setDetailBg(null)}
            style={{ padding: 8, borderRadius: '50%' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: 32, overflowY: 'auto' }}>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
              fontStyle: 'italic',
              marginBottom: 24,
            }}
          >
            &quot;{detailBg.description}&quot;
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                Perícias
              </span>
              <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.skills.join(', ')}</div>
            </div>
            {detailBg.toolProf && (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Ferramentas
                </span>
                <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.toolProf}</div>
              </div>
            )}
            {detailBg.languages && (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Idiomas
                </span>
                <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.languages}</div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 18,
                marginBottom: 12,
                borderBottom: '1px solid var(--accent)',
                display: 'inline-block',
                paddingBottom: 4,
              }}
            >
              Habilidade Especial: {detailBg.feature.name}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
              {detailBg.feature.description}
            </p>
          </div>

          <div>
            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 18,
                marginBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'inline-block',
                paddingBottom: 4,
              }}
            >
              Equipamento Inícial
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
              {detailBg.equipment}
            </p>
          </div>
        </div>

        <div
          style={{
            padding: '24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'right',
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              handleBgSelect(detailBg.id)
              setDetailBg(null)
            }}
            style={{ padding: '12px 32px' }}
          >
            Selecionar {detailBg.name}
          </button>
        </div>
      </div>
    </div>
  )
}
