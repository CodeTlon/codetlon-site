import { SectionLabel } from '@/components/ui/SectionLabel'

interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-surface-low border-b border-white/8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badge && <SectionLabel className="mb-4 block">{badge}</SectionLabel>}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-lg text-foreground/55 mt-4 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
