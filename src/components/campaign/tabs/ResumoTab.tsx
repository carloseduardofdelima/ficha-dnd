'use client'

import React from 'react'
import { useCampaign } from '../context/CampaignContext'

export default function ResumoTab() {
  const { id, campaign, setCampaign } = useCampaign()

  if (!campaign) return null

  return (
    <div className="resumo-grid">
      <div className="resumo-main">
        <section className="resumo-section">
          <h3>Sobre a Campanha</h3>
          {campaign.isOwner ? (
            <textarea
              className="editable-textarea"
              placeholder="Clique para adicionar uma descrição..."
              value={campaign.description || ''}
              onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
              onBlur={() =>
                fetch(`/api/campanhas/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ description: campaign.description }),
                })
              }
            />
          ) : (
            <p>{campaign.description || 'Nenhuma descrição fornecida.'}</p>
          )}
        </section>
        {campaign.isOwner && (
          <section className="resumo-section">
            <h3>Notas Internas do Mestre</h3>
            <textarea
              className="editable-textarea master-notes"
              placeholder="Notas que só você pode ver..."
              value={campaign.notes || ''}
              onChange={(e) => setCampaign({ ...campaign, notes: e.target.value })}
              onBlur={() =>
                fetch(`/api/campanhas/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ notes: campaign.notes }),
                })
              }
            />
          </section>
        )}
      </div>
      <div className="resumo-sidebar">
        <div className="sidebar-card">
          <h4>Informações</h4>
          <div className="info-item">
            <label>Status</label>
            {campaign.isOwner ? (
              <select
                className="sidebar-editable-input status-select"
                value={campaign.status || 'ativo'}
                onChange={async (e) => {
                  const val = e.target.value
                  setCampaign({ ...campaign, status: val })
                  await fetch(`/api/campanhas/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: val }),
                  })
                }}
              >
                <option value="ativo">Ativo</option>
                <option value="em pausa">Em Pausa</option>
                <option value="finalizado">Finalizado</option>
              </select>
            ) : (
              <span className={`status-badge status-${(campaign.status || 'ativo').replace(' ', '-')}`}>
                {campaign.status === 'em pausa'
                  ? 'Em Pausa'
                  : campaign.status === 'finalizado'
                  ? 'Finalizado'
                  : 'Ativo'}
              </span>
            )}
          </div>
          <div className="info-item">
            <label>Nível Médio</label>
            <span className="font-bold text-rose-400">
              {campaign.characters?.length > 0
                ? (
                    campaign.characters.reduce(
                      (acc: number, link: any) => acc + (link.character?.level || 0),
                      0
                    ) / campaign.characters.length
                  ).toFixed(1)
                : 'N/A'}
            </span>
          </div>
          <div className="info-item">
            <label>Início</label>
            {campaign.isOwner ? (
              <input
                type="date"
                className="sidebar-editable-input"
                value={
                  campaign.startDate
                    ? new Date(campaign.startDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })}
                onBlur={() =>
                  fetch(`/api/campanhas/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ startDate: campaign.startDate }),
                  })
                }
              />
            ) : (
              <span>
                {campaign.startDate
                  ? new Date(campaign.startDate).toLocaleDateString('pt-BR')
                  : 'Não definido'}
              </span>
            )}
          </div>
          <div className="info-item">
            <label>Tags</label>
            {campaign.isOwner ? (
              <input
                type="text"
                className="sidebar-editable-input"
                placeholder="Ex: Fantasia, Sombrio..."
                value={campaign.tags || ''}
                onChange={(e) => setCampaign({ ...campaign, tags: e.target.value })}
                onBlur={() =>
                  fetch(`/api/campanhas/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tags: campaign.tags }),
                  })
                }
              />
            ) : (
              <span>{campaign.tags || 'Nenhuma'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
