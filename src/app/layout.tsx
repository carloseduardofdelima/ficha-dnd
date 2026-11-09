import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Sidebar } from '@/components/Sidebar'
import { auth } from '@/lib/auth'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Ficha D&D | Crie e Compartilhe Personagens',
  description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'A Forja',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'A Forja | Fichas de D&D',
    description: 'Crie, gerencie e compartilhe fichas de personagens de Dungeons & Dragons.',
    images: ['https://www.enworld.org/attachments/dd-tashas-1604041136985-jpg.128081/'],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="A Forja" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme && savedTheme !== 'default') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                    if (document.body) {
                      document.body.setAttribute('data-theme', savedTheme);
                    }
                  }
                } catch (e) {}

                if ('serviceWorker' in navigator) {
                  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                      for (var i = 0; i < regs.length; i++) {
                        regs[i].unregister();
                      }
                    }).catch(function() {});
                  } else {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(function() {});
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }} suppressHydrationWarning>
        <Providers session={session}>
          <Sidebar />
          <main className="main-content" style={{ minHeight: '100vh' }}>
            <div className="main-layout-container">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
