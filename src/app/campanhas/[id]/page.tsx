'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Users, BookOpen, Shield, Zap, Info, ChevronLeft, 
  Settings, Save, Plus, Target, MessageSquare, 
  Sword, Clock, Layout, Edit, Trash2, Calendar, X
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
    { id: 'monstros', label: 'Inimigos', icon: Shield },
    { id: 'combate', label: 'Combate', icon: Sword },
    { id: 'notas', label: 'Notas', icon: BookOpen },
  ]

  return (
    <div className="campaign-detail-container">
      {/* Top Banner */}
      <div className="campaign-banner">
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

        {/* Other tabs will be implemented as skeletons for now */}
        {['monstros', 'combate'].includes(activeTab) && (
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
                  onChange={e => setNewSession({...newSession, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input 
                  type="number" 
                  value={newSession.number}
                  onChange={e => setNewSession({...newSession, number: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Resumo</label>
                <textarea 
                  rows={4}
                  value={newSession.summary}
                  onChange={e => setNewSession({...newSession, summary: e.target.value})}
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
                  onChange={e => setNewNote({...newNote, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Conteúdo</label>
                <textarea 
                  rows={6}
                  value={newNote.content}
                  onChange={e => setNewNote({...newNote, content: e.target.value})}
                  required
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={newNote.isPublic}
                    onChange={e => setNewNote({...newNote, isPublic: e.target.checked})}
                  />
                  Pública para jogadores
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={newNote.isFixed}
                    onChange={e => setNewNote({...newNote, isFixed: e.target.checked})}
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
          color: var(--fg3);
          font-size: 14px;
          font-weight: 600;
        }

        .dot {
          opacity: 0.3;
        }

        .progress-widget {
          width: 300px;
          background: rgba(0,0,0,0.2);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
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

        @media (max-width: 1024px) {
          .banner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .resumo-grid {
            grid-template-columns: 1fr;
          }
          .progress-widget {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .campaign-title {
            font-size: 28px;
          }
          
          .campaign-banner {
            padding: 24px 16px;
          }

          .tabs-nav {
            flex-wrap: wrap;
            justify-content: center;
            background: transparent;
            border: none;
            gap: 10px;
          }

          .tab-btn {
            flex: 1 1 120px;
            justify-content: center;
            background: var(--bg2);
            border: 1px solid var(--border);
            padding: 12px;
          }

          .sessions-grid, .chars-grid, .notes-grid-layout {
            grid-template-columns: 1fr;
          }

          .session-card {
            flex-direction: column;
            gap: 12px;
          }

          .modal-content {
            margin: 10px;
            max-height: 95vh;
            overflow-y: auto;
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
