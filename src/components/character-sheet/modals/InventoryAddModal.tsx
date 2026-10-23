'use client'

import React from 'react'
import { Plus, X } from 'lucide-react'
import { ITEM_CATALOG } from '@/lib/inventory'
import { ITEM_CATALOG_2014 } from '@/lib/inventory-2014'
import { getItemIconUrl } from '@/lib/items/icons'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function InventoryAddModal() {
  const {
    isInventoryModalOpen,
    setIsInventoryModalOpen,
    inventorySearchTerm,
    setInventorySearchTerm,
    character,
    handleAddInventoryItem
  } = useCharacterSheet()

  if (!isInventoryModalOpen || !character) return null

  const currentCatalog = (character.ruleset === '2014' || character.ruleset === '5e-custom') ? ITEM_CATALOG_2014 : ITEM_CATALOG
  const filtered = currentCatalog.filter(i =>
    i.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(inventorySearchTerm.toLowerCase())
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
      onClick={() => setIsInventoryModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 450,
          maxHeight: '85vh',
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
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Adicionar Item</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Catálogo de Itens</span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setIsInventoryModalOpen(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px 24px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar item por nome ou categoria..."
              value={inventorySearchTerm}
              onChange={(e) => setInventorySearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                padding: '12px 16px',
                borderRadius: 12,
                color: 'var(--fg)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              autoFocus
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', padding: 40, color: 'var(--fg3)', fontSize: 13 }}>Nenhum item encontrado.</p>
            ) : (
              filtered.map((item, idx) => {
                const iconUrl = getItemIconUrl(item, item.category)
                return (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      padding: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {iconUrl ? (
                      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <img src={iconUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <span style={{ fontSize: 24 }}>{item.icon}</span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{item.category} • {item.weight} kg</div>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: 11, height: 'auto' }}
                      onClick={() => {
                        handleAddInventoryItem(item)
                        setIsInventoryModalOpen(false)
                        setInventorySearchTerm('')
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
