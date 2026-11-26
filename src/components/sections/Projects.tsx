import { ArrowUpRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { projects, projectDisplayUrl } from '@/lib/projects-data'

export function Projects() {
  if (projects.length === 0) return null

  return (
    <section
      className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden"
      aria-label="Proyectos en producción"
      id="proyectos"
    >
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("/noise.svg")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn variant="fade" className="w-full">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-white/20" />
              <SectionLabel className="text-white/50">En Producción</SectionLabel>
            </div>
            <h2 className="font-display text-4xl md:text-5xl md:leading-[var(--text-5xl--line-height)] lg:text-6xl lg:leading-[var(--text-6xl--line-height)] text-white leading-[1.1] tracking-tight text-balance">
              Proyectos que ya están{' '}
              <em className="font-display italic text-primary font-light drop-shadow-xs">
                online.
              </em>
            </h2>
          </div>
        </AnimateIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateIn key={project.url} delay={100 * (i + 1)} variant="fade">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full focus:outline-hidden focus:ring-2 focus:ring-primary/50 rounded-2xl"
                aria-label={`Visitar ${project.name} (se abre en una pestaña nueva)`}
              >
                <GlassCard className="h-full flex flex-col transition-all duration-500 group-hover:border-primary/40 group-hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <SectionLabel className="text-primary">{project.category}</SectionLabel>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-foreground/30 transition-colors duration-500 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl md:leading-[var(--text-3xl--line-height)] text-white mt-4 mb-3 leading-tight">
                    {project.name}
                  </h3>

                  <p className="font-body text-sm md:text-base md:leading-[var(--text-base--line-height)] text-foreground/60 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[11px] font-medium text-foreground/40 uppercase tracking-wider border border-white/6 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-body text-sm text-foreground/50 mt-6 transition-colors duration-500 group-hover:text-primary">
                    {projectDisplayUrl(project)}
                  </span>
                </GlassCard>
              </a>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
