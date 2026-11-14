'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Loader2, BookOpen, Shield } from 'lucide-react'
import { SUBCLASSES_2014 } from '@/lib/dnd-subclasses-2014'
import { getSpellConditions } from '@/lib/dnd-conditions'

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


interface PageProps {
  params: Promise<{ id: string }>
}

export default function SubclassDetailsPage({ params }: PageProps) {
  const { id } = use(params)
  const [subclass, setSubclass] = useState<{
    name: string
    className: string
    description?: string
    features: Record<number, any[]>
    spells?: string[]
    color: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const decodedName = decodeURIComponent(id)
    let foundSubclass: any = null

    Object.entries(SUBCLASSES_2014).forEach(([className, subclasses]) => {
      Object.entries(subclasses).forEach(([subclassName, data]) => {
        if (subclassName.toLowerCase() === decodedName.toLowerCase()) {
          foundSubclass = {
            name: subclassName,
            className,
            description: data.description,
            features: data.features,
            spells: data.spells,
            color: CLASS_COLORS[className] || 'var(--accent)'
          }
        }
      })
    })

    if (foundSubclass) {
      setSubclass(foundSubclass)
    }
    setLoading(false)
  }, [id])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <Loader2 size={40} className="animate-spin" color="var(--accent)" />
      <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Lendo pergaminhos arcanos...</p>
    </div>
  )

  if (!subclass) return (
    <div style={{ textAlign: 'center', padding: '100px 0' }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', color: 'var(--accentL)' }}>Subclasse não encontrada</h2>
      <p style={{ color: 'var(--fg2)', marginBottom: 24 }}>O arquétipo que você procura parece ter sido esquecido.</p>
      <Link href="/subclasses">
        <button className="btn btn-primary">Voltar para Subclasses</button>
      </Link>
    </div>
  )

  const imageUrl = SUBCLASS_IMAGES[subclass.name] || CLASS_IMAGE_FALLBACKS[subclass.className]

  return (
    <div className="fade-in">
      <style jsx>{`
        .details-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 24px;
        }
        @media (min-width: 1024px) {
          .details-wrapper {
            grid-template-columns: 1fr 1.5fr;
          }
        }
        .info-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          height: fit-content;
        }
        .timeline-section {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .timeline-item {
          position: relative;
          padding-left: 32px;
          margin-bottom: 32px;
          border-left: 2px solid var(--border);
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-badge {
          position: absolute;
          left: -13px;
          top: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--class-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          color: var(--fg);
        }
        .spell-badge {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 8px;
          color: var(--fg);
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .spell-badge:hover {
          border-color: var(--class-color);
          background: rgba(255, 255, 255, 0.05);
        }
        .header-content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }
        .header-image-container {
          width: 280px;
          height: 280px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .header-image-container {
            width: 220px;
            height: 220px;
          }
        }
        @media (max-width: 768px) {
          .header-image-container {
            width: 180px;
            height: 180px;
          }
        }
        @media (max-width: 600px) {
          .header-image-container {
            width: 140px;
            height: 140px;
          }
          .header-content {
            gap: 16px;
          }
        }
        .header-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transform: scale(1.15);
          transform-origin: top center;
        }
      `}</style>

      <Link href="/subclasses">
        <button className="btn btn-ghost" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Voltar para Subclasses
        </button>
      </Link>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${subclass.color}15, var(--bg2))`,
        borderRadius: 16,
        border: '1px solid var(--border)',
        padding: '16px 32px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: -20,
          bottom: -20,
          opacity: 0.03,
          color: subclass.color,
          pointerEvents: 'none'
        }}>
          <BookOpen size={240} />
        </div>

        <div className="header-content">
          <div style={{ zIndex: 1, flex: 1 }}>
            <span style={{
              background: subclass.color,
              color: 'white',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {subclass.className}
            </span>

            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '2.5rem',
              color: 'var(--fg)',
              marginTop: 12,
              marginBottom: 8,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {subclass.name}
            </h1>
            <p style={{ color: 'var(--fg2)', fontSize: 16, margin: 0 }}>
              Arquétipo de classe nas regras clássicas de 2014.
            </p>
          </div>

          {imageUrl && (
            <div className="header-image-container" style={{ zIndex: 1 }}>
              <img src={imageUrl} alt={subclass.name} className="header-image" />
            </div>
          )}
        </div>
      </div>

      <div className="details-wrapper">
        {/* Coluna Esquerda: Informações e Magias */}
        <div className="info-card">
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--accentL)', borderBottom: '2px solid var(--border)', paddingBottom: 12, marginBottom: 20 }}>
            Visão Geral
          </h2>
          <p style={{ color: 'var(--fg2)', lineHeight: 1.7, fontSize: 15, marginBottom: 24 }}>
            {subclass.description || 'As subclasses representam a especialização máxima de sua classe base a partir do nível indicado no D&D 2014. Cada uma fornece habilidades de combate e suporte únicas que modificam radicalmente seu estilo de jogo.'}
          </p>

          {subclass.spells && subclass.spells.length > 0 ? (
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={16} color="var(--accentL)" /> Magias de Expansão
              </h3>
              <p style={{ color: 'var(--fg2)', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                Você adiciona as seguintes magias à sua lista de magias conhecidas/preparadas de classe:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subclass.spells.map(s => (
                  <span key={s} className="spell-badge" style={{ '--class-color': subclass.color } as any}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 10, border: '1px solid var(--border)' }}>
              <Shield size={20} color="var(--fg2)" />
              <div style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.4 }}>
                Esta subclasse foca em habilidades marciais ou características passivas no lugar de listas de magias expandidas.
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita: Progressão */}
        <div className="timeline-section">
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--accentL)', borderBottom: '2px solid var(--border)', paddingBottom: 12, marginBottom: 24 }}>
            Características de Nível
          </h2>
          <div>
            {Object.entries(subclass.features).map(([level, feats]) => (
              <div key={level} className="timeline-item">
                <div className="timeline-badge" style={{ '--class-color': subclass.color } as any}>{level}</div>
                {feats.map((f: any) => {
                  const conditions = getSpellConditions({ description: f.description })
                  return (
                    <div key={f.name} style={{ marginBottom: 20 }}>
                      <h4 style={{ margin: 0, fontSize: 16, color: 'var(--fg)', fontWeight: 700 }}>
                        {f.name}
                      </h4>
                      <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6 }}>
                        {f.description}
                      </p>
                      {conditions.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                          {conditions.map(cond => (
                            <div key={cond.name} style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid var(--border)',
                              borderRadius: 8,
                              padding: '8px 12px',
                            }}>
                              <div style={{ fontWeight: 700, color: 'var(--accentL)', fontSize: 12, marginBottom: 2 }}>{cond.name}</div>
                              <div style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.45 }}>{cond.summary}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
