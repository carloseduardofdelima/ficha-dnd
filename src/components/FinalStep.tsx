'use client'
import { useState, useRef } from 'react'
import { User, Camera, ScrollText, Palette, CheckCircle2, AlertCircle, Save, Loader2 } from 'lucide-react'

interface FinalStepProps {
  form: {
    name: string
    race: string
    class: string
    background: string
    avatarUrl: string
  }
  onFormChange: (data: any) => void
  attrs: any
  skills: any
  inventory: any[]
  selectedSpells: string[]
  featureChoices: any
  onSave: () => void
  loading: boolean
}

export default function FinalStep({
  form, onFormChange, attrs, skills, inventory, selectedSpells, featureChoices, onSave, loading
}: FinalStepProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [appearance, setAppearance] = useState('')
  const [backstory, setBackstory] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      onFormChange({ ...form, avatarUrl: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const selectedSkillsCount = Object.values(skills).filter(Boolean).length
  const totalWeight = inventory.reduce((acc, item) => acc + (item.weight || 0) * (item.quantity || 1), 0)

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 400px', gap: 32 }}>
      {/* Left: Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 16 }}>Identidade & Visual</h2>
          
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Avatar Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: 140, height: 140, borderRadius: 20, backgroundColor: 'var(--bg2)',
                border: '2px dashed rgba(255,255,255,0.1)', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', position: 'relative', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <Camera size={32} color="var(--fg3)" />
                  <span style={{ fontSize: 11, color: 'var(--fg3)', marginTop: 8 }}>Mudar Foto</span>
                </>
              )}
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Nome do Personagem</label>
                <input 
                  value={form.name}
                  onChange={(e) => onFormChange({ ...form, name: e.target.value })}
                  placeholder="Ex: Valerius Stoneheart" 
                  className="input" 
                  style={{ fontSize: 16, padding: '12px 16px' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Aparência Física</label>
                <textarea 
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value)}
                  placeholder="Descreva cicatrizes, cores, vestimentas e traços marcantes..." 
                  className="input" 
                  style={{ minHeight: 80, fontSize: 14, resize: 'vertical' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <ScrollText size={20} color="var(--accent)" />
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, margin: 0 }}>História (Backstory)</h3>
          </div>
          <textarea 
            value={backstory}
            onChange={(e) => setBackstory(e.target.value)}
            placeholder="Como seu personagem se tornou um aventureiro? Quais são seus objetivos?" 
            className="input" 
            style={{ minHeight: 200, fontSize: 14, lineHeight: 1.6, resize: 'vertical' }}
          />
        </section>

        <button 
          className="btn btn-primary" 
          style={{ height: 60, fontSize: 18, gap: 12 }}
          onClick={() => setShowConfirm(true)}
          disabled={!form.name}
        >
          <Save size={24} />
          Finalizar e Salvar Ficha
        </button>
      </div>

      {/* Right: Summary Card */}
      <div className="card" style={{ padding: 24, alignSelf: 'start', backgroundColor: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 20, textAlign: 'center' }}>Resumo da Jornada</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={24} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Raça e Classe</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{form.race} {form.class}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Palette size={24} color="#3b82f6" />
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700 }}>Antecedente</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{form.background || 'Nenhum'}</div>
            </div>
          </div>

          <div style={{ padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Principais Atributos</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {Object.entries(attrs).map(([key, val]) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase' }}>{key.slice(0, 3)}</div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{val as number}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase' }}>Perícias</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accentL)' }}>{selectedSkillsCount}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase' }}>Itens</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accentL)' }}>{inventory.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase' }}>Magias</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accentL)' }}>{selectedSpells.length}</div>
            </div>
          </div>

          <div style={{ marginTop: 8, padding: 16, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: 11, color: 'var(--fg3)', marginBottom: 4 }}>Peso Total</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{totalWeight.toFixed(1)} <span style={{ fontSize: 12 }}>kg</span></div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)'
        }}>
          <div className="card fade-in" style={{ width: 450, padding: 40, textAlign: 'center', border: '1px solid var(--accent)' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(225,29,72,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <AlertCircle size={40} color="var(--accent)" />
            </div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 12 }}>Confirmar Criação?</h2>
            <p style={{ color: 'var(--fg2)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
              Seu herói <strong>{form.name}</strong> está pronto para começar sua jornada. Deseja forjar esta ficha agora?
            </p>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="btn btn-ghost" 
                style={{ flex: 1 }} 
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Revisar
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, gap: 10 }}
                onClick={() => {
                   setShowConfirm(false);
                   onSave();
                }}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Confirmar e Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.2);
        }
      `}</style>
    </div>
  )
}
