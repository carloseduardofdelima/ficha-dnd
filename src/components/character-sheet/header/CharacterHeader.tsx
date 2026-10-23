'use client'

import React from 'react'
import Image from 'next/image'
import {
  User,
  Settings,
  Plus,
  Edit,
  TrendingUp,
  Eye,
  FileDown,
  Loader2,
  Globe,
  Lock,
  Star,
  Cloud,
  CloudOff,
  CloudDownload,
} from 'lucide-react'
import { getSubclassUnlockLevel } from '../utils/subclass-spells'
import { useCharacterSheet } from '../context/CharacterSheetContext'

export default function CharacterHeader() {
  const {
    id,
    character,
    setCharacter,
    isOwner,
    activeTab,
    profBonus,
    saveStatus,
    parsedTraits,
    setShowUpload,
    toggleInspiration,
    setTempSubclass,
    setIsSubclassModalOpen,
    setLevelUpStep,
    setLevelUpRoll,
    setUseAverageHP,
    setIsLevelUpModalOpen,
    setIsProgressionModalOpen,
    isClient,
    handleOpenPDF,
    pdfLoading,
  } = useCharacterSheet()

  if (!character) return null

  return (
    <div
      className={`mobile-stack ${activeTab !== 'combat' ? 'hide-mobile' : ''}`}
      style={{ gap: 24, marginBottom: 24, alignItems: 'center' }}
    >
      {/* Avatar Card */}
      <div
        className="card"
        onClick={() => isOwner && setShowUpload(true)}
        style={{
          padding: 2,
          width: '100%',
          maxWidth: 100,
          position: 'relative',
          overflow: 'visible',
          flexShrink: 0,
          cursor: isOwner ? 'pointer' : 'default',
          transition: 'transform 0.2s',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: 8,
            overflow: 'hidden',
            background: 'var(--bg2)',
            border: '2px solid var(--border)',
          }}
        >
          {character.avatarUrl ? (
            <Image
              src={character.avatarUrl}
              alt={character.name}
              width={300}
              height={300}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--fg3)',
              }}
            >
              <User size={64} />
            </div>
          )}
        </div>

        {/* Inspiration Toggle (Top Right of Photo) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleInspiration()
          }}
          disabled={!isOwner}
          title={character.inspiration ? 'Inspiração Heroica Ativa' : 'Usar Inspiração Heroica'}
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            background: 'var(--bg2)',
            border: character.inspiration ? '2px solid #EAB308' : '2px solid var(--border)',
            borderRadius: '50%',
            padding: 4,
            width: 38,
            height: 38,
            cursor: isOwner ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: character.inspiration ? 'scale(1.1)' : 'scale(0.95)',
            opacity: character.inspiration ? 1 : 0.6,
            boxShadow: character.inspiration ? '0 0 15px rgba(234, 179, 8, 0.4)' : 'none',
            zIndex: 10,
          }}
        >
          <div
            className={character.inspiration ? 'dice-rolling' : ''}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/d20-yellow.png"
              alt="D20"
              width={28}
              height={28}
              style={{
                filter: character.inspiration ? 'none' : 'grayscale(1) brightness(0.7)',
                transition: 'filter 0.3s',
              }}
            />
            {character.inspiration && (
              <span
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  border: '1px solid rgba(234, 179, 8, 0.4)',
                  animation: 'pulse-gold 2s infinite',
                }}
              />
            )}
          </div>
        </button>
        <div
          style={{
            position: 'absolute',
            bottom: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--accent)',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '4px 4px 12px 12px',
            fontSize: 14,
            fontWeight: 700,
            boxShadow: '0 4px 10px rgba(225,29,72,.4)',
          }}
        >
          {character.level}
        </div>
      </div>

      {/* Character Main Info */}
      <div style={{ flex: 1, minWidth: 200 }} className="mobile-center-text">
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}
          className="mobile-justify-center"
        >
          <h1
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'var(--title-size, 32px)',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            {character.name}
          </h1>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }} className="hide-mobile">
            {isOwner && (
              <button className="btn btn-ghost" aria-label="Configurações">
                <Settings size={16} />
              </button>
            )}
          </div>
        </div>

        <div style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 16 }} className="mobile-center-text">
          <div
            style={{
              fontWeight: 700,
              color: 'var(--fg)',
              fontSize: 15,
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
            className="mobile-justify-center"
          >
            <span>{character.class}</span>
            {character.subclass && <span> — {character.subclass}</span>}
            {parsedTraits.draconicAncestry &&
              character.ruleset !== '2014' &&
              character.ruleset !== '5e-custom' &&
              ` (${parsedTraits.draconicAncestry.split(' ')[0]})`}
            {(() => {
              const unlockLevel = getSubclassUnlockLevel(character.class, character.ruleset || '2024')
              const canChoose = character.level >= unlockLevel
              if (!canChoose || !isOwner) return null

              if (!character.subclass) {
                return (
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setTempSubclass(null)
                      setIsSubclassModalOpen(true)
                    }}
                    style={{
                      padding: '2px 8px',
                      fontSize: 11,
                      height: 'auto',
                      minHeight: 'unset',
                      borderColor: 'var(--accent)',
                      color: 'var(--accentL)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Plus size={12} /> Escolher Subclasse
                  </button>
                )
              }

              return (
                <button
                  onClick={() => {
                    setTempSubclass(character.subclass || null)
                    setIsSubclassModalOpen(true)
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    color: 'var(--fg3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  className="hover-accent"
                  title="Alterar Subclasse"
                >
                  <Edit size={12} />
                </button>
              )
            })()}
          </div>
          <div style={{ fontSize: 14, color: 'var(--fgM)' }}>
            {character.race}
            {character.subrace ? ` (${character.subrace})` : ''} — {character.background}
          </div>
        </div>

        {/* Optimized Header Actions/Status */}
        <div
          style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}
          className="mobile-stack mobile-justify-center"
        >
          {/* Status Info Group */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="mobile-justify-center">
            {/* Exp Box */}
            <div
              style={{
                padding: '6px 12px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ color: 'var(--fgM)', fontWeight: 500 }}>EXP</span>
              <span style={{ fontWeight: 700 }}>{character.exp ?? '0/2700'}</span>
            </div>

            {/* Proficiency Box */}
            <div
              style={{
                padding: '6px 12px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ color: 'var(--fgM)', fontWeight: 500 }}>PROF</span>
              <span style={{ color: 'var(--ok)', fontWeight: 700 }}>{profBonus}</span>
            </div>

            {/* Save Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                padding: '6px 12px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                color:
                  saveStatus === 'error'
                    ? 'var(--accent)'
                    : saveStatus === 'saving'
                    ? 'var(--fgM)'
                    : 'var(--ok)',
                transition: 'all 0.3s',
              }}
              title={
                saveStatus === 'error'
                  ? 'Erro ao salvar!'
                  : saveStatus === 'saving'
                  ? 'Salvando...'
                  : 'Salvo no Banco'
              }
            >
              {saveStatus === 'saving' ? (
                <CloudDownload size={14} className="animate-pulse" />
              ) : saveStatus === 'error' ? (
                <CloudOff size={14} />
              ) : (
                <Cloud size={14} />
              )}
              <span className="hide-mobile" style={{ fontWeight: 500 }}>
                {saveStatus === 'saving'
                  ? 'Salvando...'
                  : saveStatus === 'error'
                  ? 'Erro ao Salvar'
                  : 'Sincronizado'}
              </span>
            </div>
          </div>

          {/* Actions Group */}
          <div
            style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}
            className="mobile-justify-center"
          >
            {!isOwner && (
              <div
                style={{
                  padding: '6px 12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 10,
                  fontSize: 11,
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Globe size={12} /> Ficha Pública
              </div>
            )}

            {isOwner && (
              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg2)',
                  padding: 2,
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  height: 32,
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{
                    padding: '0 14px',
                    height: '100%',
                    fontSize: 11,
                    gap: 6,
                    borderRadius: 8,
                    border: 'none',
                  }}
                  onClick={() => {
                    setLevelUpStep(character.ruleset ? 1 : 0)
                    setLevelUpRoll(null)
                    setUseAverageHP(false)
                    setIsLevelUpModalOpen(true)
                  }}
                >
                  <TrendingUp size={14} />
                  Subir de Nível
                </button>
                <button
                  className="btn btn-ghost"
                  style={{
                    padding: '0 10px',
                    height: '100%',
                    fontSize: 11,
                    gap: 6,
                    borderRadius: 8,
                    color: 'var(--fgM)',
                  }}
                  onClick={() => setIsProgressionModalOpen(true)}
                  title="Ver Progressão"
                >
                  <Eye size={14} />
                </button>
              </div>
            )}

            {/* PDF Button */}
            {isClient && character && (
              <button
                className="btn btn-outline"
                style={{
                  fontSize: 11,
                  padding: '0 14px',
                  borderRadius: 10,
                  height: 32,
                  gap: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={handleOpenPDF}
                disabled={pdfLoading}
              >
                {pdfLoading ? <Loader2 className="animate-spin" size={14} /> : <FileDown size={14} />}
                PDF
              </button>
            )}

            {/* Privacy Toggle */}
            {character.userId === character.sessionUserId && (
              <button
                className="btn btn-outline"
                style={{
                  fontSize: 11,
                  padding: '0 14px',
                  borderRadius: 10,
                  height: 32,
                  borderColor: character.isPublic ? 'var(--ok)' : 'var(--fg3)',
                  color: character.isPublic ? 'var(--ok)' : 'var(--fg2)',
                  gap: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={async () => {
                  const nextPublic = !character.isPublic
                  try {
                    const res = await fetch(`/api/personagens/${id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ isPublic: nextPublic }),
                    })
                    if (res.ok) {
                      setCharacter({ ...character, isPublic: nextPublic })
                    }
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                {character.isPublic ? <Globe size={14} /> : <Lock size={14} />}
                {character.isPublic ? 'Público' : 'Privado'}
              </button>
            )}

            {/* Save/Follow Button (Only for non-owners) */}
            {character.sessionUserId && character.userId !== character.sessionUserId && character.isPublic && (
              <button
                className={`btn ${character.isSaved ? 'btn-primary' : 'btn-outline'}`}
                style={{
                  fontSize: 11,
                  padding: '0 14px',
                  borderRadius: 10,
                  height: 32,
                  borderColor: character.isSaved ? 'var(--accent)' : 'var(--fg3)',
                  color: character.isSaved ? '#fff' : 'var(--fg2)',
                  gap: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/personagens/save`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ characterId: id }),
                    })
                    if (res.ok) {
                      const data = await res.json()
                      setCharacter({ ...character, isSaved: data.saved })
                    }
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                {character.isSaved ? <Star size={14} fill="currentColor" /> : <Star size={14} />}
                {character.isSaved ? 'Salva' : 'Salvar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
