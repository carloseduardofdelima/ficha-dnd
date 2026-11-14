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
  'Mestre de Batalha': '/assets/subclasses/mestre-de-batalha.webp',
  'Linhagem Dracônica': '/assets/subclasses/linhagem-draconica.webp',
  'Magia Selvagem': '/assets/subclasses/magia-selvagem.webp',
  'Conclave da Besta': '/assets/subclasses/conclave-da-besta.webp',
  'Conclave do Caçador': '/assets/subclasses/conclave-do-cacador.webp',
  'Conclave do Rastreador Subterrâneo': '/assets/subclasses/conclave-do-rastreador-subterraneo.webp',
  'Alquimista': '/assets/subclasses/alquimista.webp',
  'Armeiro': '/assets/subclasses/armeiro.webp',
  'Atirador': '/assets/subclasses/artilheiro.webp',
  'Ferreiro de Batalha': '/assets/subclasses/ferreiro-de-batalha.webp',
  'Escola de Abjuração': '/assets/subclasses/escola-de-abjuracao.webp',
  'Abjurador': '/assets/subclasses/escola-de-abjuracao.webp',
  'Escola de Adivinhação': '/assets/subclasses/escola-de-adivinhacao.webp',
  'Adivinho': '/assets/subclasses/escola-de-adivinhacao.webp',
  'Escola de Evocação': '/assets/subclasses/escola-de-evocacao.webp',
  'Evocador': '/assets/subclasses/escola-de-evocacao.webp',
  'Escola de Conjuração': '/assets/subclasses/escola-de-conjuracao.webp',
  'Conjurador': '/assets/subclasses/escola-de-conjuracao.webp',
  'Escola de Necromancia': '/assets/subclasses/escola-de-necromancia.webp',
  'Necromante': '/assets/subclasses/escola-de-necromancia.webp',
  'Escola de Transmutação': '/assets/subclasses/escola-de-transmutacao.webp',
  'Transmutador': '/assets/subclasses/escola-de-transmutacao.webp',
  'Escola de Ilusão': '/assets/subclasses/escola-de-ilusao.webp',
  'Ilusionista': '/assets/subclasses/escola-de-ilusao.webp',
  'Escola de Encantamento': '/assets/subclasses/escola-de-encantamento.webp',
  'Encantador': '/assets/subclasses/escola-de-encantamento.webp',
  'Domínio da Enganação': '/assets/subclasses/dominio-da-enganacao.webp',
  'Domínio da Guerra': '/assets/subclasses/dominio-da-guerra.webp',
  'Domínio da Luz': '/assets/subclasses/dominio-da-luz.webp',
  'Domínio da Natureza': '/assets/subclasses/dominio-da-natureza.webp',
  'Domínio da Ordem': '/assets/subclasses/dominio-da-ordem.webp',
  'Domínio da Paz': '/assets/subclasses/dominio-da-paz.webp',
  'Domínio da Tempestade': '/assets/subclasses/dominio-da-tempestade.webp',
  'Domínio da Vida': '/assets/subclasses/dominio-da-vida.webp',
  'Domínio do Conhecimento': '/assets/subclasses/dominio-do-conhecimento.webp',
  'Domínio do Crepúsculo': '/assets/subclasses/dominio-do-crepusculo.webp',
  'Colégio da Bravura': '/assets/subclasses/colegio-da-bravura.webp',
  'Colégio da Criação': '/assets/subclasses/colegio-da-criacao.webp',
  'Colégio da Eloquência': '/assets/subclasses/colegio-da-eloquencia.webp',
  'Colégio do Conhecimento': '/assets/subclasses/colegio-do-conhecimento.webp',
  'Trilha da Besta': '/assets/subclasses/trilha-da-besta.webp',
  'Caminho da Besta': '/assets/subclasses/trilha-da-besta.webp',
  'Trilha da Magia Selvagem': '/assets/subclasses/trilha-da-magia-selvagem.webp',
  'Caminho da Magia Selvagem': '/assets/subclasses/trilha-da-magia-selvagem.webp',
  'Trilha do Guerreiro Totêmico': '/assets/subclasses/trilha-do-guerreiro-totemico.webp',
  'Caminho do Guerreiro Totêmico': '/assets/subclasses/trilha-do-guerreiro-totemico.webp',
  'Trilha do Furioso': '/assets/subclasses/trilha-do-furioso.webp',
  'Caminho do Furioso': '/assets/subclasses/trilha-do-furioso.webp',
  'Guerreiro Psiônico': '/assets/subclasses/guerreiro-psionico.webp',
  'Cavaleiro Rúnico': '/assets/subclasses/cavaleiro-runico.webp',
  'Guerreiro Rúnico': '/assets/subclasses/cavaleiro-runico.webp',
  'Ladrão': '/assets/subclasses/ladrao.webp',
  'Alma Laminada': '/assets/subclasses/alma-laminada.webp',
  'Fantasma': '/assets/subclasses/fantasma.webp',
  'Assassino': '/assets/subclasses/assassino.webp',
  'Trapaceiro Arcano': '/assets/subclasses/trapaceiro-arcano.webp',
  'Mente Aberrante': '/assets/subclasses/mente-aberrante.webp',
  'Alma Cronométrica': '/assets/subclasses/alma-cronometrica.webp',
  'A Arquifada': '/assets/subclasses/arquifada.webp',
  'Arquifada': '/assets/subclasses/arquifada.webp',
  'O Corruptor': '/assets/subclasses/o-corruptor.webp',
  'O Gênio': '/assets/subclasses/o-genio.webp',
  'O Grande Antigo': '/assets/subclasses/o-grande-antigo.webp',
  'Lâmina Maldita (Hexblade)': '/assets/subclasses/hexblade.webp',
  'Hexblade': '/assets/subclasses/hexblade.webp',
  'O Hexblade': '/assets/subclasses/hexblade.webp',
  'O Insondável': '/assets/subclasses/o-insondavel.webp',
  'Portador do Enxame': '/assets/subclasses/portador-do-enxame.webp',
  'Conclave do Portador do Enxame': '/assets/subclasses/portador-do-enxame.webp',
  'Andarilho Feérico': '/assets/subclasses/andarilho-feerico.webp',
  'Círculo da Lua': '/assets/subclasses/circulo-da-lua.webp',
  'Círculo da Terra': '/assets/subclasses/circulo-da-terra.webp',
  'Círculo das Estrelas': '/assets/subclasses/circulo-das-estrelas.webp',
  'Círculo do Fogo Selvagem': '/assets/subclasses/circulo-do-fogo-selvagem.webp',
  'Círculo dos Esporos': '/assets/subclasses/circulo-dos-esporos.webp',
  'Juramento da Devoção': '/assets/subclasses/juramento-da-devocao.webp',
  'Juramento de Devoção': '/assets/subclasses/juramento-da-devocao.webp',
  'Juramento da Vingança': '/assets/subclasses/juramento-da-vinganca.webp',
  'Juramento de Vingança': '/assets/subclasses/juramento-da-vinganca.webp',
  'Juramento dos Anciãos': '/assets/subclasses/juramento-dos-anciaos.webp',
  'Caminho da Forma Astral': '/assets/subclasses/caminho-da-forma-astral.webp',
  'Caminho do Eu Astral': '/assets/subclasses/caminho-da-forma-astral.webp',
  'Caminho da Mão Aberta': '/assets/subclasses/caminho-da-mao-aberta.webp',
  'Caminho da Misericórdia': '/assets/subclasses/caminho-da-misericordia.webp',
  'Caminho da Sombra': '/assets/subclasses/caminho-da-sombra.webp',
  'Caminho das Sombras': '/assets/subclasses/caminho-da-sombra.webp',
  'Caminho dos Quatro Elementos': '/assets/subclasses/caminho-dos-quatro-elementos.webp',
  'Ordem do Caçador de Espectros': '/assets/subclasses/ordem-do-cacador-de-espectros.webp',
  'Caçador de Espectros': '/assets/subclasses/ordem-do-cacador-de-espectros.webp',
  'Ordem do Licantropo': '/assets/subclasses/ordem-do-licantropo.webp',
  'Licantropo': '/assets/subclasses/ordem-do-licantropo.webp',
  'Ordem do Mutante': '/assets/subclasses/ordem-do-mutante.webp',
  'Mutante': '/assets/subclasses/ordem-do-mutante.webp',
  'Ordem da Alma Profana': '/assets/subclasses/ordem-da-alma-profana.webp',
  'Alma Profana': '/assets/subclasses/ordem-da-alma-profana.webp',
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
          overflow: hidden;
          z-index: 0;
        }
        .card-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: top center;
          transform: scale(1.25);
          transform-origin: top center;
          transition: transform 0.3s ease;
        }
        .subclass-card:hover .card-image {
          transform: scale(1.32);
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
