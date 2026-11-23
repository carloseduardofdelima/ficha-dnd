'use client'

import React, { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { FeatureChoiceConfig } from '@/lib/feature-choices-2014'

interface FeatureChoiceModalProps {
  choice: FeatureChoiceConfig | null
  onClose: () => void
  onSave: (choice: FeatureChoiceConfig, selectedIds: string[]) => void
}

export default function FeatureChoiceModal({ choice, onClose, onSave }: FeatureChoiceModalProps) {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    if (choice) {
      setSelected(choice.selectedIds || [])
    }
  }, [choice])

  if (!choice) return null

  const isSingle = choice.maxSelections === 1

  const toggleOption = (optId: string) => {
    if (isSingle) {
      setSelected([optId])
      return
    }
    if (selected.includes(optId)) {
      setSelected(selected.filter(id => id !== optId))
    } else if (selected.length < choice.maxSelections) {
      setSelected([...selected, optId])
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      />
      <div
        className="card fade-up"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 540,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          border: '1px solid var(--accent)',
        }}
      >
        <div style={{ background: 'var(--bg2)', padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 19, fontWeight: 700, margin: 0, color: 'var(--fg)' }}>
              {choice.title}
            </h2>
            <p style={{ color: 'var(--fg3)', fontSize: 12, margin: '4px 0 0' }}>
              {choice.subtitle} ({selected.length}/{choice.maxSelections})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--fg3)', cursor: 'pointer', padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {choice.options.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--fg3)', fontSize: 13 }}>
              Nenhuma opção elegível encontrada na ficha.
            </div>
          ) : (
            choice.options.map(opt => {
              const isSelected = selected.includes(opt.id)
              const isDisabled = !isSingle && !isSelected && selected.length >= choice.maxSelections
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => toggleOption(opt.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    background: isSelected ? 'var(--accentGlow)' : 'var(--bg2)',
                    opacity: isDisabled ? 0.45 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: isSelected ? 'var(--accentL)' : 'var(--fg)' }}>
                        {opt.name}
                      </span>
                      {opt.tag && (
                        <span style={{ fontSize: 10, color: 'var(--fg3)', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--fg2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                      {opt.description}
                    </p>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: isSingle ? '50%' : 5,
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                      background: isSelected ? 'var(--accent)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {isSelected && <Check size={13} color="#fff" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, justifyContent: 'flex-end', background: 'var(--bg2)' }}>
          <button type="button" className="btn btn-outline" onClick={onClose} style={{ padding: '8px 16px', fontSize: 13 }}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSave(choice, selected)}
            style={{ padding: '8px 18px', fontSize: 13 }}
          >
            Salvar Escolha
          </button>
        </div>
      </div>
    </div>
  )
}
