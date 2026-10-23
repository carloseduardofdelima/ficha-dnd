'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Shield } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function CampaignBanner() {
  const { id, campaign, router } = useCampaign()

  if (!campaign) return null

  return (
    <div
      className="campaign-banner"
      style={{
        backgroundImage: campaign.coverUrl
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${campaign.coverUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: campaign.coverUrl ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)',
      }}
    >
      <button onClick={() => router.push('/campanhas')} className="back-btn">
        <ChevronLeft size={20} /> Voltar
      </button>
      <div className="banner-content">
        <div className="banner-info">
          <h1 className="campaign-title">{campaign.name}</h1>
          <div className="campaign-meta">
            <span>{campaign.type === 'campaign' ? 'Campanha' : 'One-Shot'}</span>
            <span className="dot">•</span>
            <span>{campaign.system}</span>
            <span className="dot">•</span>
            <span
              className="status-tag"
              style={{
                color:
                  campaign.status === 'active'
                    ? '#10b981'
                    : campaign.status === 'paused'
                    ? '#f59e0b'
                    : '#3b82f6',
              }}
            >
              <span
                className="status-dot"
                style={{
                  backgroundColor:
                    campaign.status === 'active'
                      ? '#10b981'
                      : campaign.status === 'paused'
                      ? '#f59e0b'
                      : '#3b82f6',
                }}
              ></span>
              {campaign.status === 'active'
                ? 'ATIVO'
                : campaign.status === 'paused'
                ? 'PAUSADO'
                : 'FINALIZADO'}
            </span>
          </div>
        </div>
        <div className="banner-actions">
          {campaign.isOwner && (
            <Link
              href={`/campanhas/${id}/escudo`}
              className="flex items-center justify-center gap-4 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-bold py-6 px-12 rounded-xl border border-rose-600/50 transition-all duration-300 uppercase tracking-[0.2em] text-[12px] backdrop-blur-md shadow-2xl shadow-black/60 hover:border-rose-500 hover:text-rose-200 no-underline"
            >
              <Shield size={24} className="opacity-90" /> Escudo do Mestre
            </Link>
          )}

          {campaign.type === 'campaign' && (
            <div className="progress-widget">
              <div className="progress-info">
                <span>Progresso</span>
                <span>
                  {campaign.targetSessions > 0
                    ? Math.min(
                        Math.round(((campaign.sessions?.length || 0) / campaign.targetSessions) * 100),
                        100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${
                      campaign.targetSessions > 0
                        ? Math.min(
                            Math.round(
                              ((campaign.sessions?.length || 0) / campaign.targetSessions) * 100
                            ),
                            100
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
