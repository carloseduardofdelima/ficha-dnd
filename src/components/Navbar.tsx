'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Sword, Users, BookOpen, Shield, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { href: '/personagens', label: 'Personagens', icon: Users },
  { href: '/campanhas',   label: 'Campanhas',   icon: BookOpen },
  { href: '/ameacas',     label: 'Ameaças',     icon: Shield },
]

export function Navbar() {
  const path = usePathname()
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50, height: 64,
      background: 'rgba(13,13,15,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(147,51,234,.4)' }}>
            <Sword size={20} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Cinzel,serif', fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg,#c084fc,#e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ficha D&D
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV.map(({ href, label }) => {
            const active = path.startsWith(href)
            return (
              <Link key={href} href={href} style={{ padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', color: active ? 'var(--accentL)' : 'var(--fg2)', background: active ? 'rgba(147,51,234,.1)' : 'transparent', transition: 'all .2s' }}>
                {label}
              </Link>
            )
          })}
        </div>

        {/* User */}
        <div style={{ position: 'relative' }}>
          {status === 'loading' ? (
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--card)' }} />
          ) : session ? (
            <>
              <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer', color: 'var(--fg)' }}>
                {session.user?.image
                  ? <Image src={session.user.image} alt="" width={28} height={28} style={{ borderRadius: '50%' }} />
                  : <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff' }}>{session.user?.name?.[0]?.toUpperCase()}</div>
                }
                <span style={{ fontSize: 13, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.name}</span>
                <ChevronDown size={14} color="var(--fgM)" />
              </button>
              {open && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 8, minWidth: 160, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,.4)' }} className="fade-up">
                  <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{session.user?.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--fgM)' }}>{session.user?.email}</div>
                  </div>
                  <button onClick={() => { signOut(); setOpen(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, background: 'transparent', border: 'none', color: 'var(--danger)', fontSize: 13, cursor: 'pointer' }}>
                    <LogOut size={14} /> Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => signIn()}>
              <LogIn size={15} /> Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
