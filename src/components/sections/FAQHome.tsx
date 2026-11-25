import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { JsonLd } from '@/components/seo/JsonLd'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// FAQ complementaria a la de /proceso (esa cubre "cómo trabajamos" paso a paso).
// Esta responde las preguntas de decisión previas al contacto: precio, qué solución, stack, propiedad, soporte.
const faqs = [
  {
    q: '¿Cuánto cuesta un proyecto con CodeTlon?',
    a: 'Depende del alcance real: un sitio institucional no cuesta lo mismo que un sistema a medida o una app móvil integrada con tus sistemas. No trabajamos con paquetes cerrados: armamos una propuesta a medida después de la etapa de Descubrimiento, sin costo ni compromiso.',
  },
  {
    q: '¿Cómo sé qué solución necesito?',
    a: 'No hace falta que lo sepas de antemano. Contanos qué querés resolver y en la etapa de Descubrimiento analizamos tus procesos y lo que ya tenés para recomendarte el camino adecuado: un sistema a medida, un sitio web, una app móvil, automatizaciones, la modernización de un sistema existente o una combinación. Te recomendamos lo que tu negocio necesita, no lo más caro.',
  },
  {
    q: '¿Con qué tecnologías trabajan?',
    a: 'Elegimos la tecnología según el proyecto. En web, Next.js, React, TypeScript y Tailwind CSS; en mobile, React Native y Expo; en backend, Node.js, .NET / C#, Java, Python / FastAPI y Go; en datos, PostgreSQL, Supabase, SQL Server y Redis; en automatización e IA, n8n, WhatsApp Business API, OpenRouter, LangChain y LangGraph; y para calidad e infraestructura, Playwright, Docker, Cloudflare, Vercel y servidores propios.',
  },
  {
    q: '¿El código y el diseño quedan en propiedad del cliente?',
    a: 'Sí. Al finalizar el proyecto entregamos el repositorio completo y toda la documentación técnica. El código es tuyo: podés seguir manteniéndolo con tu propio equipo o continuar trabajando con nosotros en el servicio de mantenimiento y soporte.',
  },
  {
    q: '¿Qué pasa si necesito cambios después del lanzamiento?',
    a: 'El lanzamiento no cierra la relación. Ofrecemos mantenimiento y soporte con monitoreo, copias de seguridad, actualizaciones de seguridad y mejoras; y para cambios puntuales, cotizamos por alcance sin obligarte a un contrato de mantenimiento fijo.',
  },
]

export const faqHomeSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export function FAQHome() {
  return (
    <section className="py-24 md:py-32" aria-label="Preguntas frecuentes">
      <JsonLd data={faqHomeSchema} />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#ffb690]/40" />
            <span className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
              Antes de escribirnos
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
            Preguntas{' '}
            <em className="font-display italic text-[#ffb690] font-light">frecuentes.</em>
          </h2>
          <p className="font-body text-base text-foreground/60 leading-relaxed font-light mb-12 max-w-2xl">
            Lo que más nos preguntan antes de iniciar un proyecto. Para el paso a paso de cómo
            trabajamos una vez que arrancamos, mirá el{' '}
            <Link href="/proceso" className="text-[#ffb690] hover:underline underline-offset-4">
              FOS Method
            </Link>
            .
          </p>
        </AnimateIn>

        <Accordion className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <AnimateIn key={faq.q} delay={i * 40}>
              <AccordionItem
                value={`home-faq-${i}`}
                className="border-b border-white/10 transition-colors duration-500"
              >
                <AccordionTrigger className="font-display text-lg md:text-xl text-foreground/75 hover:text-foreground py-6 hover:no-underline data-open:text-[#ffb690] text-left transition-colors duration-500">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base text-foreground/65 leading-relaxed font-light text-pretty pb-6 pt-1">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </AnimateIn>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
