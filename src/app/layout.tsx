import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Sidebar } from '@/components/Sidebar'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Ficha D&D | Crie e Compartilhe Personagens',
  description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
  openGraph: {
    title: 'A Forja | Fichas de D&D',
    description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
    images: ['https://www.enworld.org/attachments/dd-tashas-1604041136985-jpg.128081/'],
  },
}



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme && savedTheme !== 'default') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                    // Also try to set on body, but it might not be parsed yet, so check if body exists
                    if (document.body) {
                      document.body.setAttribute('data-theme', savedTheme);
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }} suppressHydrationWarning>
        <Providers session={session}>
          <Sidebar />
          <main className="main-content" style={{ minHeight: '100vh' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '10px 24px 80px 24px' }}>
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
