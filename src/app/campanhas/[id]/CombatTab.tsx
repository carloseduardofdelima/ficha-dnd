'use client'
import { useState, useEffect, useCallback } from 'react'
import { 
  Sword, Shield, Heart, Skull, Play, Square, 
  ChevronRight, Plus, Trash2, Edit2, Zap,
  Loader2, User, Info, Save, X, ChevronUp, ChevronDown
} from 'lucide-react'

interface CombatTabProps {
  campaignId: string
  campaign: any
  onUpdate: () => void
  isOwner?: boolean
}

export default function CombatTab({ campaignId, campaign, onUpdate, isOwner }: CombatTabProps) {
  const [combats, setCombats] = useState<any[]>([])
  const [activeCombat, setActiveCombat] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showAddParticipant, setShowAddParticipant] = useState(false)
  const [localTurnIndex, setLocalTurnIndex] = useState(0)
  
  const isMaster = isOwner ?? (campaign?.isOwner || false)

  const fetchCombats = useCallback(async () => {
    try {
      const res = await fetch(`/api/campanhas/${campaignId}/combates`)
      const data = await res.json()
      setCombats(data)
      if (data.length > 0 && !activeCombat) {
        // If there's an active combat, pick it
        const active = data.find((c: any) => c.status === 'ativo')
        if (active) fetchCombatDetails(active.id)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [campaignId, activeCombat])

  const fetchCombatDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/combates/${id}`)
      const data = await res.json()
      setActiveCombat(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchCombats()
  }, [fetchCombats])

  // Real-time synchronization (polling for now, as requested "realtime" but implementation context varies)
  useEffect(() => {
    if (activeCombat && activeCombat.status === 'ativo') {
      const interval = setInterval(() => {
        fetchCombatDetails(activeCombat.id)
      }, 10000) // Poll every 10 seconds for HP updates
      return () => clearInterval(interval)
    }
  }, [activeCombat?.id, activeCombat?.status])

  const handleCreateCombat = async () => {
    setCreating(true)
    try {
      const res = await fetch(`/api/campanhas/${campaignId}/combates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Combate ${combats.length + 1}` })
      })
      if (res.ok) {
        const newCombat = await res.json()
        fetchCombats()
        fetchCombatDetails(newCombat.id)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  const handleUpdateStatus = async (status: string) => {
    if (!activeCombat) return
    try {
      await fetch(`/api/combates/${activeCombat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchCombatDetails(activeCombat.id)
      fetchCombats()
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdateTurn = (index: number) => {
    setLocalTurnIndex(index)
  }

  const handleAddParticipant = async (entity: any, type: 'player' | 'threat' | 'npc') => {
    if (!activeCombat) return
    
    let participantData: any = {
      entityType: type,
      entityId: entity.id,
      name: entity.name || entity.character?.name || 'Desconhecido',
      initiative: 0,
      turnOrder: activeCombat.participants.length
    }

    if (type === 'threat') {
      participantData.maxHp = entity.attributes?.hp || 10
      participantData.ac = entity.attributes?.ac || 10
    } else if (type === 'npc') {
      participantData.maxHp = entity.combat?.hp || 10
      participantData.ac = entity.combat?.ac || 10
    }

    try {
      await fetch(`/api/combates/${activeCombat.id}/participantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(participantData)
      })
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error(e)
    }
  }

  const handleRemoveParticipant = async (id: string) => {
    try {
      await fetch(`/api/combates/participantes/${id}`, { method: 'DELETE' })
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error(e)
    }
  }
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= activeCombat.participants.length) return

    const newParticipants = [...activeCombat.participants]
    const [movedItem] = newParticipants.splice(index, 1)
    newParticipants.splice(newIndex, 0, movedItem)

    // Update locally
    setActiveCombat({ ...activeCombat, participants: newParticipants })

    // Update DB
    try {
      await Promise.all(newParticipants.map((p, idx) => 
        fetch(`/api/combates/participantes/${p.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ turnOrder: idx })
        })
      ))
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error('Error moving:', e)
    }
  }

  const handleUpdateParticipantHp = async (p: any, change: number) => {
    if (p.entityType === 'player') return // Players control their own HP
    
    const newHp = Math.max(0, (p.stats?.currentHp || 0) + change)
    try {
      await fetch(`/api/combates/participantes/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          stats: { ...p.stats, currentHp: newHp },
          isAlive: newHp > 0
        })
      })
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdateInitiative = async (p: any, value: number) => {
    try {
      await fetch(`/api/combates/participantes/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initiative: value })
      })
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('draggedIndex', index.toString())
    // Add a visual effect
    const target = e.currentTarget as HTMLElement
    target.style.opacity = '0.5'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Required for drop to work
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const draggedIndex = parseInt(e.dataTransfer.getData('draggedIndex'))
    if (draggedIndex === dropIndex) return

    const newParticipants = [...activeCombat.participants]
    const [draggedItem] = newParticipants.splice(draggedIndex, 1)
    newParticipants.splice(dropIndex, 0, draggedItem)

    // Update locally for instant feedback
    setActiveCombat({ ...activeCombat, participants: newParticipants })

    // Update in DB
    try {
      await Promise.all(newParticipants.map((p, idx) => 
        fetch(`/api/combates/participantes/${p.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ turnOrder: idx })
        })
      ))
      fetchCombatDetails(activeCombat.id)
    } catch (e) {
      console.error('Error reordering:', e)
    }
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.opacity = '1'
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="animate-spin" />
        <p>Carregando combates...</p>
      </div>
    )
  }

  return (
    <div className="combat-container">
      <div className="combat-sidebar">
        <div className="sidebar-header">
          <h3>Combates</h3>
          <button className="btn-add-combat" onClick={handleCreateCombat} disabled={creating}>
            {creating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          </button>
        </div>
        <div className="combat-list">
          {combats.map(c => (
            <div 
              key={c.id} 
              className={`combat-item ${activeCombat?.id === c.id ? 'active' : ''} ${c.status}`}
              onClick={() => fetchCombatDetails(c.id)}
            >
              <Sword size={16} />
              <span>{c.name}</span>
              <span className={`status-dot ${c.status}`}></span>
            </div>
          ))}
          {combats.length === 0 && <p className="empty-text">Nenhum combate registrado.</p>}
        </div>
      </div>

      <div className="combat-main">
        {activeCombat ? (
          <>
            <div className="main-header">
              <div className="header-info">
                <h2>{activeCombat.name}</h2>
                <div className={`status-badge ${activeCombat.status}`}>
                  {activeCombat.status === 'ativo' ? 'EM CURSO' : 'FINALIZADO'}
                </div>
                {activeCombat.status === 'ativo' && activeCombat.participants.length > 0 && (
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => handleUpdateTurn((localTurnIndex + 1) % activeCombat.participants.length)}
                    style={{ marginTop: 12, marginBottom: 10 }}  
                  >
                    Próximo <ChevronRight size={14} />
                  </button>
                )}
              </div>
              <div className="header-actions">
                {activeCombat.status === 'ativo' ? (
                  <>
                    <button className="btn btn-ghost" onClick={() => handleUpdateStatus('finalizado')}>
                      <Square size={16} /> Finalizar
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleUpdateStatus('ativo')}>
                    <Play size={16} /> Reabrir Combate
                  </button>
                )}
                <button className="btn btn-accent" onClick={() => setShowAddParticipant(true)}>
                  <Plus size={16} /> Adicionar
                </button>
              </div>
            </div>

            <div className="participants-grid">
              {activeCombat.participants.map((p: any, idx: number) => {
                const isCurrentTurn = localTurnIndex === idx
                const hp = p.entityType === 'player' ? p.playerStats?.currentHp : p.stats?.currentHp
                const maxHp = p.entityType === 'player' ? p.playerStats?.maxHp : p.stats?.maxHp
                const ac = p.entityType === 'player' ? p.playerStats?.armorClass : p.stats?.ac
                const hpPercent = (hp / maxHp) * 100

                return (
                  <div 
                    key={p.id} 
                    className={`participant-card ${isCurrentTurn ? 'current' : ''} ${!p.isAlive ? 'dead' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: 'grab' }}
                  >
                    {isCurrentTurn && <div className="turn-indicator">TURNO ATUAL</div>}
                    <div className="card-header">
                      <div className="init-badge">{p.initiative}</div>
                      <div className="participant-info">
                        <h4>{p.name}</h4>
                        <div className="type-badge" data-type={p.entityType}>
                          {p.entityType === 'player' ? 'JOGADOR' : p.entityType === 'threat' ? 'AMEAÇA' : 'NPC'}
                        </div>
                      </div>
                      <div className="header-actions">
                        <div className="mobile-order-btns">
                          <button onClick={() => handleMove(idx, 'up')} disabled={idx === 0} className="btn-move">
                            <ChevronUp size={16} />
                          </button>
                          <button onClick={() => handleMove(idx, 'down')} disabled={idx === activeCombat.participants.length - 1} className="btn-move">
                            <ChevronDown size={16} />
                          </button>
                        </div>
                        <button onClick={() => handleRemoveParticipant(p.id)} className="btn-remove">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="hp-section">
                      <div className="hp-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Heart size={14} /> {hp} / {maxHp}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Shield size={14} /> CA: {ac}</span>
                        </div>
                      </div>
                      <div className="hp-bar-bg">
                        <div 
                          className="hp-bar-fill" 
                          style={{ width: `${hpPercent}%`, background: hpPercent < 25 ? '#ef4444' : hpPercent < 50 ? '#f59e0b' : '#10b981' }}
                        ></div>
                      </div>
                      {p.entityType === 'player' ? (
                        <></>
                      ) : (
                        <div className="hp-controls">
                          <button onClick={() => handleUpdateParticipantHp(p, -1)} className="hp-btn minus">-1</button>
                          <button onClick={() => handleUpdateParticipantHp(p, -5)} className="hp-btn minus">-5</button>
                          <button onClick={() => handleUpdateParticipantHp(p, 5)} className="hp-btn plus">+5</button>
                          <button onClick={() => handleUpdateParticipantHp(p, 1)} className="hp-btn plus">+1</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {activeCombat.participants.length === 0 && (
              <div className="empty-combat">
                <Sword size={64} opacity={0.1} />
                <p>Nenhum participante no combate.</p>
                <button className="btn btn-primary" onClick={() => setShowAddParticipant(true)}>
                  Adicionar Participantes
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-active-combat">
            <Skull size={64} opacity={0.1} />
            <h2>Nenhum combate selecionado</h2>
            <p>Selecione um combate na barra lateral ou crie um novo para começar.</p>
          </div>
        )}
      </div>

      {/* Add Participant Modal */}
      {showAddParticipant && (
        <div className="modal-overlay" onClick={() => setShowAddParticipant(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Adicionar Participantes</h3>
              <button onClick={() => setShowAddParticipant(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <section className="add-section">
                <h4>Jogadores</h4>
                <div className="add-grid">
                  {campaign.characters?.map((c: any) => (
                    <div key={c.character.id} className="add-item">
                      <span>{c.character.name}</span>
                      <button className="btn-add-mini" onClick={() => handleAddParticipant(c.character, 'player')}>
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              <section className="add-section">
                <h4>Ameaças da Campanha</h4>
                <div className="add-grid">
                  {campaign.threats?.map((t: any) => (
                    <div key={t.id} className="add-item">
                      <span>{t.name}</span>
                      <button className="btn-add-mini" onClick={() => handleAddParticipant(t, 'threat')}>
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              <section className="add-section">
                <h4>NPCs</h4>
                <div className="add-grid">
                  {campaign.npcs?.map((n: any) => (
                    <div key={n.id} className="add-item">
                      <span>{n.name}</span>
                      <button className="btn-add-mini" onClick={() => handleAddParticipant(n, 'npc')}>
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowAddParticipant(false)}>
                Concluir Seleção
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .combat-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          background: var(--bg2);
          border-radius: 20px;
          border: 1px solid var(--border);
          min-height: 700px;
          overflow: hidden;
        }

        .combat-sidebar {
          background: rgba(0,0,0,0.2);
          border-right: 1px solid var(--border);
          padding: 24px;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .sidebar-header h3 {
          margin: 0;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--fg3);
        }

        .btn-add-combat {
          background: var(--accent);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .combat-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .combat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--fg2);
          position: relative;
        }

        .combat-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--fg);
        }

        .combat-item.active {
          background: var(--accent);
          color: white;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          right: 16px;
        }

        .status-dot.ativo { 
          background: #10b981; 
          box-shadow: 0 0 8px #10b981; 
          animation: pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        .status-dot.finalizado { background: var(--fg3); }

        @keyframes pulse-dot {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
            box-shadow: 0 0 12px #10b981;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.8;
          }
        }

        .combat-main {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          overflow-y: auto;
          max-height: 800px;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-info h2 {
          margin: 0 0 8px 0;
          font-family: 'Cinzel', serif;
          font-size: 28px;
        }

        .status-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .status-badge.ativo { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .status-badge.finalizado { background: rgba(255,255,255,0.05); color: var(--fg3); border: 1px solid var(--border); }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .participants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .participant-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s;
          position: relative;
        }

        .participant-card.current {
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(225, 29, 72, 0.1);
          transform: translateY(-4px);
        }

        .participant-card.dead {
          opacity: 0.6;
          filter: grayscale(0.8);
        }

        .turn-indicator {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          z-index: 10;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .init-badge {
          width: 36px;
          height: 36px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: var(--accentL);
        }

        .participant-info {
          flex: 1;
        }

        .participant-info h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
        }

        .type-badge {
          font-size: 9px;
          font-weight: 700;
          color: var(--fg3);
          letter-spacing: 0.5px;
        }

        .hp-section {
          margin-bottom: 20px;
        }

        .hp-header {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--fg2);
        }

        .hp-bar-bg {
          height: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .hp-bar-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .player-control-notice {
          font-size: 11px;
          color: var(--fg3);
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.03);
          padding: 6px;
          border-radius: 6px;
          justify-content: center;
        }

        .hp-controls {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .hp-btn {
          border: none;
          border-radius: 6px;
          padding: 6px 0;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hp-btn.minus { background: rgba(239,68,68,0.1); color: #ef4444; }
        .hp-btn.minus:hover { background: #ef4444; color: white; }
        .hp-btn.plus { background: rgba(16,185,129,0.1); color: #10b981; }
        .hp-btn.plus:hover { background: #10b981; color: white; }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--fg3);
        }

        .btn-next-turn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .btn-jump-turn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--fg3);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          cursor: pointer;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .mobile-order-btns {
          display: none;
          gap: 2px;
        }

        .btn-move {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-move:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        .btn-remove {
          background: transparent;
          border: none;
          color: var(--fg3);
          cursor: pointer;
          padding: 4px;
        }

        .btn-remove:hover { color: #ef4444; }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
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
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
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

        .modal-body {
          padding: 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border);
          background: rgba(0,0,0,0.1);
        }

        .add-section {
          margin-bottom: 24px;
        }

        .add-section h4 {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--fg3);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .add-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .add-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg);
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
        }

        .btn-add-mini {
          background: var(--accent);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .combat-container { grid-template-columns: 1fr; }
          .combat-sidebar { display: none; }
        }

        @media (max-width: 768px) {
          .combat-main { padding: 12px; gap: 12px; }
          .main-header { padding: 0 4px; }
          .header-info h2 { font-size: 20px; }
          .header-actions .btn { padding: 6px; font-size: 10px; }
          
          .participants-grid { gap: 8px; }

          .participant-card {
            padding: 10px 12px;
            border-radius: 12px;
          }

          .card-header { 
            margin-bottom: 8px; 
            gap: 8px;
          }
          .init-badge { width: 24px; height: 24px; font-size: 11px; border-radius: 6px; }
          .participant-info { display: flex; align-items: baseline; gap: 6px; }
          .participant-info h4 { font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
          .type-badge { font-size: 8px; opacity: 0.7; }
          
          .hp-section { margin-bottom: 8px; }
          .hp-header { font-size: 10px; margin-bottom: 4px; }
          .hp-bar-bg { height: 4px; margin-bottom: 8px; }
          
          .hp-controls { gap: 4px; }
          .hp-btn { padding: 2px 0; font-size: 9px; border-radius: 4px; }

          .card-footer { 
            padding-top: 8px; 
            font-size: 10px;
          }
          .btn-next-turn, .btn-jump-turn { 
            padding: 4px 8px; 
            font-size: 10px; 
            border-radius: 6px;
          }
          
          .turn-indicator {
            top: -8px;
            font-size: 8px;
            padding: 2px 8px;
          }

          .modal-content { border-radius: 20px 20px 0 0; }
          .modal-header { padding: 16px; }
          .modal-body { padding: 16px; }
          .add-item { padding: 8px 12px; font-size: 13px; }

          .mobile-order-btns {
            display: flex;
          }
          
          .btn-move {
            color: var(--accentL);
          }
        }
      `}</style>
    </div>
  )
}

