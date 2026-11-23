'use client'

import React from 'react'
import { Character } from '@/types/character'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function DraconicAncestryModal() {
  const {
    isDraconicModalOpen,
    setIsDraconicModalOpen,
    isLevelUpModalOpen,
    character,
    setCharacter,
    selectedAncestry,
    setSelectedAncestry,
    setLevelUpStep,
    handleLevelUpPersistence,
    updateValue,
  } = useCharacterSheet()

  if (!isDraconicModalOpen || !character) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div
        onClick={() => { if (!isLevelUpModalOpen) setIsDraconicModalOpen(false) }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      />
      <div className="card fade-up" style={{ position: 'relative', width: '100%', maxWidth: 460, padding: 0, overflow: 'hidden', border: '1px solid var(--accent)' }}>
        <div style={{ background: 'var(--accent)', padding: '24px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>Ancestral Dracônico</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Escolha sua linhagem e tipo de dano</p>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ maxHeight: 400, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { name: 'Negro', type: 'Ácido' }, { name: 'Cobre', type: 'Ácido' },
              { name: 'Azul', type: 'Elétrico' }, { name: 'Bronze', type: 'Elétrico' },
              { name: 'Verde', type: 'Veneno' },
              { name: 'Vermelho', type: 'Fogo' }, { name: 'Latão', type: 'Fogo' }, { name: 'Ouro', type: 'Fogo' },
              { name: 'Branco', type: 'Frio' }, { name: 'Prata', type: 'Frio' }
            ].map(drag => (
              <button
                key={drag.name}
                type="button"
                onClick={() => setSelectedAncestry(drag.name + ' (' + drag.type + ')')}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: '1px solid',
                  borderColor: selectedAncestry?.startsWith(drag.name) ? 'var(--accent)' : 'var(--border)',
                  background: selectedAncestry?.startsWith(drag.name) ? 'var(--accentGlow)' : 'var(--bg2)',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14 }}>{drag.name}</div>
                <div style={{ fontSize: 10, color: 'var(--accentL)', marginTop: 2 }}>{drag.type}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {!isLevelUpModalOpen && (
              <button
                type="button"
                className="btn btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setIsDraconicModalOpen(false)}
              >
                Cancelar
              </button>
            )}
            <button
              type="button"
              className="btn bg-accent"
              style={{ flex: 2, justifyContent: 'center' }}
              disabled={!selectedAncestry}
              onClick={() => {
                const currentTraits = typeof character.traits === 'string' ? JSON.parse(character.traits) : (character.traits || {})
                const nextTraits = { ...currentTraits, draconicAncestry: selectedAncestry }
                setIsDraconicModalOpen(false)

                if (!isLevelUpModalOpen) {
                  updateValue('traits', nextTraits, true)
                  return
                }

                const updated = {
                  ...character,
                  traits: nextTraits
                }
                const alerts = [`✨ Nova Subclasse: ${character.subclass}!`, `🐲 Ancestral: ${selectedAncestry}`]
                if ([4, 8, 12, 16, 19].includes(updated.level)) {
                  setLevelUpStep(4)
                  setCharacter(updated)
                } else {
                  handleLevelUpPersistence(updated as Character, alerts)
                }
              }}
            >
              Confirmar Linhagem
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
