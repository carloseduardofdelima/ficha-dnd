'use client'

import React from 'react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

const TABS = [
  { id: 'combat', label: 'Combate', color: 'var(--accent)' },
  { id: 'attributes', label: 'Atributos' },
  { id: 'skills', label: 'Perícias' },
  { id: 'spells', label: 'Magias' },
  { id: 'inventory', label: 'Inventário' },
  { id: 'features', label: 'Características' },
  { id: 'companions', label: 'Companheiros' },
  { id: 'notes', label: 'Notas' },
  { id: 'proficiencies', label: 'Idiomas + Prof' },
  { id: 'about', label: 'Biografia' },
]

export default function CharacterNavTabs() {
  const { activeTab, setActiveTab } = useCharacterSheet()

  return (
    <div
      style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        padding: '0 16px',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
      className="hide-mobile"
    >
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            padding: '16px 20px',
            fontSize: 14,
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            borderBottom: `3px solid ${activeTab === tab.id ? tab.color || 'var(--fg)' : 'transparent'}`,
            color: activeTab === tab.id ? 'var(--fg)' : 'var(--fgM)',
            cursor: 'pointer'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
