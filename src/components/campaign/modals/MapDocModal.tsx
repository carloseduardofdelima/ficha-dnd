'use client'

import React, { useState } from 'react'
import { X, Upload, Loader2 } from 'lucide-react'
import { compressCover } from '@/lib/image'
import { useCampaign } from '../context/CampaignContext'

export default function MapDocModal() {
  const {
    id,
    showMapDocModal,
    setShowMapDocModal,
    newNote,
    setNewNote,
    fetchCampaign,
  } = useCampaign()

  const [savingNote, setSavingNote] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  if (!showMapDocModal) return null

  return (
    <div className="modal-overlay" onClick={() => !savingNote && setShowMapDocModal(false)}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: '20px 24px' }}>
          <h3>{newNote.id ? 'Editar Mapa/Documento' : 'Novo Mapa/Documento'}</h3>
          <button className="close-btn" onClick={() => setShowMapDocModal(false)} disabled={savingNote} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form
          className="modal-form"
          style={{ padding: '20px 24px' }}
          onSubmit={async (e) => {
            e.preventDefault()
            if (!newNote.imageUrl) {
              alert('Por favor, faça o upload de uma imagem.')
              return
            }
            setSavingNote(true)
            const isEditing = !!newNote.id
            const url = isEditing
              ? `/api/campanhas/${id}/notas/${newNote.id}`
              : `/api/campanhas/${id}/notas`
            try {
              const res = await fetch(url, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote)
              })
              if (res.ok) {
                await fetchCampaign()
                setShowMapDocModal(false)
              }
            } catch (error) {
              console.error('Error saving map/document:', error)
            } finally {
              setSavingNote(false)
            }
          }}
        >
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {/* Coluna Esquerda: Upload de Imagem */}
            <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--fg2)', marginBottom: '8px' }}>
                Imagem do {newNote.type === 'map' ? 'Mapa' : 'Documento'}
              </label>
              <div className="upload-container" style={{ position: 'relative', flex: 1, display: 'flex' }}>
                <input
                  type="file"
                  id="note-mapdoc-image-upload"
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  style={{ display: 'none' }}
                  disabled={savingNote}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    setUploadingImage(true)
                    const reader = new FileReader()
                    reader.onload = async (event) => {
                      try {
                        const base64 = event.target?.result as string
                        const compressed = await compressCover(base64, 1600, 1200, 0.85)
                        setNewNote((prev: any) => ({ ...prev, imageUrl: compressed }))
                      } catch (error) {
                        console.error('Error compressing map/document:', error)
                        alert('Erro ao carregar imagem.')
                      } finally {
                        setUploadingImage(false)
                      }
                    }
                    reader.readAsDataURL(file)
                  }}
                />
                <label
                  htmlFor="note-mapdoc-image-upload"
                  className="upload-box"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '210px',
                    height: '100%',
                    border: '2px dashed var(--border)',
                    borderRadius: '12px',
                    cursor: (uploadingImage || savingNote) ? 'not-allowed' : 'pointer',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {newNote.imageUrl ? (
                    <>
                      <img src={newNote.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          color: '#fff'
                        }}
                        className="upload-overlay-hover"
                      >
                        <Upload size={20} />
                        <span style={{ fontSize: '11px', marginTop: '4px' }}>Alterar Imagem</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {uploadingImage ? (
                        <Loader2 className="animate-spin" size={24} color="var(--accent)" />
                      ) : (
                        <Upload size={24} color="var(--fg3)" />
                      )}
                      <span style={{ fontSize: '13px', marginTop: '6px', color: 'var(--fg2)' }}>
                        {uploadingImage ? 'Processando...' : 'Selecionar Imagem'}
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Coluna Direita: Campos de texto e seleções */}
            <div style={{ flex: '1.2 1 280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px' }}>Estilo</label>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <button
                    type="button"
                    className={`btn ${(newNote.type === 'map') ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1, padding: '8px 16px', fontSize: '12px' }}
                    disabled={savingNote}
                    onClick={() => setNewNote({ ...newNote, type: 'map' })}
                  >
                    Mapa
                  </button>
                  <button
                    type="button"
                    className={`btn ${(newNote.type === 'document') ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1, padding: '8px 16px', fontSize: '12px' }}
                    disabled={savingNote}
                    onClick={() => setNewNote({ ...newNote, type: 'document' })}
                  >
                    Documento
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px' }}>Título</label>
                <input
                  type="text"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                  value={newNote.title}
                  disabled={savingNote}
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px' }}>Descrição (Opcional)</label>
                <textarea
                  rows={2}
                  style={{ padding: '8px 12px', fontSize: '13px', minHeight: '60px' }}
                  value={newNote.content}
                  disabled={savingNote}
                  placeholder="Descrição ou notas adicionais..."
                  onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: 20, margin: '4px 0' }}>
                <label className="checkbox-container" style={{ fontSize: '12px' }}>
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={newNote.isPublic}
                    disabled={savingNote}
                    onChange={e => setNewNote({ ...newNote, isPublic: e.target.checked })}
                  />
                  Pública
                </label>
                <label className="checkbox-container" style={{ fontSize: '12px' }}>
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={newNote.isFixed}
                    disabled={savingNote}
                    onChange={e => setNewNote({ ...newNote, isFixed: e.target.checked })}
                  />
                  Fixar no topo
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setShowMapDocModal(false)} disabled={savingNote}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={uploadingImage || savingNote}>
              {savingNote ? <Loader2 className="animate-spin" size={18} /> : (newNote.id ? 'Salvar' : 'Criar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
