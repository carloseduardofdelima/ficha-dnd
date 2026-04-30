'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users, BookOpen, Shield, Zap, Info, ChevronLeft,
  Settings, Save, Plus, Target, MessageSquare,
  Sword, Clock, Layout, Edit, Trash2, Calendar, X, Skull, Search
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function CampaignDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumo')
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [showCharModal, setShowCharModal] = useState(false)
  const [myCharacters, setMyCharacters] = useState<any[]>([])
  const [newSession, setNewSession] = useState({ title: '', summary: '', number: 1 })
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '', isPublic: false, isFixed: false })
  const [showSelectThreatModal, setShowSelectThreatModal] = useState(false)
  const [allGlobalThreats, setAllGlobalThreats] = useState<any[]>([])
  const [linkingThreat, setLinkingThreat] = useState(false)

  const fetchGlobalThreats = async () => {
    try {
      const res = await fetch('/api/ameacas')
      const data = await res.json()
      // Filter out threats already in the campaign
      const campaignThreatIds = campaign.threats?.map((t: any) => t.id) || []
      setAllGlobalThreats(data.filter((t: any) => !campaignThreatIds.includes(t.id)))
    } catch (e) {
      console.error(e)
    }
  }

  const handleLinkThreat = async (threatId: string) => {
    setLinkingThreat(true)
    try {
      const sourceThreat = allGlobalThreats.find(t => t.id === threatId)
      if (!sourceThreat) return

      const res = await fetch('/api/ameacas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sourceThreat,
          campaignId: id,
          isTemplate: false,
          id: undefined,
          attributes: { ...sourceThreat.attributes, id: undefined, threatId: undefined },
          combat: { ...sourceThreat.combat, id: undefined, threatId: undefined },
          actions: sourceThreat.actions?.map((a: any) => ({ ...a, id: undefined, threatId: undefined })),
          skills: sourceThreat.skills?.map((s: any) => ({ ...s, id: undefined, threatId: undefined }))
        })
      })

      if (res.ok) {
        fetchCampaign()
        setShowSelectThreatModal(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLinkingThreat(false)
    }
  }

  useEffect(() => {
    fetchCampaign()
    fetchMyCharacters()
  }, [id])

  async function fetchMyCharacters() {
    try {
      const res = await fetch('/api/personagens')
      if (res.ok) {
        const data = await res.json()
        setMyCharacters(data)
      }
    } catch (error) {
      console.error('Error fetching characters:', error)
    }
  }

  async function fetchCampaign() {
    try {
      const res = await fetch(`/api/campanhas/${id}`)
      if (res.ok) {
        const data = await res.json()
        setCampaign(data)
      } else {
        router.push('/campanhas')
      }
    } catch (error) {
      console.error('Error fetching campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Carregando aventura...</div>
  if (!campaign) return <div>Campanha não encontrada.</div>

  const tabs = [
    { id: 'resumo', label: 'Resumo', icon: Info },
    { id: 'sessoes', label: 'Sessões', icon: Calendar },
    { id: 'personagens', label: 'Jogadores', icon: Users },
    { id: 'ameacas', label: 'Ameaças', icon: Shield },
    { id: 'combate', label: 'Combate', icon: Sword },
    { id: 'notas', label: 'Notas', icon: BookOpen },
  ]

  return (
    <div className="campaign-detail-container">
      {/* Top Banner */}
      <div className="campaign-banner" style={{
        backgroundImage: campaign.coverUrl ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${campaign.coverUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: campaign.coverUrl ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)'
      }}>
        <button onClick={() => router.push('/campanhas')} className="back-btn">
          <ChevronLeft size={20} /> Voltar
        </button>
        <div className="banner-content">
          <div className="banner-info">
            <h1 className="campaign-title">{campaign.name}</h1>
            <div className="campaign-meta">
              <span>{campaign.type === 'campaign' ? 'Campanha' : 'One-Shot'}</span>
              <span className="dot">•</span>
              <span>{campaign.system}</span>
              <span className="dot">•</span>
              <span style={{
                color: campaign.status === 'active' ? '#10b981' :
                  campaign.status === 'paused' ? '#f59e0b' : '#3b82f6'
              }}>
                {campaign.status === 'active' ? 'ATIVO' :
                  campaign.status === 'paused' ? 'PAUSADO' : 'FINALIZADO'}
              </span>
            </div>
          </div>
          <div className="banner-actions">
            <Link 
              href={`/campanhas/${id}/escudo`}
              className="flex items-center justify-center gap-4 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-bold py-6 px-12 rounded-xl border border-rose-600/50 transition-all duration-300 uppercase tracking-[0.2em] text-[12px] backdrop-blur-md shadow-2xl shadow-black/60 hover:border-rose-500 hover:text-rose-200 no-underline"
            >
                <Shield size={24} className="opacity-90" /> Escudo do Mestre
            </Link>

            <div className="progress-widget">
              <div className="progress-info">
                <span>Progresso da Jornada</span>
                <span>{campaign.progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${campaign.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'resumo' && (
          <div className="resumo-grid">
            <div className="resumo-main">
              <section className="resumo-section">
                <h3>Sobre a Campanha</h3>
                <p>{campaign.description || 'Nenhuma descrição fornecida.'}</p>
              </section>
              <section className="resumo-section">
                <h3>Notas Internas do Mestre</h3>
                <p>{campaign.notes || 'Sem notas internas ainda.'}</p>
              </section>
            </div>
            <div className="resumo-sidebar">
              <div className="sidebar-card">
                <h4>Informações</h4>
                <div className="info-item">
                  <label>Nível Médio</label>
                  <span>{campaign.averageLevel || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Início</label>
                  <span>{campaign.startDate ? new Date(campaign.startDate).toLocaleDateString('pt-BR') : 'Não definido'}</span>
                </div>
                <div className="info-item">
                  <label>Tags</label>
                  <span>{campaign.tags || 'Nenhuma'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessoes' && (
          <div className="sessions-list">
            <div className="list-header">
              <h3>Diário de Sessões</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setNewSession({ ...newSession, number: (campaign.sessions?.length || 0) + 1 })
                  setShowSessionModal(true)
                }}
              >
                <Plus size={16} /> Nova Sessão
              </button>
            </div>

            <div className="sessions-grid">
              {campaign.sessions?.map((s: any) => (
                <div key={s.id} className="session-card">
                  <div className="session-num">#{s.number}</div>
                  <div className="session-info">
                    <h4>{s.title}</h4>
                    <p>{s.summary}</p>
                    <div className="session-date">
                      {s.date ? new Date(s.date).toLocaleDateString('pt-BR') : 'Sem data'}
                    </div>
                  </div>
                </div>
              ))}
              {(!campaign.sessions || campaign.sessions.length === 0) && (
                <div className="empty-list">
                  <Calendar size={48} opacity={0.2} />
                  <p>Nenhuma sessão registrada ainda.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'personagens' && (
          <div className="characters-section">
            <div className="list-header">
              <h3>Personagens do Grupo</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowCharModal(true)}
              >
                <Plus size={16} /> Vincular Personagem
              </button>
            </div>

            <div className="chars-grid">
              {campaign.characters?.map((link: any) => (
                <div key={link.id} className="char-mini-card" onClick={() => router.push(`/personagens/${link.character.slug}`)}>
                  {link.character.avatarUrl ? (
                    <img src={link.character.avatarUrl} alt={link.character.name} />
                  ) : (
                    <div className="char-placeholder">{link.character.name[0]}</div>
                  )}
                  <div className="char-details">
                    <span className="char-name">{link.character.name}</span>
                    <span className="char-meta">{link.character.race} • {link.character.class} Lvl {link.character.level}</span>
                  </div>
                </div>
              ))}
              {(!campaign.characters || campaign.characters.length === 0) && (
                <div className="empty-list">
                  <Users size={48} opacity={0.2} />
                  <p>Nenhum personagem vinculado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notas' && (
          <div className="notes-section">
            <div className="list-header">
              <h3>Bloco de Notas</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setNewNote({ title: '', content: '', isPublic: false, isFixed: false })
                  setShowNoteModal(true)
                }}
              >
                <Plus size={16} /> Nova Nota
              </button>
            </div>

            <div className="notes-grid-layout">
              {campaign.notes_list?.map((note: any) => (
                <div key={note.id} className={`note-card ${note.isFixed ? 'fixed' : ''}`}>
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    {note.isPublic && <span className="public-tag">Pública</span>}
                  </div>
                  <p className="note-content">{note.content}</p>
                  <div className="note-footer">
                    <span>{new Date(note.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
              {(!campaign.notes_list || campaign.notes_list.length === 0) && (
                <div className="empty-list">
                  <BookOpen size={48} opacity={0.2} />
                  <p>Nenhuma nota registrada.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ameacas' && (
          <div className="threats-section">
            <div className="list-header">
              <h3>Biblioteca de Ameaças</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    fetchGlobalThreats()
                    setShowSelectThreatModal(true)
                  }}
                >
                  <Plus size={16} /> Adicionar do Bestiário
                </button>
              </div>
            </div>

            <div className="threats-grid">
              {campaign.threats?.map((threat: any) => (
                <div key={threat.id} className="threat-card">
                  <div className="threat-type-icon">
                    {threat.threatType === 'boss' ? <Zap size={20} color="#f59e0b" /> : <Shield size={20} />}
                  </div>
                  <div className="threat-info">
                    <div className="threat-main">
                      <h4>{threat.name}</h4>
                      <span className="threat-tag">{threat.threatType.toUpperCase()}</span>
                    </div>
                    <div className="threat-stats">
                      <span>HP: {threat.attributes?.hp}</span>
                      <span>CA: {threat.attributes?.ac}</span>
                      <span>CR: {threat.challengeRating}</span>
                    </div>
                    <p className="threat-desc-short">{threat.description || 'Sem descrição.'}</p>
                  </div>
                  <div className="threat-actions-btns">
                    <button className="btn-icon"><Edit size={14} /></button>
                    <button className="btn-icon danger"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {(!campaign.threats || campaign.threats.length === 0) && (
                <div className="empty-list">
                  <Shield size={48} opacity={0.2} />
                  <p>Nenhuma ameaça cadastrada nesta campanha.</p>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      fetchGlobalThreats()
                      setShowSelectThreatModal(true)
                    }}
                  >
                    Adicionar do Bestiário
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showSelectThreatModal && (
          <div className="modal-overlay" onClick={() => setShowSelectThreatModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Adicionar do Bestiário</h3>
                <button className="close-btn" onClick={() => setShowSelectThreatModal(false)}><X size={20} /></button>
              </div>
              <div className="modal-body scrollable" style={{ padding: 20, maxHeight: '60vh', overflowY: 'auto' }}>
                <p style={{ color: 'var(--fg3)', fontSize: 13, marginBottom: 16 }}>
                  Selecione uma ameaça da sua biblioteca global para importar nesta campanha.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {allGlobalThreats.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border)', borderRadius: 12 }}>
                      <p style={{ color: 'var(--fg3)' }}>Nenhuma ameaça disponível no Bestiário.</p>
                      <Link href="/ameacas" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Ir para o Bestiário</Link>
                    </div>
                  ) : (
                    allGlobalThreats.map(threat => (
                      <div key={threat.id} className="char-mini-card" style={{ cursor: 'default' }}>
                        <div className="threat-type-icon" style={{ background: 'var(--bg2)', padding: 8, borderRadius: 8 }}>
                          <Skull size={20} color="var(--accentL)" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: 'var(--fg)' }}>{threat.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--fg3)' }}>CR {threat.challengeRating} • {threat.threatType.toUpperCase()}</div>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          disabled={linkingThreat}
                          onClick={() => handleLinkThreat(threat.id)}
                        >
                          {linkingThreat ? 'Adicionando...' : 'Adicionar'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-ghost" onClick={() => setShowSelectThreatModal(false)}>Fechar</button>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs will be implemented as skeletons for now */}
        {['combate'].includes(activeTab) && (
          <div className="empty-list">
            <Target size={48} opacity={0.2} />
            <p>Esta funcionalidade será implementada em breve.</p>
          </div>
        )}
      </div>

      {/* Modais */}
      {showSessionModal && (
        <div className="modal-overlay" onClick={() => setShowSessionModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nova Sessão</h3>
              <button className="close-btn" onClick={() => setShowSessionModal(false)}><X size={20} /></button>
            </div>
            <form className="modal-form" onSubmit={async (e) => {
              e.preventDefault()
              const res = await fetch(`/api/campanhas/${id}/sessoes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSession)
              })
              if (res.ok) {
                fetchCampaign()
                setShowSessionModal(false)
              }
            }}>
              <div className="form-group">
                <label>Título da Sessão</label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={e => setNewSession({ ...newSession, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input
                  type="number"
                  value={newSession.number}
                  onChange={e => setNewSession({ ...newSession, number: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Resumo</label>
                <textarea
                  rows={4}
                  value={newSession.summary}
                  onChange={e => setNewSession({ ...newSession, summary: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowSessionModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar Sessão</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCharModal && (
        <div className="modal-overlay" onClick={() => setShowCharModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Vincular Personagem</h3>
              <button className="close-btn" onClick={() => setShowCharModal(false)}><X size={20} /></button>
            </div>
            <div className="char-picker-list">
              {myCharacters.map(char => (
                <button
                  key={char.id}
                  className="char-picker-item"
                  onClick={async () => {
                    const res = await fetch(`/api/campanhas/${id}/personagens`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ characterId: char.id })
                    })
                    if (res.ok) {
                      fetchCampaign()
                      setShowCharModal(false)
                    }
                  }}
                >
                  {char.name} ({char.race} {char.class})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nova Nota</h3>
              <button className="close-btn" onClick={() => setShowNoteModal(false)}><X size={20} /></button>
            </div>
            <form className="modal-form" onSubmit={async (e) => {
              e.preventDefault()
              const res = await fetch(`/api/campanhas/${id}/notas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote)
              })
              if (res.ok) {
                fetchCampaign()
                setShowNoteModal(false)
              }
            }}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Conteúdo</label>
                <textarea
                  rows={6}
                  value={newNote.content}
                  onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                  required
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newNote.isPublic}
                    onChange={e => setNewNote({ ...newNote, isPublic: e.target.checked })}
                  />
                  Pública para jogadores
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newNote.isFixed}
                    onChange={e => setNewNote({ ...newNote, isFixed: e.target.checked })}
                  />
                  Fixar no topo
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowNoteModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Criar Nota</button>
              </div>
            </form>
          </div>
        </div>
      )}


      <style jsx>{`
        .campaign-detail-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .campaign-banner {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--fg3);
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 24px;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--fg);
        }

        .banner-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
        }

        .campaign-title {
          font-family: 'Cinzel', serif;
          font-size: 40px;
          color: var(--accentL);
          margin: 0 0 12px 0;
        }

        .campaign-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .dot {
          opacity: 0.3;
        }
        .banner-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }

        @media (max-width: 768px) {
          .banner-actions {
            align-items: center;
            width: 100%;
            margin-top: 20px;
          }

          .progress-widget {
            width: 100% !important;
          }
        }

        .progress-widget {
          width: 300px;
          background: rgba(0,0,0,0.4);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 800;
          color: var(--fg2);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .progress-bar-bg {
          height: 8px;
          background: var(--bg);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accentL));
          border-radius: 4px;
        }

        .tabs-nav {
          display: flex;
          gap: 8px;
          padding: 4px;
          background: var(--bg2);
          border-radius: 12px;
          border: 1px solid var(--border);
          overflow-x: auto;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border: none;
          background: transparent;
          color: var(--fg3);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 8px;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: var(--fg);
          background: rgba(255,255,255,0.05);
        }

        .tab-btn.active {
          background: var(--accentGlow);
          color: var(--accentL);
        }

        .tab-content {
          min-height: 400px;
        }

        .resumo-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 24px;
        }

        .resumo-section {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .resumo-section h3 {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--accentL);
          margin: 0 0 16px 0;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .resumo-section p {
          color: var(--fg2);
          line-height: 1.6;
          white-space: pre-wrap;
          margin: 0;
        }

        .sidebar-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
        }

        .sidebar-card h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--fg3);
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        .info-item label {
          font-size: 11px;
          color: var(--fg3);
          font-weight: 700;
        }

        .info-item span {
          font-size: 14px;
          color: var(--fg);
          font-weight: 600;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .list-header h3 {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: var(--fg);
          margin: 0;
        }

        .empty-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px;
          background: var(--bg2);
          border: 2px dashed var(--border);
          border-radius: 20px;
          color: var(--fg3);
          text-align: center;
        }

        .sessions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .session-card {
          display: flex;
          gap: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          padding: 20px;
          border-radius: 12px;
        }

        .session-num {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: var(--accentL);
          opacity: 0.5;
        }

        .session-info h4 {
          margin: 0 0 8px 0;
          color: var(--fg);
        }

        .session-info p {
          font-size: 14px;
          color: var(--fg2);
          margin: 0 0 12px 0;
        }

        .session-date {
          font-size: 12px;
          color: var(--fg3);
          font-weight: 700;
        }

        .chars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .char-mini-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .char-mini-card:hover {
          border-color: var(--accent);
          background: var(--bg2);
        }

        .char-mini-card img {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
        }

        .char-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: var(--accentGlow);
          color: var(--accentL);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
        }

        .char-details {
          display: flex;
          flex-direction: column;
        }

        .char-name {
          font-weight: 700;
          color: var(--fg);
        }

        .char-meta {
          font-size: 11px;
          color: var(--fg3);
        }

        .char-picker-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 400px;
          overflow-y: auto;
        }

        .char-picker-item {
          padding: 12px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--fg);
          text-align: left;
          cursor: pointer;
        }

        .char-picker-item:hover {
          background: var(--accentGlow);
          border-color: var(--accent);
        }

        .notes-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .note-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        .note-card.fixed {
          border-color: var(--accent);
          box-shadow: 0 0 10px var(--accentGlow);
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .note-header h4 {
          margin: 0;
          color: var(--fg);
          font-family: 'Cinzel', serif;
        }

        .public-tag {
          font-size: 10px;
          background: #10b981;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .note-content {
          font-size: 14px;
          color: var(--fg2);
          line-height: 1.5;
          white-space: pre-wrap;
          flex: 1;
        }

        .note-footer {
          font-size: 11px;
          color: var(--fg3);
          border-top: 1px solid var(--border);
          padding-top: 8px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: var(--card);
          width: 100%;
          max-width: 500px;
          border-radius: 20px;
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, var(--bg2), transparent);
        }

        .modal-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 11px;
          font-weight: 800;
          color: var(--fg3);
          text-transform: uppercase;
        }

        .form-group input, .form-group textarea {
          padding: 12px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--fg);
          outline: none;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          font-family: 'Cinzel', serif;
          color: var(--accentL);
          font-size: 24px;
        }

        .threats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .threat-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          gap: 16px;
          position: relative;
          transition: all 0.2s;
        }

        .threat-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .threat-type-icon {
          width: 40px;
          height: 40px;
          background: var(--bg2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .threat-info {
          flex: 1;
        }

        .threat-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .threat-main h4 {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--fg);
        }

        .threat-tag {
          font-size: 9px;
          font-weight: 800;
          background: var(--accentGlow);
          color: var(--accentL);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .threat-stats {
          display: flex;
          gap: 12px;
          font-size: 12px;
          font-weight: 700;
          color: var(--fg2);
          margin-bottom: 12px;
        }

        .threat-desc-short {
          font-size: 13px;
          color: var(--fg3);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .threat-actions-btns {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-icon {
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg3);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .btn-icon:hover {
          color: var(--fg);
          border-color: var(--fg3);
        }

        .btn-icon.danger:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        /* Modal Enhancements */
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

        @media (max-width: 768px) {
          .banner-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left;
            gap: 24px;
          }

          .progress-widget {
            width: 100%;
            margin-left: 0;
            background: rgba(0,0,0,0.3);
          }

          .resumo-grid {
            grid-template-columns: 1fr !important;
          }

          .campaign-title {
            font-size: 28px !important;
            line-height: 1.2;
          }
        }

        @media (max-width: 640px) {
          .campaign-banner {
            padding: 32px 20px;
          }

          .tabs-nav {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            background: transparent;
            border: none;
            padding: 0;
          }

          .tab-btn {
            background: var(--bg2);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 14px 8px;
            justify-content: center;
            font-size: 13px;
            width: 100%;
          }

          .tab-btn.active {
            background: var(--accentGlow);
            border-color: var(--accent);
          }

          .sessions-grid, .chars-grid, .notes-grid-layout, .threats-grid {
            grid-template-columns: 1fr !important;
          }

          .session-card {
            flex-direction: column;
            gap: 12px;
          }

          .modal-content {
            margin: 0;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }
        }

        .tabs-nav::-webkit-scrollbar {
          display: none;
        }
        .tabs-nav {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
