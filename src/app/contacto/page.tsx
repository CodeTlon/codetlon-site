import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Mail } from 'lucide-react'
import { WHATSAPP_CTA_URL, INSTAGRAM_URL } from '@/lib/constants'

// --- Íconos Personalizados ---

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  )
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
  )
}

// --- Configuración de Metadatos y Schema ---

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto — CodeTlon Software Factory',
  description: 'Formulario de contacto y canales de comunicación de CodeTlon.',
  url: 'https://codetlon.com/contacto',
}

export const metadata: Metadata = {
  title: 'Contacto | CodeTlon Software Factory',
  description:
    'Contanos de tu proyecto. Respondemos en menos de 48hs. Formulario, WhatsApp o Instagram — elegí el canal que prefieras.',
  alternates: { canonical: 'https://codetlon.com/contacto' },
}

// --- Lista de canales ---
const contactChannels = [
  { icon: Mail, label: 'Email', href: 'mailto:hola@codetlon.com' },
  { icon: WhatsAppIcon, label: 'WhatsApp', href: WHATSAPP_CTA_URL },
  { icon: InstagramIcon, label: 'Instagram', href: INSTAGRAM_URL },
  { icon: FacebookIcon, label: 'Facebook', href: '#' }, // Reemplazar por tu URL
  { icon: LinkedInIcon, label: 'LinkedIn', href: '#' }, // Reemplazar por tu URL
]

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />

      <section className="relative min-h-screen bg-background overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">

          {/* Header */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-8 anim-fade-up anim-d1">
              <div className="w-10 h-[1px] bg-[#ffb690]/50" />
              <span className="font-body text-xs sm:text-sm font-semibold text-[#ffb690] uppercase tracking-[0.25em]">
                Hablemos
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground tracking-tight max-w-4xl leading-[1.05] text-balance anim-fade-up anim-d2">
              ¿Tenés un proyecto{' '}
              <em className="italic text-[#ffb690] font-light">en mente?</em>
            </h1>
          </div>

          {/* Columna central para Formulario + Redes */}
          <div className="flex flex-col gap-12 lg:gap-16 max-w-3xl">

            {/* Formulario */}
            <AnimateIn delay={100} className="w-full">
              <ContactForm />
            </AnimateIn>

            {/* Canales Secundarios (Solo Íconos siempre debajo del form) */}
            <AnimateIn delay={200} className="w-full">
              <div className="border-t border-white/10 pt-8">
                <p className="font-body text-xs font-bold text-[#ffb690]/50 uppercase tracking-[0.2em] mb-6">
                  Nuestras redes
                </p>
                
                {/* Contenedor Flex para los íconos */}
                <div className="flex flex-wrap gap-4">
                  {contactChannels.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      aria-label={label}
                      className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.02] border border-white/10 hover:border-[#ffb690]/40 hover:bg-[#ffb690]/5 transition-all duration-500"
                    >
                      <Icon className="w-5 h-5 text-foreground/50 group-hover:text-[#ffb690] transition-colors duration-500" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>
    </>
  )
}