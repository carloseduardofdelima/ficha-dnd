'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Settings, Shield, Star, Calendar } from 'lucide-react'
import { Character } from '@/types/character'

export function CharacterCard({ character, onDelete }: { character: Character; onDelete?: (id: string) => void }) {
  const [menu, setMenu] = useState(false)

  const copyShareLink = () => {
    if (!character.isPublic) {
      alert('⚠️ Este personagem está PRIVADO. Ative a opção "Público" nas configurações para que outras pessoas consigam ver a ficha pelo link.')
    }

    const link = `${window.location.origin}/personagens/${character.slug || character.id}`
    navigator.clipboard.writeText(link)
    alert('Link copiado!')
    setMenu(false)
  }

  return (
    <div className="card fade-up" style={{ display: 'flex', gap: 16, padding: 16, position: 'relative' }}>
      {/* Avatar */}
      <div style={{ width: 90, height: 90, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'var(--bg2)', border: '2px solid var(--border)' }}>
        {character.avatarUrl
          ? <Image src={character.avatarUrl} alt={character.name} width={90} height={90} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1a1030,#0d0820)' }}><Shield size={32} color="var(--fgM)" /></div>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>{character.name}</h3>

          {/* Settings */}
          <div style={{ position: 'relative' }}>
            <button className="btn btn-ghost" onClick={() => setMenu(!menu)} style={{ padding: '4px 6px' }}>
              <Settings size={15} />
            </button>
            {menu && (
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 6, minWidth: 140, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,.6)' }} className="fade-up">
                {[
                  { label: '✏️ Editar', href: `/personagens/${character.id}/editar` },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} onClick={() => setMenu(false)} style={{ display: 'block', padding: '8px 12px', borderRadius: 6, textDecoration: 'none', fontSize: 13, color: 'var(--fg2)' }}>{label}</Link>
                ))}
                <button onClick={copyShareLink} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 6, background: 'transparent', border: 'none', fontSize: 13, color: 'var(--fg2)', cursor: 'pointer' }}>🔗 Compartilhar</button>
                {onDelete && (
                  <button onClick={() => { onDelete(character.id); setMenu(false) }} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 6, background: 'transparent', border: 'none', fontSize: 13, color: 'var(--danger)', cursor: 'pointer' }}>🗑️ Excluir</button>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {character.class && <span className="badge">{character.class}</span>}
          {character.race && <span className="badge" style={{ background: 'var(--bg2)', color: 'var(--fg2)', borderColor: 'var(--border)' }}>{character.race}</span>}
          <span className="badge" style={{ background: character.isPublic ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)', color: character.isPublic ? '#10b981' : 'var(--fg3)', borderColor: character.isPublic ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)' }}>
            {character.isPublic ? '🌐 Público' : '🔒 Privado'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'var(--warn)', fontSize: 12, fontWeight: 600 }}><Star size={11} fill="currentColor" />Nível {character.level}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Calendar size={11} color="var(--fgM)" />
            <span style={{ fontSize: 11, color: 'var(--fgM)' }}>{new Date(character.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>

          {character.ruleset && (
            <span style={{
              background: character.ruleset === '2024' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(156, 163, 175, 0.1)',
              color: character.ruleset === '2024' ? '#3b82f6' : '#9ca3af',
              border: `1px solid ${character.ruleset === '2024' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(156, 163, 175, 0.2)'}`,
              padding: '4px',
              borderRadius: '4px',
              fontSize: '9px',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}>
              {character.ruleset === '2024' ? '5.5e 2024' : '5e 2014'}
            </span>
          )}
        </div>

        <Link href={`/personagens/${character.id}`}>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '8px' }}>Acessar Ficha</button>
        </Link>
      </div>
    </div>
  )
}
