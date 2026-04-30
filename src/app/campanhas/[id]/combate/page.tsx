'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChevronLeft, Loader2 } from 'lucide-react'
import CombatTab from '../CombatTab'

export default function CombatPage() {
  const { id } = useParams()
  const router = useRouter()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campanhas/${id}`)
      if (res.ok) {
        const data = await res.json()
        setCampaign(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaign()
  }, [id])

  if (loading) {
    return (
      <div className="loading-screen">
        <Loader2 className="animate-spin" size={48} />
        <p>Iniciando Arena de Combate...</p>
        <style jsx>{`
          .loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            background: var(--bg);
            color: var(--fg);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="combat-page">
      <header className="page-header">
        <button className="btn-back" onClick={() => router.push(`/campanhas/${id}`)}>
          <ChevronLeft size={20} /> Voltar para Campanha
        </button>
      </header>

      <main className="page-content">
        <CombatTab 
          campaignId={id as string} 
          campaign={campaign} 
          onUpdate={fetchCampaign} 
        />
      </main>

      <style jsx>{`
        .combat-page {
          min-height: 100vh;
          background: var(--bg);
          padding: 24px;
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 16px;
          max-width: 1400px;
          margin-inline: auto;
        }

        .btn-back {
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg2);
          padding: 10px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }

        .btn-back:hover {
          background: var(--border);
          color: var(--fg);
        }

        .campaign-info h1 {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: var(--accentL);
        }

        .campaign-info p {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .page-content {
          max-width: 1400px;
          margin-inline: auto;
        }

        @media (max-width: 768px) {
          .combat-page { padding: 16px; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>
    </div>
  )
}
