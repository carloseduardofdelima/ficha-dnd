'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Sword, Users, BookOpen, Shield, LogIn, LogOut, ChevronDown, Menu, X as CloseIcon } from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { href: '/personagens', label: 'Personagens', icon: Users },
  { href: '/campanhas', label: 'Campanhas', icon: BookOpen },
  { href: '/ameacas', label: 'Ameaças', icon: Shield },
]

export function Sidebar() {
  const path = usePathname()
  const { data: session, status } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = path.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: vertical ? '12px 16px' : '8px 14px',
              borderRadius: vertical ? 12 : 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              color: active ? 'var(--accentL)' : 'var(--fg2)',
              background: active ? 'var(--accentGlow)' : 'transparent',
              transition: 'all .2s'
            }}
          >
            {vertical && <Icon size={18} color={active ? 'var(--accentL)' : 'var(--fg3)'} />}
            {label}
          </Link>
        )
      })}
    </>
  )

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(13,13,15,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center'
      }} className="desktop-navbar">
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent2), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px var(--accentGlow)' }}>
                <Sword size={20} color="#fff" />
              </div>
              <span style={{ fontFamily: 'Cinzel,serif', fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg, var(--accentL), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                A Forja
              </span>
            </Link>

            {/* Desktop Links */}
            <div style={{ display: 'flex', gap: 4 }} className="hide-mobile">
              <NavLinks />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* User Section */}
            <div style={{ position: 'relative' }} className="hide-mobile">
              {status === 'loading' ? (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--card)' }} />
              ) : session ? (
                <>
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer', color: 'var(--fg)' }}>
                    {session.user?.image
                      ? <Image src={session.user.image} alt="" width={28} height={28} style={{ borderRadius: '50%' }} />
                      : <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff' }}>{session.user?.name?.[0]?.toUpperCase()}</div>
                    }
                    <span style={{ fontSize: 13 }}>{session.user?.name}</span>
                    <ChevronDown size={14} color="var(--fgM)" />
                  </button>
                  {userMenuOpen && (
                    <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 8, minWidth: 160, zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,.4)' }} className="fade-up">
                      <button onClick={() => { signOut() }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, background: 'transparent', border: 'none', color: 'var(--danger)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
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

            {/* Mobile Toggle */}
            <button
              className="show-mobile-flex btn btn-ghost"
              onClick={() => setMobileMenuOpen(true)}
              style={{ display: 'none', padding: 8 }}
            >
              <Menu size={24} color="var(--fg)" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        opacity: mobileMenuOpen ? 1 : 0,
        visibility: mobileMenuOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)'
      }} onClick={() => setMobileMenuOpen(false)}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 300,
          backgroundColor: 'var(--bg)',
          borderRight: '1px solid var(--border)',
          padding: 32,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }} onClick={e => e.stopPropagation()}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sword size={18} />
              </div>
              <span style={{ fontFamily: 'Cinzel,serif', fontSize: 16, fontWeight: 700, color: 'rgb(190, 18, 60)' }}>
                A Forja
              </span>
            </Link>
            <button className="btn btn-ghost" onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Navegação</span>
            <NavLinks vertical />
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {session.user?.image
                  ? <Image src={session.user.image} alt="" width={40} height={40} style={{ borderRadius: '50%' }} />
                  : <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff' }}>{session.user?.name?.[0]?.toUpperCase()}</div>
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{session.user?.name}</div>
                  <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: 12, padding: 0, cursor: 'pointer' }}>Sair da Conta</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary w-full" onClick={() => signIn()}>Entrar</button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        
        /* Mobile Menu Styles */
        .menu-item {
          background: var(--accentGlow);
          border: 1px solid rgba(225, 29, 72, 0.3);
          color: #fff;
          padding: 20px 10px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-item:hover {
          background: rgba(225, 29, 72, 0.2);
          border-color: var(--accent);
          box-shadow: 0 0 15px var(--accentGlow);
        }
      `}</style>
    </>
  )
}
