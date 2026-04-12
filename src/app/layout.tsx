import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

// Bug #1: viewport SIEMPRE separado de metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'CodeTlon | Software Factory en Córdoba, Argentina',
  description:
    'Desarrollamos sitios, ecommerce, dashboards y automatizaciones. 9 niveles de servicio, stack moderno, metodología propia. Basados en Córdoba.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://codetlon.com',
    siteName: 'CodeTlon Software Factory',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${newsreader.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
