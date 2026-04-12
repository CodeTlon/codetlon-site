import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_CTA_URL, INSTAGRAM_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mensaje recibido | CodeTlon',
  description: 'Recibimos tu consulta. Te respondemos en menos de 48hs.',
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-8">

        {/* Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-primary" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl text-foreground">
            ¡Mensaje recibido!
          </h1>
          <p className="font-body text-foreground/55 leading-relaxed max-w-sm mx-auto">
            Lo revisamos y te respondemos en menos de 48hs. También te enviamos una confirmación a tu email.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            Volver al inicio
            <ArrowRight size={14} />
          </Link>

          <a
            href={WHATSAPP_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-cta text-[#552100] font-body font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={16} />
            Escribinos por WhatsApp
          </a>
        </div>

        {/* Instagram nudge */}
        <p className="font-body text-xs text-foreground/30">
          Mientras tanto, seguinos en{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @codetlon
          </a>{' '}
          para ver el proceso en tiempo real.
        </p>
      </div>
    </main>
  )
}
