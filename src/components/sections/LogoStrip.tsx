import { AnimateIn } from '@/components/ui/AnimateIn'

const techs = [
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'Vercel',
  'n8n',
  'Playwright',
  'Resend',
]

export function LogoStrip() {
  return (
    <section className="bg-gradient-to-b from-background to-[#050505] pb-24 pt-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn variant="fade">
          <div className="border-t border-white/[0.04] pt-12 flex flex-col md:flex-row md:items-baseline gap-8 md:gap-16">
            <span className="font-body text-xs font-semibold text-foreground/30 uppercase tracking-[0.2em] shrink-0">
              Stack Curado
            </span>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="font-display text-xl sm:text-2xl italic text-foreground/30 hover:text-[#ffb690] transition-colors duration-500 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
