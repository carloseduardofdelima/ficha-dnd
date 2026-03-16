'use client'
import { useParams, useRouter } from 'next/navigation'
import { Sword, Shield, Heart, Zap, Star, Info, Settings, Plus, RotateCcw, Target, Footprints, Eye, Brain, Waves, User, Menu, X, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { formatModifier, calcModifier, type Character, type Defense } from '@/types/character'
import { RACES } from '@/lib/races'
import CLASS_LEVEL1_DATA from '@/lib/class-features'
import { SPELLS } from '@/lib/spells'
import { compressImage } from '@/lib/image'
import { CLASSES } from '@/lib/classes'
import ResourceTracker from '@/components/ResourceTracker'
import { calculateAC } from '@/lib/dnd-rules'

export default function CharacterDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('combat')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [detailItem, setDetailItem] = useState<any | null>(null)

  useEffect(() => {
    fetch(`/api/personagens/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          // Sync with LocalStorage
          try {
            const localData = localStorage.getItem(`char_stats_${id}`);
            if (localData) {
              const parsed = JSON.parse(localData);
              data.currentHp = parsed.currentHp ?? data.currentHp;
              data.maxHp = parsed.maxHp ?? data.maxHp;
              data.spellSlots = parsed.spellSlots ?? data.spellSlots;
              data.resources = parsed.resources ?? data.resources;
            }
          } catch (e) {
            console.error('Error loading local stats', e);
          }
          setCharacter(data);
        }
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
        const compressed = await compressImage(base64)
        const res = await fetch(`/api/personagens/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl: compressed })
        })
        if (res.ok && character) {
          setCharacter({ ...character, avatarUrl: compressed })
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
  const characterClass = CLASSES.find(c => c.name === character.class)
  const proficientSaves = characterClass?.savingThrows || []

  const attributes = [
    { 
      name: 'Força', 
      score: character.strength, 
      mod: formatModifier(character.strength), 
      save: (() => {
        const mod = calcModifier(character.strength)
        const isProficient = proficientSaves.includes('Força')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    { 
      name: 'Destreza', 
      score: character.dexterity, 
      mod: formatModifier(character.dexterity), 
      save: (() => {
        const mod = calcModifier(character.dexterity)
        const isProficient = proficientSaves.includes('Destreza')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    { 
      name: 'Constituição', 
      score: character.constitution, 
      mod: formatModifier(character.constitution), 
      save: (() => {
        const mod = calcModifier(character.constitution)
        const isProficient = proficientSaves.includes('Constituição')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    { 
      name: 'Inteligência', 
      score: character.intelligence, 
      mod: formatModifier(character.intelligence), 
      save: (() => {
        const mod = calcModifier(character.intelligence)
        const isProficient = proficientSaves.includes('Inteligência')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    { 
      name: 'Sabedoria', 
      score: character.wisdom, 
      mod: formatModifier(character.wisdom), 
      save: (() => {
        const mod = calcModifier(character.wisdom)
        const isProficient = proficientSaves.includes('Sabedoria')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
    { 
      name: 'Carisma', 
      score: character.charisma, 
      mod: formatModifier(character.charisma), 
      save: (() => {
        const mod = calcModifier(character.charisma)
        const isProficient = proficientSaves.includes('Carisma')
        const bonus = isProficient ? character.proficiencyBonus : 0
        const total = mod + bonus
        return total >= 0 ? `+${total}` : total
      })()
    },
  ]

  const hp = { current: character.currentHp, max: character.maxHp }
  const ac = character.armorClass
  const speed = character.speed
  const initiative = character.initiative >= 0 ? `+${character.initiative}` : character.initiative
  const profBonus = character.proficiencyBonus >= 0 ? `+${character.proficiencyBonus}` : character.proficiencyBonus
  const isOwner = character.userId === character.sessionUserId


  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)', padding: '24px 0', position: 'relative' }}>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay fade-up">
          <div className="menu-grid">
            {[
              { label: 'Informações', id: 'about' },
              { label: 'Descrição', id: 'notes' },
              { label: 'Atributos', id: 'attributes' },
              { label: 'Perícias', id: 'skills' },
              { label: 'Combate', id: 'combat' },
              { label: 'Inventário', id: 'inventory' },
              { label: 'Habilidades', id: 'features' },
              { label: 'Magias', id: 'spells' },
            ].map(item => (
              <div
                key={item.label}
                className="menu-item"
                onClick={() => {
                  if (item.id) setActiveTab(item.id)
                  const scrollItem = item as { scroll?: string }
                  if (scrollItem.scroll) {
                    const el = document.getElementById(scrollItem.scroll)
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
        <div className={`mobile-stack ${activeTab !== 'combat' ? 'hide-mobile' : ''}`} style={{ gap: 24, marginBottom: 24, alignItems: 'center' }}>
          {/* Avatar Card */}
          <div className="card" onClick={() => isOwner && setShowUpload(true)} style={{ padding: 12, width: '100%', maxWidth: 100, position: 'relative', overflow: 'visible', flexShrink: 0, cursor: isOwner ? 'pointer' : 'default', transition: 'transform 0.2s' }}>
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
                {isOwner && <button className="btn btn-ghost"><Settings size={16} /></button>}
              </div>
            </div>
            <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 12 }}>
              {(() => {
                const race = RACES.find(r => r.name === character.race);
                const subTitle = race?.subRaceTitle || 'Sub-raça';
                return (
                  <>
                    {character.race}{character.subrace ? ` (${character.subrace})` : ''} • {character.class} • {character.background}
                  </>
                );
              })()}
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }} className="mobile-justify-center">
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Exp: </span>{character.exp ?? '0/2700'}
              </div>
              <div style={{ padding: '4px 12px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}>
                <span style={{ color: 'var(--fgM)' }}>Bônus de Proficiência: </span><span style={{ color: 'var(--ok)' }}>{profBonus}</span>
              </div>

              {/* Privacy Toggle (Only for owners) */}
              {character.userId === character.sessionUserId && (
                <button
                  className="btn btn-outline"
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    borderColor: character.isPublic ? 'var(--ok)' : 'var(--fg3)',
                    color: character.isPublic ? 'var(--ok)' : 'var(--fg2)'
                  }}
                  onClick={async () => {
                    const nextPublic = !character.isPublic;
                    try {
                      const res = await fetch(`/api/personagens/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isPublic: nextPublic })
                      });
                      if (res.ok) {
                        setCharacter({ ...character, isPublic: nextPublic });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {character.isPublic ? '🌐 Público' : '🔒 Privado'}
                </button>
              )}

              {!isOwner && (
                <div style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8, fontSize: 11, color: '#10b981' }}>
                  🌐 Ficha Pública
                </div>
              )}

              {/* Save/Follow Button (Only for non-owners on public sheets) */}
              {character.sessionUserId && character.userId !== character.sessionUserId && character.isPublic && (
                <button
                  className={`btn ${character.isSaved ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    borderColor: character.isSaved ? 'var(--accent)' : 'var(--fg3)',
                    color: character.isSaved ? '#fff' : 'var(--fg2)'
                  }}
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/personagens/save`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ characterId: id })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setCharacter({ ...character, isSaved: data.saved });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {character.isSaved ? '⭐ Salva na Conta' : '★ Salvar na Conta'}
                </button>
              )}

              {isOwner && (
                <button className="btn btn-outline" style={{ fontSize: 11, padding: '4px 12px', borderColor: 'var(--fg3)' }}>
                  <RotateCcw size={12} /> Subir de Nível
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Global Persistence Helper (Internal use for HP/Resources) */}
        {(() => {
          const updateValue = (field: string, delta: number) => {
            if (!character) return;
            const newVal = Math.max(0, (character as any)[field] + delta);
            const updatedChar = { ...character, [field]: newVal };
            setCharacter(updatedChar);

            // Persist ONLY to LocalStorage
            try {
              const localData = {
                currentHp: updatedChar.currentHp,
                maxHp: updatedChar.maxHp,
                spellSlots: updatedChar.spellSlots,
                resources: updatedChar.resources
              };
              localStorage.setItem(`char_stats_${id}`, JSON.stringify(localData));
            } catch (e) {
              console.error('Error saving local stats', e);
            }
          };
          (window as any).updateCharValue = updateValue;
          return null;
        })()}

        {/* Floating Mobile Menu Trigger */}
        <button
          className="mobile-only floating-menu-btn"
          style={{ display: 'none' }}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Attributes Banner */}
        <div id="attr-banner" className={`attr-grid ${activeTab !== 'combat' ? 'hide-mobile' : ''}`} style={{ marginBottom: 24, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

          {/* Main Panel */}
          <div className="sheet-main" style={{ flex: 1, minWidth: 0 }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', padding: '0 16px', overflowX: 'auto', overflowY: 'hidden' }} className="hide-mobile">
                {[
                  { id: 'combat', label: 'Combate', color: 'var(--accent)' },
                  { id: 'skills', label: 'Perícias' },
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

              <div style={{ padding: 12 }}>
                {activeTab === 'about' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                      {/* Left: Image & Identity */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div className="card" style={{ padding: 12 }}>
                          <div style={{ width: '50%', margin: 'auto', aspectRatio: '1/1.2', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                            {character.avatarUrl ? (
                              <Image src={character.avatarUrl} alt={character.name} width={50} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)' }}>
                                <User size={80} />
                              </div>
                            )}
                          </div>
                        </div>

                        <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 12, textAlign: 'center' }}>
                          {character.race}{character.subrace ? ` (${character.subrace})` : ''} • {character.class} • {character.background}
                        </p>

                        <div className="card" style={{ padding: 16 }}>
                          <div style={{ marginBottom: 12 }}>
                            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 4 }}>Nome do Personagem</span>
                            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>{character.name}</div>
                          </div>
                          <div>
                            <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 4 }}>Nome do Jogador</span>
                            <div style={{ fontSize: 14, color: 'var(--fg2)' }}>{character.playerName || 'Não informado'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Description & Backstory */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>Descrição Física</h3>
                          <div style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.6, background: 'var(--bg2)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                            {character.appearance || 'Sem descrição física disponível.'}
                          </div>
                        </div>

                        <div>
                          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12, borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>História</h3>
                          <div style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.6, background: 'var(--bg2)', padding: 20, borderRadius: 12, border: '1px solid var(--border)', whiteSpace: 'pre-wrap' }}>
                            {character.backstory || 'Sem história registrada.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'attributes' && (
                  <div className="fade-up">

                    <div style={{ marginTop: 12, marginBottom: 24, marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 12, color: 'var(--accentL)' }}>Vida & Recursos</h3>
                      <div className="resource-grid">
                        {/* HP Section */}
                        <div className="card compact-card" style={{ background: 'linear-gradient(135deg, rgba(225,29,72,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(225,29,72,0.2)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Heart size={16} color="var(--accent)" />
                              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Pontos de Vida</span>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>{character.currentHp} <span style={{ color: 'var(--fg3)', fontSize: 14 }}>/ {character.maxHp}</span></div>
                          </div>
                          <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
                            <div style={{ width: `${(character.currentHp / character.maxHp) * 100}%`, height: '100%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && (window as any).updateCharValue('currentHp', -1)} disabled={!isOwner}>-1</button>
                            <button className="btn btn-outline" style={{ flex: 1, padding: '4px 0', fontSize: 11 }} onClick={() => isOwner && (window as any).updateCharValue('currentHp', 1)} disabled={!isOwner}>+1</button>
                          </div>
                        </div>

                        {/* Resource Section */}
                        {(() => {
                          const slots: Record<string, number> = character.spellSlots ? JSON.parse(character.spellSlots as string) : {};
                          const res: Record<string, number> = character.resources ? JSON.parse(character.resources as string) : {};
                          
                          const updateSlots = (level: number, newCount: number) => {
                            const newSlots = { ...slots, [level]: newCount };
                            (window as any).updateCharValue('spellSlots', JSON.stringify(newSlots));
                          };

                          const updateRes = (name: string, newCount: number) => {
                            const newRes = { ...res, [name]: newCount };
                            (window as any).updateCharValue('resources', JSON.stringify(newRes));
                          };

                          // Helper to get defaults if missing
                          const getInitialResources = () => {
                            const initial: any = {};
                            if (character.class === 'Bárbaro') initial['Fúrias'] = { max: 2, current: 2, color: '#f97316' };
                            if (character.class === 'Guerreiro') initial['Retomada de Fôlego'] = { max: 2, current: 2, color: '#94a3b8' };
                            if (character.class === 'Monge' && character.level >= 2) initial['Pontos de Foco'] = { max: character.level, current: character.level, color: '#facc15' };
                            if (character.class === 'Bardo') initial['Inspiração Bárdica'] = { max: Math.max(1, calcModifier(character.charisma)), current: Math.max(1, calcModifier(character.charisma)), color: '#ec4899' };
                            if (character.class === 'Artificer') initial['Magical Tinkering'] = { max: Math.max(1, calcModifier(character.intelligence)), current: Math.max(1, calcModifier(character.intelligence)), color: '#06b6d4' };
                            return initial;
                          };

                          const classResources = getInitialResources();
                          const currentRes = { ...classResources, ...res };

                          const isSpellcaster = ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro', 'Bruxo', 'Artesão Arcano'].includes(character.class);
                          
                          return (
                            <div className="card compact-card" style={{ background: `linear-gradient(135deg, var(--bg2) 0%, rgba(0,0,0,0) 100%)`, border: `1px solid var(--border)` }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <Zap size={16} color="var(--accent)" />
                                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Recursos & Magia</span>
                                </div>
                                <button className="btn btn-outline" style={{ padding: '6px', fontSize: 11 }} disabled={!isOwner} onClick={async () => {
                                  if (!isOwner) return;
                                  // Simplified Long Rest
                                  const resetSlots = isSpellcaster ? { "1": character.class === 'Bruxo' ? 1 : 2 } : {}; // level 1 defaults
                                  const resetRes: Record<string, number> = {};
                                  Object.keys(classResources).forEach(k => { resetRes[k] = classResources[k].max; });
                                  
                                  const update = { 
                                    ...character, 
                                    currentHp: character.maxHp, 
                                    spellSlots: JSON.stringify(resetSlots),
                                    resources: JSON.stringify(resetRes)
                                  };
                                  setCharacter(update as any);

                                  try {
                                    localStorage.setItem(`char_stats_${id}`, JSON.stringify({
                                      currentHp: update.currentHp,
                                      maxHp: update.maxHp,
                                      spellSlots: update.spellSlots,
                                      resources: update.resources
                                    }));
                                  } catch (e) {
                                    console.error(e);
                                  }
                                }}><RotateCcw size={14} /></button>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {isSpellcaster && (
                                  <ResourceTracker 
                                    label="Espaços de Magia (Nível 1)" 
                                    max={character.class === 'Bruxo' ? 1 : 2} 
                                    current={slots["1"] ?? (character.class === 'Bruxo' ? 1 : 2)} 
                                    onChange={(val) => updateSlots(1, val)}
                                  />
                                )}

                                {Object.keys(classResources).map(name => (
                                  <ResourceTracker 
                                    key={name}
                                    label={name}
                                    max={classResources[name].max}
                                    current={res[name] ?? classResources[name].max}
                                    onChange={(val) => updateRes(name, val)}
                                    color={classResources[name].color}
                                  />
                                ))}

                                {!isSpellcaster && Object.keys(classResources).length === 0 && (
                                  <div style={{ fontSize: 11, color: 'var(--fg3)', fontStyle: 'italic', textAlign: 'center', padding: '12px 0' }}>
                                    Nenhum recurso especial para esta classe no nível atual.
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Atributos</h2>
                    <div className="attr-grid" style={{ width: '100%' }}>
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
                          <div style={{ fontSize: 10, color: 'var(--fgM)' }}>Resistência</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '16px 0', flexDirection: 'column' }}>
                        <div style={{ fontSize: 12, color: 'var(--fgM)', fontWeight: 700 }}>CLASSE DE ARMADURA</div>
                        {(() => {
                          const acRef = calculateAC(character.class, {
                            strength: character.strength,
                            dexterity: character.dexterity,
                            constitution: character.constitution,
                            intelligence: character.intelligence,
                            wisdom: character.wisdom,
                            charisma: character.charisma
                          }, (character.inventory as any[]) || []);

                          const inv = (character.inventory as any[]) || [];
                          const dexMod = Math.floor((character.dexterity - 10) / 2);
                          const conMod = Math.floor((character.constitution - 10) / 2);
                          const wisMod = Math.floor((character.wisdom - 10) / 2);
                          const armors = inv.filter(e => e.item.category === 'armor' && e.item.armorType !== 'shield');
                          const baseArmor = armors.length > 0 ? armors[0].item : null;
                          const shield = inv.find(e => e.item.category === 'armor' && e.item.armorType === 'shield');
                          
                          let parts = [];
                          if (baseArmor) {
                            parts.push(`${baseArmor.name}: ${baseArmor.ac}`);
                            if (baseArmor.armorType === 'light') parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
                            else if (baseArmor.armorType === 'medium') parts.push(`Des (máx 2): ${Math.min(dexMod, 2) >= 0 ? '+' : ''}${Math.min(dexMod, 2)}`);
                          } else {
                            parts.push(`Base: 10`);
                            parts.push(`Des: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
                            if (character.class === 'Bárbaro') parts.push(`Con: ${conMod >= 0 ? '+' : ''}${conMod}`);
                            else if (character.class === 'Monge') parts.push(`Sab: ${wisMod >= 0 ? '+' : ''}${wisMod}`);
                          }
                          if (shield) parts.push(`${shield.item.name}: +${shield.item.ac}`);
                          const acInfo = parts.join(' + ');

                          return (
                            <>
                              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ fontSize: 30, fontWeight: 800 }}>{acRef}</div>
                                <Shield size={16} color="var(--fg2)" />
                              </div>
                              <div style={{ fontSize: 10, color: 'var(--fgM)', marginTop: 4 }}>{acInfo}</div>
                            </>
                          );
                        })()}
                      </div>

                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ fontSize: 12, color: 'var(--fgM)', fontWeight: 700 }}>DESLOCAMENTO (m)</div>
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ fontSize: 30, fontWeight: 800 }}>{character.speed}</div>
                          <RotateCcw size={16} color="var(--fg2)" />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Perícias</h2>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Plus size={16} /></button>
                        <button className="btn btn-outline" style={{ padding: 6 }}><Settings size={16} /></button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 11 }}>
                      <div style={{ display: 'flex', color: 'var(--fgM)', fontWeight: 700, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 8, fontSize: 10 }}>
                        <div style={{ flex: 1 }}>PERÍCIA</div>
                        <div style={{ width: 45, textAlign: 'center' }}>DADOS</div>
                        <div style={{ width: 45, textAlign: 'center' }}>BÔNUS</div>
                        <div style={{ width: 45, textAlign: 'center' }}>TREINO</div>
                      </div>

                      {[
                        { name: 'Acrobacia', attr: 'dexterity', label: 'DES' },
                        { name: 'Adestramento', attr: 'wisdom', label: 'SAB' },
                        { name: 'Arcanismo', attr: 'intelligence', label: 'INT' },
                        { name: 'Atletismo', attr: 'strength', label: 'FOR' },
                        { name: 'Atuação', attr: 'charisma', label: 'CAR' },
                        { name: 'Enganação', attr: 'charisma', label: 'CAR' },
                        { name: 'Furtividade', attr: 'dexterity', label: 'DES' },
                        { name: 'História', attr: 'intelligence', label: 'INT' },
                        { name: 'Intimidação', attr: 'charisma', label: 'CAR' },
                        { name: 'Intuição', attr: 'wisdom', label: 'SAB' },
                        { name: 'Investigação', attr: 'intelligence', label: 'INT' },
                        { name: 'Medicina', attr: 'wisdom', label: 'SAB' },
                        { name: 'Natureza', attr: 'intelligence', label: 'INT' },
                        { name: 'Percepção', attr: 'wisdom', label: 'SAB' },
                        { name: 'Persuasão', attr: 'charisma', label: 'CAR' },
                        { name: 'Prestidigitação', attr: 'dexterity', label: 'DES' },
                        { name: 'Religião', attr: 'intelligence', label: 'INT' },
                        { name: 'Sobrevivência', attr: 'wisdom', label: 'SAB' },
                      ].map(skill => {
                        const attrVal = (character as any)[skill.attr] || 10
                        const mod = Math.floor((attrVal - 10) / 2)
                        const baseSkillName = skill.name.toLowerCase()
                          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        const isTrained = character.skills?.[baseSkillName] || false
                        const trainingBonus = isTrained ? character.proficiencyBonus : 0
                        const total = mod + trainingBonus

                        return (
                          <div key={skill.name} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', color: isTrained ? 'var(--accentL)' : 'var(--fg)' }}>
                            <div style={{ flex: 1, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                              {isTrained && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />}
                              {skill.name}
                            </div>
                            <div style={{ width: 45, textAlign: 'center', color: 'var(--fgM)', fontSize: 10 }}>({skill.label})</div>
                            <div style={{ width: 45, textAlign: 'center', fontWeight: 800, fontSize: 13 }}>{total >= 0 ? `+${total}` : total}</div>
                            <div style={{ width: 45, textAlign: 'center', color: 'var(--fgM)', fontSize: 12 }}>
                              {trainingBonus}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'spells' && (
                  <div className="fade-up">
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Magias</h2>
                    {character.spells && Array.isArray(character.spells) && character.spells.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[0, 1].map(lvl => {
                          const lvlSpells = (character.spells as string[])
                            .map(id => SPELLS.find(s => s.id === id))
                            .filter(s => s && s.level === lvl)

                          if (lvlSpells.length === 0) return null

                          return (
                            <div key={lvl}>
                              <h3 style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 4, height: 12, background: 'var(--accent)', borderRadius: 2 }} />
                                {lvl === 0 ? 'Truques' : '1º Nível'}
                              </h3>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {lvlSpells.map((spell: any) => (
                                  <div key={spell.id} className="card" style={{ padding: 16, background: 'var(--bg2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                      <div>
                                        <div style={{ fontWeight: 700, fontSize: 16 }}>{spell.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--accentL)', fontWeight: 600 }}>{spell.school}</div>
                                      </div>
                                      <div style={{ fontSize: 10, color: 'var(--fgM)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>
                                        {spell.range}
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 10, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 8 }}>
                                      <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Tempo:</span> {spell.castingTime}</div>
                                      <div style={{ fontSize: 11 }}><span style={{ color: 'var(--fg3)' }}>Duração:</span> {spell.duration}</div>
                                      {spell.concentration && <div style={{ fontSize: 9, background: '#fbbf24', color: '#000', padding: '1px 4px', borderRadius: 3, fontWeight: 800 }}>CONCENTRAÇÃO</div>}
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{spell.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--fg3)', textAlign: 'center', padding: 24 }}>Você não possui magias selecionadas.</p>
                    )}
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="fade-up">
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Inventário</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {character.inventory && Array.isArray(character.inventory) && character.inventory.length > 0 ? (
                        (character.inventory as any[]).map((entry: any, i: number) => (
                          <div
                            key={i}
                            className="card inventory-item-card"
                            onClick={() => setDetailItem(entry.item)}
                            style={{
                              padding: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              background: 'var(--bg2)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              border: '1px solid var(--border)'
                            }}
                          >
                            <span style={{ fontSize: 24 }}>{entry.item.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.item.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--fg3)' }}>{entry.item.category} • {entry.item.weight} kg</div>
                            </div>
                            <div style={{ fontWeight: 800, color: 'var(--accentL)', flexShrink: 0 }}>x{entry.qty}</div>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--fg3)', textAlign: 'center', padding: 24 }}>Seu inventário está vazio.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="fade-up">
                    <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Habilidades & Características</h2>

                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                        {(() => {
                          const race = RACES.find(r => r.name === character.race);
                          const subTitle = race?.subRaceTitle || 'Sub-raça';
                          return (
                            <>
                              Raça: {character.race}
                              {character.subrace && (
                                <div style={{ fontSize: 13, color: 'var(--fg2)', textTransform: 'none', fontWeight: 500, marginTop: 4 }}>
                                  {subTitle}: {character.subrace}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {RACES.find(r => r.name === character.race)?.traits.map((trait, i) => (
                          <div key={i} className="card" style={{ padding: 16, background: 'var(--bg2)' }}>
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{trait.name}</div>
                            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{trait.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 12, color: 'var(--accentL)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 4, height: 12, background: 'var(--accentL)', borderRadius: 2 }} />
                        Classe: {character.class}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {CLASS_LEVEL1_DATA[character.class]?.passiveFeatures.map((feat, i) => (
                          <div key={i} className="card" style={{ padding: 16, background: 'var(--bg2)' }}>
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{feat.name}</div>
                            <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{feat.description}</p>
                          </div>
                        ))}
                        {character.traits && Object.entries(character.traits).map(([choiceId, value], i) => {
                          const choice = CLASS_LEVEL1_DATA[character.class]?.choices.find(c => c.id === choiceId)
                          if (!choice) return null

                          if (choice.type === 'radio' && typeof value === 'string') {
                            const opt = choice.options.find(o => o.id === value)
                            if (!opt) return null
                            return (
                              <div key={choiceId} className="card" style={{ padding: 16, background: 'var(--bg2)', borderLeft: '3px solid var(--accent)' }}>
                                <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 4 }}>{choice.label}</div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{opt.name}</div>
                                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{opt.description}</p>
                              </div>
                            )
                          } else if (Array.isArray(value)) {
                            return value.map(valId => {
                              const opt = choice.options.find(o => o.id === valId)
                              if (!opt) return null
                              return (
                                <div key={valId} className="card" style={{ padding: 16, background: 'var(--bg2)', borderLeft: '3px solid var(--accent)' }}>
                                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 4 }}>{choice.label}</div>
                                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--fg)' }}>{opt.name}</div>
                                  <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{opt.description}</p>
                                </div>
                              )
                            })
                          }
                          return null
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'combat' && (
                  <div className="fade-up">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700 }}>Ataques</h2>
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
                        {/* Unarmed Strike - Default */}
                        <tr style={{ borderBottom: '1px solid var(--bg2)' }}>
                          <td style={{ padding: '16px 0' }}>
                            <div style={{ fontWeight: 700 }}>Ataque Desarmado</div>
                            <div style={{ fontSize: 11, color: 'var(--fgM)' }}>Corpo a corpo</div>
                          </td>
                          <td style={{ fontSize: 13 }}>1.5 m</td>
                          <td>
                            <div style={{ background: 'var(--accentGlow)', color: 'var(--accentL)', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontSize: 13, fontWeight: 700, border: '1px solid var(--accent)' }}>
                              {formatModifier(character.strength + character.proficiencyBonus - 10)} Ataque
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>
                              {1 + calcModifier(character.strength)} <Sword size={12} color="var(--accentL)" />
                              <span style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 400 }}>Concussão</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="btn btn-ghost"><Info size={16} /></button>
                          </td>
                        </tr>

                        {/* Weapons from Inventory */}
                        {character.inventory && Array.isArray(character.inventory) && (character.inventory as any[])
                          .filter(e => e.item.category === 'weapon')
                          .map((entry, idx) => {
                            const weapon = entry.item;
                            const isFinesse = weapon.properties?.toLowerCase().includes('acuidade');
                            const isRange = weapon.properties?.toLowerCase().includes('alcance') || weapon.category === 'weapon' && (weapon.name.toLowerCase().includes('arco') || weapon.name.toLowerCase().includes('besta'));

                            // Determine which stat to use
                            let attackStat = character.strength;
                            if (isRange || (isFinesse && character.dexterity > character.strength)) {
                              attackStat = character.dexterity;
                            }

                            const toHit = calcModifier(attackStat) + character.proficiencyBonus;
                            const dmgMod = calcModifier(attackStat);

                            // Extract damage dice and type: "1d8 cortante"
                            const dmgParts = weapon.properties?.split(',')[0].trim().split(' ');
                            const dice = dmgParts?.[0] || '1d4';
                            const type = dmgParts?.[1] || 'dano';

                            // Extract range if available
                            const rangeMatch = weapon.properties?.match(/alcance\s+([\d\/]+)\s*m/i);
                            const range = rangeMatch ? rangeMatch[1] + ' m' : (isRange ? 'Distância' : '1.5 m');

                            return (
                              <tr key={idx} style={{ borderBottom: '1px solid var(--bg2)' }}>
                                <td style={{ padding: '16px 0' }}>
                                  <div style={{ fontWeight: 700 }}>{weapon.name}</div>
                                  <div style={{ fontSize: 11, color: 'var(--fgM)' }}>{isRange ? 'À Distância' : 'Corpo a corpo'}</div>
                                </td>
                                <td style={{ fontSize: 13 }}>{range}</td>
                                <td>
                                  <div style={{ background: 'var(--accentGlow)', color: 'var(--accentL)', padding: '4px 12px', borderRadius: 4, display: 'inline-block', fontSize: 13, fontWeight: 700, border: '1px solid var(--accent)' }}>
                                    {toHit >= 0 ? `+${toHit}` : toHit} Ataque
                                  </div>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}>
                                    {dice}{dmgMod !== 0 ? (dmgMod > 0 ? `+${dmgMod}` : dmgMod) : ''}
                                    <Sword size={12} color="var(--accentL)" />
                                    <span style={{ fontSize: 11, color: 'var(--fg3)', fontWeight: 400, textTransform: 'capitalize' }}>{type}</span>
                                  </div>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                  <button
                                    className="btn btn-ghost"
                                    onClick={() => setDetailItem(weapon)}
                                  >
                                    <Info size={16} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
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
      {/* Item Details Modal */}
      {detailItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailItem(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 450,
            borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{detailItem.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 20 }}>{detailItem.name}</h3>
                  <span style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800 }}>{detailItem.category}</span>
                </div>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailItem(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 20, padding: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Custo</span>
                  <span style={{ fontWeight: 700, color: 'var(--accentL)' }}>{detailItem.cost}</span>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block' }}>Peso</span>
                  <span style={{ fontWeight: 700 }}>{detailItem.weight} kg</span>
                </div>
              </div>

              {detailItem.properties && (
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Propriedades</span>
                  <div style={{ fontSize: 13, color: '#c084fc', fontWeight: 600 }}>{detailItem.properties}</div>
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Descrição</span>
                <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5, margin: 0 }}>{detailItem.description}</p>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => setDetailItem(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .inventory-item-card:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}
