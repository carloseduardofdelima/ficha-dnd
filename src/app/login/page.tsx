'use client'
import { signIn } from 'next-auth/react'
import { Sword } from 'lucide-react'
import { useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const isRegistered = searchParams.get('registered') === 'true'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    startTransition(async () => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        alert('E-mail ou senha incorretos.')
      } else {
        router.push('/')
        router.refresh()
      }
    })
  }

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="card fade-up" style={{ padding: '48px', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: 'linear-gradient(135deg, var(--accent2), var(--accent))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accentGlow)' }}>
          <Sword size={32} color="#fff" />
        </div>
        <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 24, marginBottom: 8 }}>Entrar no Sistema</h1>
        <p style={{ color: 'var(--fg2)', fontSize: 14, marginBottom: 32 }}>Crie e gerencie suas fichas de D&D</p>

        {isRegistered && (
          <p style={{ color: '#10b981', background: '#10b98122', padding: 8, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
            Conta criada com sucesso! Faça login abaixo.
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--fg2)' }}>E-mail</label>
            <input name="email" type="email" required placeholder="seu@email.com" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg1)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--fg2)' }}>Senha</label>
            <input name="password" type="password" required placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--fg1)' }} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isPending} style={{ width: '100%', justifyContent: 'center' }}>
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          Não tem uma conta? <Link href="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Criar conta</Link>
        </p>
      </div>
    </div>
  )
}
