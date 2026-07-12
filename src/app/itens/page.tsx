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
import magicTableA from '@/lib/items/magic-table-a.json'
import magicTableB from '@/lib/items/magic-table-b.json'
import magicTableC from '@/lib/items/magic-table-c.json'
import magicTableD from '@/lib/items/magic-table-d.json'
import magicTableE from '@/lib/items/magic-table-e.json'
import magicTableF from '@/lib/items/magic-table-f.json'
import magicTableG from '@/lib/items/magic-table-g.json'
import magicTableH from '@/lib/items/magic-table-h.json'
import magicTableI from '@/lib/items/magic-table-i.json'
import { getItemIconUrl, cleanDescription } from '@/lib/items/icons'

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
  const [rolledItem, setRolledItem] = useState<any | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showRollModal, setShowRollModal] = useState(false)
  const [rollCategoryFilter, setRollCategoryFilter] = useState<string>('all')

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

        .item-icon-wrapper {
          width: 46px;
          height: 46px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          padding: 4px;
          transition: all 0.25s ease;
        }

        .item-icon-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .item-card:hover .item-icon-img {
          transform: scale(1.12);
        }

        .item-card:hover .item-icon-wrapper {
          border-color: rgba(225, 29, 72, 0.3);
          background: rgba(255, 255, 255, 0.04);
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

            {/* Random Item Generator Button */}
            <button 
              className="cat-btn"
              onClick={() => {
                // Pre-set the pool category filter to current selected category if one is active
                setRollCategoryFilter(selectedCategory || 'all')
                const pool = (selectedCategory 
                  ? itemsData.filter(i => i.category === selectedCategory) 
                  : itemsData)
                if (pool.length > 0) {
                  const randomIndex = Math.floor(Math.random() * pool.length)
                  setRolledItem(pool[randomIndex])
                }
                setIsRolling(true)
                setShowRollModal(true)
                setTimeout(() => {
                  setIsRolling(false)
                }, 800)
              }}
              style={{
                marginLeft: 'auto',
                background: 'var(--accent)',
                color: '#fff',
                borderColor: 'var(--accent2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                boxShadow: '0 4px 12px var(--accentGlow)',
                transition: 'all 0.2s'
              }}
            >
              <Flame size={16} className={isRolling ? 'animate-pulse' : ''} />
              Gerar Item Aleatório
            </button>
          </div>
        </div>

        {/* Modal for Rolled Item */}
        {showRollModal && rolledItem && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }} onClick={() => setShowRollModal(false)}>
            <div style={{
              background: 'var(--bg2)',
              border: '2px solid var(--accent)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px var(--accentGlow)',
              overflow: 'hidden',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }} onClick={(e) => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div style={{
                padding: '20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.02)'
              }}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--accentL)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={20} />
                  Gerador de Item Aleatório
                </h3>
                <button 
                  onClick={() => setShowRollModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--fg2)',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '4px 8px'
                  }}
                >
                  &times;
                </button>
              </div>

              {/* Category Filter selector within Modal */}
              <div style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--border)',
                background: 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <span style={{ fontSize: '13px', color: 'var(--fg2)', fontWeight: '600' }}>Filtrar Categoria:</span>
                <select
                  value={rollCategoryFilter}
                  onChange={(e) => {
                    const newCat = e.target.value
                    setRollCategoryFilter(newCat)
                    
                    let rolledItemObj = null
                    if (newCat === 'table-a') {
                      const randomIndex = Math.floor(Math.random() * magicTableA.length)
                      const tableItem = magicTableA[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-b') {
                      const randomIndex = Math.floor(Math.random() * magicTableB.length)
                      const tableItem = magicTableB[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-c') {
                      const randomIndex = Math.floor(Math.random() * magicTableC.length)
                      const tableItem = magicTableC[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-d') {
                      const randomIndex = Math.floor(Math.random() * magicTableD.length)
                      const tableItem = magicTableD[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-e') {
                      const randomIndex = Math.floor(Math.random() * magicTableE.length)
                      const tableItem = magicTableE[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-f') {
                      const randomIndex = Math.floor(Math.random() * magicTableF.length)
                      const tableItem = magicTableF[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-g') {
                      const randomIndex = Math.floor(Math.random() * magicTableG.length)
                      const tableItem = magicTableG[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-h') {
                      const randomIndex = Math.floor(Math.random() * magicTableH.length)
                      const tableItem = magicTableH[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (newCat === 'table-i') {
                      const randomIndex = Math.floor(Math.random() * magicTableI.length)
                      const tableItem = magicTableI[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else {
                      const pool = newCat === 'all' 
                        ? itemsData 
                        : itemsData.filter(i => i.category === newCat)
                      
                      if (pool.length > 0) {
                        const randomIndex = Math.floor(Math.random() * pool.length)
                        rolledItemObj = pool[randomIndex]
                      }
                    }
                    
                    if (rolledItemObj) {
                      setRolledItem(rolledItemObj)
                      setIsRolling(true)
                      setTimeout(() => {
                        setIsRolling(false)
                      }, 500)
                    }
                  }}
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">Todas as Categorias</option>
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                  <option value="table-a">Tabela Mágica A (Comum Minor)</option>
                  <option value="table-b">Tabela Mágica B (Incomum Minor)</option>
                  <option value="table-c">Tabela Mágica C (Rara Minor)</option>
                  <option value="table-d">Tabela Mágica D (Muito Rara Minor)</option>
                  <option value="table-e">Tabela Mágica E (Lendária Minor)</option>
                  <option value="table-f">Tabela Mágica F (Incomum Major)</option>
                  <option value="table-g">Tabela Mágica G (Rara Major)</option>
                  <option value="table-h">Tabela Mágica H (Muito Rara Major)</option>
                  <option value="table-i">Tabela Mágica I (Lendária Major)</option>
                </select>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {isRolling ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 0',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      border: '4px solid var(--border)',
                      borderTop: '4px solid var(--accent)',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    <p style={{ color: 'var(--fg2)', fontStyle: 'italic' }}>Consultando o compêndio arcano...</p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      {getItemIconUrl(rolledItem.name, rolledItem.category || rolledItem.type) && (
                        <div style={{
                          width: '64px',
                          height: '64px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          flexShrink: 0
                        }}>
                          <img 
                            src={getItemIconUrl(rolledItem.name, rolledItem.category || rolledItem.type)!} 
                            alt={rolledItem.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      <div>
                        {rolledItem.d100 && (
                          <div style={{ fontSize: '12px', color: 'var(--accentL)', fontWeight: 'bold', marginBottom: '2px' }}>
                            Rolagem d100: {rolledItem.d100}
                          </div>
                        )}
                        <h4 style={{
                          fontFamily: 'Cinzel, serif',
                          fontSize: '22px',
                          fontWeight: '700',
                          color: CATEGORY_CONFIG[rolledItem.category]?.color || 'var(--fg)',
                          margin: '0 0 4px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {rolledItem.name}
                          <a 
                            href={`https://www.google.com/search?q=${encodeURIComponent('dnd 5e ' + (rolledItem.englishName || rolledItem.name))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              color: 'var(--accentL)',
                              textDecoration: 'none',
                              fontSize: '12px',
                              fontWeight: 'normal',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border)',
                              transition: 'all 0.2s'
                            }}
                            title="Pesquisar no Google"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--accent)';
                              e.currentTarget.style.color = '#fff';
                              e.currentTarget.style.borderColor = 'var(--accent2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'var(--accentL)';
                              e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                          >
                            🔍 Pesquisar
                          </a>
                        </h4>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          background: `${CATEGORY_CONFIG[rolledItem.category]?.color || 'var(--border)'}15`,
                          color: CATEGORY_CONFIG[rolledItem.category]?.color || 'var(--fg)'
                        }}>
                          {CATEGORY_CONFIG[rolledItem.category]?.icon || <BookOpen size={12} />}
                          {CATEGORY_CONFIG[rolledItem.category]?.label || rolledItem.category || rolledItem.type || 'Item'}
                        </div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    {(rolledItem.cost || rolledItem.ac || rolledItem.damage || rolledItem.classification) && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                      }}>
                        {rolledItem.cost && (
                          <div className="stat-badge" title="Preço">
                            <Coins size={14} style={{ color: "var(--accent)" }} />
                            <span>{rolledItem.cost}</span>
                          </div>
                        )}
                        {rolledItem.ac && (
                          <div className="stat-badge" title="Classe de Armadura">
                            <Shield size={14} style={{ color: "#3b82f6" }} />
                            <span>{rolledItem.ac}</span>
                          </div>
                        )}
                        {rolledItem.damage && (
                          <div className="stat-badge" title="Dano">
                            <Sword size={14} style={{ color: "#e11d48" }} />
                            <span>{rolledItem.damage}</span>
                          </div>
                        )}
                        {rolledItem.classification && (
                          <div className="stat-badge" title="Classificação">
                            <Scale size={14} style={{ color: "#a855f7" }} />
                            <span>{rolledItem.classification}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' }}>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--fg2)',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-line',
                        margin: 0
                      }}>
                        {rolledItem.description ? cleanDescription(rolledItem.description) : 'Nenhuma descrição detalhada disponível.'}
                      </p>
                    </div>

                    {(rolledItem.properties || rolledItem.rarity || rolledItem.source) && (
                      <div style={{ fontSize: '13px', color: 'var(--fg2)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {rolledItem.properties && !rolledItem.classification && (
                          <div><strong>Propriedades:</strong> {rolledItem.properties}</div>
                        )}
                        {rolledItem.rarity && (
                          <div><strong>Raridade:</strong> <span style={{ textTransform: 'capitalize' }}>{rolledItem.rarity}</span></div>
                        )}
                        {rolledItem.source && (
                          <div><strong>Fonte:</strong> {rolledItem.source}</div>
                        )}
                      </div>
                    )}

                    {rolledItem.attunement && (
                      <div className="attunement-badge" style={{ alignSelf: 'flex-start' }}>
                        <Flame size={12} />
                        Requer Sintonia
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.01)'
              }}>
                <button
                  className="cat-btn"
                  onClick={() => {
                    let rolledItemObj = null
                    if (rollCategoryFilter === 'table-a') {
                      const randomIndex = Math.floor(Math.random() * magicTableA.length)
                      const tableItem = magicTableA[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-b') {
                      const randomIndex = Math.floor(Math.random() * magicTableB.length)
                      const tableItem = magicTableB[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-c') {
                      const randomIndex = Math.floor(Math.random() * magicTableC.length)
                      const tableItem = magicTableC[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-d') {
                      const randomIndex = Math.floor(Math.random() * magicTableD.length)
                      const tableItem = magicTableD[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-e') {
                      const randomIndex = Math.floor(Math.random() * magicTableE.length)
                      const tableItem = magicTableE[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-f') {
                      const randomIndex = Math.floor(Math.random() * magicTableF.length)
                      const tableItem = magicTableF[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-g') {
                      const randomIndex = Math.floor(Math.random() * magicTableG.length)
                      const tableItem = magicTableG[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-h') {
                      const randomIndex = Math.floor(Math.random() * magicTableH.length)
                      const tableItem = magicTableH[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else if (rollCategoryFilter === 'table-i') {
                      const randomIndex = Math.floor(Math.random() * magicTableI.length)
                      const tableItem = magicTableI[randomIndex]
                      const detailed = itemsData.find(i => i.name.toLowerCase() === tableItem.name.toLowerCase())
                      rolledItemObj = detailed ? { ...detailed, d100: tableItem.d100, rarity: tableItem.rarity, source: tableItem.source } : { ...tableItem, category: 'Wondrous Item' }
                    } else {
                      const pool = rollCategoryFilter === 'all'
                        ? itemsData
                        : itemsData.filter(i => i.category === rollCategoryFilter)
                      
                      if (pool.length > 0) {
                        const randomIndex = Math.floor(Math.random() * pool.length)
                        rolledItemObj = pool[randomIndex]
                      }
                    }

                    if (rolledItemObj) {
                      setRolledItem(rolledItemObj)
                      setIsRolling(true)
                      setTimeout(() => {
                        setIsRolling(false)
                      }, 600)
                    }
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <RotateCcw size={14} />
                  Girar Novamente
                </button>
                <button
                  className="cat-btn"
                  onClick={() => setShowRollModal(false)}
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    borderColor: 'var(--accent2)'
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div style={{ marginBottom: 20, color: 'var(--fg3)', fontSize: 14, fontWeight: 600 }}>
          Mostrando {filteredItems.length} de {itemsData.length} itens cadastrados
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map((item, idx) => {
              const catConf = CATEGORY_CONFIG[item.category] || { label: item.category, color: "var(--border)", icon: <BookOpen size={16} /> }
              const iconUrl = getItemIconUrl(item.name, item.category)
              
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
                    {iconUrl && (
                      <div className="item-icon-wrapper" style={{ borderColor: `${catConf.color}40` }}>
                        <img src={iconUrl} alt={item.name} className="item-icon-img" />
                      </div>
                    )}
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
                      {cleanDescription(item.description)}
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
