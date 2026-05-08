'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Search, Loader2, ArrowRight, Skull, Plus, X, Trash2 } from 'lucide-react'
import { MonsterSummary, MonsterListResponse } from '@/types/monster'

export default function AmeacasPage() {
  const [monsters, setMonsters] = useState<MonsterSummary[]>([])
  const [filteredMonsters, setFilteredMonsters] = useState<MonsterSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showThreatModal, setShowThreatModal] = useState(false)
  const [threatForm, setThreatForm] = useState({
    name: '',
    description: '',
    threatType: 'monster',
    level: 1,
    challengeRating: 0.25,
    attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10, hp: 10, ac: 10, speed: '30ft', initiativeBonus: 0 },
    combat: { attackBonus: 0, damage: '1d6', damageType: 'concussão', multiattack: '', abilities: '', resistances: '', immunities: '', vulnerabilities: '' },
    actions: [] as any[],
    skills: [] as any[]
  })

  const fetchThreats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ameacas')
      const data = await res.json()
      setMonsters(data)
      setFilteredMonsters(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreats()
  }, [])

  useEffect(() => {
    const filtered = monsters.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredMonsters(filtered)
  }, [search, monsters])

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 36,
            marginBottom: 12,
            color: 'var(--accentL)',
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <Skull size={32} /> Bestiário
          </h1>
          <p style={{ color: 'var(--fg2)', fontSize: 16 }}>
            Explore e gerencie as criaturas do seu multiverso.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowThreatModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
        >
          <Shield size={18} /> Criar Ameaça
        </button>
      </div>

      <div style={{
        position: 'relative',
        marginBottom: 32,
        maxWidth: 500
      }}>
        <div style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--fg3)',
          display: 'flex'
        }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Buscar monstro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 42px',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            color: 'var(--fg)',
            fontSize: 15,
            outline: 'none',
            transition: 'all 0.2s'
          }}
          className="focus-glow"
        />
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 0',
          gap: 16
        }}>
          <Loader2 size={40} className="animate-spin" color="var(--accent)" />
          <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif' }}>Invocando criaturas...</p>
        </div>
      ) : (
        <div className="grid-monsters">
          {filteredMonsters.map((monster: any) => (
            <Link
              key={monster.id}
              href={`/ameacas/${monster.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }} className="monster-card-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'rgba(225, 29, 72, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Shield size={20} color="var(--accentL)" />
                  </div>
                  <span style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--fg)'
                  }}>
                    {monster.name}
                  </span>
                </div>
                <ArrowRight size={18} color="var(--fg3)" />
              </div>
            </Link>
          ))}
          {filteredMonsters.length === 0 && (
            <div style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              padding: '60px 0',
              border: '1px dashed var(--border)',
              borderRadius: 12,
              color: 'var(--fg3)'
            }}>
              Nenhuma criatura encontrada para "{search}".
            </div>
          )}
        </div>
      )}

      {showThreatModal && (
        <div className="modal-overlay" onClick={() => setShowThreatModal(false)}>
          <div className="modal-content wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Criar Nova Ameaça</h3>
              <button className="close-btn" onClick={() => setShowThreatModal(false)}><X size={20} /></button>
            </div>
            <form className="modal-form scrollable" onSubmit={async (e) => {
              e.preventDefault()
              const res = await fetch('/api/ameacas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...threatForm, isTemplate: true })
              })
              if (res.ok) {
                fetchThreats()
                setShowThreatModal(false)
              }
            }}>
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
                <button type="button" className="btn btn-ghost" onClick={() => setShowThreatModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar Ameaça</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .grid-monsters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .monster-card-hover:hover {
          border-color: var(--accent);
          background: var(--bg2);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

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

        .modal-footer {
          padding: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
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
        }

        .focus-glow:focus {
          border-color: var(--accentL);
          box-shadow: 0 0 0 2px var(--accentGlow);
        }

        .modal-content.wide {
          max-width: 800px;
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

        @media (max-width: 600px) {
          .grid-monsters {
            grid-template-columns: 1fr;
          }
          .attributes-input-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .modal-content {
            margin: 0;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
            display: flex;
            flex-direction: column;
          }
          .modal-form.scrollable {
            flex: 1;
            max-height: unset;
          }
          .modal-overlay {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}
