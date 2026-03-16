'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Search, Loader2, ArrowRight, Skull } from 'lucide-react'
import { MonsterSummary, MonsterListResponse } from '@/types/monster'

export default function AmeacasPage() {
  const [monsters, setMonsters] = useState<MonsterSummary[]>([])
  const [filteredMonsters, setFilteredMonsters] = useState<MonsterSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Check cache
    const cached = localStorage.getItem('forja_monsters_cache')
    if (cached) {
      try {
        const data = JSON.parse(cached)
        setMonsters(data)
        setFilteredMonsters(data)
        setLoading(false)
        return // Exit if cached
      } catch (e) {
        console.error('Erro ao ler cache de monstros', e)
      }
    }

    // Fetch if no cache
    fetch('https://www.dnd5eapi.co/api/2014/monsters')
      .then(res => res.json())
      .then((data: MonsterListResponse) => {
        setMonsters(data.results)
        setFilteredMonsters(data.results)
        localStorage.setItem('forja_monsters_cache', JSON.stringify(data.results))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const filtered = monsters.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredMonsters(filtered)
  }, [search, monsters])

  return (
    <div className="container">
      <div style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 36,
          marginBottom: 12,
          color: 'var(--accentL)',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <Skull size={32} /> Bestiário
        </h1>
        <p style={{ color: 'var(--fg2)', fontSize: 16 }}>
          Explore as criaturas e ameaças que habitam o multiverso.
        </p>
      </div>

      <div style={{
        position: 'relative',
        marginBottom: 32,
        maxWidth: 500
      }}>
        <div style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--fg3)',
          display: 'flex'
        }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Buscar monstro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 42px',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            color: 'var(--fg)',
            fontSize: 15,
            outline: 'none',
            transition: 'all 0.2s'
          }}
          className="focus-glow"
        />
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 0',
          gap: 16
        }}>
          <Loader2 size={40} className="animate-spin" color="var(--accent)" />
          <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Invocando criaturas...</p>
        </div>
      ) : (
        <div className="grid-monsters">
          {filteredMonsters.map(monster => (
            <Link
              key={monster.index}
              href={`/ameacas/${monster.index}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }} className="monster-card-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'rgba(225, 29, 72, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Shield size={20} color="var(--accentL)" />
                  </div>
                  <span style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--fg)'
                  }}>
                    {monster.name}
                  </span>
                </div>
                <ArrowRight size={18} color="var(--fg3)" />
              </div>
            </Link>
          ))}
          {filteredMonsters.length === 0 && (
            <div style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              padding: '60px 0',
              border: '1px dashed var(--border)',
              borderRadius: 12,
              color: 'var(--fg3)'
            }}>
              Nenhuma criatura encontrada para "{search}".
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .grid-monsters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .monster-card-hover:hover {
          border-color: var(--accent);
          background: var(--bg2);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .focus-glow:focus {
          border-color: var(--accentL);
          box-shadow: 0 0 0 2px var(--accentGlow);
        }

        @media (max-width: 600px) {
          .grid-monsters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
