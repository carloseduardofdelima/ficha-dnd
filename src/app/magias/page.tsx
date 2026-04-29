'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, Wand2, Sparkles, Filter, ChevronRight, BookOpen, User, Shield, Zap, Info, X, Clock, Globe, Wind, Layers } from 'lucide-react'
import { ALL_SPELLS, Spell } from '@/lib/spells'
import Image from 'next/image'

const LEVELS = [
  { val: 'all', label: 'Todos os Níveis' },
  { val: 0, label: 'Truques' },
  { val: 1, label: '1º Nível' },
  { val: 2, label: '2º Nível' },
  { val: 3, label: '3º Nível' },
  { val: 4, label: '4º Nível' },
  { val: 5, label: '5º Nível' },
  { val: 6, label: '6º Nível' },
  { val: 7, label: '7º Nível' },
  { val: 8, label: '8º Nível' },
  { val: 9, label: '9º Nível' },
]

const SCHOOLS = [
  'Abjuração', 'Adivinhação', 'Conjuração', 'Encantamento',
  'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'
]

const CLASSES = [
  'Artífice', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro'
]

const SCHOOL_COLORS: Record<string, string> = {
  'Abjuração': '#60a5fa', 'Adivinhação': '#a78bfa', 'Conjuração': '#34d399',
  'Encantamento': '#f472b6', 'Evocação': '#f87171', 'Ilusão': '#c084fc',
  'Necromancia': '#94a3b8', 'Transmutação': '#fbbf24',
}

const SCHOOL_ICONS: Record<string, string> = {
  'Abjuração': '/assets/spells-icons/protection-field.png',
  'Conjuração': '/assets/spells-icons/teleport-swirl.png',
  'Adivinhação': '/assets/spells-icons/all-seeing-eye.png',
  'Encantamento': '/assets/spells-icons/mind-waves.png',
  'Evocação': '/assets/spells-icons/fire-blast.png',
  'Ilusão': '/assets/spells-icons/mirror-image.png',
  'Necromancia': '/assets/spells-icons/undead-skull.png',
  'Transmutação': '/assets/spells-icons/elemental-spiral.png',
}

export default function MagiasPage() {
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | number>('all')
  const [selectedSchool, setSelectedSchool] = useState<string>('all')
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredSpells = useMemo(() => {
    return ALL_SPELLS.filter(spell => {
      const matchesSearch = spell.name.toLowerCase().includes(search.toLowerCase())
      const matchesLevel = selectedLevel === 'all' || spell.level === Number(selectedLevel)
      const matchesSchool = selectedSchool === 'all' || spell.school === selectedSchool
      const matchesClass = selectedClass === 'all' || spell.classes.includes(selectedClass)
      return matchesSearch && matchesLevel && matchesSchool && matchesClass
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [search, selectedLevel, selectedSchool, selectedClass])

  // Close modal with ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSpell(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="container">
      {/* Header Section */}
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
          <Wand2 size={32} /> Grimório de Magias
        </h1>
        <p style={{ color: 'var(--fg2)', fontSize: 16 }}>
          Explore o catálogo completo de magias das regras de 2014.
        </p>
      </div>

      <div className="spells-layout">
        {/* Botão de Filtros Mobile */}
        <button 
          className="mobile-filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} /> {showFilters ? 'Fechar Filtros' : 'Filtrar Magias'}
        </button>

        {/* Sidebar Lateral */}
        <aside className={`filters-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
          <div className="sidebar-section">
            <h3 className="section-title"><Search size={16} /> Buscar</h3>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Nome da magia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sidebar-input"
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title"><Filter size={16} /> Nível</h3>
            <div className="filter-group">
              {LEVELS.map(l => (
                <button
                  key={l.val}
                  onClick={() => { setSelectedLevel(l.val); if(window.innerWidth < 1024) setShowFilters(false); }}
                  className={`filter-btn ${selectedLevel === l.val ? 'active' : ''}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title"><BookOpen size={16} /> Escola</h3>
            <div className="filter-group">
              <button
                onClick={() => { setSelectedSchool('all'); if(window.innerWidth < 1024) setShowFilters(false); }}
                className={`filter-btn ${selectedSchool === 'all' ? 'active' : ''}`}
              >
                Todas as Escolas
              </button>
              {SCHOOLS.map(s => (
                <button
                  key={s}
                  onClick={() => { setSelectedSchool(s); if(window.innerWidth < 1024) setShowFilters(false); }}
                  className={`filter-btn ${selectedSchool === s ? 'active' : ''}`}
                >
                  <span style={{ 
                    width: 8, height: 8, borderRadius: '50%', 
                    backgroundColor: SCHOOL_COLORS[s], marginRight: 8,
                    display: 'inline-block'
                  }}></span>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title"><User size={16} /> Classe</h3>
            <div className="filter-group">
              <button
                onClick={() => { setSelectedClass('all'); if(window.innerWidth < 1024) setShowFilters(false); }}
                className={`filter-btn ${selectedClass === 'all' ? 'active' : ''}`}
              >
                Todas as Classes
              </button>
              {CLASSES.map(c => (
                <button
                  key={c}
                  onClick={() => { setSelectedClass(c); if(window.innerWidth < 1024) setShowFilters(false); }}
                  className={`filter-btn ${selectedClass === c ? 'active' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid Principal */}
        <main className="spells-main">
          <div className="results-count">
            Encontradas <strong>{filteredSpells.length}</strong> magias
          </div>

          <div className="grid-spells">
            {filteredSpells.map(spell => (
              <div 
                key={spell.id} 
                className="spell-card-new"
                onClick={() => setSelectedSpell(spell)}
              >
                <div className="spell-card-header">
                  <div className="school-tag hide-mobile" style={{ color: SCHOOL_COLORS[spell.school] }}>
                    {spell.school}
                  </div>
                  <div className="level-badge">
                    {spell.level === 0 ? 'T' : `${spell.level}`}
                  </div>
                </div>
                
                <h2 className="spell-name">{spell.name}</h2>
                
                <div className="spell-meta hide-mobile">
                  <div className="meta-item"><Zap size={12} /> {spell.castingTime}</div>
                  <div className="meta-item"><Shield size={12} /> {spell.duration}</div>
                </div>

                <div className="spell-classes hide-mobile">
                  {spell.classes.slice(0, 3).map(c => (
                    <span key={c} className="class-pill">{c}</span>
                  ))}
                  {spell.classes.length > 3 && <span className="class-pill">+ {spell.classes.length - 3}</span>}
                </div>

                <div className="card-footer">
                  <span>Detalhes</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}

            {filteredSpells.length === 0 && (
              <div className="empty-state">
                <Info size={40} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p>Nenhuma magia encontrada com os filtros selecionados.</p>
                <button 
                  onClick={() => {
                    setSearch('')
                    setSelectedLevel('all')
                    setSelectedSchool('all')
                    setSelectedClass('all')
                  }}
                  className="reset-btn"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal de Detalhes */}
      {selectedSpell && (
        <div className="modal-overlay" onClick={() => setSelectedSpell(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedSpell(null)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedSpell.name}</h2>
                <div className="modal-tags">
                  <span className="level-tag">{selectedSpell.level === 0 ? 'TRUQUE' : `${selectedSpell.level}º NÍVEL`}</span>
                  <span className="school-tag-modal" style={{ color: SCHOOL_COLORS[selectedSpell.school] }}>de {selectedSpell.school}</span>
                  {selectedSpell.ritual && <span className="badge-ritual">RITUAL</span>}
                  {selectedSpell.concentration && <span className="badge-concentration">CONCENTRAÇÃO</span>}
                </div>
              </div>
              {SCHOOL_ICONS[selectedSpell.school] && (
                <div className="modal-icon hide-mobile">
                  <Image src={SCHOOL_ICONS[selectedSpell.school]} alt={selectedSpell.school} width={64} height={64} />
                </div>
              )}
            </div>

            <div className="modal-info-grid">
              <div className="info-box">
                <Clock size={16} color="var(--accentL)" />
                <div>
                  <label>Tempo</label>
                  <span>{selectedSpell.castingTime}</span>
                </div>
              </div>
              <div className="info-box">
                <Globe size={16} color="var(--accent2)" />
                <div>
                  <label>Alcance</label>
                  <span>{selectedSpell.range}</span>
                </div>
              </div>
              <div className="info-box">
                <Wind size={16} color="var(--fg2)" />
                <div>
                  <label>Componentes</label>
                  <span>{selectedSpell.components}</span>
                </div>
              </div>
              <div className="info-box">
                <Shield size={16} color="var(--accentL)" />
                <div>
                  <label>Duração</label>
                  <span>{selectedSpell.duration}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <h3 className="body-title">Descrição</h3>
              <p className="description-text">{selectedSpell.description}</p>

              {selectedSpell.damageEffect && (
                <>
                  <h3 className="body-title" style={{ marginTop: 24 }}>Efeito</h3>
                  <p className="effect-text">{selectedSpell.damageEffect}</p>
                  {selectedSpell.attackSave && <p className="save-text">Salvaguarda/Ataque: {selectedSpell.attackSave}</p>}
                </>
              )}

              <h3 className="body-title" style={{ marginTop: 24 }}>Classes</h3>
              <div className="classes-list">
                {selectedSpell.classes.map(c => (
                  <span key={c} className="class-badge">{c}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
               <Link href={`/magias/${selectedSpell.id}`}>
                 <button className="btn btn-ghost" style={{ width: '100%', fontSize: 13 }}>Ver página completa</button>
               </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .spells-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
        }

        .mobile-filters-toggle {
          display: none;
          width: 100%;
          padding: 12px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--fg);
          font-weight: 700;
          font-size: 14px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
          cursor: pointer;
        }

        .filters-sidebar {
          position: sticky;
          top: 84px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: var(--bg2);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--border);
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-title {
          font-size: 12px;
          font-weight: 800;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .sidebar-input {
          width: 100%;
          padding: 10px 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--fg);
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .sidebar-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accentGlow);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filter-btn {
          text-align: left;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: var(--fg2);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }

        .filter-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--fg);
        }

        .filter-btn.active {
          background: var(--accentGlow);
          color: var(--accentL);
          font-weight: 600;
        }

        .spells-main {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .results-count {
          font-size: 14px;
          color: var(--fg2);
          margin-bottom: 8px;
        }

        .grid-spells {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .spell-card-new {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .spell-card-new:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4);
          background: var(--bg2);
        }

        .spell-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .school-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .level-badge {
          width: 24px;
          height: 24px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: var(--accentL);
        }

        .spell-name {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--fg);
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .spell-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--fg3);
        }

        .spell-classes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          margin-bottom: 16px;
        }

        .class-pill {
          font-size: 10px;
          background: rgba(255,255,255,0.05);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--fg2);
          border: 1px solid var(--border);
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          color: var(--accentL);
          opacity: 0.6;
        }

        /* ── MODAL STYLES ────────────────────────────────────────────────── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: var(--card);
          width: 100%;
          max-width: 650px;
          max-height: 90vh;
          border-radius: 20px;
          border: 1px solid var(--border);
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }

        .close-btn:hover {
          background: var(--accentGlow);
          color: var(--accentL);
          border-color: var(--accent);
        }

        .modal-header {
          padding: 32px;
          background: linear-gradient(135deg, var(--bg2), transparent);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-title {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          color: var(--accentL);
          margin: 0 0 12px 0;
        }

        .modal-tags {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .level-tag {
          background: var(--accent);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 800;
        }

        .school-tag-modal {
          font-size: 14px;
          font-weight: 600;
          font-style: italic;
        }

        .badge-ritual, .badge-concentration {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .badge-ritual { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
        .badge-concentration { color: #a78bfa; background: rgba(167, 139, 250, 0.1); }

        .modal-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--border);
          gap: 1px;
          border-bottom: 1px solid var(--border);
        }

        .info-box {
          background: var(--card);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-box label {
          display: block;
          font-size: 9px;
          color: var(--fg3);
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 2px;
        }

        .info-box span {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: var(--fg);
        }

        .modal-body {
          padding: 32px;
          overflow-y: auto;
          flex: 1;
        }

        .body-title {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--accentL);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .description-text {
          font-size: 14px;
          line-height: 1.6;
          color: var(--fg);
          white-space: pre-wrap;
        }

        .effect-text {
          font-size: 16px;
          font-weight: 700;
          color: var(--accentL);
        }

        .save-text {
          font-size: 12px;
          color: var(--fg2);
          margin-top: 4px;
        }

        .classes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .class-badge {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 12px;
          color: var(--fg);
        }

        .modal-footer {
          padding: 16px 32px;
          border-top: 1px solid var(--border);
          background: var(--bg2);
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* ── RESPONSIVIDADE ────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .spells-layout {
            grid-template-columns: 1fr;
          }
          .mobile-filters-toggle {
            display: flex;
          }
          .filters-sidebar {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 2000;
            background: var(--bg);
            padding: 40px 24px;
            overflow-y: auto;
            border-radius: 0;
          }
          .filters-sidebar.mobile-visible {
            display: flex;
          }
          .filter-group {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .filter-btn {
            background: var(--bg2);
            border: 1px solid var(--border);
          }
        }

        @media (max-width: 768px) {
          .modal-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .modal-header { padding: 24px; }
          .modal-body { padding: 24px; }
          .modal-title { font-size: 24px; }
          .hide-mobile { display: none !important; }
        }

        @media (max-width: 600px) {
          .grid-spells {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .spell-card-new {
            padding: 16px;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 16px;
          }
          .spell-card-header {
            margin-bottom: 0;
            order: 2;
          }
          .spell-name {
            margin: 0;
            font-size: 16px;
            flex: 1;
            order: 1;
          }
          .card-footer {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
