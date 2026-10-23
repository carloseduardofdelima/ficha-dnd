'use client'

import React from 'react'
import { Plus, Trash2, Users } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function PlayersTab() {
  const {
    campaign,
    router,
    setShowCharModal,
    setCharToUnlink,
  } = useCampaign()

  if (!campaign) return null

  return (
    <div className="characters-section">
      <div className="list-header">
        <h3>Personagens do Grupo</h3>
        {campaign.isOwner && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCharModal(true)}
          >
            <Plus size={16} /> Vincular Personagem
          </button>
        )}
      </div>

      <div className="chars-grid">
        {campaign.characters?.map((link: any) => (
          <div
            key={link.id}
            className="char-mini-card"
            style={{ position: 'relative' }}
            onClick={() => router.push(`/personagens/${link.character.slug}`)}
          >
            {link.character.avatarUrl ? (
              <img src={link.character.avatarUrl} alt={link.character.name} />
            ) : (
              <div className="char-placeholder">{link.character.name[0]}</div>
            )}
            <div
              className="char-details"
              style={{ flex: 1, paddingRight: campaign.isOwner ? '32px' : '0' }}
            >
              <span className="char-name">{link.character.name}</span>
              <span className="char-meta">
                {link.character.race} • {link.character.class} Lvl {link.character.level}
              </span>
            </div>
            {campaign.isOwner && (
              <button
                className="btn-icon-sm danger"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setCharToUnlink(link.character)
                }}
                title="Desvincular Personagem"
                aria-label="Desvincular Personagem"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
        {(!campaign.characters || campaign.characters.length === 0) && (
          <div className="empty-list">
            <Users size={48} opacity={0.2} />
            <p>Nenhum personagem vinculado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
