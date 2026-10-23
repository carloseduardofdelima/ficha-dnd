'use client'

import React from 'react'
import { Brain, X } from 'lucide-react'
import { FEATS_2014 } from '@/lib/feats-2014'
import { FEATS_2024 } from '@/lib/dnd-feats-2024'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function FeatsModal() {
  const {
    isFeatModalOpen,
    setIsFeatModalOpen,
    featSearchTerm,
    setFeatSearchTerm,
    character,
    parsedTraits,
    handleAddFeat
  } = useCharacterSheet()

  if (!isFeatModalOpen) return null

  const is2014 = (character?.ruleset === '2014' || character?.ruleset === '5e-custom')
  const catalog = is2014 ? FEATS_2014 : FEATS_2024
  const selectedNames = new Set((parsedTraits?.feats || []).map((f: any) => f.name))

  const filtered = catalog.filter(f => {
    const term = featSearchTerm.toLowerCase()
    const nameMatch = f.name.toLowerCase().includes(term)
    
    const descText = is2014 
      ? ((f as any).benefits || []).join(' ') 
      : ((f as any).description || '')
    const descMatch = descText.toLowerCase().includes(term)
    
    return nameMatch || descMatch
  })

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
        zIndex: 2000,
        backdropFilter: 'blur(8px)',
        padding: 20
      }}
      onClick={() => { setIsFeatModalOpen(false); setFeatSearchTerm(''); }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 550,
          maxHeight: '85vh',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'var(--accent)', padding: 8, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>Talentos</h3>
              <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>
                {is2014 ? 'D&D 5e (2014)' : 'D&D 2024'}
              </span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => { setIsFeatModalOpen(false); setFeatSearchTerm(''); }} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <input
            type="text"
            className="card"
            style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)', fontSize: 14 }}
            placeholder="Buscar talento pelo nome ou descrição..."
            value={featSearchTerm}
            onChange={e => setFeatSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--fg3)', fontSize: 14 }}>
              Nenhum talento encontrado para &ldquo;{featSearchTerm}&rdquo;.
            </div>
          ) : (
            filtered.map((feat: any) => {
              const isAlreadyAdded = selectedNames.has(feat.name)
              const descText = is2014 
                ? (feat.benefits || []).join(' ') 
                : (feat.description || '')

              return (
                <div 
                  key={feat.id} 
                  className="card" 
                  style={{ 
                    padding: 16, 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 12,
                    opacity: isAlreadyAdded ? 0.6 : 1 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)' }}>{feat.name}</div>
                      {feat.requirement && (
                        <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginTop: 2 }}>
                          Pré-requisito: {feat.requirement}
                        </div>
                      )}
                      <div style={{ marginTop: 4 }}>
                        {feat.category && (
                          <span style={{ display: 'inline-block', fontSize: 9, color: 'var(--fg3)', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>
                            {feat.category}
                          </span>
                        )}
                        <span style={{ display: 'inline-block', fontSize: 9, color: 'var(--accentL)', fontWeight: 800, textTransform: 'uppercase', background: 'var(--accentGlow)', padding: '2px 6px', borderRadius: 4, marginLeft: feat.category ? 6 : 0 }}>
                          {feat.source || (is2014 ? 'Livro do Jogador (2014)' : 'Player\'s Handbook (2024)')}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`btn ${isAlreadyAdded ? 'btn-ghost' : 'btn-primary'}`}
                      style={{ height: 32, padding: '0 12px', fontSize: 12, flexShrink: 0 }}
                      disabled={isAlreadyAdded}
                      onClick={() => {
                        const featSource = feat.source || (is2014 ? 'Livro do Jogador (2014)' : 'Player\'s Handbook (2024)')
                        handleAddFeat({ name: feat.name, description: descText, source: featSource })
                      }}
                    >
                      {isAlreadyAdded ? 'Adicionado' : 'Adicionar'}
                    </button>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5 }}>
                    {is2014 ? (
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {(feat.benefits || []).map((benefit: string, idx: number) => (
                          <li key={idx} style={{ marginBottom: 4 }}>{benefit}</li>
                        ))}
                      </ul>
                    ) : (
                      feat.description
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
