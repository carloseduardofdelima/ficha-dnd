'use client'
import { useState } from 'react'
import { 
  Search, Plus, User, Skull, Shield, Sword, 
  Trash2, Edit, Save, X, MoreVertical, 
  Heart, ShieldAlert, Zap, Book, Tag, Eye, EyeOff,
  Upload, Loader2
} from 'lucide-react'
import { compressImage } from '@/lib/image'

interface NpcTabProps {
  campaignId: string
  npcs: any[]
  onUpdate: () => void
}

export default function NpcTab({ campaignId, npcs, onUpdate }: NpcTabProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('todos')
  const [showModal, setShowModal] = useState(false)
  const [editingNpc, setEditingNpc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [viewingNpc, setViewingNpc] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    type: 'neutro',
    description: '',
    personality: '',
    appearance: '',
    notes: '',
    secrets: '',
    status: 'vivo',
    tags: '',
    avatarUrl: ''
  })

  const filteredNpcs = npcs.filter(npc => {
    const matchesSearch = npc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         npc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         npc.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'todos' || npc.type === filterType
    return matchesSearch && matchesType
  })

  const handleOpenModal = (npc?: any) => {
    if (npc) {
      setEditingNpc(npc)
      setFormData({
        name: npc.name,
        title: npc.title || '',
        type: npc.type,
        description: npc.description || '',
        personality: npc.personality || '',
        appearance: npc.appearance || '',
        notes: npc.notes || '',
        secrets: npc.secrets || '',
        status: npc.status,
        tags: npc.tags || '',
        avatarUrl: npc.avatarUrl || ''
      })
    } else {
      setEditingNpc(null)
      setFormData({
        name: '',
        title: '',
        type: 'neutro',
        description: '',
        personality: '',
        appearance: '',
        notes: '',
        secrets: '',
        status: 'vivo',
        tags: '',
        avatarUrl: ''
      })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingNpc 
        ? `/api/campanhas/${campaignId}/npcs/${editingNpc.id}`
        : `/api/campanhas/${campaignId}/npcs`
      
      const res = await fetch(url, {
        method: editingNpc ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setShowModal(false)
        onUpdate()
      }
    } catch (error) {
      console.error('Error saving NPC:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Por favor, selecione uma imagem (JPG, PNG ou WEBP).')
      return
    }

    setLoading(true)
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const base64 = event.target?.result as string
        const compressed = await compressImage(base64)
        setFormData(prev => ({ ...prev, avatarUrl: compressed }))
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Erro ao processar imagem.')
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este NPC?')) return

    try {
      const res = await fetch(`/api/campanhas/${campaignId}/npcs/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) onUpdate()
    } catch (error) {
      console.error('Error deleting NPC:', error)
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'aliado': return '#10b981'
      case 'inimigo': return '#ef4444'
      case 'boss': return '#8b5cf6'
      case 'comerciante': return '#f59e0b'
      case 'quest_giver': return '#3b82f6'
      default: return '#9ca3af'
    }
  }

  return (
    <div className="npc-manager">
      <div className="manager-header">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar NPC por nome ou tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="todos">Todos os Tipos</option>
            <option value="aliado">Aliados</option>
            <option value="neutro">Neutros</option>
            <option value="inimigo">Inimigos</option>
            <option value="boss">Chefes (Boss)</option>
            <option value="comerciante">Comerciantes</option>
            <option value="quest_giver">Missão (Quest)</option>
          </select>
          <button className="btn-add" onClick={() => handleOpenModal()}>
            <Plus size={18} /> Novo NPC
          </button>
        </div>
      </div>

      <div className="npcs-grid">
        {filteredNpcs.map(npc => (
          <div key={npc.id} className="npc-card" onClick={() => setViewingNpc(npc)}>
            <div className="npc-type-indicator" style={{ backgroundColor: getTypeColor(npc.type) }}></div>
            <div className="npc-card-header">
              <div className="npc-avatar-mini">
                {npc.avatarUrl ? <img src={npc.avatarUrl} alt={npc.name} /> : <User size={20} />}
              </div>
              <div className="npc-main-info">
                <h4>{npc.name}</h4>
                {npc.title && <span className="npc-title">{npc.title}</span>}
              </div>
              <div className="npc-status-tag" data-status={npc.status}>
                {npc.status}
              </div>
            </div>
            <p className="npc-card-desc">{npc.description || 'Sem descrição.'}</p>
            <div className="npc-card-footer">
              <div className="npc-tags">
                {npc.tags?.split(',').map((tag: string) => (
                  <span key={tag} className="tag">{tag.trim()}</span>
                ))}
              </div>
              <div className="npc-actions">
                <button onClick={(e) => { e.stopPropagation(); handleOpenModal(npc); }} className="action-btn">
                  <Edit size={14} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(npc.id); }} className="action-btn delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredNpcs.length === 0 && (
          <div className="empty-state">
            <User size={48} opacity={0.2} />
            <p>Nenhum NPC encontrado.</p>
          </div>
        )}
      </div>

      {/* MODAL CRIAR/EDITAR */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingNpc ? 'Editar NPC' : 'Novo NPC'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="npc-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Título / Cargo</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    placeholder="Ex: Guarda da Cidade"
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="aliado">Aliado</option>
                    <option value="neutro">Neutro</option>
                    <option value="inimigo">Inimigo</option>
                    <option value="boss">Boss</option>
                    <option value="comerciante">Comerciante</option>
                    <option value="quest_giver">Quest Giver</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="vivo">Vivo</option>
                    <option value="morto">Morto</option>
                    <option value="desaparecido">Desaparecido</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Avatar do NPC</label>
                  <div className="upload-container">
                    <input 
                      type="file" 
                      id="npc-avatar-upload"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="npc-avatar-upload" className="upload-box">
                      {formData.avatarUrl ? (
                        <div className="preview-container">
                          <img src={formData.avatarUrl} alt="Preview" />
                          <div className="upload-overlay">
                            <Upload size={24} />
                            <span>Trocar Imagem</span>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          {loading ? <Loader2 className="animate-spin" /> : <Upload size={32} />}
                          <span>Clique para subir imagem</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Descrição Curta</label>
                <input 
                  type="text" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Aparência</label>
                  <textarea 
                    value={formData.appearance} 
                    onChange={e => setFormData({...formData, appearance: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Personalidade</label>
                  <textarea 
                    value={formData.personality} 
                    onChange={e => setFormData({...formData, personality: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notas Gerais</label>
                <textarea 
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})} 
                />
              </div>

              <div className="form-group secret-group">
                <label><EyeOff size={14} /> Segredos do Mestre (Só você vê)</label>
                <textarea 
                  value={formData.secrets} 
                  onChange={e => setFormData({...formData, secrets: e.target.value})} 
                />
              </div>

              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input 
                  type="text" 
                  value={formData.tags} 
                  placeholder="nobre, elfo, perigoso"
                  onChange={e => setFormData({...formData, tags: e.target.value})} 
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar NPC'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VISUALIZAÇÃO */}
      {viewingNpc && (
        <div className="modal-overlay" onClick={() => setViewingNpc(null)}>
          <div className="modal-content view-modal" onClick={e => e.stopPropagation()}>
            <div className="view-header" style={{ borderLeft: `8px solid ${getTypeColor(viewingNpc.type)}` }}>
              {viewingNpc.avatarUrl && (
                <div className="view-avatar">
                  <img src={viewingNpc.avatarUrl} alt={viewingNpc.name} />
                </div>
              )}
              <div>
                <span className="view-type">{viewingNpc.type}</span>
                <h2>{viewingNpc.name}</h2>
                <p className="view-title">{viewingNpc.title}</p>
              </div>
              <button className="close-view" onClick={() => setViewingNpc(null)}><X size={24} /></button>
            </div>

            <div className="view-body">
              <div className="view-section">
                <h4><User size={16} /> Aparência</h4>
                <p>{viewingNpc.appearance || 'Sem detalhes físicos.'}</p>
              </div>

              <div className="view-section">
                <h4><Zap size={16} /> Personalidade</h4>
                <p>{viewingNpc.personality || 'Sem detalhes de personalidade.'}</p>
              </div>

              <div className="view-section">
                <h4><Book size={16} /> Notas</h4>
                <p>{viewingNpc.notes || 'Sem notas gerais.'}</p>
              </div>

              {viewingNpc.secrets && (
                <div className="view-section secret">
                  <h4><EyeOff size={16} /> Segredos do Mestre</h4>
                  <p>{viewingNpc.secrets}</p>
                </div>
              )}
            </div>

            <div className="view-footer">
              <div className="view-tags">
                {viewingNpc.tags?.split(',').map((tag: string) => (
                  <span key={tag} className="tag">{tag.trim()}</span>
                ))}
              </div>
              <button onClick={() => { handleOpenModal(viewingNpc); setViewingNpc(null); }} className="btn-edit-view">
                <Edit size={18} /> Editar NPC
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .npc-manager {
          color: var(--fg);
        }

        .manager-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .search-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0 16px;
          height: 48px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--fg);
          width: 100%;
          font-size: 14px;
          outline: none;
        }

        .filters {
          display: flex;
          gap: 12px;
        }

        .filters select {
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg);
          padding: 0 16px;
          border-radius: 12px;
          outline: none;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: white;
          border: none;
          padding: 0 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add:hover {
          background: var(--accentL);
          transform: translateY(-2px);
        }

        .npcs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .npc-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }

        .npc-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .npc-type-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
        }

        .npc-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .npc-main-info h4 {
          margin: 0;
          font-size: 18px;
          color: var(--accentL);
        }

        .npc-title {
          font-size: 12px;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .npc-status-tag {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
        }

        .npc-status-tag[data-status="vivo"] { color: #10b981; background: rgba(16,185,129,0.1); }
        .npc-status-tag[data-status="morto"] { color: #ef4444; background: rgba(239,68,68,0.1); }

        .npc-card-desc {
          font-size: 14px;
          color: var(--fg2);
          line-height: 1.5;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .npc-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .npc-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 10px;
          background: rgba(255,255,255,0.05);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--fg3);
        }

        .npc-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--fg3);
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: var(--bg);
          color: var(--fg);
        }

        .action-btn.delete:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px;
          color: var(--fg3);
        }

        /* MODAIS */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-content {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 { margin: 0; font-family: 'Cinzel', serif; }

        .modal-header button {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
        }

        .npc-form {
          padding: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--fg3);
          text-transform: uppercase;
        }

        .form-group input, .form-group select, .form-group textarea {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
          color: var(--fg);
          outline: none;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .secret-group {
          background: rgba(220, 38, 38, 0.05);
          padding: 16px;
          border-radius: 12px;
          border: 1px dashed rgba(220, 38, 38, 0.3);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .btn-cancel {
          background: transparent;
          border: none;
          color: var(--fg3);
          font-weight: 700;
          cursor: pointer;
        }

        .btn-save {
          background: var(--accent);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        /* VIEW MODAL */
        .view-modal {
          max-width: 600px;
        }

        .view-header {
          padding: 32px;
          background: var(--bg);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .view-type {
          font-size: 10px;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--fg3);
        }

        .view-header h2 {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          margin: 4px 0;
          color: var(--accentL);
        }

        .view-title {
          margin: 0;
          color: var(--fg2);
          font-style: italic;
        }

        .close-view {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
        }

        .view-body {
          padding: 32px;
        }

        .view-section {
          margin-bottom: 24px;
        }

        .view-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--fg3);
          text-transform: uppercase;
          font-size: 12px;
          margin: 0 0 12px 0;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .view-section p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--fg);
          white-space: pre-wrap;
        }

        .view-section.secret {
          background: rgba(220, 38, 38, 0.05);
          padding: 20px;
          border-radius: 12px;
          border: 1px dashed rgba(220, 38, 38, 0.3);
        }

        .view-footer {
          padding: 24px 32px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-edit-view {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--fg);
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .npc-avatar-mini {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg3);
          flex-shrink: 0;
        }

        .npc-avatar-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .view-avatar {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid var(--border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          flex-shrink: 0;
          margin-right: 24px;
        }

        .view-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-container {
          width: 100%;
        }

        .upload-box {
          display: block;
          width: 100%;
          height: 150px;
          border: 2px dashed var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
          background: var(--bg);
        }

        .upload-box:hover {
          border-color: var(--accent);
          background: rgba(225, 29, 72, 0.05);
        }

        .upload-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--fg3);
        }

        .upload-placeholder span {
          font-size: 13px;
        }

        .preview-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .preview-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .preview-container:hover .upload-overlay {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .manager-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .filters {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 8px;
          }

          .modal-overlay {
            padding: 0;
            align-items: flex-end;
          }

          .modal-content {
            border-radius: 24px 24px 0 0;
            max-height: 92vh;
            border-bottom: none;
          }

          .npc-form {
            padding: 20px;
          }

          .form-grid, .form-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .form-group {
            margin-bottom: 16px;
          }

          .form-group[style*="grid-column"] {
            grid-column: span 1 !important;
          }

          .view-header {
            flex-direction: column;
            padding: 24px;
            gap: 16px;
            align-items: center;
            text-align: center;
          }

          .view-avatar {
            margin-right: 0;
            width: 80px;
            height: 80px;
          }

          .view-content {
            padding: 20px;
          }

          .view-footer {
            flex-direction: column;
            gap: 12px;
            padding: 20px;
          }

          .btn-edit-view {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
