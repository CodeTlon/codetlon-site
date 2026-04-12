import { services } from '@/lib/services-data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ServicesGrid() {
  return (
    <section className="py-16 bg-background" aria-label="Todos los servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="group bg-surface-container rounded-2xl p-6 border border-white/6 hover:border-primary/30 transition-all hover:bg-surface-high"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-body text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
                  {s.level}
                </span>
                <ArrowRight
                  size={16}
                  className="text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{s.name}</h3>
              <p className="font-body text-sm text-foreground/50 leading-relaxed mb-4">
                {s.shortDescription}
              </p>
              <p className="font-body text-xs font-medium text-secondary uppercase tracking-wide">
                {s.techStack.slice(0, 3).join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
