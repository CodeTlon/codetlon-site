import type { Metadata } from 'next'
import { CTABanner } from '@/components/sections/CTABanner'
import { AnimateIn } from '@/components/ui/AnimateIn'
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
    duration: '1–2 días',
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
    deliverables: ['Tests E2E pasando', 'Lighthouse Performance ≥ 85', 'SEO ≥ 95'],
  },
  {
    number: '06',
    title: 'Lanzamiento',
    duration: '4–8 horas',
    description:
      'Deploy en Vercel o VPS Docker, configuración de dominio, variables de entorno en producción, verificación final en vivo. El inicio, no el final.',
    deliverables: ['Deploy en producción', 'Dominio configurado', 'Documentación entregada'],
  },
]

const faqs = [
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Al ser desarrollos a medida, el tiempo depende íntegramente de la complejidad técnica y el alcance. Una experiencia web corporativa puede tomar un par de semanas, mientras que plataformas B2B o sistemas web a medida se ejecutan en fases de varios meses. El cronograma exacto lo definimos juntos en la propuesta técnica.',
  },
  {
    q: '¿Cómo me involucro durante el proceso?',
    a: 'Establecemos puntos de revisión estratégicos en las fases de Descubrimiento, Diseño y Revisión. No te abrumamos con decisiones técnicas del día a día, pero tus validaciones en los entregables clave son fundamentales para avanzar.',
  },
  {
    q: '¿Qué pasa después del lanzamiento?',
    a: 'El lanzamiento es solo el día uno. Activamos el Plan de Evolución Continua: monitoreo de rendimiento, actualizaciones de seguridad y mejoras iterativas basadas en métricas reales de tus usuarios.',
  },
  {
    q: '¿Trabajan con clientes fuera de Córdoba?',
    a: 'Sí, nuestra operación es 100% remota. Trabajamos con clientes de todo el país y el exterior, manteniendo una comunicación asincrónica fluida y reuniones de avance estructuradas.',
  },
  {
    q: '¿Puedo cambiar o agregar funciones durante el desarrollo?',
    a: 'Entendemos que los proyectos mutan. Cambios menores de diseño son absorbidos sin problema. Si surgen nuevas funcionalidades o un cambio de alcance significativo (pivot), armamos una propuesta adicional para no comprometer el cronograma original.',
  },
]

const continuoItems = [
  'Monitoreo de uptime y alertas',
  'Actualizaciones de seguridad',
  'Mejoras de performance',
  'Soporte prioritario',
  'Optimización continua de SEO',
]

export default function ProcesoPage() {
  return (
    <>
      {/* Hero Refinado */}
      <section className="relative min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 anim-fade-up anim-d1">
              <div className="w-10 h-[1px] bg-[#ffb690]/50" />
              <span className="font-body text-xs sm:text-sm font-semibold text-[#ffb690] uppercase tracking-[0.25em]">
                Metodología propia
              </span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight text-balance anim-fade-up anim-d2">
              El{' '}
              <em className="italic text-[#ffb690] font-light">FOS Method</em>
            </h1>
            
            <p className="font-body text-lg sm:text-xl text-foreground/50 mt-8 max-w-2xl leading-relaxed font-light text-pretty anim-fade-up anim-d3">
              Factory Operating System. El proceso que seguimos en cada proyecto, sin excepciones.
              Predecible, documentado y orientado a resultados.
            </p>
          </div>
        </div>
      </section>

      {/* Fases 01 a 06 */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border-t border-white/10">
            {phases.map((phase, i) => (
              <AnimateIn key={phase.number} delay={i * 50}>
                <div className="group flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 py-12 md:py-16 border-b border-white/10 transition-all duration-500">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 w-full lg:w-5/12 shrink-0">
                    <span className="font-display italic text-6xl md:text-7xl text-white/5 group-hover:text-[#ffb690] transition-colors duration-500 leading-none">
                      {phase.number}
                    </span>
                    <div className="flex flex-col">
                      <h2 className="font-display text-3xl text-foreground group-hover:translate-x-2 transition-transform duration-500 mb-2">
                        {phase.title}
                      </h2>
                      <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb690]/60">
                        Duración // {phase.duration}
                      </span>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12">
                    <p className="font-body text-base text-foreground/50 leading-relaxed font-light text-pretty group-hover:text-foreground/70 transition-colors duration-500">
                      {phase.description}
                    </p>
                  </div>

                  <div className="w-full lg:w-3/12 flex flex-col gap-3">
                    {phase.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-1 h-1 bg-[#ffb690]/40 mt-[9px] shrink-0 group-hover:bg-[#ffb690] transition-colors duration-500" />
                        <span className="font-body text-xs text-foreground/40 leading-relaxed group-hover:text-foreground/60 transition-colors duration-500">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fase 07 - Ahora con el mismo Layout visual que las otras fases, pero fondo oscuro */}
      <section className="relative pt-24 pb-32 bg-[#050505] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-10 h-[1px] bg-[#ffb690]/50" />
              <span className="font-body text-xs sm:text-sm font-semibold text-[#ffb690] uppercase tracking-[0.25em]">
                Post-Lanzamiento
              </span>
            </div>
          </AnimateIn>

          <div className="border-t border-white/10">
            <AnimateIn delay={100}>
              <div className="group flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 py-12 md:py-16 border-b border-white/10 transition-all duration-500">
                
                {/* Mismo estilo de Número y Título */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 w-full lg:w-5/12 shrink-0">
                  <span className="font-display italic text-6xl md:text-7xl text-white/5 group-hover:text-[#ffb690] transition-colors duration-500 leading-none">
                    07
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-display text-3xl text-foreground group-hover:translate-x-2 transition-transform duration-500 mb-2">
                      Continua
                    </h2>
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb690]/60">
                      Duración // Permanente
                    </span>
                  </div>
                </div>

                {/* Descripción alineada */}
                <div className="w-full lg:w-4/12">
                  <p className="font-body text-base text-foreground/50 leading-relaxed font-light text-pretty group-hover:text-foreground/70 transition-colors duration-500">
                    El lanzamiento no es el fin del proceso. Es el inicio de la siguiente etapa. Activamos un plan integral para escalar el proyecto y mantenerlo optimizado.
                  </p>
                </div>

                {/* Entregables / Items continuos */}
                <div className="w-full lg:w-3/12 flex flex-col gap-3">
                  {continuoItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-[#ffb690]/40 mt-[9px] shrink-0 group-hover:bg-[#ffb690] transition-colors duration-500" />
                      <span className="font-body text-xs text-foreground/40 leading-relaxed group-hover:text-foreground/60 transition-colors duration-500">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-32 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <span className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Preguntas frecuentes
              </span>
            </div>
          </AnimateIn>

          {/* 1. Quitamos type="single" y collapsible porque Base UI no los necesita */}
          <Accordion className="border-t border-white/10">
            {faqs.map((faq, i) => (
              <AnimateIn key={i} delay={i * 40}>
                <AccordionItem
                  value={`faq-${i}`}
                  // 2. Cambiamos data-[state=open] por data-open
                  className="border-b border-white/10 data-[state-open]:border-[#ffb690]/20 transition-colors duration-500"
                >
                  <AccordionTrigger className="font-display text-xl md:text-2xl text-foreground/50 hover:text-foreground py-8 hover:no-underline data-open:text-[#ffb690] text-left transition-colors duration-500">
                    {faq.q}
                  </AccordionTrigger>
                  
                  {/* 3. Limpiamos las clases extra porque tu accordion.tsx ya las maneja súper bien */}
                  <AccordionContent className="font-body text-base text-foreground/40 leading-relaxed font-light text-pretty pb-8 pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </AnimateIn>
            ))}
          </Accordion>
        </div>
      </section>

      <CTABanner headline="Un proceso claro desde el día uno." />
    </>
  )
}