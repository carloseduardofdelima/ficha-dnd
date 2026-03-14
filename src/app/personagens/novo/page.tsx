'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, X, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { RACES, Race } from '@/lib/races'
import { CLASSES, DndClass } from '@/lib/classes'
import { BACKGROUNDS, Background } from '@/lib/backgrounds'
import StepIndicator from '@/components/StepIndicator'
import RaceCard from '@/components/RaceCard'
import ClassCard from '@/components/ClassCard'
import BackgroundCard from '@/components/BackgroundCard'
import AttributesStep, { Attrs } from '@/components/AttributesStep'
import InventoryStep from '@/components/InventoryStep'
import type { InventoryEntry } from '@/lib/inventory'

const STEPS = ['Raça', 'Classe', 'Antecedente', 'Atributos', 'Inventário', 'Detalhes']

export default function NovoPersonagem() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [detailRace, setDetailRace] = useState<Race | null>(null)
  const [detailClass, setDetailClass] = useState<DndClass | null>(null)
  const [detailBg, setDetailBg] = useState<Background | null>(null)

  const [attrs, setAttrs] = useState<Attrs>({
    strength: 8, dexterity: 8, constitution: 8,
    intelligence: 8, wisdom: 8, charisma: 8
  })
  const [skills, setSkills] = useState<Record<string, boolean>>({})
  const [inventory, setInventory] = useState<InventoryEntry[]>([])

  const [form, setForm] = useState({
    name: '', class: '', race: '', background: '', level: 1, avatarUrl: '', isPublic: false
  })

  const save = async () => {
    setLoading(true)
    const res = await fetch('/api/personagens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ...attrs })
    })
    if (res.ok) router.push('/personagens')
    else setLoading(false)
  }

  const handleRaceSelect = (raceId: string) => {
    const race = RACES.find(r => r.id === raceId) || null
    setForm({ ...form, race: race?.name || '' })
  }

  const handleClassSelect = (classId: string) => {
    const dndClass = CLASSES.find(c => c.id === classId) || null
    setForm({ ...form, class: dndClass?.name || '' })
  }

  const handleBgSelect = (bgId: string) => {
    const bg = BACKGROUNDS.find(b => b.id === bgId) || null
    setForm({ ...form, background: bg?.name || '' })
  }

  const canGoNext = () => {
    if (currentStep === 0) return !!form.race
    if (currentStep === 1) return !!form.class
    if (currentStep === 2) return !!form.background
    return true
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="container" style={{ maxWidth: 1200, paddingBottom: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <Link href="/personagens">
          <button className="btn btn-ghost" style={{ padding: 8 }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, margin: 0 }}>Criar Personagem</h1>
          <p style={{ fontSize: 13, color: 'var(--fg3)', margin: 0 }}>Siga os passos para forjar seu herói</p>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} steps={STEPS} />

      {/* Step 0: Race Selection */}
      {currentStep === 0 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8 }}>Escolha sua Raça</h2>
            <p style={{ color: 'var(--fg2)' }}>Sua raça define suas habilidades naturais e herança.</p>
          </div>

          <div className="card-grid">
            {RACES.map(race => (
              <RaceCard
                key={race.id}
                race={race}
                selected={form.race === race.name}
                onSelect={handleRaceSelect}
                onViewDetails={setDetailRace}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Class Selection */}
      {currentStep === 1 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8 }}>Escolha sua Classe</h2>
            <p style={{ color: 'var(--fg2)' }}>Sua classe define suas habilidades e papel no grupo.</p>
          </div>

          <div className="card-grid">
            {CLASSES.map(dndClass => (
              <ClassCard
                key={dndClass.id}
                dndClass={dndClass}
                selected={form.class === dndClass.name}
                onSelect={handleClassSelect}
                onViewDetails={setDetailClass}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Background Selection */}
      {currentStep === 2 && (
        <div className="fade-in">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8 }}>Escolha seu Antecedente</h2>
            <p style={{ color: 'var(--fg2)' }}>Seu antecedente revela de onde você vem, como você se tornou um aventureiro e qual é o seu lugar no mundo.</p>
          </div>

          <div className="bg-grid">
            {BACKGROUNDS.map(bg => (
              <BackgroundCard
                key={bg.id}
                background={bg}
                selected={form.background === bg.name}
                onSelect={handleBgSelect}
                onViewDetails={setDetailBg}
              />
            ))}
          </div>
        </div>
      )}


      {/* Step 3: Attributes + Skills */}
      {currentStep === 3 && (
        <AttributesStep
          className={form.class}
          backgroundName={form.background}
          attrs={attrs}
          skills={skills}
          onAttrsChange={setAttrs}
          onSkillsChange={setSkills}
        />
      )}


      {/* Step 4: Inventory */}
      {currentStep === 4 && (
        <InventoryStep
          className={form.class}
          backgroundName={form.background}
          inventory={inventory}
          onInventoryChange={setInventory}
        />
      )}

      {/* Steps 5+ placeholder */}
      {currentStep > 4 && (
        <div className="card fade-in" style={{ padding: 40, textAlign: 'center', backgroundColor: 'var(--bg2)' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif' }}>Próximas Etapas</h2>
          <p style={{ color: 'var(--fg3)' }}>Esta etapa ({STEPS[currentStep]}) será implementada em breve.</p>
          <button className="btn btn-ghost" onClick={prevStep} style={{ marginTop: 20 }}>Voltar para {STEPS[currentStep - 1]}</button>
        </div>
      )}

      {/* Navigation Bar Fixed at Bottom */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Personagem</span>
          <span style={{ fontWeight: 'bold' }}>{form.name || 'Sem nome'} • {form.race || 'Sem raça'}{form.class ? ` • ${form.class}` : ''}{form.background ? ` • ${form.background}` : ''}</span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {currentStep > 0 && (
            <button className="btn btn-ghost" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronLeft size={18} /> Anterior
            </button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={nextStep}
              disabled={!canGoNext()}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px' }}
            >
              Próximo: {STEPS[currentStep + 1]} <ChevronRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={save} disabled={loading || !form.name}>
              <Save size={18} /> {loading ? 'Salvando...' : 'Finalizar Herói'}
            </button>
          )}
        </div>
      </div>

      {/* Race Details Modal */}
      {detailRace && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailRace(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 700, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 32 }}>{detailRace.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailRace.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailRace(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg2)', fontStyle: 'italic' }}>
                  &quot;{detailRace.description}&quot;
                </p>
                <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Velocidade</span>
                    <div style={{ fontWeight: 'bold' }}>{detailRace.speed} pés</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Tamanho</span>
                    <div style={{ fontWeight: 'bold' }}>{detailRace.size}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--accent)', display: 'inline-block' }}>Traços Raciais</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {detailRace.traits.map(trait => (
                    <div key={trait.name}>
                      <div style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--fg)', marginBottom: 4 }}>{trait.name}</div>
                      <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0, lineHeight: 1.5 }}>{trait.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleRaceSelect(detailRace.id); setDetailRace(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailRace.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {detailClass && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailClass(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 700, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 32 }}>{detailClass.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailClass.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailClass(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg2)', fontStyle: 'italic' }}>
                  &quot;{detailClass.description}&quot;
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Dado de Vida</span>
                    <div style={{ fontWeight: 'bold', color: 'var(--accentL)', fontSize: 18 }}>{detailClass.hitDie}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Atributo Principal</span>
                    <div style={{ fontWeight: 'bold' }}>{detailClass.primaryAttr}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Salvaguardas</span>
                    <div style={{ fontWeight: 'bold' }}>{detailClass.savingThrows.join(', ')}</div>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Armaduras</span>
                    <div style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 2 }}>{detailClass.armorProf}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase' }}>Armas</span>
                    <div style={{ fontSize: 13, color: 'var(--fg2)', marginTop: 2 }}>{detailClass.weaponProf}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--accent)', display: 'inline-block' }}>Habilidades de Classe</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {detailClass.features.map(feature => (
                    <div key={feature.name}>
                      <div style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--fg)', marginBottom: 4 }}>{feature.name}</div>
                      <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0, lineHeight: 1.5 }}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleClassSelect(detailClass.id); setDetailClass(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailClass.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Details Modal */}
      {detailBg && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, backdropFilter: 'blur(8px)', padding: 20
        }} onClick={() => setDetailBg(null)}>
          <div style={{
            backgroundColor: 'var(--bg2)', width: '100%', maxWidth: 640, maxHeight: '90vh',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,1)', border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ height: 5, background: 'linear-gradient(90deg, var(--accent2), var(--accent))' }} />
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Cinzel, serif', fontSize: 28 }}>{detailBg.name}</h2>
                <span style={{ fontSize: 13, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detailBg.source}</span>
              </div>
              <button className="btn btn-ghost" onClick={() => setDetailBg(null)} style={{ padding: 8, borderRadius: '50%' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: 32, overflowY: 'auto' }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg2)', fontStyle: 'italic', marginBottom: 24 }}>
                &quot;{detailBg.description}&quot;
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                  <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Perícias</span>
                  <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.skills.join(', ')}</div>
                </div>
                {detailBg.toolProf && (
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Ferramentas</span>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.toolProf}</div>
                  </div>
                )}
                {detailBg.languages && (
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Idiomas</span>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>{detailBg.languages}</div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 12, borderBottom: '1px solid var(--accent)', display: 'inline-block', paddingBottom: 4 }}>Habilidade Especial: {detailBg.feature.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6, margin: 0 }}>{detailBg.feature.description}</p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'inline-block', paddingBottom: 4 }}>Equipamento Inícial</h3>
                <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6, margin: 0 }}>{detailBg.equipment}</p>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                onClick={() => { handleBgSelect(detailBg.id); setDetailBg(null); }}
                style={{ padding: '0 32px' }}
              >
                Selecionar {detailBg.name}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        @media (max-width: 1200px) {
          .card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        .bg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .bg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .bg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .bg-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        .fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
