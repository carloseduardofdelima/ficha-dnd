'use client'
import { useState, useRef } from 'react'
import { User, Camera, ScrollText, Palette, CheckCircle2, AlertCircle, Save, Loader2 } from 'lucide-react'
import { compressImage } from '@/lib/image'

interface FinalStepProps {
  form: {
    name: string
    race: string
    class: string
    background: string
    avatarUrl: string
    appearance?: string
    backstory?: string
    playerName?: string
    level: number
  }
  onFormChange: (data: any) => void
  attrs: any
  skills: any
  asi: { primary: string | null; secondary: string | null }
  inventory: any[]
  selectedSpells: string[]
  featureChoices: any
  onSave: () => void
  loading: boolean
}

export default function FinalStep({
  form, onFormChange, attrs, asi, skills, inventory, selectedSpells, featureChoices, onSave, loading
}: FinalStepProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Basic Validation
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!supportedTypes.includes(file.type)) {
      alert('Formato de arquivo não suportado. Use JPG, PNG, WEBP ou GIF.')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('O arquivo é muito grande. Escolha uma imagem menor que 10MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        const compressed = await compressImage(base64)
        onFormChange({ ...form, avatarUrl: compressed })
      } catch (err) {
        console.error('Compression failed', err)
        alert('Erro ao processar imagem. Verifique se o arquivo não está corrompido.')
      }
    }
    reader.readAsDataURL(file)
  }

  const selectedSkillsCount = Object.values(skills).filter(Boolean).length
  const totalWeight = inventory.reduce((acc, item) => acc + (item.item.weight || 0) * (item.qty || 1), 0)

  return (
    <div className="final-step-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 400px', gap: 32 }}>
      {/* Left: Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 16 }}>Identidade & Visual</h2>

          <div className="identity-header" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Avatar Upload */}
            <div
              className="avatar-upload-container"
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
              <input type="file" ref={fileInputRef} hidden accept=".jpg,.jpeg,.png,.webp,.gif" onChange={handleImageUpload} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Nome do Jogador</label>
                  <input
                    value={form.playerName || ''}
                    onChange={(e) => onFormChange({ ...form, playerName: e.target.value })}
                    placeholder="Seu nome"
                    className="input"
                    style={{ fontSize: 16, padding: '12px 16px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Aparência Física</label>
                <textarea
                  value={form.appearance || ''}
                  onChange={(e) => onFormChange({ ...form, appearance: e.target.value })}
                  placeholder="Descreva cicatrizes, cores, vestimentas e traços marcantes..."
                  className="input"
                  style={{ minHeight: 100, fontSize: 14 }}
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
            value={form.backstory || ''}
            onChange={(e) => onFormChange({ ...form, backstory: e.target.value })}
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
              {Object.entries(attrs).map(([key, val]) => {
                const bonus = (asi.primary === key ? 2 : 0) + (asi.secondary === key ? 1 : 0)
                const total = (val as number) + bonus
                return (
                  <div key={key} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--fg3)', textTransform: 'uppercase' }}>{key.slice(0, 3)}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: bonus > 0 ? 'var(--accent)' : 'inherit' }}>{total}</div>
                  </div>
                )
              })}
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
        
        @media (max-width: 1024px) {
          .final-step-container {
            grid-template-columns: 1fr !important;
          }
          .identity-header {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }
          .avatar-upload-container {
            margin: 0 auto;
          }
          .input-group {
            width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .final-step-container {
             gap: 24px !important;
          }
          .btn-primary {
             height: 52px !important;
             font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}
