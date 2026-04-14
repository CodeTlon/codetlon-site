import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e1516',
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://codetlon.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CodeTlon | Software Factory en Córdoba, Argentina',
    template: '%s | CodeTlon',
  },
  description:
    'Desarrollamos sitios, ecommerce, dashboards y automatizaciones. 9 niveles de servicio, stack moderno, metodología propia. Basados en Córdoba.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: BASE_URL,
    siteName: 'CodeTlon Software Factory',
    images: [
      {
        url: '/logos/codetlon-naranja.png',
        width: 1200,
        height: 630,
        alt: 'CodeTlon Software Factory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeTlon | Software Factory en Córdoba, Argentina',
    description:
      'Desarrollamos sitios, ecommerce, dashboards y automatizaciones. 9 niveles de servicio, stack moderno, metodología propia.',
    images: ['/logos/codetlon-naranja.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#ffb690] focus:text-[#0e1516] focus:font-bold focus:rounded"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
