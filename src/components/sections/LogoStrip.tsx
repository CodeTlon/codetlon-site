import { SectionLabel } from '@/components/ui/SectionLabel'

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
    <section className="bg-surface-low border-y border-white/8 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <SectionLabel className="shrink-0">Stack curado</SectionLabel>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="font-body text-sm font-medium text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
