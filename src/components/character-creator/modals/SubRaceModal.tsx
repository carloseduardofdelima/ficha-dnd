'use client'

import React from 'react'
import { X, ChevronRight } from 'lucide-react'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function SubRaceModal() {
  const {
    subRaceModalOpen,
    setSubRaceModalOpen,
    availableRaces,
    form,
    setForm,
    nextStep,
  } = useCharacterCreator()

  if (!subRaceModalOpen) return null

  const currentRace = availableRaces.find((r: any) => r.name === form.race)

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
        zIndex: 1100,
        backdropFilter: 'blur(10px)',
        padding: 20,
      }}
      onClick={() => setSubRaceModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 800,
          maxHeight: '85vh',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 24 }}>
              {currentRace?.subRaceTitle || 'Escolha sua Linhagem'}
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
              Você selecionou {form.race}. Agora escolha a característica da sua linhagem.
            </p>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => setSubRaceModalOpen(false)}
            style={{ padding: 8, borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            padding: 24,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {currentRace?.lineages?.map((lineage: any) => (
            <div
              key={lineage.name}
              onClick={() => {
                setForm((prev: any) => ({ ...prev, subRace: lineage.name }))
              }}
              style={{
                padding: '10px',
                borderRadius: 12,
                backgroundColor:
                  form.subRace === lineage.name
                    ? 'rgba(var(--accent-rgb, 191,155,48), 0.15)'
                    : 'rgba(255,255,255,0.03)',
                border: `1px solid ${
                  form.subRace === lineage.name ? 'var(--accent)' : 'rgba(255,255,255,0.05)'
                }`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              className="subrace-option"
            >
              {form.subRace === lineage.name && (
                <div style={{ position: 'absolute', top: 12, right: 12, color: 'var(--accent)' }}>
                  <ChevronRight size={16} />
                </div>
              )}
              <h4
                style={{
                  margin: '0 0 12px',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 16,
                  color: form.subRace === lineage.name ? 'var(--accent)' : 'var(--fg)',
                }}
              >
                {lineage.name}
              </h4>
              {lineage.description && (
                <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 12,
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                  }}
                >
                  {lineage.description}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lineage.traits.map((trait: any) => (
                  <div key={trait.name}>
                    <div style={{ fontSize: 11, fontWeight: 'bold', color: '#fff' }}>
                      {trait.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: 1.3,
                      }}
                    >
                      {trait.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '20px 32px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button className="btn btn-ghost" onClick={() => setSubRaceModalOpen(false)}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            disabled={!form.subRace}
            onClick={() => {
              setSubRaceModalOpen(false)
              nextStep()
            }}
            style={{ padding: '12px 32px' }}
          >
            Confirmar e Seguir
          </button>
        </div>
      </div>
    </div>
  )
}
