import { CheckCircle2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GradientButton } from '@/components/ui/GradientButton'

const items = [
  'Monitoreo de uptime y performance post-lanzamiento',
  'Actualizaciones de dependencias y parches de seguridad',
  'Mejoras iterativas basadas en métricas reales',
  'Soporte prioritario para incidencias',
  'Optimización continua de SEO y velocidad',
  'Asistencia para agregar funcionalidades nuevas',
]

export function EvolucionContinua() {
  return (
    <section className="py-20 bg-surface-low" aria-label="Plan de Evolución Continua">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <SectionLabel className="mb-3 block">Post-entrega</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
              Plan de Evolución Continua
            </h2>
            <p className="font-body text-foreground/55 leading-relaxed mb-8">
              El trabajo no termina en el lanzamiento. Cada proyecto de CodeTlon incluye
              acompañamiento post-entrega: tu digital evoluciona con tu negocio.
            </p>
            <GradientButton href="/proceso" size="md">
              Ver el proceso completo
            </GradientButton>
          </div>

          {/* List */}
          <ul className="flex flex-col gap-3" aria-label="Incluye">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="font-body text-sm text-foreground/70 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
