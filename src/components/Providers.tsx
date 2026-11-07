'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PWAUpdater } from '@/components/PWAUpdater'

export function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <PWAUpdater />
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
