'use client'

import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function NoteModal() {
  const {
    id,
    showNoteModal,
    setShowNoteModal,
    newNote,
    setNewNote,
    fetchCampaign,
  } = useCampaign()

  const [savingNote, setSavingNote] = useState(false)

  if (!showNoteModal) return null

  return (
    <div className="modal-overlay" onClick={() => !savingNote && setShowNoteModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{newNote.id ? 'Editar Nota' : 'Nova Nota'}</h3>
          <button className="close-btn" onClick={() => setShowNoteModal(false)} disabled={savingNote} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form
          className="modal-form"
          onSubmit={async (e) => {
            e.preventDefault()
            setSavingNote(true)
            const isEditing = !!newNote.id
            const url = isEditing
              ? `/api/campanhas/${id}/notas/${newNote.id}`
              : `/api/campanhas/${id}/notas`

            // Force type text when saving standard text notes
            const noteData = { ...newNote, type: 'text', imageUrl: null }

            try {
              const res = await fetch(url, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteData)
              })
              if (res.ok) {
                await fetchCampaign()
                setShowNoteModal(false)
              }
            } catch (error) {
              console.error('Error saving note:', error)
            } finally {
              setSavingNote(false)
            }
          }}
        >
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={newNote.title}
              onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              required
              disabled={savingNote}
            />
          </div>
          <div className="form-group">
            <label>Conteúdo</label>
            <textarea
              rows={6}
              value={newNote.content}
              placeholder="Digite o conteúdo da sua nota..."
              onChange={e => setNewNote({ ...newNote, content: e.target.value })}
              required
              disabled={savingNote}
            ></textarea>
          </div>
          <div style={{ display: 'flex', gap: 24, margin: '8px 0 20px 0' }}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={newNote.isPublic}
                onChange={e => setNewNote({ ...newNote, isPublic: e.target.checked })}
                disabled={savingNote}
              />
              Pública para jogadores
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={newNote.isFixed}
                onChange={e => setNewNote({ ...newNote, isFixed: e.target.checked })}
                disabled={savingNote}
              />
              Fixar no topo
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setShowNoteModal(false)}
              disabled={savingNote}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={savingNote}>
              {savingNote ? <Loader2 className="animate-spin" size={18} /> : (newNote.id ? 'Salvar Nota' : 'Criar Nota')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
