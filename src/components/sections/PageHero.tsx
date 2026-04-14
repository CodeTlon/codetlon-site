import React from 'react'

interface PageHeroProps {
  badge?: string
  title: React.ReactNode 
  subtitle?: string
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
      
      {/* ELIMINADO: Warm aura — top right */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          
          {badge && (
            <div className="flex items-center gap-4 mb-8 anim-fade-up anim-d1">
              <div className="w-10 h-[1px] bg-[#ffb690]/50" />
              <span className="font-body text-xs sm:text-sm font-semibold text-[#ffb690] uppercase tracking-[0.25em]">
                {badge}
              </span>
            </div>
          )}
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight text-balance anim-fade-up anim-d2">
            {title}
          </h1>
          
          {subtitle && (
            <p className="font-body text-lg sm:text-xl text-foreground/50 mt-8 max-w-2xl leading-relaxed font-light text-pretty anim-fade-up anim-d3">
              {subtitle}
            </p>
          )}
          
        </div>
      </div>
    </section>
  )
}