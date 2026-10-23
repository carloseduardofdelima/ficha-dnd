'use client'

import React from 'react'
import { Plus, X } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CustomItemModal() {
  const {
    isCustomItemModalOpen,
    setIsCustomItemModalOpen,
    customItem,
    setCustomItem,
    handleAddInventoryItem
  } = useCharacterSheet()

  if (!isCustomItemModalOpen) return null

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
      onClick={() => setIsCustomItemModalOpen(false)}
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
              <Plus size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Item Original</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Criar novo item</span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setIsCustomItemModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Nome do Item</label>
            <input
              type="text"
              className="card"
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
              placeholder="Ex: Anel da Proteção, Mapa Antigo..."
              value={customItem.name}
              onChange={e => setCustomItem({ ...customItem, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                className="card"
                style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
                value={customItem.weight}
                onChange={e => setCustomItem({ ...customItem, weight: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>Ícone</label>
              <input
                type="text"
                className="card"
                style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14, textAlign: 'center' }}
                value={customItem.icon}
                onChange={e => setCustomItem({ ...customItem, icon: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: 6 }}>O que o item faz?</label>
            <textarea
              className="card"
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14, minHeight: 100, resize: 'vertical' }}
              placeholder="Descreva as propriedades e efeitos do item..."
              value={customItem.description}
              onChange={e => setCustomItem({ ...customItem, description: e.target.value })}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', height: 48, justifyContent: 'center' }}
            disabled={!customItem.name}
            onClick={() => {
              handleAddInventoryItem({
                id: `custom-${Date.now()}`,
                ...customItem,
                cost: '---'
              })
              setIsCustomItemModalOpen(false)
              setCustomItem({ name: '', description: '', weight: 0, category: 'misc', icon: '📦' })
            }}
          >
            Criar e Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
