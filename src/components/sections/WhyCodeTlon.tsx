import { Code2, RefreshCw, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionLabel } from '@/components/ui/SectionLabel'

const differentials = [
  {
    icon: Code2,
    title: 'Stack curado, no genérico',
    description:
      'No usamos cualquier tecnología. Next.js, TypeScript, Tailwind, Supabase, Vercel. Cada herramienta elegida por rendimiento, escalabilidad y mantenibilidad a largo plazo.',
  },
  {
    icon: RefreshCw,
    title: 'Evolución Continua',
    description:
      'El lanzamiento es el comienzo, no el final. Cada proyecto incluye un plan de soporte, monitoreo y mejoras iterativas. Tu digital siempre al día.',
  },
  {
    icon: Zap,
    title: 'Sin intermediarios ni templates',
    description:
      'Cada proyecto se construye desde cero para vos. Sin WordPress, sin page builders, sin limitaciones. Código propio, control total.',
  },
]

export function WhyCodeTlon() {
  return (
    <section className="py-20 bg-background" aria-label="Por qué CodeTlon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionLabel className="mb-3 block">Diferenciales</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            ¿Por qué CodeTlon?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentials.map((d) => (
            <GlassCard key={d.title} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <d.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground">{d.title}</h3>
              <p className="font-body text-sm text-foreground/55 leading-relaxed">
                {d.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
