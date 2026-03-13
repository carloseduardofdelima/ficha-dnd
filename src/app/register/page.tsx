'use client'
import { registerUser } from '../actions/auth-actions'
import { Sword } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn btn-primary" type="submit" disabled={pending} style={{ width: '100%', justifyContent: 'center' }}>
      {pending ? 'Criando Conta...' : 'Criar Conta'}
    </button>
  )
}

export default function RegisterPage() {
  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="card fade-up" style={{ padding: '48px', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: 'linear-gradient(135deg, var(--accent2), var(--accent))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accentGlow)' }}>
          <Sword size={32} color="#fff" />
        </div>
        <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 24, marginBottom: 8 }}>Criar Conta</h1>
        <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 32 }}>Junte-se a nós para gerenciar suas fichas</p>

        <form action={registerUser} style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--fg2)' }}>Nome</label>
            <input name="name" type="text" placeholder="Seu nome" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg1)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--fg2)' }}>E-mail</label>
            <input name="email" type="email" required placeholder="seu@email.com" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg1)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--fg2)' }}>Senha</label>
            <input name="password" type="password" required placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg1)' }} />
          </div>
          
          <SubmitButton />
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg3)', fontSize: 12, marginBottom: 4 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
            ou continue com
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
          </div>
          <button className="btn btn-outline" onClick={() => signIn('google')} style={{ width: '100%', justifyContent: 'center' }}>
            Google
          </button>
        </div>

        <p style={{ marginTop: 24, color: 'var(--fg2)', fontSize: 14 }}>
          Já tem uma conta? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}
