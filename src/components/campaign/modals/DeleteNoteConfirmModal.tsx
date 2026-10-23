'use client'

import React from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function DeleteNoteConfirmModal() {
  const {
    noteToDelete,
    setNoteToDelete,
    deletingNote,
    confirmDeleteNote,
  } = useCampaign()

  if (!noteToDelete) return null

  return (
    <div className="modal-overlay" onClick={() => !deletingNote && setNoteToDelete(null)}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: '20px 24px' }}>
          <h3>Excluir Nota</h3>
          <button className="close-btn" onClick={() => setNoteToDelete(null)} disabled={deletingNote} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body" style={{ padding: '20px 24px', color: 'var(--fg2)', fontSize: '14px', lineHeight: 1.6 }}>
          Tem certeza que deseja excluir esta nota? Esta ação é permanente e não poderá ser desfeita.
        </div>
        <div className="modal-footer" style={{ padding: '16px 24px 20px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setNoteToDelete(null)} disabled={deletingNote}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: 'var(--danger)', color: '#fff' }}
            onClick={confirmDeleteNote}
            disabled={deletingNote}
          >
            {deletingNote ? <Loader2 className="animate-spin" size={18} /> : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}
