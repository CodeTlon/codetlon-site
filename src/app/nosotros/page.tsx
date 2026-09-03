import type { Metadata } from 'next'
import { CTABanner } from '@/components/sections/CTABanner'
import { PageHero } from '@/components/sections/PageHero'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { INSTAGRAM_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Quiénes somos | CodeTlon Software Factory',
  description:
    'Software Factory basada en Córdoba, Argentina. Conocé el FOS Method, nuestro stack curado y la filosofía detrás de cada proyecto digital.',
  alternates: { canonical: 'https://codetlon.com/nosotros' },
}

const valores = [
  {
    title: 'Precisión técnica',
    description:
      'El código que escribimos es explícito, mantenible y testeable. Sin magia, sin atajos que cuestan caro después.',
  },
  {
    title: 'Estética con propósito',
    description:
      'El diseño no es decoración: es comunicación. Cada decisión visual tiene una razón que resuelve un problema real.',
  },
  {
    title: 'Resultados medibles',
    description:
      'Lighthouse, SEO, conversiones. No entregamos proyectos, entregamos métricas que importan.',
  },
]

const stack = {
  Frontend: ['Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Lucide React'],
  Backend: ['Supabase (PostgreSQL + Auth)', 'Next.js Server Actions', 'Resend API'],
  Automatización: ['n8n (self-hosted)', 'Docker Compose', 'webhooks'],
  Testing: ['Playwright E2E', 'Lighthouse CI'],
  Deploy: ['Vercel', 'VPS Docker'],
}

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Construimos software{' '}
            <em className="italic text-[#ffb690] font-light">que escala.</em>
          </>
        }
        subtitle="Equipo en Córdoba, Argentina. Un stack curado, una metodología propia y el mismo nivel de exigencia en cada proyecto."
      />

      {/* Valores */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12">
          <AnimateIn delay={300} threshold={0.4}>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-[1px] bg-[#ffb690]/30" />
              <h2 className="font-body text-xs font-medium text-foreground/40 uppercase tracking-[0.2em]">
                Valores fundamentales
              </h2>
            </div>

            <div className="border-t border-white/10">
              {valores.map((v, i) => (
                <div key={v.title} className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-16 py-12 md:py-16 border-b border-white/10 hover:bg-white/[0.01] transition-colors duration-500">
                  <div className="flex flex-col md:w-5/12 shrink-0">
                    <span className="font-body text-[10px] font-bold text-white/20 group-hover:text-[#ffb690] transition-colors duration-500 tracking-[0.2em] mb-4">
                      {`0${i + 1} // PRINCIPIO`}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl text-foreground/80 group-hover:translate-x-2 group-hover:text-foreground transition-all duration-500">
                      {v.title}
                    </h3>
                  </div>
                  <p className="font-body text-lg text-foreground/65 leading-relaxed font-light text-pretty group-hover:text-foreground/85 transition-colors duration-500 md:pt-8">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Stack */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#ffb690]/30" />
              <span className="font-body text-xs font-medium text-foreground/40 uppercase tracking-[0.2em]">
                Stack técnico
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight mb-6">
              No es aleatorio.{' '}
              <em className="italic text-[#ffb690] font-light">Es deliberado.</em>
            </h2>
            <p className="font-body text-lg text-foreground/65 font-light max-w-xl mb-20 text-pretty">
              Cada tecnología fue elegida por rendimiento, escalabilidad, comunidad y
              mantenibilidad a largo plazo.
            </p>
          </AnimateIn>

          <div className="border-t border-white/10">
            {Object.entries(stack).map(([category, techs], i) => (
              <AnimateIn key={category} delay={i * 50}>
                <div className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-16 py-10 border-b border-white/10">
                  <span className="font-body text-xs font-bold text-[#ffb690]/50 uppercase tracking-[0.2em] md:w-48 shrink-0 group-hover:text-[#ffb690] transition-colors duration-500">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="font-display italic text-xl md:text-2xl text-foreground/40 hover:text-foreground transition-colors duration-500 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="pb-24 pt-0"> {/* pt-0 para eliminar la separación superior */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            {/* Eliminamos border-t y pt-16 para que no haya línea ni padding extra arriba */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              
              <div>
                <span className="font-body text-xs font-bold text-[#ffb690]/50 uppercase tracking-[0.2em]">
                  Base operativa
                </span>
                <p className="font-display text-4xl text-foreground mt-4">Córdoba, Argentina</p>
                <p className="font-body text-base text-foreground/70 mt-2 font-light">
                  100% remoto · Clientes en todo el país y el exterior
                </p>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-foreground/40 hover:text-[#ffb690] transition-colors duration-500"
              >
                <span className="font-body text-sm font-bold uppercase tracking-[0.2em]">
                  Seguinos en Instagram
                </span>
                <span className="font-display italic text-2xl group-hover:translate-x-1 transition-transform duration-500">
                  @codetlon
                </span>
              </a>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Único punto de salida interactivo */}
      <CTABanner headline="El stack correcto desde el día uno." />
    </>
  )
}