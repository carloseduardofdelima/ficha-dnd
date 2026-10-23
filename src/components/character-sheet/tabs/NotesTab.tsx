'use client'

import React from 'react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function NotesTab() {
  const { character, isOwner, updateValue, saveCharacterToDB, saveStatus } = useCharacterSheet()

  if (!character) return null

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, margin: 0 }}>Notas do Personagem</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <textarea
            placeholder="Escreva aqui suas anotações de campanha, segredos, objetivos..."
            value={character.notes || ''}
            readOnly={!isOwner}
            onChange={(e) => isOwner && updateValue('notes', e.target.value, false)}
            style={{
              width: '100%',
              minHeight: '60vh',
              background: 'var(--bg2)',
              color: 'var(--fg)',
              padding: 24,
              border: 'none',
              fontSize: 15,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic' }}>
            {isOwner ? '💾 Clique em salvar para persistir as alterações.' : '👁️ Modo de apenas leitura.'}
          </div>
          {isOwner && (
            <button
              className="btn btn-primary"
              onClick={() => saveCharacterToDB(character)}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Notas'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
