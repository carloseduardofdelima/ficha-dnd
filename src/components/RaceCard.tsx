import React from 'react';
import { Race } from '@/lib/races';

interface RaceCardProps {
  race: Race;
  selected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (race: Race) => void;
}

export default function RaceCard({ race, selected, onSelect, onViewDetails }: RaceCardProps) {
  return (
    <div
      onClick={() => onSelect(race.id)}
      className={`card ${selected ? 'selected' : ''}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        border: selected ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
        backgroundColor: selected ? 'rgba(225, 29, 72, 0.05)' : 'var(--bg2)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: selected ? '0 0 20px rgba(225, 29, 72, 0.2)' : 'none',
        transition: 'all 0.2s ease',
        height: '100%',
        minHeight: 400
      }}
    >
      <div style={{
        padding: '24px 24px 12px 12px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 24,
          fontFamily: 'Cinzel, serif',
          color: 'var(--fg)'
        }}>{race.name}</h3>
        <span style={{
          fontSize: 8,
          color: 'var(--fg1)',
          fontStyle: 'italic',
          display: 'block',
          marginTop: -2
        }}>{race.source}</span>
      </div>

      {/* Character Art */}
      <div 
        className="art-container"
        style={{
        height: '60%',
        width: '100%',
        backgroundColor: 'var(--bg2)',
        backgroundImage: `url(${race.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.5s ease',
        filter: 'brightness(0.7)'
      }}>
        {!race.image && <span style={{ opacity: 0.1, fontSize: 40, fontFamily: 'Cinzel' }}>{race.name}</span>}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, var(--bg2) 0%, transparent 100%)',
          zIndex: 1
        }} />
      </div>

      <div style={{
        padding: 20,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg2)',
        position: 'relative',
        zIndex: 2,
        marginTop: '-20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 -10px 20px rgba(0,0,0,0.5)'
      }}>
        <p style={{
          fontSize: 13,
          color: 'var(--fg2)',
          margin: '0 0 16px 0',
          lineHeight: 1.5,
          borderLeft: '2px solid var(--accent)',
          paddingLeft: 12
        }}>
          {race.description}
        </p>

        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--fg3)', textTransform: 'uppercase' }}>Traços</span>
          <div style={{ fontSize: 12, color: 'var(--fg2)', marginTop: 4 }}>
            {race.traits.slice(0, 3).map(t => t.name).join(', ')}
            {race.traits.length > 3 && '...'}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(race);
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
          Ver Detalhes: {race.name}
        </button>
      </div>

      <style jsx>{`
        .card:hover {
          transform: translateY(-4px);
          border-color: var(--accent) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .card:hover .art-container {
          filter: brightness(1) !important;
        }
        .card.selected {
          border-color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
