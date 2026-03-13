import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Shield, Share2 } from 'lucide-react'
import Image from 'next/image'
import { formatModifier } from '@/types/character'

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const char = await prisma.character.findUnique({ where: { slug } })

  if (!char || !char.isPublic) notFound()

  const stats = [
    { n: 'FOR', v: char.strength }, { n: 'DES', v: char.dexterity }, { n: 'CON', v: char.constitution },
    { n: 'INT', v: char.intelligence }, { n: 'SAB', v: char.wisdom }, { n: 'CAR', v: char.charisma }
  ]

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="badge" style={{ padding: '6px 16px' }}>🔗 Ficha Pública de Personagem</span>
      </div>

      <div className="card shadow-lg" style={{ padding: 40, border: '2px solid rgba(147,51,234,.3)' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 40 }}>
           <div style={{ width: 140, height: 140, borderRadius: 16, overflow: 'hidden', border: '3px solid var(--accent)', boxShadow: '0 0 30px var(--accentGlow)' }}>
             {char.avatarUrl
                ? <Image src={char.avatarUrl} alt="" width={140} height={140} style={{ objectFit: 'cover' }} />
                : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}><Shield size={64} color="var(--accentL)" /></div>
             }
           </div>
           <div>
             <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 36, marginBottom: 8, color: 'var(--accentL)' }}>{char.name}</h1>
             <div style={{ display: 'flex', gap: 10 }}>
               <span className="badge">{char.class}</span>
               <span className="badge" style={{ background: 'rgba(255,255,255,.05)', color: '#fff' }}>{char.race}</span>
               <span style={{ color: 'var(--warn)', fontWeight: 600 }}>Nível {char.level}</span>
             </div>
           </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.n} className="stat-box">
              <span className="stat-name">{s.n}</span>
              <span className="stat-score">{s.v}</span>
              <span className="stat-mod">{formatModifier(s.v)}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
           <div className="stat-box" style={{ padding: 20 }}>
              <span className="stat-name">HP MÁX</span>
              <span className="stat-score" style={{ color: 'var(--ok)' }}>{char.maxHp}</span>
           </div>
           <div className="stat-box" style={{ padding: 20 }}>
              <span className="stat-name">ARMADURA</span>
              <span className="stat-score">{char.armorClass}</span>
           </div>
           <div className="stat-box" style={{ padding: 20 }}>
              <span className="stat-name">INICIATIVA</span>
              <span className="stat-score" style={{ color: 'var(--accentL)' }}>{char.initiative}</span>
           </div>
        </div>
      </div>
    </div>
  )
}
