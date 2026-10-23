'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CharacterMobileMenu() {
  const { isMenuOpen, setIsMenuOpen, setActiveTab } = useCharacterSheet()

  return (
    <>
      {/* Floating Mobile Menu Trigger */}
      <button
        className="mobile-only floating-menu-btn"
        style={{ display: 'none' }}
        onClick={() => setIsMenuOpen(true)}
        aria-label="Abrir Menu de Abas"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay fade-up">
          <div className="menu-grid">
            {[
              { label: 'Biografia', id: 'about' },
              { label: 'Notas', id: 'notes' },
              { label: 'Atributos', id: 'attributes' },
              { label: 'Perícias', id: 'skills' },
              { label: 'Combate', id: 'combat' },
              { label: 'Inventário', id: 'inventory' },
              { label: 'Habilidades', id: 'features' },
              { label: 'Magias', id: 'spells' },
              { label: 'Proficiências', id: 'proficiencies' },
              { label: 'Companheiros', id: 'companions' },
            ].map(item => (
              <div
                key={item.label}
                className="menu-item"
                onClick={() => {
                  if (item.id) setActiveTab(item.id)
                  const scrollItem = item as { scroll?: string }
                  if (scrollItem.scroll) {
                    const el = document.getElementById(scrollItem.scroll)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <button className="menu-close" onClick={() => setIsMenuOpen(false)} aria-label="Fechar Menu">
            <X size={24} />
          </button>
        </div>
      )}
    </>
  )
}
