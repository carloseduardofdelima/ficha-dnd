'use client'

import React from 'react'
import { Plus, Map, Edit, Trash2, Maximize2, BookOpen } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function NotesTab() {
  const {
    campaign,
    setNewNote,
    setShowNoteModal,
    setShowMapDocModal,
    handleDeleteNote,
    setZoomImage,
    setZoomScale,
    setPanOffset,
  } = useCampaign()

  if (!campaign) return null

  return (
    <div className="notes-section">
      <div className="list-header">
        <h3>Bloco de Notas</h3>
        {campaign.isOwner && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setNewNote({ title: '', content: '', isPublic: false, isFixed: false, type: 'text', imageUrl: '' })
                setShowNoteModal(true)
              }}
            >
              <Plus size={16} /> Nova Nota
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setNewNote({ title: '', content: '', isPublic: false, isFixed: false, type: 'map', imageUrl: '' })
                setShowMapDocModal(true)
              }}
            >
              <Map size={16} /> + Mapa/Documento
            </button>
          </div>
        )}
      </div>

      <div className="notes-grid-layout">
        {campaign.notes_list?.map((note: any) => (
          <div
            key={note.id}
            className={`note-card ${note.isFixed ? 'fixed' : ''} ${campaign.isOwner ? 'editable' : ''}`}
            onClick={() => {
              if (campaign.isOwner) {
                setNewNote(note)
                if (note.type === 'map' || note.type === 'document') {
                  setShowMapDocModal(true)
                } else {
                  setShowNoteModal(true)
                }
              }
            }}
          >
            <div className="note-header">
              <h4>{note.title}</h4>
              <div className="flex items-center gap-2">
                {note.type === 'map' && <span className="type-tag map-tag">Mapa</span>}
                {note.type === 'document' && <span className="type-tag doc-tag">Documento</span>}
                {note.isPublic && <span className="public-tag">Pública</span>}
                {campaign.isOwner && (
                  <div className="flex gap-2">
                    <button
                      className="btn-icon-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setNewNote(note)
                        if (note.type === 'map' || note.type === 'document') {
                          setShowMapDocModal(true)
                        } else {
                          setShowNoteModal(true)
                        }
                      }}
                      aria-label="Editar Nota"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn-icon-sm danger"
                      onClick={(e) => handleDeleteNote(e, note.id)}
                      aria-label="Excluir Nota"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {(note.type === 'map' || note.type === 'document') && note.imageUrl && (
              <div
                className="note-card-image-container"
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  marginTop: '8px',
                  background: 'rgba(0,0,0,0.2)'
                }}
              >
                <img src={note.imageUrl} alt={note.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div
                  className="note-card-image-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    padding: '8px'
                  }}
                >
                  <button
                    className="btn btn-primary btn-xs zoom-btn"
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderRadius: '4px',
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setZoomImage(note.imageUrl)
                      setZoomScale(1)
                      setPanOffset({ x: 0, y: 0 })
                    }}
                  >
                    <Maximize2 size={12} /> Zoom
                  </button>
                </div>
              </div>
            )}

            {note.content && <p className="note-content">{note.content}</p>}
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
  )
}
