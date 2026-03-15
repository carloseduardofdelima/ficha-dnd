import { Tent, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CampanhasPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh', 
      textAlign: 'center',
      padding: '0 24px'
    }}>
      <div style={{ 
        width: 80, 
        height: 80, 
        borderRadius: '50%', 
        background: 'rgba(225, 29, 72, 0.1)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 24,
        border: '1px solid rgba(225, 29, 72, 0.2)'
      }}>
        <Tent size={40} color="var(--accent)" />
      </div>
      
      <h1 style={{ 
        fontFamily: 'Cinzel, serif', 
        fontSize: 32, 
        marginBottom: 16,
        color: 'var(--accentL)'
      }}>
        Gestão de Campanhas
      </h1>
      
      <p style={{ 
        color: 'var(--fg2)', 
        maxWidth: 500, 
        lineHeight: 1.6,
        marginBottom: 32
      }}>
        Estamos preparando um espaço para você organizar suas sessões, jogadores e o histórico das suas campanhas épicas.
      </p>
      
      <Link href="/personagens">
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} />
          Voltar para Personagens
        </button>
      </Link>
    </div>
  )
}
