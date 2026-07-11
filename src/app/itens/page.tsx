'use client'

import React, { useState, useMemo } from 'react'
import weapons from '@/lib/items/weapons.json'
import armor from '@/lib/items/armor.json'
import tools from '@/lib/items/tools.json'
import wondrousItems from '@/lib/items/wondrous-items.json'
import poisons from '@/lib/items/poisons.json'
import adventuringGear from '@/lib/items/adventuring-gear.json'
import potionsOils from '@/lib/items/potions-oils.json'
import other from '@/lib/items/other.json'

const itemsData = [
  ...weapons,
  ...armor,
  ...tools,
  ...wondrousItems,
  ...poisons,
  ...adventuringGear,
  ...potionsOils,
  ...other
]
import { 
  Search, 
  Sword, 
  Shield, 
  Wrench, 
  Sparkles, 
  Skull, 
  Compass, 
  FlaskConical, 
  Coins, 
  Scale, 
  Flame, 
  RotateCcw,
  BookOpen
} from 'lucide-react'

// Icon mapping per category
const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  "Weapon": { label: "Arma", color: "#e11d48", icon: <Sword size={16} /> },
  "Armor": { label: "Armadura", color: "#3b82f6", icon: <Shield size={16} /> },
  "Tools": { label: "Ferramenta", color: "#eab308", icon: <Wrench size={16} /> },
  "Wondrous Item": { label: "Item Maravilhoso", color: "#a855f7", icon: <Sparkles size={16} /> },
  "Poisons": { label: "Veneno", color: "#22c55e", icon: <Skull size={16} /> },
  "Adventuring Gear": { label: "Equipamento", color: "#f97316", icon: <Compass size={16} /> },
  "Potions and Oils": { label: "Poção / Óleo", color: "#06b6d4", icon: <FlaskConical size={16} /> },
  "Other": { label: "Outros", color: "#64748b", icon: <BookOpen size={16} /> }
}

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAttunementOnly, setShowAttunementOnly] = useState(false)

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
    setShowAttunementOnly(false)
  }

  // Filter items based on criteria
  const filteredItems = useMemo(() => {
    return itemsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true
      const matchesAttunement = showAttunementOnly ? item.attunement === true : true

      return matchesSearch && matchesCategory && matchesAttunement
    })
  }, [searchTerm, selectedCategory, showAttunementOnly])

  return (
    <div className="fade-in">
      <style jsx>{`
        .filters-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 20px;
          border-radius: 16px;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--fg);
          font-size: 15px;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 10px var(--accentGlow);
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--fg3);
          pointer-events: none;
          z-index: 2;
        }

        .category-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cat-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--fg2);
          transition: all 0.2s;
        }

        .cat-btn:hover {
          color: var(--fg);
          border-color: var(--fg3);
        }

        .cat-btn.active {
          background: var(--accentGlow);
          border-color: var(--accent);
          color: var(--accentL);
        }

        .attunement-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: var(--fg2);
          cursor: pointer;
          user-select: none;
        }

        .custom-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid var(--border);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: transparent;
          flex-shrink: 0;
        }

        .attunement-checkbox:checked + .custom-checkbox {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          box-shadow: 0 0 8px var(--accentGlow);
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .item-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .item-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 15px var(--accentGlow);
        }

        .item-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .item-title-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-title {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .item-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border);
        }

        .stat-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--fg2);
          background: var(--bg);
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }

        .item-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .item-description {
          font-size: 14px;
          color: var(--fg2);
          line-height: 1.6;
          white-space: pre-line;
          margin: 0;
        }

        .attunement-badge {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(168, 85, 247, 0.1);
          color: #c084fc;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          color: var(--fg3);
        }

        @media (max-width: 640px) {
          .filters-container {
            padding: 16px;
          }
          .items-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main style={{ padding: '20px 0' }}>
        {/* Header */}
        <header style={{ marginBottom: 40, textAlign: 'center' }}>
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
            <Sword size={16} />
            D&D 5ª Edição
          </div>
          <h1 style={{ 
            fontFamily: 'Cinzel, serif', 
            fontSize: '2.5rem', 
            margin: '0 0 12px', 
            background: 'linear-gradient(to right, #fff, var(--fgM))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Compêndio de Itens
          </h1>
          <p style={{ color: 'var(--fg2)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Consulte equipamentos, armas, armaduras, ferramentas e itens mágicos para equipar seus personagens na campanha.
          </p>
        </header>

        {/* Filters */}
        <div className="filters-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: '100%' }}>
            <div className="search-wrapper">
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--fg3)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
              <input 
                type="text"
                className="search-input"
                placeholder="Pesquisar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Clear button */}
            {(searchTerm || selectedCategory || showAttunementOnly) && (
              <button 
                className="cat-btn"
                onClick={handleClearFilters}
                style={{ height: 46 }}
              >
                <RotateCcw size={16} />
                Limpar Filtros
              </button>
            )}
          </div>

          {/* Category buttons */}
          <div className="category-buttons">
            <button 
              className={`cat-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todos os Tipos
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`cat-btn ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {config.icon}
                {config.label}
              </button>
            ))}
          </div>

          {/* Attunement Filter */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <label className="attunement-toggle">
              <input 
                type="checkbox"
                className="attunement-checkbox"
                style={{ display: 'none' }}
                checked={showAttunementOnly}
                onChange={(e) => setShowAttunementOnly(e.target.checked)}
              />
              <div className="custom-checkbox">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Apenas Itens que Requerem Sintonia</span>
            </label>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: 20, color: 'var(--fg3)', fontSize: 14, fontWeight: 600 }}>
          Mostrando {filteredItems.length} de {itemsData.length} itens cadastrados
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map((item, idx) => {
              const catConf = CATEGORY_CONFIG[item.category] || { label: item.category, color: "var(--border)", icon: <BookOpen size={16} /> }
              
              return (
                <div 
                  key={`${item.name}-${idx}`} 
                  className="item-card fade-up"
                  style={{ animationDelay: `${(idx % 10) * 0.05}s` }}
                >
                  {/* Header */}
                  <div className="item-header">
                    <div className="item-title-box">
                      <h3 className="item-title" style={{ color: catConf.color }}>
                        {item.name}
                      </h3>
                      <div className="category-badge" style={{ 
                        background: `${catConf.color}15`, 
                        color: catConf.color, 
                        border: `1px solid ${catConf.color}30` 
                      }}>
                        {catConf.icon}
                        {catConf.label}
                      </div>
                    </div>
                  </div>

                  {/* Quick stats row */}
                  {(item.cost || item.ac || item.damage || item.classification) && (
                    <div className="item-stats">
                      {item.cost && (
                        <div className="stat-badge" title="Preço">
                          <Coins size={14} style={{ color: "var(--accent)" }} />
                          <span>{item.cost}</span>
                        </div>
                      )}
                      {item.ac && (
                        <div className="stat-badge" title="Classe de Armadura">
                          <Shield size={14} style={{ color: "#3b82f6" }} />
                          <span>{item.ac}</span>
                        </div>
                      )}
                      {item.damage && (
                        <div className="stat-badge" title="Dano">
                          <Sword size={14} style={{ color: "#e11d48" }} />
                          <span>{item.damage}</span>
                        </div>
                      )}
                      {item.classification && (
                        <div className="stat-badge" title="Classificação">
                          <Scale size={14} style={{ color: "#a855f7" }} />
                          <span>{item.classification}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Body */}
                  <div className="item-body">
                    <p className="item-description">
                      {item.description}
                    </p>
                    
                    {item.properties && !item.classification && (
                      <div style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 'auto' }}>
                        <strong>Propriedades:</strong> {item.properties}
                      </div>
                    )}

                    {item.attunement && (
                      <div className="attunement-badge">
                        <Flame size={12} />
                        Requer Sintonia
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <h3 style={{ margin: '0 0 8px', fontSize: 18, color: 'var(--fg2)' }}>Nenhum item encontrado</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Tente alterar a pesquisa ou remover os filtros aplicados.</p>
          </div>
        )}
      </main>
    </div>
  )
}
