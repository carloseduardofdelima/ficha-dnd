'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCharacterCreator, STEPS } from '../context/CharacterCreatorContext'

export default function CreatorFooterNav() {
  const { currentStep, prevStep, nextStep, canGoNext, form } = useCharacterCreator()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="character-info-footer"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}
      >
        <span
          style={{
            fontSize: 10,
            color: 'var(--fg3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Personagem
        </span>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {form.name || 'Sem nome'} • {form.race || 'Sem raça'}
          {form.subRace ? ` (${form.subRace})` : ''}
          {form.class ? ` • ${form.class}` : ''}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {currentStep > 0 && (
          <button
            className="btn btn-ghost"
            onClick={prevStep}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <ChevronLeft size={18} /> Anterior
          </button>
        )}

        {currentStep < STEPS.length - 1 && (
          <button
            className="btn btn-primary"
            onClick={nextStep}
            disabled={!canGoNext()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px' }}
          >
            Próximo: {STEPS[currentStep + 1]} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
