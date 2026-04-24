'use client'

import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { OLYMPIAN_GODS } from '@/lib/gods'
import { Zap, Compass, Sparkles } from 'lucide-react'

export default function GodsPage() {
  return (
    <div className="fade-in">
      <style jsx>{`
        .gods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .god-card {
          padding: 0;
          overflow: hidden;
          background: var(--bg2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          border-radius: 12px;
        }
        .god-header {
          height: 100px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 20px;
          border-bottom: 1px solid var(--border);
        }
        .god-icon-box {
          font-size: 40px;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          border-radius: 16px;
          line-height: 1;
        }
        .god-body {
          padding: 24px;
        }
        .god-name {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          margin: 0;
        }
        @media (max-width: 640px) {
          .gods-grid {
            gap: 10px;
          }
          .god-header {
            height: 80px;
            padding: 0 12px;
            gap: 10px;
          }
          .god-icon-box {
            font-size: 24px;
            width: 44px;
            height: 44px;
            border-radius: 10px;
          }
          .god-name {
            font-size: 16px;
          }
          .god-title {
            font-size: 10px !important;
          }
          .god-body {
            padding: 12px;
          }
          .god-description {
            font-size: 12px !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
      
      <main style={{ padding: '20px 0' }}>
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '8px 16px', 
            background: 'rgba(225, 29, 72, 0.1)', 
            borderRadius: 100,
            color: 'var(--accentL)',
            marginBottom: 16,
            fontSize: 14,
            fontWeight: 600,
            border: '1px solid rgba(225, 29, 72, 0.2)'
          }}>
            <Sparkles size={16} />
            D&D: A Odisseia
          </div>
          <h1 style={{ 
            fontFamily: 'Cinzel, serif', 
            fontSize: '2rem', 
            margin: '0 0 16px', 
            background: 'linear-gradient(to right, #fff, var(--fgM))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            O Panteão Olímpico
          </h1>
          <p style={{ color: 'var(--fg2)', fontSize: 18, maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            Os doze soberanos do Olimpo que regem o destino dos mortais e as forças da natureza nesta campanha épica.
          </p>
        </header>

        <div className="gods-grid">
          {OLYMPIAN_GODS.map((god, idx) => (
            <div 
              key={god.id}
              className="god-card fade-up"
              style={{ 
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              {/* Header with icon */}
              <div className="god-header" style={{ 
                background: `linear-gradient(135deg, ${god.color}22, ${god.color}05)`,
              }}>
                <div className="god-icon-box" style={{ 
                  boxShadow: `0 8px 16px ${god.color}11`,
                  border: `1px solid ${god.color}33`
                }}>
                  {god.icon}
                </div>
                <div>
                  <h3 className="god-name" style={{ color: god.color }}>
                    {god.name}
                  </h3>
                  <p className="god-title" style={{ fontSize: 12, color: 'var(--fgM)', margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {god.title}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="god-body">
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                    <Zap size={14} style={{ color: god.color }} />
                    Domínio
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--fg)' }}>{god.domain}</p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                    <Compass size={14} style={{ color: god.color }} />
                    Tendência
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--fg2)' }}>{god.alignment}</p>
                </div>

                <p className="god-description" style={{ 
                  fontSize: 14, 
                  color: 'var(--fg3)', 
                  lineHeight: 1.6, 
                  margin: 0,
                  fontStyle: 'italic',
                  borderTop: '1px solid var(--border)',
                  paddingTop: 16
                }}>
                  "{god.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
