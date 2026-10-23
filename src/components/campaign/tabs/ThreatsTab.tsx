'use client'

import React from 'react'
import { Plus, Zap, Shield, Edit, Trash2 } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function ThreatsTab() {
  const {
    campaign,
    fetchGlobalThreats,
    setShowSelectThreatModal,
    handleEditThreat,
    handleDeleteThreat,
  } = useCampaign()

  if (!campaign) return null

  return (
    <div className="threats-section">
      <div className="list-header">
        <h3>Biblioteca de Ameaças</h3>
        {campaign.isOwner && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                fetchGlobalThreats()
                setShowSelectThreatModal(true)
              }}
            >
              <Plus size={16} /> Adicionar do Bestiário
            </button>
          </div>
        )}
      </div>

      <div className="threats-grid">
        {campaign.threats?.map((threat: any) => (
          <div key={threat.id} className="threat-card">
            <div className="threat-type-icon">
              {threat.threatType === 'boss' ? <Zap size={20} color="#f59e0b" /> : <Shield size={20} />}
            </div>
            <div className="threat-info">
              <div className="threat-main">
                <h4>{threat.name}</h4>
                <span className="threat-tag">{threat.threatType?.toUpperCase()}</span>
              </div>
              <div className="threat-stats">
                <span>HP: {threat.attributes?.hp}</span>
                <span>CA: {threat.attributes?.ac}</span>
                <span>CR: {threat.challengeRating}</span>
              </div>
              <p className="threat-desc-short">{threat.description || 'Sem descrição.'}</p>
            </div>
            {campaign.isOwner && (
              <div className="threat-actions-btns">
                <button
                  className="btn-icon"
                  onClick={() => handleEditThreat(threat.id)}
                  aria-label="Editar Ameaça"
                >
                  <Edit size={14} />
                </button>
                <button
                  className="btn-icon danger"
                  onClick={() => handleDeleteThreat(threat.id)}
                  aria-label="Excluir Ameaça"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
        {(!campaign.threats || campaign.threats.length === 0) && (
          <div className="empty-list">
            <Shield size={48} opacity={0.2} />
            <p>Nenhuma ameaça cadastrada nesta campanha.</p>
            {campaign.isOwner && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  fetchGlobalThreats()
                  setShowSelectThreatModal(true)
                }}
              >
                Adicionar do Bestiário
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
