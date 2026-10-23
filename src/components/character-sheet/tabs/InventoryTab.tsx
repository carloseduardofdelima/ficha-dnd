'use client'

import React from 'react'
import { Package, Plus } from 'lucide-react'
import { getItemIconUrl } from '@/lib/items/icons'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function InventoryTab() {
  const {
    character,
    isOwner,
    updateValue,
    setDetailItem,
    toggleEquip,
    setIsInventoryModalOpen,
    setIsCustomItemModalOpen,
  } = useCharacterSheet()

  if (!character) return null

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Inventário</h2>
        <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 10 }}>
          <span style={{ color: 'var(--fgM)' }}>Peso Total: </span>
          <span style={{ color: 'var(--accentL)', fontWeight: 700 }}>
            {(() => {
              const weight = (character.inventory as any[]).reduce((sum, entry) => {
                const w = parseFloat(entry.item.weight) || 0
                return sum + (w * (entry.qty || 1))
              }, 0)
              return weight.toFixed(1)
            })()} kg
          </span>
        </div>
      </div>
      
      {/* Seção de Moedas */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          marginBottom: 24,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 10
        }}
      >
        {/* Ouro */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#facc15', display: 'flex', alignItems: 'center', gap: 2 }}>
            🪙 Ouro (po)
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_ouro'] = Math.max(0, (res['moeda_ouro'] || 0) - 1)
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >-</button>
            <input 
              type="number"
              value={(() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                return res['moeda_ouro'] || 0
              })()}
              onChange={(e) => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_ouro'] = Math.max(0, parseInt(e.target.value) || 0)
                updateValue('resources', JSON.stringify(res))
              }}
              style={{ width: 38, height: 22, fontSize: 11, textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--fg)', padding: 0 }}
              disabled={!isOwner}
            />
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_ouro'] = (res['moeda_ouro'] || 0) + 1
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >+</button>
          </div>
        </div>

        {/* Prata */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 2 }}>
            🪙 Prata (pp)
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_prata'] = Math.max(0, (res['moeda_prata'] || 0) - 1)
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >-</button>
            <input 
              type="number"
              value={(() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                return res['moeda_prata'] || 0
              })()}
              onChange={(e) => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_prata'] = Math.max(0, parseInt(e.target.value) || 0)
                updateValue('resources', JSON.stringify(res))
              }}
              style={{ width: 38, height: 22, fontSize: 11, textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--fg)', padding: 0 }}
              disabled={!isOwner}
            />
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_prata'] = (res['moeda_prata'] || 0) + 1
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >+</button>
          </div>
        </div>

        {/* Bronze */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: 2 }}>
            🪙 Bronze (pc)
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_bronze'] = Math.max(0, (res['moeda_bronze'] || 0) - 1)
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >-</button>
            <input 
              type="number"
              value={(() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                return res['moeda_bronze'] || 0
              })()}
              onChange={(e) => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_bronze'] = Math.max(0, parseInt(e.target.value) || 0)
                updateValue('resources', JSON.stringify(res))
              }}
              style={{ width: 38, height: 22, fontSize: 11, textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--fg)', padding: 0 }}
              disabled={!isOwner}
            />
            <button 
              onClick={() => {
                const res = character.resources ? JSON.parse(character.resources as string) : {}
                res['moeda_bronze'] = (res['moeda_bronze'] || 0) + 1
                updateValue('resources', JSON.stringify(res))
              }}
              className="btn btn-ghost" 
              style={{ padding: '0 4px', fontSize: 10, height: 22, minWidth: 20 }}
              disabled={!isOwner}
            >+</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {character.inventory && Array.isArray(character.inventory) && character.inventory.length > 0 ? (
          (character.inventory as any[]).map((entry: any, i: number) => (
            <div
              key={i}
              className="card inventory-item-card"
              onClick={() => setDetailItem(entry.item)}
              style={{
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'var(--bg2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid var(--border)'
              }}
            >
              {(() => {
                const iconUrl = getItemIconUrl(entry.item, entry.item.category)
                if (iconUrl) {
                  return (
                    <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={iconUrl} alt={entry.item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  )
                }
                return <span style={{ fontSize: 24 }}>{entry.item.icon}</span>
              })()}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.item.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{entry.item.category} • {entry.item.weight} kg</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {entry.item.category === 'armor' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleEquip(i)
                    }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: '1px solid',
                      borderColor: entry.isEquipped ? 'var(--accent)' : 'var(--border)',
                      background: entry.isEquipped ? 'var(--accentGlow)' : 'transparent',
                      color: entry.isEquipped ? 'var(--accentL)' : 'var(--fg3)',
                      fontSize: 12,
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    title={entry.isEquipped ? 'Equipado' : 'Equipar'}
                  >
                    E
                  </button>
                )}
                <div style={{ fontWeight: 800, color: 'var(--accentL)', flexShrink: 0 }}>x{entry.qty}</div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--fg3)', textAlign: 'center', padding: 24 }}>Seu inventário está vazio.</p>
        )}

        {isOwner && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <button
              className="btn btn-outline"
              style={{ height: 45, fontSize: 13, gap: 8 }}
              onClick={() => setIsInventoryModalOpen(true)}
            >
              <Package size={18} />
              Adicionar Item
            </button>
            <button
              className="btn btn-primary"
              style={{ height: 45, fontSize: 13, gap: 8 }}
              onClick={() => setIsCustomItemModalOpen(true)}
            >
              <Plus size={18} />
              Criar Item
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
