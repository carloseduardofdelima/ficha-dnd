'use client'

import React, { useState } from 'react'
import { X, Search, Loader2, User } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function CharacterLinkModal() {
  const {
    id,
    campaign,
    showCharModal,
    setShowCharModal,
    myCharacters,
    fetchCampaign,
  } = useCampaign()

  const [search, setSearch] = useState('')
  const [linkingId, setLinkingId] = useState<string | null>(null)

  if (!showCharModal) return null

  const linkedCharIds = new Set(
    campaign?.characters?.map((link: any) => link.characterId || link.character?.id) || []
  )
  const availableCharacters = myCharacters.filter(char => !linkedCharIds.has(char.id))

  const filteredCharacters = availableCharacters.filter(char => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    const nameMatch = char.name?.toLowerCase().includes(q)
    const raceMatch = char.race?.toLowerCase().includes(q)
    const classMatch = char.class?.toLowerCase().includes(q)
    const ownerNameMatch = char.user?.name?.toLowerCase().includes(q)
    const ownerEmailMatch = char.user?.email?.toLowerCase().includes(q)
    return nameMatch || raceMatch || classMatch || ownerNameMatch || ownerEmailMatch
  })

  const handleLink = async (characterId: string) => {
    setLinkingId(characterId)
    try {
      const res = await fetch(`/api/campanhas/${id}/personagens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId })
      })
      if (res.ok) {
        await fetchCampaign()
        setShowCharModal(false)
        setSearch('')
      } else {
        const err = await res.json().catch(() => ({}))
        alert(err.error || 'Não foi possível vincular este personagem.')
      }
    } catch {
      alert('Erro de conexão ao vincular personagem.')
    } finally {
      setLinkingId(null)
    }
  }

  return (
    <div className="modal-overlay" onClick={() => !linkingId && setShowCharModal(false)}>
      <div className="modal-content" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ margin: 0 }}>Vincular Personagem à Campanha</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'var(--fg3)' }}>
              Selecione uma ficha do sistema para adicionar ao grupo.
            </p>
          </div>
          <button className="close-btn" onClick={() => setShowCharModal(false)} disabled={!!linkingId} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '16px 20px 8px 20px' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '8px 12px',
            gap: 8
          }}>
            <Search size={16} color="var(--fg3)" />
            <input
              type="text"
              placeholder="Buscar por nome, classe, raça ou jogador..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--fg)',
                width: '100%',
                fontSize: 13
              }}
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg3)', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="char-picker-list" style={{ maxHeight: 380, overflowY: 'auto', padding: '12px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredCharacters.map(char => (
            <div
              key={char.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                gap: 12,
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                {char.avatarUrl ? (
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border)' }}
                  />
                ) : (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'var(--accentGlow)',
                    color: 'var(--accentL)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                    flexShrink: 0
                  }}>
                    {char.name ? char.name[0]?.toUpperCase() : <User size={18} />}
                  </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {char.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg3)' }}>
                    {char.race || 'Sem raça'} • {char.class || 'Sem classe'} (Nível {char.level || 1})
                  </div>
                  {char.user?.name && (
                    <div style={{ fontSize: 11, color: 'var(--accentL)', marginTop: 2 }}>
                      Jogador: {char.user.name}
                    </div>
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                disabled={linkingId === char.id}
                onClick={() => handleLink(char.id)}
                style={{ flexShrink: 0 }}
              >
                {linkingId === char.id ? <Loader2 size={14} className="animate-spin" /> : 'Vincular'}
              </button>
            </div>
          ))}

          {filteredCharacters.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--fg3)', fontSize: 13 }}>
              {availableCharacters.length === 0
                ? (myCharacters.length === 0
                    ? 'Nenhuma ficha encontrada no sistema.'
                    : 'Todas as fichas do sistema já estão vinculadas a esta campanha.')
                : 'Nenhuma ficha encontrada para esta busca.'}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => setShowCharModal(false)} disabled={!!linkingId}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
