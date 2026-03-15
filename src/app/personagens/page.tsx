'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Plus, Users, Loader2 } from 'lucide-react'
import { CharacterCard } from '@/components/CharacterCard'
import { Character } from '@/types/character'

export default function PersonagensPage() {
  const { data: session } = useSession()
  const [chars, setChars] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      setLoading(true)
      fetch('/api/personagens')
        .then(res => res.json())
        .then(data => {
          setChars(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session])

  const deleteChar = async (id: string) => {
    if (confirm('Deletar este personagem?')) {
      await fetch(`/api/personagens/${id}`, { method: 'DELETE' })
      setChars(chars.filter(c => c.id !== id))
    }
  }

  if (!session) return (
    <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
       <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 32, marginBottom: 16 }}>Suas Fichas</h1>
       <p style={{ color: 'var(--fg2)', marginBottom: 24 }}>Faça login para ver e criar seus personagens.</p>
       <Link href="/login"><button className="btn btn-primary">Fazer Login</button></Link>
    </div>
  )

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Users size={20} color="var(--accentL)" />
          <span style={{ fontWeight: 600, color: 'var(--fg2)' }}>Personagens: <span style={{ color: 'var(--fg)' }}>{loading ? '...' : chars.length}/15</span></span>
        </div>
        <Link href="/personagens/novo">
          <button className="btn btn-primary"><Plus size={16} /> Novo Personagem</button>
        </Link>
      </div>

      {loading ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '100px 0',
          gap: 16
        }}>
          <Loader2 size={40} className="animate-spin" color="var(--accent)" />
          <p style={{ color: 'var(--fg2)', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>Carregando heróis...</p>
        </div>
      ) : (
        <div className="grid-cards">
          {chars.map(c => <CharacterCard key={c.id} character={c} onDelete={deleteChar} />)}
          {chars.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', border: '1px dashed var(--border)', borderRadius: 12 }}>
               <p style={{ color: 'var(--fg3)' }}>Você ainda não possui personagens.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
