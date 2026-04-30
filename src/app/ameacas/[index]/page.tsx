'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sword, Shield, Heart, Zap, Brain, Eye, MessageSquare, Award, Flame, Wind, Droplets, Target, Loader2 } from 'lucide-react'

interface PageProps {
  params: Promise<{ index: string }>
}

const TRANSLATIONS: Record<string, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
  speed: 'Deslocamento',
  armor_class: 'Classe de Armadura',
  hit_points: 'Pontos de Vida',
  skills: 'Perícias',
  senses: 'Sentidos',
  languages: 'Idiomas',
  challenge_rating: 'ND',
  xp: 'XP',
  actions: 'Ações',
  special_abilities: 'Habilidades Especiais',
  legendary_actions: 'Ações Lendárias',
  reactions: 'Reações',
  damage_vulnerabilities: 'Vulnerabilidades',
  damage_resistances: 'Resistências',
  damage_immunities: 'Imunidades',
  condition_immunities: 'Imunidades a Condição'
}

const MONSTER_PROPS: Record<string, string> = {
  // Sizes
  'Tiny': 'Minúsculo',
  'Small': 'Pequeno',
  'Medium': 'Médio',
  'Large': 'Grande',
  'Huge': 'Enorme',
  'Gargantuan': 'Imenso',
  // Types
  'aberration': 'Aberração',
  'beast': 'Bestia',
  'celestial': 'Celestial',
  'construct': 'Construto',
  'dragon': 'Dragão',
  'elemental': 'Elemental',
  'fey': 'Fada',
  'fiend': 'Ínfero',
  'giant': 'Gigante',
  'humanoid': 'Humanoide',
  'monstrosity': 'Monstruosidade',
  'ooze': 'Limo',
  'plant': 'Planta',
  'undead': 'Morto-Vivo',
  // Alignments
  'lawful good': 'Ordeiro e Bom',
  'neutral good': 'Neutro e Bom',
  'chaotic good': 'Caótico e Bom',
  'lawful neutral': 'Ordeiro e Neutro',
  'true neutral': 'Neutro',
  'neutral': 'Neutro',
  'chaotic neutral': 'Caótico e Neutro',
  'lawful evil': 'Ordeiro e Mau',
  'neutral evil': 'Neutro e Mau',
  'chaotic evil': 'Caótico e Mau',
  'unaligned': 'Sem Alinhamento',
  'any alignment': 'Qualquer Alinhamento'
}

const getMod = (val: number) => {
  const mod = Math.floor((val - 10) / 2)
  return mod >= 0 ? `+${mod}` : mod
}

export default function MonsterDetailsPage({ params }: PageProps) {
  const { index } = use(params)
  const [monster, setMonster] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/ameacas/${index}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setMonster(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setLoading(false)
      })
  }, [index])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
      <Loader2 size={40} className="animate-spin" color="var(--accent)" />
      <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Consultando Grimório...</p>
    </div>
  )

  if (!monster) return <div>Monstro não encontrado.</div>

  const stats = [
    { label: 'FOR', value: monster.attributes?.strength || 10, key: 'strength' },
    { label: 'DES', value: monster.attributes?.dexterity || 10, key: 'dexterity' },
    { label: 'CON', value: monster.attributes?.constitution || 10, key: 'constitution' },
    { label: 'INT', value: monster.attributes?.intelligence || 10, key: 'intelligence' },
    { label: 'SAB', value: monster.attributes?.wisdom || 10, key: 'wisdom' },
    { label: 'CAR', value: monster.attributes?.charisma || 10, key: 'charisma' },
  ]
  
  const m = monster as any

  return (
    <div className="container">
      <Link href="/ameacas">
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
          padding: '16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }} className="monster-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }} className="header-flex">
            <div style={{ flex: 1, minWidth: 300 }} className="monster-title-container">
              <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 40, color: 'var(--accentL)', marginBottom: 4 }}>{monster.name}</h1>
              <p style={{ color: 'var(--fg2)', fontSize: 16, textTransform: 'capitalize', fontStyle: 'italic' }}>
                {m.threatType?.toUpperCase()} • {m.level ? `Lvl ${m.level}` : ''}
              </p>
            </div>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }} className="challenge-rating-container">
              <div style={{ fontSize: 14, color: 'var(--fg3)', fontWeight: 600 }}>NÍVEL DE DESAFIO</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accentL)' }}>{m.challengeRating || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Essential Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 1,
          background: 'var(--border)'
        }} className="essential-stats-grid">
          <StatBox icon={<Shield size={20} color="var(--accentL)" />} label="CA" value={m.attributes?.ac || 10} />
          <StatBox icon={<Heart size={20} color="var(--danger)" />} label="PV" value={m.attributes?.hp || 10} />
          <StatBox icon={<Zap size={20} color="var(--accent2)" />} label="DESLOC." value={m.attributes?.speed || '30ft'} />
          <StatBox icon={<Sword size={20} color="var(--accentL)" />} label="BÔNUS ATK" value={`+${m.combat?.attackBonus || 0}`} />
        </div>

        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
            {stats.map(s => (
              <div key={s.key} style={{
                background: 'var(--bg2)',
                padding: '10px',
                borderRadius: 12,
                textAlign: 'center',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--accentL)', fontWeight: 700, marginTop: 2 }}>({getMod(s.value)})</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <InfoSection title="Descrição & Detalhes">
              <p style={{ color: 'var(--fg2)', lineHeight: 1.6 }}>{monster.description || 'Nenhuma descrição detalhada.'}</p>
            </InfoSection>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ResistanceSection title="Resistências" items={m.combat?.resistances?.split(',') || []} color="var(--accent2)" />
              <ResistanceSection title="Imunidades" items={m.combat?.immunities?.split(',') || []} color="var(--accentL)" />
              <ResistanceSection title="Vulnerabilidades" items={m.combat?.vulnerabilities?.split(',') || []} color="var(--danger)" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {m.actions && m.actions.length > 0 && (
              <Section title="Ações">
                {m.actions.map((action: any, idx: number) => (
                  <AbilityItem key={idx} name={action.name} desc={action.description} />
                ))}
              </Section>
            )}

            {m.skills && m.skills.length > 0 && (
              <Section title="Habilidades Especiais">
                {m.skills.map((skill: any, idx: number) => (
                  <AbilityItem key={idx} name={skill.name} desc={skill.description} />
                ))}
              </Section>
            )}
            
            <Section title="Ataque Padrão">
              <div style={{ background: 'var(--bg2)', padding: '20px', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 800, color: 'var(--accentL)', marginBottom: 8 }}>{m.combat?.damage || 'Sem dano definido'}</div>
                <p style={{ color: 'var(--fg3)', fontSize: 14 }}>Tipo: {m.combat?.damageType || 'Desconhecido'}</p>
              </div>
            </Section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .container > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .header-flex {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .challenge-rating-container {
            text-align: center !important;
            margin: 0 auto !important;
          }
          .monster-title-container {
             min-width: unset !important;
          }
          .essential-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
           /* Fix padding for smaller stats in 4 columns */
          .essential-stats-grid > div {
            padding: 12px 4px !important;
          }
          .essential-stats-grid > div > div:nth-child(2) {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  )
}

function StatBox({ icon, label, value, sub }: { icon: any, label: string, value: any, sub?: string }) {
  return (
    <div style={{ background: 'var(--card)', padding: '20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--fg3)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function InfoSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--accentL)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: 'var(--fg)', borderBottom: '2px solid var(--accent)', paddingBottom: 8 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  )
}

function AbilityItem({ name, desc, highlights }: { name: string, desc: string, highlights?: any[] }) {
  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6, color: 'var(--fg)' }}>{name}</div>
      <p style={{ color: 'var(--fg2)', lineHeight: 1.6, fontSize: 15, whiteSpace: 'pre-wrap' }}>{desc}</p>
      {highlights && highlights.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ background: 'var(--accentGlow)', color: 'var(--accentL)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, border: '1px solid rgba(225, 29, 72, 0.2)' }}>
              Dano: {h.damage_dice} ({h.damage_type.name})
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Tag({ text }: { text: string }) {
  return (
    <span style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 8, fontSize: 14, color: 'var(--fg2)' }}>
      {text}
    </span>
  )
}

function ResistanceSection({ title, items, color }: { title: string, items: any[], color: string }) {
  if (items.length === 0) return null
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 4 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((item, idx) => (
          <span key={idx} style={{ color: color, fontSize: 13, fontWeight: 600 }}>
            {typeof item === 'string' ? item : item.name}{idx < items.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>
    </div>
  )
}
