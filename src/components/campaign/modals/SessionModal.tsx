'use client'

import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function SessionModal() {
  const {
    id,
    showSessionModal,
    setShowSessionModal,
    newSession,
    setNewSession,
    fetchCampaign,
  } = useCampaign()

  const [savingSession, setSavingSession] = useState(false)

  if (!showSessionModal) return null

  return (
    <div className="modal-overlay" onClick={() => setShowSessionModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{(newSession as any).id ? 'Editar Sessão' : 'Nova Sessão'}</h3>
          <button className="close-btn" onClick={() => setShowSessionModal(false)} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form
          className="modal-form"
          onSubmit={async (e) => {
            e.preventDefault()
            setSavingSession(true)
            const isEditing = !!(newSession as any).id
            const url = isEditing
              ? `/api/campanhas/${id}/sessoes/${(newSession as any).id}`
              : `/api/campanhas/${id}/sessoes`

            try {
              const res = await fetch(url, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSession)
              })
              if (res.ok) {
                await fetchCampaign()
                setShowSessionModal(false)
              }
            } catch (err) {
              console.error(err)
            } finally {
              setSavingSession(false)
            }
          }}
        >
          <div className="form-group">
            <label>Título da Sessão</label>
            <input
              type="text"
              value={newSession.title}
              onChange={e => setNewSession({ ...newSession, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Número</label>
            <input
              type="number"
              value={newSession.number}
              onChange={e => setNewSession({ ...newSession, number: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={(newSession as any).date ? new Date((newSession as any).date).toISOString().split('T')[0] : ''}
              onChange={e => setNewSession({ ...newSession, date: e.target.value } as any)}
            />
          </div>
          <div className="form-group">
            <label>Resumo</label>
            <textarea
              rows={4}
              value={newSession.summary}
              onChange={e => setNewSession({ ...newSession, summary: e.target.value })}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setShowSessionModal(false)}
              disabled={savingSession}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={savingSession}>
              {savingSession ? <Loader2 className="animate-spin" size={18} /> : 'Salvar Sessão'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
