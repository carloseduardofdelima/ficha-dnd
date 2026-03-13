'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Plus, Users } from 'lucide-react'
import { CharacterCard } from '@/components/CharacterCard'
import { Character } from '@/types/character'

export default function PersonagensPage() {
  const { data: session } = useSession()
  const [chars, setChars] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetch('/api/personagens')
        .then(res => res.json())
        .then(data => {
          setChars(data)
          setLoading(false)
        })
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
          <span style={{ fontWeight: 600, color: 'var(--fg2)' }}>Agentes: <span style={{ color: 'var(--fg)' }}>{chars.length}/15</span></span>
        </div>
        <Link href="/personagens/novo">
          <button className="btn btn-primary"><Plus size={16} /> Novo Agente</button>
        </Link>
      </div>

      <div className="grid-cards">
        {chars.map(c => <CharacterCard key={c.id} character={c} onDelete={deleteChar} />)}
      </div>
    </div>
  )
}
