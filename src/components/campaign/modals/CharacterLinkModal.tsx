'use client'

import React from 'react'
import { X } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function CharacterLinkModal() {
  const {
    id,
    showCharModal,
    setShowCharModal,
    myCharacters,
    fetchCampaign,
  } = useCampaign()

  if (!showCharModal) return null

  return (
    <div className="modal-overlay" onClick={() => setShowCharModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Vincular Personagem</h3>
          <button className="close-btn" onClick={() => setShowCharModal(false)} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="char-picker-list">
          {myCharacters.map(char => (
            <button
              key={char.id}
              className="char-picker-item"
              onClick={async () => {
                const res = await fetch(`/api/campanhas/${id}/personagens`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ characterId: char.id })
                })
                if (res.ok) {
                  await fetchCampaign()
                  setShowCharModal(false)
                }
              }}
            >
              {char.name} ({char.race} {char.class})
            </button>
          ))}
          {myCharacters.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--fg3)', fontSize: '13px' }}>
              Nenhum personagem disponível para vincular.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
