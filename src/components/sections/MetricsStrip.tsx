import { AnimateIn } from '@/components/ui/AnimateIn'

const businessMetrics = [
  { value: '100%', label: 'Propiedad intelectual. El código fuente es tuyo, sin ataduras.' },
  { value: '0', label: 'Plantillas o constructores genéricos. Todo es nativo.' },
  { value: 'A+', label: 'Calificación en performance, accesibilidad y SEO técnico.' },
  { value: '∞', label: 'Escalabilidad. Arquitecturas listas para picos de tráfico.' },
]

export function MetricsStrip() {
  return (
    <section className="py-24 bg-[#050505]" aria-label="Nuestros Estándares">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-y border-white/[0.04] py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/[0.04]">
            {businessMetrics.map((m, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="flex flex-col items-center text-center px-4 group">
                  <span className="font-display text-6xl lg:text-7xl italic text-foreground/20 font-light mb-4 tracking-tighter group-hover:text-[#ffb690] transition-colors duration-500">
                    {m.value}
                  </span>
                  <span className="font-body text-sm font-light text-foreground/50 text-balance max-w-[220px]">
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
