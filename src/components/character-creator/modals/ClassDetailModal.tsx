'use client'

import React from 'react'
import { X } from 'lucide-react'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function ClassDetailModal() {
  const { detailClass, setDetailClass, handleClassSelect } = useCharacterCreator()

  if (!detailClass) return null

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
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
      onClick={() => setDetailClass(null)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 700,
          maxHeight: '90vh',
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
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
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 32 }}>{detailClass.name}</h2>
            <span
              style={{
                fontSize: 13,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {detailClass.source}
            </span>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => setDetailClass(null)}
            style={{ padding: 8, borderRadius: '50%' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: 32, overflowY: 'auto' }}>
          <div style={{ marginBottom: 32 }}>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                fontStyle: 'italic',
              }}
            >
              &quot;{detailClass.description}&quot;
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>
                  Dado de Vida
                </span>
                <div style={{ fontWeight: 'bold', color: 'var(--accentL)', fontSize: 18 }}>
                  {detailClass.hitDie}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>
                  Atributo Principal
                </span>
                <div style={{ fontWeight: 'bold' }}>{detailClass.primaryAttr}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>
                  Salvaguardas
                </span>
                <div style={{ fontWeight: 'bold' }}>{detailClass.savingThrows.join(', ')}</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>
                  Armaduras
                </span>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>
                  {detailClass.armorProf}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>
                  Armas
                </span>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>
                  {detailClass.weaponProf}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 20,
                marginBottom: 16,
                borderBottom: '1px solid var(--accent)',
                display: 'inline-block',
              }}
            >
              Habilidades de Classe
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {detailClass.features.map((feature) => (
                <div key={feature.name}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: 'var(--fg)',
                      marginBottom: 4,
                    }}
                  >
                    {feature.name}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.95)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'right',
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              handleClassSelect(detailClass.id)
              setDetailClass(null)
            }}
            style={{ padding: '12px 32px' }}
          >
            Selecionar {detailClass.name}
          </button>
        </div>
      </div>
    </div>
  )
}
