'use client';
import React from 'react';
import { Background } from '@/lib/backgrounds';
import { BookOpen, Shield, Wrench, Languages } from 'lucide-react';

interface BackgroundCardProps {
  background: Background;
  selected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (background: Background) => void;
}

export default function BackgroundCard({ background, selected, onSelect, onViewDetails }: BackgroundCardProps) {
  return (
    <div
      onClick={() => onSelect(background.id)}
      className={`bg-card ${selected ? 'bg-card-selected' : ''}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        border: selected ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.07)',
        backgroundColor: selected ? 'rgba(225, 29, 72, 0.06)' : 'var(--bg2)',
        borderRadius: 12,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: selected ? '0 0 24px rgba(225, 29, 72, 0.2)' : 'none',
        transition: 'all 0.2s ease',
        height: '100%',
        minHeight: 280,
      }}
    >
      {/* Header bar with accent gradient */}
      <div style={{
        height: 6,
        background: selected
          ? 'linear-gradient(90deg, var(--accent2), var(--accent))'
          : 'linear-gradient(90deg, rgba(147,51,234,0.6), rgba(225,29,72,0.4))',
        transition: 'all 0.3s ease'
      }} />

      <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{
            margin: 0,
            fontSize: 20,
            fontFamily: 'Cinzel, serif',
            color: selected ? 'var(--fg)' : 'var(--fg)',
            lineHeight: 1.2
          }}>{background.name}</h3>
          <span style={{ fontSize: 10, color: 'var(--fg3)', fontStyle: 'italic' }}>{background.source}</span>
        </div>

        {/* Description */}
        <p className='bg-card-description' style={{
          fontSize: 14,
          color: 'var(--fg2)',
          lineHeight: 1.5,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {background.description}
        </p>

        {/* Stats rows */}
        <div className='only-mobile' style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <BookOpen size={13} color="var(--accentL)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Perícias</span>
              <span style={{ fontSize: 12, color: 'var(--fg2)' }}>{background.skills.join(', ')}</span>
            </div>
          </div>

          {background.toolProf && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Wrench size={13} color="var(--accentL)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Ferramentas</span>
                <span style={{ fontSize: 12, color: 'var(--fg2)' }}>{background.toolProf}</span>
              </div>
            </div>
          )}

          {background.languages && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Languages size={13} color="var(--accentL)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Idiomas</span>
                <span style={{ fontSize: 12, color: 'var(--fg2)' }}>{background.languages}</span>
              </div>
            </div>
          )}

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(background);
          }}
          className="btn"
          style={{
            marginTop: 'auto',
            width: '100%',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '12px',
            border: 'none',
            borderRadius: 4
          }}
        >
          Ver Detalhes: {background.name}
        </button>
      </div>

      <style jsx>{`
        .bg-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
        }
        .bg-card-selected {
          border-color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
