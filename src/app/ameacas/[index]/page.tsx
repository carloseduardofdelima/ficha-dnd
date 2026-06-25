'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sword, Shield, Heart, Zap, Brain, Eye, MessageSquare, Award, Flame, Wind, Droplets, Target, Loader2, Trash2, Edit, X, Plus, Skull } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

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
  const router = useRouter()
  const { data: sessionData } = useSession()
  const [monster, setMonster] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showZoomModal, setShowZoomModal] = useState(false)
  const [threatForm, setThreatForm] = useState<any>({
    name: '',
    description: '',
    threatType: 'monster',
    level: 1,
    challengeRating: 0.25,
    imageUrl: '',
    attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10, hp: 10, ac: 10, speed: '30ft', initiativeBonus: 0 },
    combat: { attackBonus: 0, damage: '1d6', damageType: 'concussão', multiattack: '', abilities: '', resistances: '', immunities: '', vulnerabilities: '' },
    actions: [],
    skills: []
  })

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

  const handleDelete = async () => {
    if (!confirm('Deseja realmente excluir esta criatura permanentemente?')) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/ameacas/${index}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/ameacas')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = () => {
    setThreatForm({
      name: monster.name,
      description: monster.description || '',
      threatType: monster.threatType || 'monster',
      level: monster.level || 1,
      challengeRating: monster.challengeRating || 0.25,
      imageUrl: monster.imageUrl || '',
      attributes: {
        strength: monster.attributes?.strength ?? 10,
        dexterity: monster.attributes?.dexterity ?? 10,
        constitution: monster.attributes?.constitution ?? 10,
        intelligence: monster.attributes?.intelligence ?? 10,
        wisdom: monster.attributes?.wisdom ?? 10,
        charisma: monster.attributes?.charisma ?? 10,
        hp: monster.attributes?.hp ?? 10,
        ac: monster.attributes?.ac ?? 10,
        speed: monster.attributes?.speed ?? '30ft',
        initiativeBonus: monster.attributes?.initiativeBonus ?? 0,
      },
      combat: {
        attackBonus: monster.combat?.attackBonus ?? 0,
        damage: monster.combat?.damage ?? '1d6',
        damageType: monster.combat?.damageType ?? 'concussão',
        multiattack: monster.combat?.multiattack || '',
        abilities: monster.combat?.abilities || '',
        resistances: monster.combat?.resistances || '',
        immunities: monster.combat?.immunities || '',
        vulnerabilities: monster.combat?.vulnerabilities || '',
      },
      actions: monster.actions || [],
      skills: monster.skills || []
    })
    setShowEditModal(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/ameacas/${index}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(threatForm)
      })
      if (res.ok) {
        const updated = await res.json()
        setMonster(updated)
        setShowEditModal(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

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
      <style>{`
        .threat-title {
          font-size: 40px;
        }
        @media (max-width: 768px) {
          .desktop-only-image-container {
            display: none !important;
          }
          .mobile-image-thumbnail {
            display: block !important;
          }
          .threat-title {
            font-size: 26px !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/ameacas">
          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ArrowLeft size={16} /> Voltar
          </button>
        </Link>

        <div style={{ display: 'flex', gap: 12 }}>
          {monster && sessionData?.user?.id === monster.userId && (
            <button
              className="btn btn-ghost"
              onClick={handleEdit}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Edit size={16} /> Editar
            </button>
          )}
          {monster && sessionData?.user?.id === monster.userId && (
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={deleting}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {deleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
              Excluir Criatura
            </button>
          )}
        </div>
      </div>

      <div className="threat-layout" style={{
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gap: 32,
        alignItems: 'start'
      }}>
        {/* Left Column - Stats & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Header Tag / Name */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span style={{
                  background: 'var(--danger)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 20,
                  textTransform: 'uppercase'
                }}>
                  {TRANSLATIONS[m.threatType] || m.threatType || 'Criatura'}
                </span>
                <span style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg2)',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 20
                }}>
                  Nível {m.level || 1} • ND {m.challengeRating || '1/4'}
                </span>
              </div>
              <h1
                className="threat-title"
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: 'var(--fg)',
                  textTransform: 'uppercase',
                  margin: 0,
                  fontWeight: 800,
                  letterSpacing: '0.05em'
                }}
              >
                {monster.name}
              </h1>
            </div>
            {monster.imageUrl && (
              <div
                className="mobile-image-thumbnail"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 8,
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'none', // Hidden by default (desktop)
                  cursor: 'pointer'
                }}
                onClick={() => setShowZoomModal(true)}
              >
                <img
                  src={monster.imageUrl}
                  alt={monster.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          {/* Attributes modifier row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {stats.map(s => (
              <div key={s.key} style={{
                background: 'var(--bg2)',
                padding: '12px 6px',
                borderRadius: 8,
                textAlign: 'center',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg3)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--accentL)', fontWeight: 700 }}>({getMod(s.value)})</div>
              </div>
            ))}
          </div>

          {/* Core Grid stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                <Shield size={14} color="var(--accentL)" /> Defesa
              </div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{m.attributes?.ac || 10}</div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                <Heart size={14} color="var(--danger)" /> Pontos de Vida
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--danger)' }}>{m.attributes?.hp || 10}</div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                <Zap size={14} color="var(--accent2)" /> Deslocamento
              </div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{m.attributes?.speed || '30ft'}</div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                <Sword size={14} color="var(--accentL)" /> Bônus de Ataque
              </div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>+{m.combat?.attackBonus || 0}</div>
            </div>
          </div>

          {/* Senses, Languages, Resistances */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--accentL)', textTransform: 'uppercase', marginBottom: 12 }}>Sentidos & Idiomas</h3>
              <div style={{ fontSize: 14, color: 'var(--fg2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {m.languages && <div><strong>Idiomas:</strong> {m.languages}</div>}
                {m.attributes?.initiativeBonus !== undefined && <div><strong>Iniciativa:</strong> +{m.attributes.initiativeBonus}</div>}
              </div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--accentL)', textTransform: 'uppercase', marginBottom: 12 }}>Testes de Resistência</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <ResistanceSection title="Resistências" items={m.combat?.resistances?.split(',') || []} color="var(--accent2)" />
                <ResistanceSection title="Imunidades" items={m.combat?.immunities?.split(',') || []} color="var(--accentL)" />
                <ResistanceSection title="Vulnerabilidades" items={m.combat?.vulnerabilities?.split(',') || []} color="var(--danger)" />
              </div>
            </div>
          </div>

          {/* Actions & Special Abilities */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--accentL)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: 6, marginBottom: 16 }}>Ações & Habilidades</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {m.actions && m.actions.map((action: any, idx: number) => (
                <div key={idx} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, color: 'var(--fg)' }}>{action.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--accentL)', fontWeight: 700 }}>AÇÃO</span>
                  </div>
                  <p style={{ color: 'var(--fg2)', fontSize: 14, margin: 0 }}>{action.description}</p>
                </div>
              ))}
              {m.skills && m.skills.map((skill: any, idx: number) => (
                <div key={idx} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, color: 'var(--fg)' }}>{skill.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--accent2)', fontWeight: 700 }}>HABILIDADE</span>
                  </div>
                  <p style={{ color: 'var(--fg2)', fontSize: 14, margin: 0 }}>{skill.description}</p>
                </div>
              ))}
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, color: 'var(--fg)' }}>Ataque Padrão</span>
                  <span style={{ fontSize: 12, color: 'var(--accentL)', fontWeight: 700 }}>DANO</span>
                </div>
                <p style={{ color: 'var(--fg2)', fontSize: 14, margin: 0 }}>
                  <strong>Dano:</strong> {m.combat?.damage || 'Sem dano definido'} ({m.combat?.damageType || 'Desconhecido'})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image & Relato & Detalhes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Creature Image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div className="desktop-only-image-container" style={{
              width: '100%',
              aspectRatio: '3/4',
              maxHeight: 500,
              borderRadius: 12,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {monster.imageUrl ? (
                <img
                  src={monster.imageUrl}
                  alt={monster.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => setShowZoomModal(true)}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <Skull size={48} color="var(--border)" style={{ marginBottom: 12, display: 'inline-block' }} />
                  <p style={{ color: 'var(--fg3)', fontSize: 14, margin: 0 }}>Nenhuma imagem vinculada.</p>
                </div>
              )}
            </div>

            {/* Quick image upload if owner */}
            {monster && sessionData?.user?.id === monster.userId && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase' }}>Imagem da Ameaça</label>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 14px',
                    background: 'var(--bg)',
                    border: '1px dashed var(--border)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 13,
                    color: 'var(--fg)',
                    width: '100%',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    flex: 1
                  }}>
                    <span>Escolher arquivo...</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = async () => {
                            if (typeof reader.result === 'string') {
                              const base64 = reader.result
                              setMonster({ ...monster, imageUrl: base64 })
                              try {
                                await fetch(`/api/ameacas/${index}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ imageUrl: base64 })
                                })
                              } catch (err) {
                                console.error(err)
                              }
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </label>
                  {monster.imageUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        setMonster({ ...monster, imageUrl: null })
                        try {
                          await fetch(`/api/ameacas/${index}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ imageUrl: null })
                          })
                        } catch (err) {
                          console.error(err)
                        }
                      }}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(225, 29, 72, 0.1)',
                        border: '1px solid rgba(225, 29, 72, 0.2)',
                        borderRadius: 6,
                        color: 'var(--danger)',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Relato & Detalhes */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--accentL)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: 6, marginBottom: 16 }}>Relato & Detalhes</h3>
            <p style={{ color: 'var(--fg2)', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{monster.description || 'Sem relatos ou detalhes adicionais.'}</p>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Ameaça</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>
            <form className="modal-form scrollable" onSubmit={handleUpdate}>
              <div className="form-section">
                <h4>Informações Básicas</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      value={threatForm.name}
                      onChange={e => setThreatForm({ ...threatForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo</label>
                    <select
                      value={threatForm.threatType}
                      onChange={e => setThreatForm({ ...threatForm, threatType: e.target.value })}
                    >
                      <option value="monster">Monstro</option>
                      <option value="npc">NPC Hostil</option>
                      <option value="boss">Boss</option>
                      <option value="entity">Entidade</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>CR (Challenge Rating)</label>
                    <input
                      type="number" step="0.25"
                      value={threatForm.challengeRating}
                      onChange={e => setThreatForm({ ...threatForm, challengeRating: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nível</label>
                    <input
                      type="number"
                      value={threatForm.level}
                      onChange={e => setThreatForm({ ...threatForm, level: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    rows={2}
                    value={threatForm.description}
                    onChange={e => setThreatForm({ ...threatForm, description: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Imagem da Ameaça</label>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
                    {threatForm.imageUrl && (
                      <div style={{ position: 'relative', width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', flexShrink: 0 }}>
                        <img src={threatForm.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => setThreatForm({ ...threatForm, imageUrl: '' })}
                          style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            background: 'rgba(0,0,0,0.6)',
                            border: 'none',
                            borderRadius: '50%',
                            width: 18,
                            height: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <label style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 20px',
                      background: 'var(--bg3)',
                      border: '1px dashed var(--border)',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--fg)',
                      transition: 'all 0.2s',
                      flex: 1,
                      textAlign: 'center'
                    }}>
                      <span>Selecionar Imagem...</span>
                      <span style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 2 }}>PNG, JPG ou GIF</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                setThreatForm({ ...threatForm, imageUrl: reader.result })
                              }
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Atributos e Defesa</h4>
                <div className="attributes-input-grid">
                  {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(attr => (
                    <div key={attr} className="attr-input">
                      <label>{attr.substring(0, 3).toUpperCase()}</label>
                      <input
                        type="number"
                        value={(threatForm.attributes as any)[attr]}
                        onChange={e => setThreatForm({
                          ...threatForm,
                          attributes: { ...threatForm.attributes, [attr]: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                  ))}
                </div>
                <div className="form-row" style={{ marginTop: 16 }}>
                  <div className="form-group">
                    <label>HP Máximo</label>
                    <input
                      type="number"
                      value={threatForm.attributes.hp}
                      onChange={e => setThreatForm({ ...threatForm, attributes: { ...threatForm.attributes, hp: parseInt(e.target.value) } })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Classe de Armadura (AC)</label>
                    <input
                      type="number"
                      value={threatForm.attributes.ac}
                      onChange={e => setThreatForm({ ...threatForm, attributes: { ...threatForm.attributes, ac: parseInt(e.target.value) } })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Velocidade</label>
                    <input
                      type="text"
                      value={threatForm.attributes.speed}
                      onChange={e => setThreatForm({ ...threatForm, attributes: { ...threatForm.attributes, speed: e.target.value } })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Combate e Resistências</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bônus de Ataque</label>
                    <input
                      type="number"
                      value={threatForm.combat.attackBonus}
                      onChange={e => setThreatForm({ ...threatForm, combat: { ...threatForm.combat, attackBonus: parseInt(e.target.value) } })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dano (ex: 1d6+2)</label>
                    <input
                      type="text"
                      value={threatForm.combat.damage}
                      onChange={e => setThreatForm({ ...threatForm, combat: { ...threatForm.combat, damage: e.target.value } })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Resistências (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={threatForm.combat.resistances}
                    onChange={e => setThreatForm({ ...threatForm, combat: { ...threatForm.combat, resistances: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label>Imunidades (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={threatForm.combat.immunities}
                    onChange={e => setThreatForm({ ...threatForm, combat: { ...threatForm.combat, immunities: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label>Vulnerabilidades (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={threatForm.combat.vulnerabilities}
                    onChange={e => setThreatForm({ ...threatForm, combat: { ...threatForm.combat, vulnerabilities: e.target.value } })}
                  />
                </div>
              </div>

              <div className="form-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h4 style={{ margin: 0 }}>Ações</h4>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setThreatForm({
                    ...threatForm,
                    actions: [...threatForm.actions, { name: '', description: '', actionType: 'action' }]
                  })}>
                    <Plus size={14} /> Adicionar Ação
                  </button>
                </div>
                {threatForm.actions.map((action: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: 16, padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                      <input
                        placeholder="Nome da Ação"
                        value={action.name}
                        onChange={e => {
                          const newActions = [...threatForm.actions]
                          newActions[idx].name = e.target.value
                          setThreatForm({ ...threatForm, actions: newActions })
                        }}
                        style={{ flex: 1 }}
                      />
                      <button type="button" className="btn-icon danger" onClick={() => {
                        const newActions = threatForm.actions.filter((_: any, i: number) => i !== idx)
                        setThreatForm({ ...threatForm, actions: newActions })
                      }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      placeholder="Descrição da Ação"
                      value={action.description}
                      onChange={e => {
                        const newActions = [...threatForm.actions]
                        newActions[idx].description = e.target.value
                        setThreatForm({ ...threatForm, actions: newActions })
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="form-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h4 style={{ margin: 0 }}>Habilidades Especiais</h4>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setThreatForm({
                    ...threatForm,
                    skills: [...threatForm.skills, { name: '', description: '' }]
                  })}>
                    <Plus size={14} /> Adicionar Habilidade
                  </button>
                </div>
                {threatForm.skills.map((skill: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: 16, padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                      <input
                        placeholder="Nome da Habilidade"
                        value={skill.name}
                        onChange={e => {
                          const newSkills = [...threatForm.skills]
                          newSkills[idx].name = e.target.value
                          setThreatForm({ ...threatForm, skills: newSkills })
                        }}
                        style={{ flex: 1 }}
                      />
                      <button type="button" className="btn-icon danger" onClick={() => {
                        const newSkills = threatForm.skills.filter((_: any, i: number) => i !== idx)
                        setThreatForm({ ...threatForm, skills: newSkills })
                      }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      placeholder="Descrição da Habilidade"
                      value={skill.description}
                      onChange={e => {
                        const newSkills = [...threatForm.skills]
                        newSkills[idx].description = e.target.value
                        setThreatForm({ ...threatForm, skills: newSkills })
                      }}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowEditModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <Loader2 className="animate-spin" size={18} /> : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showZoomModal && monster.imageUrl && (
        <div
          className="modal-overlay"
          onClick={() => setShowZoomModal(false)}
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 2000,
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'absolute', top: 20, right: 20 }}>
            <button
              className="btn btn-ghost"
              onClick={() => setShowZoomModal(false)}
              style={{ color: '#fff', padding: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}
            >
              <X size={24} />
            </button>
          </div>
          <div
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={monster.imageUrl}
              alt={monster.name}
              style={{
                maxWidth: '100%',
                maxHeight: '95vh',
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                cursor: 'default'
              }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .modal-content.wide {
          max-width: 800px;
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-family: 'Cinzel', serif;
          color: var(--accentL);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--fg3);
          cursor: pointer;
        }

        .modal-form {
          padding: 20px;
        }

        .modal-form.scrollable {
          max-height: 80vh;
          overflow-y: auto;
          padding-right: 12px;
        }

        .form-section {
          background: rgba(255,255,255,0.02);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          margin-bottom: 24px;
        }

        .form-section h4 {
          font-family: 'Cinzel', serif;
          font-size: 14px;
          color: var(--accentL);
          margin: 0 0 16px 0;
          text-transform: uppercase;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--fg3);
        }

        .form-group input, .form-group select, .form-group textarea {
          background: var(--bg2);
          border: 1px solid var(--border);
          padding: 10px;
          border-radius: 8px;
          color: var(--fg);
          outline: none;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--accentL);
        }

        .attributes-input-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .attr-input {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
        }

        .attr-input label {
          font-size: 10px;
          font-weight: 800;
          color: var(--fg3);
        }

        .attr-input input {
          width: 100%;
          text-align: center;
          padding: 8px !important;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        @media (max-width: 600px) {
          .attributes-input-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .threat-layout { grid-template-columns: 1fr !important; }
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
