'use client'

import { useState, useMemo } from 'react'
import { Search, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'

// Paleta de cores premium para cada classe do D&D
const CLASS_COLORS: Record<string, string> = {
  'Bárbaro': '#f87171', 'Bardo': '#db2777', 'Clérigo': '#fbbf24',
  'Druida': '#10b981', 'Guerreiro': '#9ca3af', 'Monge': '#60a5fa',
  'Paladino': '#f59e0b', 'Patrulheiro': '#047857', 'Ladino': '#4b5563',
  'Feiticeiro': '#8b5cf6', 'Bruxo': '#c084fc', 'Mago': '#3b82f6', 'Artífice': '#d97706'
}

// Mapeamento das imagens de subclasses disponíveis nos assets
const SUBCLASS_IMAGES: Record<string, string> = {
  'Campeão': '/assets/subclasses/campeao.webp',
  'Cavaleiro Arcano': '/assets/subclasses/cavaleiro-arcano.webp',
  'Mestre de Batalha': '/assets/subclasses/mestre-de-batalha.png',
  'Linhagem Dracônica': '/assets/subclasses/linhagem-draconica.png',
  'Magia Selvagem': '/assets/subclasses/magia-selvagem.png',
  'Conclave da Besta': '/assets/subclasses/conclave-da-besta.png',
  'Conclave do Caçador': '/assets/subclasses/conclave-do-cacador.png',
  'Conclave do Rastreador Subterrâneo': '/assets/subclasses/conclave-do-rastreador-subterraneo.png',
  'Alquimista': '/assets/subclasses/alquimista.png',
  'Armeiro': '/assets/subclasses/armeiro.png',
  'Atirador': '/assets/subclasses/artilheiro.png',
  'Ferreiro de Batalha': '/assets/subclasses/ferreiro-de-batalha.png'
}

// Fallback para ilustrações oficiais de classe quando a subclasse não tem imagem própria
const CLASS_IMAGE_FALLBACKS: Record<string, string> = {
  'Bárbaro': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Barbarian.webp',
  'Bardo': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Bard.webp',
  'Clérigo': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Cleric.webp',
  'Druida': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Druid.webp',
  'Guerreiro': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Fighter.webp',
  'Monge': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Monk.webp',
  'Paladino': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Paladin.webp',
  'Patrulheiro': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Ranger.webp',
  'Ladino': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Rogue.webp',
  'Feiticeiro': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Sorcerer.webp',
  'Bruxo': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Warlock.webp',
  'Mago': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/PHB/Wizard.webp',
  'Artífice': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/master/classes/TCE/Artificer.webp',
}


export default function SubclassesPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState<string>('all')

  const currentSource = SUBCLASSES_2014
  const classesList = Object.keys(currentSource)

  // Mapeia e filtra os dados de subclasses para renderização em grid
  const subclassesList = useMemo(() => {
    const list: any[] = []
    
    Object.entries(currentSource).forEach(([className, subclasses]) => {
      if (selectedClass !== 'all' && className !== selectedClass) return

      Object.entries(subclasses).forEach(([subclassName, data]) => {
        if (search && !subclassName.toLowerCase().includes(search.toLowerCase())) return
        
        list.push({
          name: subclassName,
          className,
          features: data.features,
          color: CLASS_COLORS[className] || 'var(--accent)'
        })
      })
    })

    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [selectedClass, search, currentSource])

  const handleCardClick = (subName: string) => {
    router.push(`/subclasses/${encodeURIComponent(subName)}`)
  }

  return (
    <div className="fade-in">
      <style jsx>{`
        .subclass-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .subclass-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          min-height: 160px;
        }
        .subclass-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--class-color);
          z-index: 2;
        }
        .subclass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          border-color: var(--class-color);
        }
        .card-image-container {
          position: absolute;
          right: 12px;
          bottom: 0;
          top: 0;
          width: 140px;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 0;
        }
        .card-image {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .subclass-card:hover .card-image {
          transform: scale(1.08) translateY(-4px);
        }
        @media (max-width: 400px) {
          .card-image-container {
            width: 100px;
          }
          .subclass-card {
            min-height: 140px;
          }
        }
      `}</style>

      <main style={{ padding: '20px 0' }}>
        <header style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: 'var(--accentL)' }}>
            Subclasses (Regras de 2014)
          </h1>
          <p style={{ color: 'var(--fg2)', fontSize: 16 }}>
            Explore os arquétipos marciais, origens mágicas e juramentos sagrados clássicos do D&D.
          </p>
        </header>

        {/* Barra de Busca e Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg3)' }}><Search size={18} /></span>
            <input
              type="text"
              placeholder="Buscar subclasse..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 46px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', outline: 'none' }}
            />
          </div>

          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ padding: '12px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg)', outline: 'none', cursor: 'pointer' }}
          >
            <option value="all">Todas as Classes</option>
            {classesList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Grid de Subclasses */}
        <div className="subclass-grid">
          {subclassesList.map((sub, idx) => {
            const imageUrl = SUBCLASS_IMAGES[sub.name] || CLASS_IMAGE_FALLBACKS[sub.className];
            return (
              <div 
                key={sub.name} 
                className="subclass-card fade-up" 
                style={{ '--class-color': sub.color, animationDelay: `${idx * 0.03}s` } as any}
                onClick={() => handleCardClick(sub.name)}
              >
                <div style={{ flex: 1, paddingRight: imageUrl ? '110px' : '0', zIndex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: sub.color, textTransform: 'uppercase', letterSpacing: 1 }}>{sub.className}</span>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 19, margin: '8px 0 4px 0', color: 'var(--fg)' }}>{sub.name}</h3>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {Object.keys(sub.features).map(level => (
                      <span key={level} style={{ fontSize: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 4, color: 'var(--fg2)' }}>
                        Nív. {level}
                      </span>
                    ))}
                  </div>
                </div>

                {imageUrl && (
                  <div className="card-image-container">
                    <img src={imageUrl} alt={sub.name} className="card-image" />
                  </div>
                )}
              </div>
            )
          })}

          {subclassesList.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: 'var(--fg3)' }}>
              <Info size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p>Nenhuma subclasse correspondente encontrada.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
