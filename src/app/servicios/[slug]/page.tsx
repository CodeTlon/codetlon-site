import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, getServiceBySlug, getRelatedServices } from '@/lib/services-data'
import { PageHero } from '@/components/sections/PageHero'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { GradientButton } from '@/components/ui/GradientButton'
import { JsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'

// Bug #24: try/catch en generateStaticParams
export async function generateStaticParams() {
  try {
    return services.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.name} | CodeTlon — ${service.level}`,
    description: service.shortDescription,
    alternates: { canonical: `https://codetlon.com/servicios/${service.slug}` },
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const related = getRelatedServices(params.slug)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'CodeTlon Software Factory',
      url: 'https://codetlon.com',
    },
    url: `https://codetlon.com/servicios/${service.slug}`,
    areaServed: { '@type': 'Country', name: 'Argentina' },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero
        badge={`Nivel ${service.level}`}
        title={service.name}
        subtitle={service.shortDescription}
      />

      {/* Descripción + Para quién */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-4">
              Descripción
            </p>
            <p className="font-body text-foreground/70 leading-relaxed text-lg">
              {service.longDescription}
            </p>
          </div>
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-4">
              Para quién es
            </p>
            <p className="font-body text-foreground/70 leading-relaxed">{service.problemStatement}</p>
            <GradientButton
              href={`/contacto?servicio=${service.slug}`}
              className="mt-6"
            >
              Consultar por este servicio
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 bg-surface-low border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-foreground mb-8">Qué incluye</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {service.whatYouGet.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="font-body text-sm text-foreground/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + Timeline */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl text-foreground mb-6">Stack técnico</h2>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-body text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground mb-6">Proceso</h2>
            <ol className="flex flex-col gap-4">
              {service.timeline.map((t, i) => (
                <li key={t.step} className="flex items-start gap-4">
                  <span className="font-display text-3xl font-bold text-primary/20 leading-none w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{t.step}</p>
                    <p className="font-body text-xs text-foreground/40">{t.duration}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <EvolucionContinua />

      {/* Servicios relacionados */}
      {related.length > 0 && (
        <section className="py-16 bg-surface-low border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-foreground mb-8">También podrías necesitar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/servicios/${r.slug}`}
                  className="group flex items-center justify-between bg-surface-container rounded-xl px-5 py-4 border border-white/6 hover:border-primary/30 transition-all"
                >
                  <div>
                    <span className="font-body text-xs font-bold text-primary uppercase tracking-wider">
                      {r.level}
                    </span>
                    <p className="font-body text-sm text-foreground mt-0.5">{r.name}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline={`¿Necesitás un ${service.name}?`}
        primaryLabel="Hablemos de tu proyecto"
        primaryHref={`/contacto?servicio=${service.slug}`}
      />
    </>
  )
}
