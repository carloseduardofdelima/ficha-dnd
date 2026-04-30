'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Filter, BookOpen, Info, Loader2, X } from 'lucide-react'
import { CampaignCard } from '@/components/CampaignCard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CampanhasPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'campaign',
    status: 'active',
    system: 'D&D 5e',
  })

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (sessionStatus === 'authenticated') {
      fetchCampaigns()
    }
  }, [sessionStatus])

  async function fetchCampaigns() {
    try {
      const res = await fetch('/api/campanhas')
      const data = await res.json()
      if (Array.isArray(data)) {
        setCampaigns(data)
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('/api/campanhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const newCampaign = await res.json()
        setCampaigns([newCampaign, ...campaigns])
        setShowCreateModal(false)
        setFormData({ name: '', description: '', type: 'campaign', status: 'active', system: 'D&D 5e' })
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.')) return
    try {
      const res = await fetch(`/api/campanhas/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCampaigns(campaigns.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Error deleting campaign:', error)
    }
  }

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || c.type === filter || c.status === filter
    return matchesSearch && matchesFilter
  })

  if (loading && sessionStatus === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 className="animate-spin" size={40} color="var(--accent)" />
      </div>
    )
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BookOpen size={32} /> Minhas Campanhas
          </h1>
          <p className="page-subtitle">Organize suas aventuras, sessões e combates em um só lugar.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} /> Nova Campanha
        </button>
      </div>

      {/* Filters & Search */}
      <div className="controls-row">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar campanhas..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          <button 
            className={`filter-tag ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button 
            className={`filter-tag ${filter === 'campaign' ? 'active' : ''}`}
            onClick={() => setFilter('campaign')}
          >
            Campanhas
          </button>
          <button 
            className={`filter-tag ${filter === 'one-shot' ? 'active' : ''}`}
            onClick={() => setFilter('one-shot')}
          >
            One-Shots
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="campaigns-grid">
        {filteredCampaigns.map(c => (
          <CampaignCard key={c.id} campaign={c} onDelete={handleDelete} />
        ))}

        {!loading && filteredCampaigns.length === 0 && (
          <div className="empty-state">
            <Info size={48} opacity={0.3} />
            <h3>Nenhuma campanha encontrada</h3>
            <p>Comece criando sua primeira campanha para gerenciar suas aventuras.</p>
            <button className="btn btn-ghost" onClick={() => setShowCreateModal(true)}>Criar Agora</button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nova Campanha</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="modal-form">
              <div className="form-group">
                <label>Nome da Campanha</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: A Maldição de Strahd"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="campaign">Campanha</option>
                    <option value="one-shot">One-Shot</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sistema</label>
                  <input 
                    type="text" 
                    placeholder="D&D 5e, Ordem Paranormal..."
                    value={formData.system}
                    onChange={e => setFormData({...formData, system: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Descrição (Opcional)</label>
                <textarea 
                  rows={3}
                  placeholder="Uma breve descrição sobre a temática ou o grupo..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={creating}>
                  {creating ? <Loader2 className="animate-spin" size={18} /> : 'Criar Campanha'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .page-title {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          color: var(--accentL);
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 8px 0;
        }

        .page-subtitle {
          color: var(--fg2);
          font-size: 16px;
          margin: 0;
        }

        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 400px;
          display: flex;
          align-items: center;
        }

        .search-box :global(svg) {
          position: absolute;
          left: 14px;
          color: var(--fg3);
        }

        .search-box input {
          width: 100%;
          padding: 12px 14px 12px 44px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--fg);
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-box input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accentGlow);
        }

        .filters {
          display: flex;
          gap: 8px;
        }

        .filter-tag {
          padding: 8px 16px;
          border-radius: 10px;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg2);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tag:hover {
          border-color: var(--fg3);
          color: var(--fg);
        }

        .filter-tag.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }

        .campaigns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          text-align: center;
          background: var(--bg2);
          border: 2px dashed var(--border);
          border-radius: 20px;
          color: var(--fg3);
        }

        .empty-state h3 {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: var(--fg2);
          margin: 16px 0 8px 0;
        }

        .empty-state p {
          max-width: 300px;
          margin-bottom: 24px;
        }

        /* Modal Styles */
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

        .modal-title {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: var(--accentL);
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 4px;
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
          font-size: 12px;
          font-weight: 800;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 12px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--fg);
          font-size: 14px;
          outline: none;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 32px;
          }
          
          .page-title {
            font-size: 24px;
            gap: 12px;
          }

          .page-subtitle {
            font-size: 14px;
          }

          .controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          
          .search-box {
            max-width: none;
          }

          .filters {
            overflow-x: auto;
            padding-bottom: 4px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .filters::-webkit-scrollbar {
            display: none;
          }

          .filter-tag {
            white-space: nowrap;
          }

          .campaigns-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .modal-content {
            margin: 10px;
            max-height: 95vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  )
}
