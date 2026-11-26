import { AnimateIn } from '@/components/ui/AnimateIn'

// Compromisos verificables en cada proyecto — no métricas de marketing.
const standards = [
  { value: '100%', label: 'del código y la documentación quedan en tu propiedad.' },
  { value: 'Tests', label: 'Pruebas automáticas de los flujos críticos antes de cada entrega.' },
  { value: 'A11y', label: 'Interfaces accesibles para cualquier persona y dispositivo.' },
  { value: '0', label: 'Plantillas o constructores genéricos: todo se desarrolla a medida.' },
]

export function MetricsStrip() {
  return (
    <section className="py-24" aria-labelledby="standards-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2
          id="standards-heading"
          className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em] mb-10"
        >
          Nuestros estándares
        </h2>
        <div className="border-y border-white/4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/4">
            {standards.map((m, i) => (
              <AnimateIn key={m.value} delay={i * 80}>
                <div className="flex flex-col items-center text-center px-4 group">
                  <span className="font-display text-6xl lg:text-7xl italic text-foreground/50 font-light mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500">
                    {m.value}
                  </span>
                  <span className="font-body text-sm font-light text-foreground/65 text-balance max-w-[220px]">
                    {m.label}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
