'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Wand2, Clock, Globe, 
  Wind, Shield, Loader2, Sparkles,
  BookOpen, Layers, Info
} from 'lucide-react'
import Image from 'next/image'
import { SpellDetail } from '@/types/spell'

const SCHOOL_ICONS: Record<string, string> = {
  'abjuration': '/assets/spells-icons/protection-field.png',
  'conjuration': '/assets/spells-icons/teleport-swirl.png',
  'divination': '/assets/spells-icons/all-seeing-eye.png',
  'enchantment': '/assets/spells-icons/mind-waves.png',
  'evocation': '/assets/spells-icons/fire-blast.png',
  'illusion': '/assets/spells-icons/mirror-image.png',
  'necromancy': '/assets/spells-icons/undead-skull.png',
  'transmutation': '/assets/spells-icons/elemental-spiral.png',
}

interface PageProps {
  params: Promise<{ index: string }>
}

export default function SpellDetailsPage({ params }: PageProps) {
  const { index } = use(params)
  const [spell, setSpell] = useState<SpellDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/2014/spells/${index}`)
      .then(res => res.json())
      .then(data => {
        setSpell(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [index])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <Loader2 size={40} className="animate-spin" color="var(--accent)" />
      <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Lendo pergaminhos...</p>
    </div>
  )

  if (!spell) return <div className="container">Magia não encontrada.</div>

  return (
    <div className="container">
      <Link href="/magias">
        <button className="btn btn-ghost" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Voltar
        </button>
      </Link>

      <div style={{
        background: 'var(--card)',
        borderRadius: 16,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg2), var(--card))',
          padding: '32px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          position: 'relative'
        }}>
          <div style={{ zIndex: 1 }}>
            <h1 style={{ 
              fontFamily: 'Cinzel, serif', 
              fontSize: 48, 
              color: 'var(--accentL)', 
              marginBottom: 12,
              letterSpacing: '0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {spell.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ 
                background: 'var(--accent)', 
                color: 'white', 
                padding: '6px 16px', 
                borderRadius: 20, 
                fontSize: 14, 
                fontWeight: 700 
              }}>
                {spell.level === 0 ? 'TRUQUE' : `${spell.level}º NÍVEL`}
              </span>
              
              <span style={{ color: 'var(--fg2)', fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>
                de {spell.school.name}
              </span>

              <div style={{ display: 'flex', gap: 12, marginLeft: 8 }}>
                {spell.ritual && (
                  <span style={{ color: 'var(--accent2)', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(212, 175, 55, 0.1)', padding: '2px 10px', borderRadius: 6, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <BookOpen size={14} /> RITUAL
                  </span>
                )}
                {spell.concentration && (
                  <span style={{ color: 'var(--accentL)', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, background: 'var(--accentGlow)', padding: '2px 10px', borderRadius: 6, border: '1px solid rgba(225, 29, 72, 0.2)' }}>
                    <Layers size={14} /> CONCENTRAÇÃO
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ícone da Escola na Direita */}
          {SCHOOL_ICONS[spell.school.index] && (
            <div style={{
              zIndex: 1,
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }} className="school-icon-container">
              <Image 
                src={SCHOOL_ICONS[spell.school.index]} 
                alt={spell.school.name} 
                width={100} 
                height={100} 
                style={{ 
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          )}
        </div>

        {/* Basic Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 1,
          background: 'var(--border)'
        }}>
          <InfoBox icon={<Clock size={20} color="var(--accentL)" />} label="TEMPO DE CONJURAÇÃO" value={spell.casting_time} />
          <InfoBox icon={<Globe size={20} color="var(--accent2)" />} label="ALCANCE" value={spell.range} />
          <InfoBox icon={<Wind size={20} color="var(--fg2)" />} label="COMPONENTES" value={spell.components.join(', ')} sub={spell.material} />
          <InfoBox icon={<Shield size={20} color="var(--accentL)" />} label="DURAÇÃO" value={spell.duration} />
        </div>

        {/* Body Content */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Description */}
          <Section title="Descrição">
            {spell.desc.map((p, i) => (
              <p key={i} style={{ color: 'var(--fg)', lineHeight: 1.7, fontSize: 16, marginBottom: 16, whiteSpace: 'pre-wrap' }}>{p}</p>
            ))}
          </Section>

          {/* Higher Level */}
          {spell.higher_level && spell.higher_level.length > 0 && (
            <Section title="Em Níveis Superiores">
              {spell.higher_level.map((p, i) => (
                <p key={i} style={{ color: 'var(--fg2)', fontStyle: 'italic', lineHeight: 1.7, fontSize: 15 }}>{p}</p>
              ))}
            </Section>
          )}

          {/* Classes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="footer-info">
            <InfoSection title="Classes">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {spell.classes.map(c => (
                  <span key={c.index} style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    padding: '6px 12px',
                    borderRadius: 8,
                    color: 'var(--fg)',
                    fontSize: 14
                  }}>
                    {c.name}
                  </span>
                ))}
              </div>
            </InfoSection>

            {spell.subclasses.length > 0 && (
              <InfoSection title="Subclasses">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {spell.subclasses.map(sc => (
                    <span key={sc.index} style={{
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '6px 12px',
                      borderRadius: 8,
                      color: 'var(--accentL)',
                      fontSize: 13
                    }}>
                      {sc.name}
                    </span>
                  ))}
                </div>
              </InfoSection>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-info {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

function InfoBox({ icon, label, value, sub }: { icon: any, label: string, value: string, sub?: string }) {
  return (
    <div style={{ background: 'var(--card)', padding: '24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--fg3)', fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--fg)' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--fg3)', marginTop: 8, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--accentL)', borderBottom: '2px solid var(--border)', paddingBottom: 12, marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  )
}

function InfoSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      {children}
    </div>
  )
}
