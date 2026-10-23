'use client'

import React from 'react'
import { TrendingUp, X } from 'lucide-react'
import { formatModifier } from '@/types/character'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function AttributeEditModal() {
  const { isAttrModalOpen, setIsAttrModalOpen, editingAttrs, setEditingAttrs, handleSaveAttributes } = useCharacterSheet()

  if (!isAttrModalOpen) return null

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
      onClick={() => setIsAttrModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 450,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10 }}>
              <TrendingUp size={20} color="#fff" />
            </div>
            <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Editar Atributos</h3>
          </div>
          <button className="btn btn-ghost" onClick={() => setIsAttrModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Força', key: 'strength' },
              { label: 'Destreza', key: 'dexterity' },
              { label: 'Constituição', key: 'constitution' },
              { label: 'Inteligência', key: 'intelligence' },
              { label: 'Sabedoria', key: 'wisdom' },
              { label: 'Carisma', key: 'charisma' }
            ].map(attr => (
              <div key={attr.key}>
                <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>{attr.label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    className="card"
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 16, fontWeight: 700 }}
                    value={(editingAttrs as any)[attr.key]}
                    onChange={e => {
                      let val = parseInt(e.target.value) || 0
                      if (val > 20) val = 20
                      if (val < 1 && e.target.value !== '') val = 1
                      setEditingAttrs({ ...editingAttrs, [attr.key]: val })
                    }}
                  />
                  <div style={{ fontSize: 14, color: 'var(--accentL)', fontWeight: 700, width: 40 }}>
                    {formatModifier((editingAttrs as any)[attr.key])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, padding: 12, background: 'rgba(225,29,72,0.05)', borderRadius: 8, border: '1px solid rgba(225,29,72,0.1)', fontSize: 12, color: 'var(--fg2)' }}>
            ℹ️ Alterar os atributos base atualizará automaticamente seus modificadores, perícias e salvaguardas.
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8, justifyContent: 'center', height: 48, fontSize: 16 }}
            onClick={handleSaveAttributes}
          >
            Salvar Atributos
          </button>
        </div>
      </div>
    </div>
  )
}
