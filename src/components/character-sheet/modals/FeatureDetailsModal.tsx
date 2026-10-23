'use client'

import React from 'react'
import { Star, X } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function FeatureDetailsModal() {
  const { detailFeature, setDetailFeature } = useCharacterSheet()

  if (!detailFeature) return null

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
      onClick={() => setDetailFeature(null)}
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
              <Star size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{detailFeature.name}</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                {detailFeature.source} {detailFeature.level ? `• Nível ${detailFeature.level}` : ''}
              </span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setDetailFeature(null)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Descrição da Habilidade</span>
            <p style={{
              fontSize: 15,
              color: 'var(--fg)',
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: 'pre-wrap',
              background: 'rgba(255,255,255,0.02)',
              padding: 16,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {detailFeature.description || "Nenhuma descrição disponível."}
            </p>
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: '100%' }}
            onClick={() => setDetailFeature(null)}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
