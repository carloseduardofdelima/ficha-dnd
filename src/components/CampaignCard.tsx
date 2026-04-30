'use client'
import Link from 'next/link'
import { Calendar, Users, Target, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    description: string | null
    type: string
    status: string
    progress: number
    coverUrl: string | null
    system: string | null
    updatedAt: Date | string
  }
  onDelete?: (id: string) => void
}

export function CampaignCard({ campaign, onDelete }: CampaignCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const statusColors: Record<string, string> = {
    active: '#10b981',
    paused: '#f59e0b',
    finished: '#3b82f6'
  }

  const statusLabels: Record<string, string> = {
    active: 'ATIVO',
    paused: 'PAUSADO',
    finished: 'FINALIZADO'
  }

  const typeLabels: Record<string, string> = {
    campaign: 'Campanha',
    'one-shot': 'One-Shot'
  }

  return (
    <div className="campaign-card">
      <Link href={`/campanhas/${campaign.id}`} style={{ textDecoration: 'none' }}>
        <div className="campaign-cover">
          {campaign.coverUrl ? (
            <img src={campaign.coverUrl} alt={campaign.name} />
          ) : (
            <div className="cover-placeholder">
              <Target size={48} opacity={0.2} />
            </div>
          )}
          <div className="type-badge">{typeLabels[campaign.type] || campaign.type}</div>
        </div>
      </Link>

      <div className="campaign-info">
        <div className="campaign-header">
          <Link href={`/campanhas/${campaign.id}`} className="campaign-name">
            {campaign.name}
          </Link>
          <div className="menu-container">
            <button onClick={() => setMenuOpen(!menuOpen)} className="menu-btn">
              <MoreVertical size={18} />
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link href={`/campanhas/${campaign.id}/editar`} className="dropdown-item">
                  <Edit2 size={14} /> Editar
                </Link>
                <button onClick={() => onDelete?.(campaign.id)} className="dropdown-item danger">
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="campaign-desc">{campaign.description || 'Sem descrição.'}</p>

        <div className="progress-container">
          <div className="progress-header">
            <span>Progresso</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${campaign.progress}%` }}></div>
          </div>
        </div>

        <div className="campaign-footer">
          <div className="footer-item">
            <Calendar size={14} />
            <span>{new Date(campaign.updatedAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="status-tag" style={{ color: statusColors[campaign.status] }}>
            <span className="status-dot" style={{ backgroundColor: statusColors[campaign.status] }}></span>
            {statusLabels[campaign.status] || campaign.status.toUpperCase()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .campaign-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
        }

        .campaign-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        .campaign-cover {
          height: 140px;
          width: 100%;
          position: relative;
          background: var(--bg2);
        }

        .campaign-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cover-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg);
        }

        .type-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .campaign-info {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .campaign-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .campaign-name {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--fg);
          text-decoration: none;
          line-height: 1.2;
        }

        .campaign-name:hover {
          color: var(--accentL);
        }

        .menu-container {
          position: relative;
        }

        .menu-btn {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
        }

        .menu-btn:hover {
          background: var(--bg2);
          color: var(--fg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 6px;
          min-width: 120px;
          z-index: 10;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          color: var(--fg2);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .dropdown-item:hover {
          background: var(--bg);
          color: var(--fg);
        }

        .dropdown-item.danger {
          color: var(--danger);
        }

        .campaign-desc {
          font-size: 13px;
          color: var(--fg3);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .progress-container {
          margin-top: auto;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          color: var(--fg3);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .progress-bar {
          height: 6px;
          background: var(--bg2);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accentL));
          border-radius: 3px;
        }

        .campaign-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          margin-top: 8px;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--fg3);
        }

        .status-tag {
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
