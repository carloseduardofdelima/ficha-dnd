'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Loader2, BookOpen, Shield } from 'lucide-react'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'

const CLASS_COLORS: Record<string, string> = {
  'Bárbaro': '#f87171', 'Bardo': '#db2777', 'Clérigo': '#fbbf24',
  'Druida': '#10b981', 'Guerreiro': '#9ca3af', 'Monge': '#60a5fa',
  'Paladino': '#f59e0b', 'Patrulheiro': '#047857', 'Ladino': '#4b5563',
  'Feiticeiro': '#8b5cf6', 'Bruxo': '#c084fc', 'Mago': '#3b82f6', 'Artífice': '#d97706'
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function SubclassDetailsPage({ params }: PageProps) {
  const { id } = use(params)
  const [subclass, setSubclass] = useState<{
    name: string
    className: string
    description?: string
    features: Record<number, any[]>
    spells?: string[]
    color: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const decodedName = decodeURIComponent(id)
    let foundSubclass: any = null

    Object.entries(SUBCLASSES_2014).forEach(([className, subclasses]) => {
      Object.entries(subclasses).forEach(([subclassName, data]) => {
        if (subclassName.toLowerCase() === decodedName.toLowerCase()) {
          foundSubclass = {
            name: subclassName,
            className,
            description: data.description,
            features: data.features,
            spells: data.spells,
            color: CLASS_COLORS[className] || 'var(--accent)'
          }
        }
      })
    })

    if (foundSubclass) {
      setSubclass(foundSubclass)
    }
    setLoading(false)
  }, [id])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <Loader2 size={40} className="animate-spin" color="var(--accent)" />
      <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Lendo pergaminhos arcanos...</p>
    </div>
  )

  if (!subclass) return (
    <div style={{ textAlign: 'center', padding: '100px 0' }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--accentL)' }}>Subclasse não encontrada</h2>
      <p style={{ color: 'var(--fg2)', marginBottom: 24 }}>O arquétipo que você procura parece ter sido esquecido.</p>
      <Link href="/subclasses">
        <button className="btn btn-primary">Voltar para Subclasses</button>
      </Link>
    </div>
  )

  return (
    <div className="fade-in">
      <style jsx>{`
        .details-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 24px;
        }
        @media (min-width: 1024px) {
          .details-wrapper {
            grid-template-columns: 1fr 1.5fr;
          }
        }
        .info-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          height: fit-content;
        }
        .timeline-section {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .timeline-item {
          position: relative;
          padding-left: 32px;
          margin-bottom: 32px;
          border-left: 2px solid var(--border);
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-badge {
          position: absolute;
          left: -13px;
          top: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--class-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: var(--fg);
        }
        .spell-badge {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 8px;
          color: var(--fg);
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .spell-badge:hover {
          border-color: var(--class-color);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <Link href="/subclasses">
        <button className="btn btn-ghost" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Voltar para Subclasses
        </button>
      </Link>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${subclass.color}15, var(--bg2))`,
        borderRadius: 16,
        border: '1px solid var(--border)',
        padding: 32,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: -20,
          bottom: -20,
          opacity: 0.05,
          color: subclass.color,
          pointerEvents: 'none'
        }}>
          <BookOpen size={200} />
        </div>

        <span style={{
          background: subclass.color,
          color: 'white',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {subclass.className}
        </span>
        
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '2.5rem',
          color: 'var(--fg)',
          marginTop: 12,
          marginBottom: 8,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          {subclass.name}
        </h1>
        <p style={{ color: 'var(--fg2)', fontSize: 16, margin: 0 }}>
          Arquétipo de classe nas regras clássicas de 2014.
        </p>
      </div>

      <div className="details-wrapper">
        {/* Coluna Esquerda: Informações e Magias */}
        <div className="info-card">
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--accentL)', borderBottom: '2px solid var(--border)', paddingBottom: 12, marginBottom: 20 }}>
            Visão Geral
          </h2>
          <p style={{ color: 'var(--fg2)', lineHeight: 1.7, fontSize: 15, marginBottom: 24 }}>
            {subclass.description || 'As subclasses representam a especialização máxima de sua classe base a partir do nível indicado no D&D 2014. Cada uma fornece habilidades de combate e suporte únicas que modificam radicalmente seu estilo de jogo.'}
          </p>

          {subclass.spells && subclass.spells.length > 0 ? (
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={16} color="var(--accentL)" /> Magias de Expansão
              </h3>
              <p style={{ color: 'var(--fg3)', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                Você adiciona as seguintes magias à sua lista de magias conhecidas/preparadas de classe:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subclass.spells.map(s => (
                  <span key={s} className="spell-badge" style={{ '--class-color': subclass.color } as any}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 10, border: '1px solid var(--border)' }}>
              <Shield size={20} color="var(--fg3)" />
              <div style={{ fontSize: 13, color: 'var(--fg3)', lineHeight: 1.4 }}>
                Esta subclasse foca em habilidades marciais ou características passivas no lugar de listas de magias expandidas.
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita: Progressão */}
        <div className="timeline-section">
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--accentL)', borderBottom: '2px solid var(--border)', paddingBottom: 12, marginBottom: 24 }}>
            Características de Nível
          </h2>
          <div>
            {Object.entries(subclass.features).map(([level, feats]) => (
              <div key={level} className="timeline-item">
                <div className="timeline-badge" style={{ '--class-color': subclass.color } as any}>{level}</div>
                {feats.map((f: any) => (
                  <div key={f.name} style={{ marginBottom: 20 }}>
                    <h4 style={{ margin: 0, fontSize: 16, color: 'var(--fg)', fontWeight: 700 }}>
                      {f.name}
                    </h4>
                    <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--fg3)', lineHeight: 1.6 }}>
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
