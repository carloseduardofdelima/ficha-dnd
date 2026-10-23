'use client'

import React from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function UnlinkCharConfirmModal() {
  const {
    charToUnlink,
    setCharToUnlink,
    unlinkingChar,
    confirmUnlinkChar,
  } = useCampaign()

  if (!charToUnlink) return null

  return (
    <div className="modal-overlay" onClick={() => !unlinkingChar && setCharToUnlink(null)}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: '20px 24px' }}>
          <h3>Desvincular Personagem</h3>
          <button className="close-btn" onClick={() => setCharToUnlink(null)} disabled={unlinkingChar} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body" style={{ padding: '20px 24px', color: 'var(--fg2)', fontSize: '14px', lineHeight: 1.6 }}>
          Tem certeza que deseja desvincular o personagem <strong>{charToUnlink.name}</strong> desta campanha?
        </div>
        <div className="modal-footer" style={{ padding: '16px 24px 20px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setCharToUnlink(null)} disabled={unlinkingChar}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: 'var(--danger)', color: '#fff' }}
            onClick={confirmUnlinkChar}
            disabled={unlinkingChar}
          >
            {unlinkingChar ? <Loader2 className="animate-spin" size={18} /> : 'Desvincular'}
          </button>
        </div>
      </div>
    </div>
  )
}
