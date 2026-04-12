import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { CTABanner } from '@/components/sections/CTABanner'
import { CheckCircle2 } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FOS Method | Cómo trabajamos en CodeTlon',
  description:
    'Conocé el FOS Method: la metodología propia de CodeTlon. 6 etapas desde el descubrimiento hasta el lanzamiento y más allá.',
  alternates: { canonical: 'https://codetlon.com/proceso' },
}

const phases = [
  {
    number: '01',
    title: 'Descubrimiento',
    duration: '1 día',
    description:
      'Analizamos tu negocio, objetivos, audiencia y competencia. Revisamos el brief, hacemos preguntas que importan y definimos el alcance real del proyecto.',
    deliverables: ['Brief validado', 'Alcance definido', 'Nivel de proyecto determinado'],
  },
  {
    number: '02',
    title: 'Propuesta',
    duration: '1 día',
    description:
      'Preparamos la propuesta técnica y de diseño. Definimos el stack exacto, las páginas/funcionalidades y los criterios de éxito medibles.',
    deliverables: ['Propuesta técnica', 'Stack definido', 'Criterios de aceptación'],
  },
  {
    number: '03',
    title: 'Diseño',
    duration: '1-2 días',
    description:
      'Construimos el sistema de diseño: paleta de colores, tipografías, componentes base. Sin templates. Todo basado en tu marca e identidad.',
    deliverables: ['Design system', 'Mockups de secciones clave', 'Aprobación de identidad visual'],
  },
  {
    number: '04',
    title: 'Desarrollo',
    duration: 'según nivel',
    description:
      'Escribimos código modular, testeado y commiteado con conventional commits. Cada componente es independiente, cada feature va en su rama.',
    deliverables: ['Repositorio GitHub privado', 'Componentes tipados en TypeScript', 'Commits semánticos'],
  },
  {
    number: '05',
    title: 'Revisión',
    duration: '1 día',
    description:
      'Corremos los tests E2E en 3 viewports, hacemos auditoría Lighthouse y revisamos accesibilidad. Nada llega a producción sin pasar el filtro.',
    deliverables: ['Tests E2E pasando', 'Lighthouse Performance ≥ 85, SEO ≥ 95', 'Ajustes finales'],
  },
  {
    number: '06',
    title: 'Lanzamiento',
    duration: '4-8 horas',
    description:
      'Deploy en Vercel o VPS Docker, configuración de dominio, variables de entorno en producción, verificación final en vivo. El inicio, no el final.',
    deliverables: ['Deploy en producción', 'Dominio configurado', 'Documentación entregada'],
  },
]

const faqs = [
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Depende del nivel. Una landing (L1) puede estar lista en 4-5 días. Un sitio institucional (L2) en 7-10 días. Para proyectos más complejos (L3-L9) coordinamos el tiempo en la propuesta.',
  },
  {
    q: '¿Cómo me involucro durante el proceso?',
    a: 'Tenemos puntos de revisión definidos en las fases de Diseño y Revisión. No te molestamos con decisiones técnicas, pero tus aprobaciones en los entregables clave son importantes.',
  },
  {
    q: '¿Qué pasa después del lanzamiento?',
    a: 'Activamos el Plan de Evolución Continua: monitoreo, actualizaciones y mejoras iterativas. No desaparecemos después de entregar.',
  },
  {
    q: '¿Trabajan con clientes fuera de Córdoba?',
    a: 'Sí, todos nuestros proyectos son 100% remotos. Trabajamos con clientes de todo el país y el exterior.',
  },
  {
    q: '¿Puedo cambiar algo durante el desarrollo?',
    a: 'Cambios menores en la fase de desarrollo son absorbidos. Cambios de alcance significativos generan una propuesta adicional. Lo aclaramos desde el inicio para evitar sorpresas.',
  },
]

const continuoItems = [
  'Monitoreo de uptime y alertas automáticas',
  'Actualizaciones de seguridad y dependencias',
  'Mejoras de performance basadas en métricas reales',
  'Soporte prioritario ante incidencias',
  'Optimización continua de SEO y conversiones',
  'Incorporación de nuevas funcionalidades',
]

export default function ProcesoPage() {
  return (
    <>
      <PageHero
        badge="Metodología propia"
        title="El FOS Method"
        subtitle="Factory Operating System. El proceso que seguimos en cada proyecto, sin excepciones. Predecible, documentado, orientado a resultados."
      />

      {/* Fases */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className="grid grid-cols-1 lg:grid-cols-[200px_1fr_240px] gap-6 items-start pb-8 border-b border-white/8 last:border-0"
              >
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="font-display text-5xl font-bold text-primary/20 leading-none">
                    {phase.number}
                  </span>
                  <div>
                    <h2 className="font-display text-xl text-foreground">{phase.title}</h2>
                    <p className="font-body text-xs text-foreground/30 mt-0.5">{phase.duration}</p>
                  </div>
                </div>
                <p className="font-body text-foreground/60 leading-relaxed">{phase.description}</p>
                <ul className="flex flex-col gap-2">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span className="font-body text-xs text-foreground/50">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolución Continua */}
      <section className="py-16 bg-surface-low border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-4">
                Fase 07 — continua
              </p>
              <h2 className="font-display text-3xl text-foreground mb-4">
                Plan de Evolución Continua
              </h2>
              <p className="font-body text-foreground/55 leading-relaxed">
                El lanzamiento no es el fin del proceso. Es el inicio de la siguiente etapa. Cada
                proyecto entregado sigue siendo nuestro: lo monitoreamos, lo actualizamos y lo
                mejoramos.
              </p>
            </div>
            <ul className="flex flex-col gap-3 pt-8 lg:pt-0">
              {continuoItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground/65">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-foreground mb-10">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-surface-container rounded-xl border border-white/6 px-4 data-[state=open]:border-primary/20"
              >
                <AccordionTrigger className="font-body text-sm font-medium text-foreground py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-foreground/55 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTABanner headline="Un proceso claro desde el día uno." />
    </>
  )
}
