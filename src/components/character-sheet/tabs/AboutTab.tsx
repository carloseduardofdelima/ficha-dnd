'use client'

import React from 'react'
import Image from 'next/image'
import { User, Upload } from 'lucide-react'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function AboutTab() {
  const { character, isOwner, setShowUpload, updateValue, saveCharacterToDB, saveStatus } = useCharacterSheet()

  if (!character) return null

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Left: Image & Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div onClick={() => isOwner && setShowUpload(true)} style={{ cursor: isOwner ? 'pointer' : 'default', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 240, aspectRatio: '1/1.3', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              {character.avatarUrl ? (
                <Image src={character.avatarUrl} alt={character.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)', background: 'var(--bg2)', borderRadius: 20 }}>
                  <User size={80} />
                </div>
              )}
              {isOwner && (
                <div className="avatar-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}>
                  <Upload size={32} color="#fff" />
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 4 }}>
              {character.race}{character.subrace ? ` (${character.subrace})` : ''} • {character.background}
            </p>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--fg)', textTransform: 'uppercase' }}>
              {character.name}
            </h1>
            <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 16 }}>{character.class}</p>
          </div>
        </div>

        {/* Personality Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}>
          {[
            { label: 'Traços de Personalidade', key: 'personalityTraits', placeholder: 'Ex: Sou muito educado, mesmo com inimigos.' },
            { label: 'Ideais', key: 'ideals', placeholder: 'Ex: Justiça. Todos merecem um julgamento justo.' },
            { label: 'Ligações', key: 'bonds', placeholder: 'Ex: Devo proteger minha vila a qualquer custo.' },
            { label: 'Defeitos', key: 'flaws', placeholder: 'Ex: Tenho pavor de aranhas.' },
          ].map(pillar => (
            <div key={pillar.key}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, marginBottom: 8, borderBottom: '1px solid var(--accent)', display: 'inline-block', paddingBottom: 2 }}>{pillar.label}</h3>
              <div style={{ background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
                <textarea
                  value={(character as any)[pillar.key] || ''}
                  placeholder={pillar.placeholder}
                  readOnly={!isOwner}
                  onChange={(e) => isOwner && updateValue(pillar.key, e.target.value, false)}
                  style={{
                    width: '100%',
                    minHeight: 80,
                    background: 'transparent',
                    color: 'var(--fg)',
                    padding: 12,
                    border: 'none',
                    fontSize: 13,
                    lineHeight: 1.5,
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Description & Backstory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>Descrição Física</h3>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <textarea
                value={character.appearance || ''}
                placeholder="Descreva a aparência física do seu personagem..."
                readOnly={!isOwner}
                onChange={(e) => isOwner && updateValue('appearance', e.target.value, false)}
                style={{
                  width: '100%',
                  minHeight: 120,
                  background: 'transparent',
                  color: 'var(--fg)',
                  padding: 16,
                  border: 'none',
                  fontSize: 14,
                  lineHeight: 1.6,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>História</h3>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
              <textarea
                value={character.backstory || ''}
                placeholder="Escreva a história do seu personagem..."
                readOnly={!isOwner}
                onChange={(e) => isOwner && updateValue('backstory', e.target.value, false)}
                style={{
                  width: '100%',
                  minHeight: 300,
                  background: 'transparent',
                  color: 'var(--fg)',
                  padding: 20,
                  borderRadius: 12,
                  border: 'none',
                  fontSize: 14,
                  lineHeight: 1.6,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  whiteSpace: 'pre-wrap'
                }}
              />
            </div>
          </div>
          {isOwner && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button
                className="btn btn-primary"
                onClick={() => saveCharacterToDB(character)}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Biografia'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
