import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Ficha D&D | Crie e Compartilhe Personagens',
  description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="pt-BR">
      <body>
        <Providers session={session}>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '28px', paddingBottom: '48px' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
