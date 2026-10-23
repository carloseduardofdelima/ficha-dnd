'use client'

import React from 'react'
import { Target, Plus, Edit, Trash2, Calendar } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function SessionsTab() {
  const {
    id,
    campaign,
    setCampaign,
    newSession,
    setNewSession,
    setShowSessionModal,
    handleDeleteSession,
  } = useCampaign()

  if (!campaign) return null

  return (
    <div className="sessions-list">
      <div className="list-header">
        <div className="header-title-meta">
          <h3>Diário de Sessões</h3>
          {campaign.isOwner && (
            <div className="target-sessions-badge">
              <Target size={14} className="text-rose-500" />
              <div className="flex items-center gap-2">
                <span className="badge-label">Sessões planejadas</span>
                <input
                  type="number"
                  min="0"
                  className="target-input"
                  value={campaign.targetSessions ?? 0}
                  onChange={(e) => {
                    const val = e.target.value === '' ? '' : parseInt(e.target.value)
                    setCampaign({ ...campaign, targetSessions: val })
                  }}
                  onBlur={async () => {
                    const val = typeof campaign.targetSessions === 'number' ? campaign.targetSessions : 0
                    await fetch(`/api/campanhas/${id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ targetSessions: val }),
                    })
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      ;(e.target as HTMLInputElement).blur()
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {campaign.isOwner && (
          <button
            className="btn btn-primary btn-sm btn-new-session"
            onClick={() => {
              setNewSession({ ...newSession, number: (campaign.sessions?.length || 0) + 1 })
              setShowSessionModal(true)
            }}
          >
            <Plus size={16} /> Nova Sessão
          </button>
        )}
      </div>

      <div className="sessions-grid">
        {campaign.sessions?.map((s: any) => (
          <div key={s.id} className="session-card">
            <div className="session-num">#{s.number}</div>
            <div className="session-info">
              <div className="flex justify-between items-start">
                <h4>{s.title}</h4>
                {campaign.isOwner && (
                  <div className="flex gap-2">
                    <button
                      className="btn-icon-sm"
                      onClick={() => {
                        setNewSession({
                          ...s,
                          date: s.date ? new Date(s.date).toISOString().split('T')[0] : '',
                        })
                        setShowSessionModal(true)
                      }}
                      aria-label="Editar Sessão"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn-icon-sm danger"
                      onClick={() => handleDeleteSession(s.id)}
                      aria-label="Excluir Sessão"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <p>{s.summary}</p>
              <div className="session-date">
                {s.date ? new Date(s.date).toLocaleDateString('pt-BR') : 'Sem data'}
              </div>
            </div>
          </div>
        ))}
        {(!campaign.sessions || campaign.sessions.length === 0) && (
          <div className="empty-list">
            <Calendar size={48} opacity={0.2} />
            <p>Nenhuma sessão registrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
