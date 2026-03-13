'use client'
import { useParams, useRouter } from 'next/navigation'
import { Sword, Shield, Heart, Zap, Star, Info, Settings, Plus, RotateCcw, Target, Footprints, Eye, Brain, Waves, User, Menu, X, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { formatModifier, type Character, type Defense } from '@/types/character'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('combat')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch(`/api/personagens/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setCharacter(data)
        setLoading(false)
      })
  }, [id])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const res = await fetch(`/api/personagens/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl: base64 })
        })
        if (res.ok && character) {
          setCharacter({ ...character, avatarUrl: base64 })
          setShowUpload(false)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Loader2 className="animate-spin" size={48} />
    </div>
  )

  if (!character) return (
    <div style={{ padding: 48, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)' }}>
      <h1>Personagem não encontrado</h1>
      <button className="btn btn-outline" onClick={() => router.push('/personagens')} style={{ marginTop: 24 }}>Voltar</button>
    </div>
  )

  // Map database data to UI helpers
  const attributes = [
    { name: 'Força', score: character.strength, mod: formatModifier(character.strength), save: formatModifier(character.strength) },
    { name: 'Destreza', score: character.dexterity, mod: formatModifier(character.dexterity), save: formatModifier(character.dexterity) },
    { name: 'Constituição', score: character.constitution, mod: formatModifier(character.constitution), save: formatModifier(character.constitution) },
    { name: 'Inteligência', score: character.intelligence, mod: formatModifier(character.intelligence), save: formatModifier(character.intelligence) },
    { name: 'Sabedoria', score: character.wisdom, mod: formatModifier(character.wisdom), save: formatModifier(character.wisdom) },
    { name: 'Carisma', score: character.charisma, mod: formatModifier(character.charisma), save: formatModifier(character.charisma) },
  ]

  const hp = { current: character.currentHp, max: character.maxHp }
  const ac = character.armorClass
  const speed = character.speed
  const initiative = character.initiative >= 0 ? `+${character.initiative}` : character.initiative
  const profBonus = character.proficiencyBonus >= 0 ? `+${character.proficiencyBonus}` : character.proficiencyBonus

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)', padding: '24px 0', position: 'relative' }}>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay fade-up">
          <div className="menu-grid">
            {[
              { label: 'Informações', id: 'about' },
              { label: 'Descrição', id: 'notes' },
              { label: 'Atributos', scroll: 'attr-banner' },
              { label: 'Perícias', scroll: 'skills-card' },
              { label: 'Combate', id: 'combat' },
              { label: 'Inventário', id: 'inventory' },
              { label: 'Habilidades', id: 'features' },
              { label: 'Rituais', id: 'spells' },
            ].map(item => (
              <div
                key={item.label}
                className="menu-item"
                onClick={() => {
                  if (item.id) setActiveTab(item.id)
                  if (item.scroll) {
                    const el = document.getElementById(item.scroll)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <button className="menu-close" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
      )}

      <div className="container" style={{ maxWidth: '100%' }}>

        {/* Header Section */}
        <div className="mobile-stack" style={{ gap: 24, marginBottom: 24, alignItems: 'center' }}>
          {/* Avatar Card */}
          <div className="card" onClick={() => setShowUpload(true)} style={{ padding: 12, width: '100%', maxWidth: 300, position: 'relative', overflow: 'visible', flexShrink: 0, cursor: 'pointer', transition: 'transform 0.2s' }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: 8, overflow: 'hidden', background: 'var(--bg2)', border: '2px solid var(--border)' }}>
              {character.avatarUrl ? (
                <Image src={character.avatarUrl} alt={character.name} width={300} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)' }}>
                  <User size={64} />
                </div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '4px 4px 12px 12px', fontSize: 14, fontWeight: 700, boxShadow: '0 4px 10px rgba(225,29,72,.4)' }}>
              {character.level}
            </div>
          </div>

          {/* Character Main Info */}
          <div style={{ flex: 1, minWidth: 200 }} className="mobile-center-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }} className="mobile-justify-center">
              <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'var(--title-size, 32px)', fontWeight: 700, textAlign: 'center' }}>{character.name}</h1>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }} className="hide-mobile">
                <button className="btn btn-ghost"><Info size={16} /></button>
                <button className="btn btn-ghost"><Settings size={16} /></button>
              </div>
            </div>
            <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 12 }}>
              {character.race} • {character.class} • {character.background}
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }} className="mobile-justify-center">
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Exp: </span>{character.exp ?? '0/2700'}
              </div>
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Bônus de Proficiência: </span><span style={{ color: 'var(--ok)' }}>{profBonus}</span>
              </div>
              <button className="btn btn-outline" style={{ fontSize: 11, padding: '4px 12px', borderColor: 'var(--fg3)' }}>
                <RotateCcw size={12} /> Subir de Nível
              </button>
            </div>
          </div>
        </div>

        {/* Floating Mobile Menu Trigger */}
        <button
          className="mobile-only floating-menu-btn"
          style={{ display: 'none' }}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Hit Points & Initiative Section */}
        <div className="mobile-stack" style={{ gap: 16, alignItems: 'stretch' }}>
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg2)', letterSpacing: '0.05em' }}>PONTOS DE VIDA (SALVAGUARDAS CONTRA MORTE)</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <Info size={12} color="var(--fgM)" />
                <Settings size={12} color="var(--fgM)" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--fgM)', marginBottom: 8 }}>Sucessos</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3].map(i => <div key={i} style={{ width: 14, height: 14, border: '1px solid var(--border)', borderRadius: 2 }}></div>)}
                </div>
              </div>
              <button className="btn btn-outline" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', height: 32, fontSize: 12 }}>Estabilizar</button>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--fgM)', marginBottom: 8 }}>Fracassos</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3].map(i => <div key={i} style={{ width: 14, height: 14, border: '1px solid var(--border)', borderRadius: 2 }}></div>)}
                </div>
              </div>
              <button className="btn btn-outline" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', height: 32, fontSize: 12 }}>
                <RotateCcw size={12} /> Rolar
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <button className="btn w-full" style={{ flex: 1, background: 'var(--bg2)', border: '1px solid var(--border)', padding: '0 24px', display: 'flex', gap: 12, justifyContent: 'center' }}>
              Inspiração <span style={{ color: 'var(--fgM)' }}>●</span>
            </button>
            <button className="btn w-full" style={{ flex: 1, background: 'var(--accent)', color: '#fff', padding: '0 24px', fontSize: 18, fontWeight: 700, justifyContent: 'center' }}>
              Iniciativa {initiative}
            </button>
          </div>
        </div>

        {/* Attributes Banner */}
        <div id="attr-banner" className="attr-grid" style={{ marginBottom: 24, width: '100%' }}>
          {attributes.map(attr => (
            <div key={attr.name} className="card" style={{ padding: '12px 0', textAlign: 'center', background: 'var(--bg2)', width: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fgM)', textTransform: 'uppercase', marginBottom: 12 }}>{attr.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8, position: 'relative' }}>
                <div style={{ width: 48, height: 48, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>
                  {attr.mod}
                </div>
                <div style={{ width: 32, height: 32, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'var(--accentL)' }}>
                  {attr.save}
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--fgM)' }}>
                <span style={{ fontSize: 12, color: 'var(--fg2)', fontWeight: 600 }}>{attr.score}</span> Atributo
              </div>
              <div style={{ fontSize: 10, color: 'var(--fgM)' }}>
                Resistência
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="sheet-layout">
          {/* Left Sidebar: Skills */}
          <div id="skills-card" className="card sheet-left" style={{ width: 220, padding: 16, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg2)' }}>PERÍCIAS</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <Info size={14} color="var(--fgM)" />
                <Settings size={14} color="var(--fgM)" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Skills mapping from database would go here, using mock for now since it's a complex JSON string */}
              <p style={{ fontSize: 12, color: 'var(--fg3)', textAlign: 'center' }}>Perícias em breve...</p>
            </div>
          </div>

          {/* Main Panel */}
          <div className="sheet-main" style={{ flex: 1, minWidth: 0 }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', padding: '0 16px', overflowX: 'auto', overflowY: 'hidden' }} className="hide-mobile">
                {[
                  { id: 'combat', label: 'Combate', color: 'var(--accent)' },
                  { id: 'spells', label: 'Magias' },
                  { id: 'inventory', label: 'Inventário' },
                  { id: 'features', label: 'Características' },
                  { id: 'notes', label: 'Notas' },
                  { id: 'about', label: 'Sobre' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '16px 20px',
                      fontSize: 14,
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `3px solid ${activeTab === tab.id ? tab.color || 'var(--fg)' : 'transparent'}`,
                      color: activeTab === tab.id ? 'var(--fg)' : 'var(--fgM)',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: 24 }}>
                {activeTab === 'combat' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <select style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg)', padding: '6px 12px', borderRadius: 6, fontSize: 14 }}>
                        <option>Tudo</option>
                      </select>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
                      </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                          <th style={{ padding: '8px 0', fontSize: 11, color: 'var(--fgM)', textTransform: 'uppercase' }}>Ataque</th>
                          <th style={{ padding: '8px 0', fontSize: 11, color: 'var(--fgM)', textTransform: 'uppercase' }}>Alcance</th>
                          <th style={{ padding: '8px 0', fontSize: 11, color: 'var(--fgM)', textTransform: 'uppercase' }}>Acerto / CD</th>
                          <th style={{ padding: '8px 0', fontSize: 11, color: 'var(--fgM)', textTransform: 'uppercase' }}>Dano</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--bg2)' }}>
                          <td style={{ padding: '16px 0' }}>
                            <div style={{ fontWeight: 700 }}>Unarmed Strike</div>
                            <div style={{ fontSize: 11, color: 'var(--fgM)' }}>Melee</div>
                          </td>
                          <td style={{ fontSize: 13 }}>1.5 m</td>
                          <td>
                            <div style={{ background: 'var(--accentGlow)', color: 'var(--accentL)', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontSize: 13, fontWeight: 700, border: '1px solid var(--accent)' }}>+4 Ataque</div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>3 <Sword size={12} color="var(--accentL)" /></div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="btn btn-ghost"><Info size={16} /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="sheet-right" style={{ width: 200 }}>
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg2)' }}>CA/DESLOC.</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Info size={14} color="var(--fgM)" />
                  <Settings size={14} color="var(--fgM)" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: 'var(--fgM)', fontWeight: 700 }}>CLASSE DE ARMADURA</div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{character.armorClass}</div>
                  <Shield size={16} color="var(--fg2)" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--fgM)', fontWeight: 700 }}>DESLOCAMENTO (m)</div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{character.speed}</div>
                  <RotateCcw size={16} color="var(--fg2)" />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg2)' }}>DEFESAS</span>
                <Settings size={14} color="var(--fgM)" />
              </div>
              {character.defenses?.map((def: Defense) => (
                <div key={String(def.value)}>
                  <div style={{ fontSize: 10, color: 'var(--fgM)', fontWeight: 700, marginBottom: 4 }}>{def.type.toUpperCase()}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accentL)', marginBottom: 2 }}>{def.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--fgM)' }}>{def.detail}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg2)' }}>CONDIÇÕES</span>
                <Settings size={14} color="var(--fgM)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 11, color: 'var(--fg3)' }}>Nenhuma condição ativa.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} onClick={() => !uploading && setShowUpload(false)} />
          <div className="card fade-up" style={{ position: 'relative', width: '100%', maxWidth: 400, padding: 32, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16 }}>Nova Foto do Personagem</h2>
            <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 24 }}>Escolha uma imagem para representar seu herói.</p>

            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 32, marginBottom: 24, transition: 'border-color 0.2s', cursor: 'pointer', position: 'relative' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
              />
              <div style={{ color: 'var(--fgM)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                {uploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                <span>{uploading ? 'Enviando...' : 'Clique ou arraste para enviar'}</span>
              </div>
            </div>

            <button className="btn bg-red-500 hover:bg-red-600" onClick={() => setShowUpload(false)} disabled={uploading} style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
