'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DND_CLASSES, DND_RACES } from '@/types/character'

export default function NovoPersonagem() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', class: '', race: '', level: 1, avatarUrl: '', isPublic: false
  })

  const save = async () => {
    setLoading(true)
    const res = await fetch('/api/personagens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) router.push('/personagens')
    else setLoading(false)
  }

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <Link href="/personagens"><button className="btn btn-ghost"><ArrowLeft size={18} /></button></Link>
        <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 24 }}>Criar Personagem</h1>
      </div>

      <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label className="label">Nome</label>
          <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nome do herói..." />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="label">Classe</label>
            <select className="input" value={form.class} onChange={e => setForm({...form, class: e.target.value})}>
               <option value="">Selecione...</option>
               {DND_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Raça</label>
            <select className="input" value={form.race} onChange={e => setForm({...form, race: e.target.value})}>
               <option value="">Selecione...</option>
               {DND_RACES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label">URL do Avatar</label>
          <input className="input" value={form.avatarUrl} onChange={e => setForm({...form, avatarUrl: e.target.value})} placeholder="https://..." />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" checked={form.isPublic} onChange={e => setForm({...form, isPublic: e.target.checked})} />
          <label style={{ fontSize: 13, color: 'var(--fg2)' }}>Tornar ficha pública</label>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={save} disabled={loading || !form.name}>
          <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Personagem'}
        </button>
      </div>
    </div>
  )
}
