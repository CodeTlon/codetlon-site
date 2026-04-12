import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { GradientButton } from '@/components/ui/GradientButton'
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
  Deploy: ['Vercel', 'VPS Docker', 'GitHub Actions'],
}

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        badge="Software Factory"
        title="Construimos software que escala."
        subtitle="Somos un equipo de Córdoba, Argentina. Cada proyecto que tomamos, lo trabajamos con el mismo stack curado, la misma metodología y el mismo nivel de exigencia."
      />

      {/* Manifiesto */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-2xl sm:text-3xl text-foreground/80 leading-relaxed mb-6">
              &ldquo;No usamos templates, no improvisamos el stack, no prometemos lo que no podemos
              cumplir.&rdquo;
            </p>
            <p className="font-body text-foreground/50 leading-relaxed">
              CodeTlon nació de la frustración con proyectos digitales que prometían mucho y
              entregaban poco. Sitios lentos, código inmantenible, sin tests, sin documentación.
              Decidimos hacer lo opuesto: un proceso predecible, un stack curado y entregas que se
              sostienen en el tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-surface-low border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-foreground mb-10">Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valores.map((v) => (
              <div
                key={v.title}
                className="bg-surface-container rounded-2xl p-6 border border-white/6"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{v.title}</h3>
                <p className="font-body text-sm text-foreground/55 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-foreground mb-4">
            Nuestro stack no es aleatorio
          </h2>
          <p className="font-body text-foreground/50 mb-10 max-w-lg">
            Cada tecnología fue elegida por rendimiento, escalabilidad, comunidad y mantenibilidad a
            largo plazo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(stack).map(([category, techs]) => (
              <div key={category}>
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-body text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación + CTA */}
      <section className="py-16 bg-surface-low border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-body text-foreground/40 text-sm uppercase tracking-widest mb-1">
              Ubicación
            </p>
            <p className="font-display text-xl text-foreground">Córdoba, Argentina</p>
            <p className="font-body text-sm text-foreground/50 mt-1">
              Trabajamos remotamente con clientes de todo el país.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <GradientButton href="/contacto">Hablemos</GradientButton>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              @codetlon →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
