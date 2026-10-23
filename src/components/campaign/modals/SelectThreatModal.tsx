'use client'

import React from 'react'
import Link from 'next/link'
import { X, Skull } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function SelectThreatModal() {
  const {
    showSelectThreatModal,
    setShowSelectThreatModal,
    allGlobalThreats,
    linkingThreat,
    handleLinkThreat,
  } = useCampaign()

  if (!showSelectThreatModal) return null

  return (
    <div className="modal-overlay" onClick={() => setShowSelectThreatModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Adicionar do Bestiário</h3>
          <button className="close-btn" onClick={() => setShowSelectThreatModal(false)} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body scrollable" style={{ padding: 20, maxHeight: '60vh', overflowY: 'auto' }}>
          <p style={{ color: 'var(--fg3)', fontSize: 13, marginBottom: 16 }}>
            Selecione uma ameaça da sua biblioteca global para importar nesta campanha.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {allGlobalThreats.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border)', borderRadius: 12 }}>
                <p style={{ color: 'var(--fg3)' }}>Nenhuma ameaça disponível no Bestiário.</p>
                <Link href="/ameacas" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
                  Ir para o Bestiário
                </Link>
              </div>
            ) : (
              allGlobalThreats.map(threat => (
                <div key={threat.id} className="char-mini-card" style={{ cursor: 'default' }}>
                  <div className="threat-type-icon" style={{ background: 'var(--bg2)', padding: 8, borderRadius: 8 }}>
                    <Skull size={20} color="var(--accentL)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--fg)' }}>{threat.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg3)' }}>
                      CR {threat.challengeRating} • {threat.threatType?.toUpperCase()}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={linkingThreat}
                    onClick={() => handleLinkThreat(threat.id)}
                  >
                    {linkingThreat ? 'Adicionando...' : 'Adicionar'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setShowSelectThreatModal(false)}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
