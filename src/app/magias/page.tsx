'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Loader2, ArrowRight, Wand2, Sparkles } from 'lucide-react'
import { SpellSummary, SpellListResponse } from '@/types/spell'

const LEVELS = [
  { val: 'all', label: 'Todos' },
  { val: '0', label: 'Truques' },
  { val: '1', label: '1º Nível' },
  { val: '2', label: '2º Nível' },
  { val: '3', label: '3º Nível' },
  { val: '4', label: '4º Nível' },
  { val: '5', label: '5º Nível' },
  { val: '6', label: '6º Nível' },
  { val: '7', label: '7º Nível' },
  { val: '8', label: '8º Nível' },
  { val: '9', label: '9º Nível' },
]

export default function MagiasPage() {
  const [spells, setSpells] = useState<SpellSummary[]>([])
  const [filteredSpells, setFilteredSpells] = useState<SpellSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')

  useEffect(() => {
    const fetchSpells = async () => {
      setLoading(true)
      const cacheKey = `forja_spells_cache_${selectedLevel}`
      
      // Try cache
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          const data = JSON.parse(cached)
          setSpells(data)
          setLoading(false)
          return
        } catch (e) {
          console.error('Erro no cache de magias', e)
        }
      }

      // Fetch
      const url = selectedLevel === 'all' 
        ? 'https://www.dnd5eapi.co/api/2014/spells'
        : `https://www.dnd5eapi.co/api/2014/spells?level=${selectedLevel}`

      try {
        const res = await fetch(url)
        const data: SpellListResponse = await res.json()
        setSpells(data.results)
        localStorage.setItem(cacheKey, JSON.stringify(data.results))
      } catch (error) {
        console.error('Erro ao buscar magias', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSpells()
  }, [selectedLevel])

  useEffect(() => {
    const filtered = spells.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredSpells(filtered)
  }, [search, spells])

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
          <Wand2 size={32} /> Grimório SRD
        </h1>
        <p style={{ color: 'var(--fg2)', fontSize: 16 }}>
          Consulte o catálogo completo de magias do Sistema de Referência (SRD).
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '300px',
          maxWidth: '500px'
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
            placeholder="Buscar magia..."
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
              outline: 'none'
            }}
            className="focus-glow"
          />
        </div>
      </div>

      {/* Filtro de Nível */}
      <div className="level-filter">
        {LEVELS.map(l => (
          <button
            key={l.val}
            onClick={() => setSelectedLevel(l.val)}
            className={selectedLevel === l.val ? 'active' : ''}
          >
            {l.label}
          </button>
        ))}
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
          <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Folheando grimórios...</p>
        </div>
      ) : (
        <div className="grid-spells">
          {filteredSpells.map(spell => (
            <Link
              key={spell.index}
              href={`/magias/${spell.index}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="spell-card monster-card-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="icon-badge">
                    <Sparkles size={20} color="var(--accentL)" />
                  </div>
                  <span style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--fg)'
                  }}>
                    {spell.name}
                  </span>
                </div>
                <ArrowRight size={18} color="var(--fg3)" />
              </div>
            </Link>
          ))}
          {filteredSpells.length === 0 && (
            <div className="empty-state">
              Nenhuma magia encontrada para "{search}".
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .level-filter {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 24px;
          scrollbar-width: none;
        }

        .level-filter::-webkit-scrollbar {
          display: none;
        }

        .level-filter button {
          padding: 8px 16px;
          white-space: nowrap;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--fg2);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .level-filter button:hover {
          border-color: var(--accent);
          color: var(--fg);
        }

        .level-filter button.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          font-weight: 600;
          box-shadow: 0 4px 12px var(--accentGlow);
        }

        .grid-spells {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .spell-card {
          background: var(--card);
          border: 1px solid var(--border);
          borderRadius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s;
          cursor: pointer;
        }

        .icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(212, 175, 55, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-state {
          grid-column: 1/-1;
          text-align: center;
          padding: 60px 0;
          border: 1px dashed var(--border);
          border-radius: 12px;
          color: var(--fg3);
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
          .grid-spells {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
