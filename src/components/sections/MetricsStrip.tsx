import { MetricCard } from '@/components/ui/MetricCard'

const metrics = [
  { value: '9', label: 'niveles de servicio para cada etapa de tu negocio' },
  { value: '100%', label: 'TypeScript en todo el stack, sin excepciones' },
  { value: '3', label: 'viewports testeados con E2E en cada entrega' },
  { value: '0', label: 'precios fijos — cada proyecto es único' },
]

export function MetricsStrip() {
  return (
    <section className="py-16 bg-surface-highest border-y border-white/8" aria-label="Métricas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {metrics.map((m) => (
            <MetricCard key={m.value} value={m.value} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
