'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sword, Shield, Heart, Zap, Brain, Eye, MessageSquare, Award, Flame, Wind, Droplets, Target, Loader2, Trash2, Edit, X, Plus } from 'lucide-react'
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
  const [threatForm, setThreatForm] = useState<any>({
    name: '',
    description: '',
    threatType: 'monster',
    level: 1,
    challengeRating: 0.25,
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
