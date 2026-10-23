'use client'

import React from 'react'
import { X } from 'lucide-react'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { SUBCLASSES_2024 } from '@/lib/dnd-subclasses-2024'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function SubclassModal() {
  const {
    isSubclassModalOpen,
    setIsSubclassModalOpen,
    character,
    tempSubclass,
    setTempSubclass,
    handleSelectSubclassDirectly
  } = useCharacterSheet()

  if (!isSubclassModalOpen || !character) return null

  const rulesetToUse = character.ruleset || '2024'
  const subclassData = rulesetToUse === '2024' ? SUBCLASSES_2024 : SUBCLASSES_2014
  let options = Object.keys(subclassData[character.class] || {})

  if (rulesetToUse === '2014') {
    options = options.filter(opt => {
      const sub = subclassData[character.class]?.[opt] as any
      return !sub?.source || sub.source === "Player's Handbook 2014"
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={() => setIsSubclassModalOpen(false)} />

      <div className="card fade-up" style={{ position: 'relative', width: '100%', maxWidth: 460, padding: 0, overflow: 'hidden', border: '1px solid var(--accent)' }}>
        <div style={{ background: 'var(--accent)', padding: '20px 24px', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
            {character.subclass ? 'Alterar Subclasse' : 'Escolher Subclasse'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: '4px 0 0' }}>
            {character.class} (Nível {character.level})
          </p>
          <button 
            onClick={() => setIsSubclassModalOpen(false)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {options.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 20, color: 'var(--fg3)' }}>
                Nenhuma subclasse cadastrada para {character.class} no ruleset D&D {rulesetToUse}.
              </div>
            ) : (
              options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setTempSubclass(opt)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: '1px solid',
                    borderColor: tempSubclass === opt ? 'var(--accent)' : 'var(--border)',
                    background: tempSubclass === opt ? 'var(--accentGlow)' : 'var(--bg2)',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: tempSubclass === opt ? 'var(--accent)' : 'transparent',
                    border: '1px solid var(--accent)'
                  }} />
                  <span style={{ fontWeight: 600, color: tempSubclass === opt ? 'var(--fg1)' : 'var(--fg2)', fontSize: 14 }}>{opt}</span>
                </button>
              ))
            )}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setIsSubclassModalOpen(false)}>Cancelar</button>
            <button
              className="btn bg-accent"
              style={{ flex: 2, justifyContent: 'center' }}
              disabled={!tempSubclass}
              onClick={() => {
                if (tempSubclass) {
                  handleSelectSubclassDirectly(tempSubclass)
                }
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
