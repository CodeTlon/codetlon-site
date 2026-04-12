import { GradientButton } from '@/components/ui/GradientButton'
import { GhostButton } from '@/components/ui/GhostButton'

export function HeroHome() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-lowest">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #ffb690 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a4cddb 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 gradient-hero opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-body text-xs font-medium text-primary tracking-wide">
              Software Factory · Córdoba, Argentina
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
            Construimos el digital que tu negocio{' '}
            <em className="not-italic text-primary">merece.</em>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg sm:text-xl text-foreground/60 leading-relaxed mb-10 max-w-xl">
            De landings de alta conversión a plataformas con IA integrada. 9 niveles de servicio,
            stack moderno y metodología propia.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <GradientButton href="/contacto" size="lg">
              Hablemos
            </GradientButton>
            <GhostButton href="/servicios" size="lg">
              Ver servicios →
            </GhostButton>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    </section>
  )
}
