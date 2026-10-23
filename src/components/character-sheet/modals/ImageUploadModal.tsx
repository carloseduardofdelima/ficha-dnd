'use client'

import React from 'react'
import { X, Upload, Loader2, CheckCircle2 } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function ImageUploadModal() {
  const {
    showUpload,
    setShowUpload,
    uploading,
    uploadSuccess,
    handleFileChange
  } = useCharacterSheet()

  if (!showUpload) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(8px)',
        padding: 20
      }}
      onClick={() => setShowUpload(false)}
    >
      <div
        style={{
          backgroundColor: 'var(--bg2)',
          width: '100%',
          maxWidth: 400,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 18 }}>Alterar Avatar</h3>
          <button className="btn btn-ghost" onClick={() => setShowUpload(false)} style={{ padding: 8, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: 32, textAlign: 'center' }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'var(--bg)',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={40} color="var(--accent)" />
            ) : uploadSuccess ? (
              <CheckCircle2 size={40} color="var(--ok)" />
            ) : (
              <Upload size={40} color="var(--fg3)" />
            )}
          </div>
          <p style={{ fontSize: 14, color: 'var(--fg2)', marginBottom: 24 }}>
            {uploadSuccess ? 'Imagem enviada com sucesso!' : 'Escolha uma nova imagem para o seu personagem. Recomendamos imagens quadradas.'}
          </p>

          <label
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              cursor: (uploading || uploadSuccess) ? 'not-allowed' : 'pointer',
              opacity: (uploading || uploadSuccess) ? 0.7 : 1,
              background: uploadSuccess ? 'var(--ok)' : 'var(--accent)'
            }}
          >
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={uploading || uploadSuccess}
            />
            {uploading ? 'Processando...' : uploadSuccess ? 'Sucesso!' : 'Selecionar Arquivo'}
          </label>
        </div>
      </div>
    </div>
  )
}
