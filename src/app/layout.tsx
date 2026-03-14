import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Sidebar } from '@/components/Sidebar'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Ficha D&D | Crie e Compartilhe Personagens',
  description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
  openGraph: {
    title: 'Minha Ficha D&D',
    description: 'Veja minha ficha de personagem',
    images: ['https://www.enworld.org/attachments/dd-tashas-1604041136985-jpg.128081/'],
  },
}



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
        <Providers session={session}>
          <Sidebar />
          <main className="main-content" style={{ minHeight: '100vh' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px 120px 24px' }}>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
