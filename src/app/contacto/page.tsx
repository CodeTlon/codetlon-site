import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { Mail, MessageCircle, Instagram } from 'lucide-react'
import { WHATSAPP_CTA_URL, INSTAGRAM_URL } from '@/lib/constants'

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

const contactChannels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hola@codetlon.com',
    href: 'mailto:hola@codetlon.com',
    description: 'Respondemos en menos de 48hs hábiles.',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+54 9 351 XXX XXXX',
    href: WHATSAPP_CTA_URL,
    description: 'Para consultas rápidas y seguimiento.',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@codetlon',
    href: INSTAGRAM_URL,
    description: 'Mostramos el proceso en tiempo real.',
  },
]

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <PageHero
        badge="Hablemos"
        title="¿Tenés un proyecto en mente?"
        subtitle="Contanos qué necesitás. Sin compromisos, sin rodeos. En menos de 48hs te respondemos con una propuesta concreta."
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

            {/* Form */}
            <div className="bg-surface-container rounded-2xl p-8 border border-white/6">
              <h2 className="font-display text-2xl text-foreground mb-6">
                Contanos de tu proyecto
              </h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-display text-xl text-foreground mb-2">
                  Otros canales
                </h2>
                <p className="font-body text-sm text-foreground/50">
                  Podés escribirnos directamente si preferís no usar el formulario.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {contactChannels.map(({ icon: Icon, label, value, href, description }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-start gap-4 p-4 bg-surface-container rounded-xl border border-white/6 hover:border-primary/20 transition-colors group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {value}
                      </p>
                      <p className="font-body text-xs text-foreground/40 mt-1">{description}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-4 bg-surface-container rounded-xl border border-white/6">
                <p className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-2">
                  Ubicación
                </p>
                <p className="font-body text-sm text-foreground/70">
                  Córdoba, Argentina
                </p>
                <p className="font-body text-xs text-foreground/40 mt-1">
                  Trabajamos 100% remoto con clientes de todo el país y el exterior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
