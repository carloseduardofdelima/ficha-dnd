'use client'

import React from 'react'
import { X, Trash2 } from 'lucide-react'
import { cleanDescription } from '@/lib/items/icons'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function ItemDetailsModal() {
  const { detailItem, setDetailItem, isOwner, handleRemoveInventoryItem } = useCharacterSheet()

  if (!detailItem) return null

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
      onClick={() => setDetailItem(null)}
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
            <span style={{ fontSize: 32 }}>{detailItem.icon}</span>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{detailItem.name}</h3>
              <span style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800 }}>{detailItem.category}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {isOwner && (
              <button
                className="btn btn-ghost"
                onClick={() => handleRemoveInventoryItem(detailItem.name)}
                style={{ padding: 8, borderRadius: '50%', color: 'var(--accent)' }}
                title="Remover do Inventário"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button className="btn btn-ghost" onClick={() => setDetailItem(null)} style={{ padding: 8, borderRadius: '50%' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 20, padding: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
            <div>
              <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Custo</span>
              <span style={{ fontWeight: 700, color: 'var(--accentL)' }}>{detailItem.cost}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Peso</span>
              <span style={{ fontWeight: 700 }}>{detailItem.weight} kg</span>
            </div>
          </div>

          {detailItem.properties && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Propriedades</span>
              <div style={{ fontSize: 13, color: '#c084fc', fontWeight: 600 }}>{detailItem.properties}</div>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Descrição</span>
            <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>{cleanDescription(detailItem.description)}</p>
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: '100%' }}
            onClick={() => setDetailItem(null)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
