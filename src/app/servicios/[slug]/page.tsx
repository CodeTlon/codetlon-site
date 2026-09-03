import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, getServiceBySlug, getRelatedServices } from '@/lib/services-data'
import { PageHero } from '@/components/sections/PageHero'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { GradientButton } from '@/components/ui/GradientButton'
import { TLDRBox } from '@/components/ui/TLDRBox'
import { ShareButton } from '@/components/ui/ShareButton'
import { JsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    return services.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.name} a medida — ${service.level} | CodeTlon`,
    description: service.shortDescription,
    alternates: { canonical: `https://codetlon.com/servicios/${service.slug}` },
  }
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const related = getRelatedServices(params.slug)

  // TL:DR data-driven — no requiere copy manual por servicio, se arma desde services-data.ts.
  const tldrPoints = [
    service.problemStatement,
    `Incluye ${service.whatYouGet.length} entregables: desde ${service.whatYouGet[0]?.toLowerCase()} hasta ${service.whatYouGet[service.whatYouGet.length - 1]?.toLowerCase()}.`,
    `Stack: ${service.techStack.slice(0, 4).join(', ')}.`,
    `Proceso en ${service.timeline.length} etapas, nivel ${service.level} de nuestro catálogo de servicios.`,
  ]

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
        title={service.name}
        subtitle={service.shortDescription}
      />

      {/* TL:DR — puntos clave arriba del contenido largo, seguido de CTA inmediata */}
      <section className="pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-3xl">
            <TLDRBox points={tldrPoints} />
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <GradientButton href={`/contacto?servicio=${service.slug}`}>
                Consultar por este servicio
              </GradientButton>
              <ShareButton
                title={`${service.name} | CodeTlon`}
                text={service.shortDescription}
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Descripción + Para quién */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/[0.04] pt-16">
            <AnimateIn>
              <h2 className="font-body text-xs font-medium text-foreground/30 uppercase tracking-[0.2em] block mb-6">
                Descripción
              </h2>
              <p className="font-body text-lg text-foreground/60 leading-relaxed font-light">
                {service.longDescription}
              </p>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="font-body text-xs font-medium text-foreground/30 uppercase tracking-[0.2em] block mb-6">
                Para quién es
              </h2>
              <p className="font-body text-base text-foreground/70 leading-relaxed font-light mb-8">
                {service.problemStatement}
              </p>
              <GradientButton href={`/contacto?servicio=${service.slug}`}>
                Consultar por este servicio
              </GradientButton>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <h2 className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Qué incluye
              </h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-3xl border-t border-white/[0.04]">
            {service.whatYouGet.map((item, i) => (
              <AnimateIn key={item} delay={i * 40}>
                <div className="flex items-start gap-4 py-5 border-b border-white/[0.04]">
                  <span className="text-[#ffb690]/40 mt-0.5 shrink-0 text-sm">—</span>
                  <span className="font-body text-sm text-foreground/60 leading-relaxed">
                    {item}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          <AnimateIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <h2 className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Stack técnico
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-display italic text-xl text-foreground/40 hover:text-[#ffb690] transition-colors duration-500 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <h2 className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Proceso
              </h2>
            </div>
            <div className="border-t border-white/[0.04]">
              {service.timeline.map((t, i) => (
                <div key={t.step} className="flex items-start gap-6 py-5 border-b border-white/[0.04]">
                  <span className="font-display italic text-2xl text-[#ffb690]/30 shrink-0 leading-none mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground/70">{t.step}</p>
                    <p className="font-body text-xs text-foreground/30 mt-1">{t.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/proceso"
              className="group inline-flex items-center gap-2 mt-6 font-body text-sm text-foreground/50 hover:text-[#ffb690] transition-colors duration-500"
            >
              Ver el FOS Method completo
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </AnimateIn>

        </div>
      </section>

      <EvolucionContinua />

      {/* Servicios relacionados */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-[1px] bg-[#ffb690]/40" />
                <h2 className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                  También podrías necesitar
                </h2>
              </div>
            </AnimateIn>
            <div className="border-t border-white/[0.04]">
              {related.map((r, i) => (
                <AnimateIn key={r.slug} delay={i * 60}>
                  <Link
                    href={`/servicios/${r.slug}`}
                    className="group flex items-center justify-between py-7 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-body text-xs text-[#ffb690]/40 group-hover:text-[#ffb690] transition-colors duration-500 uppercase tracking-[0.15em]">
                        {r.level}
                      </span>
                      <span className="font-display text-xl text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                        {r.name}
                      </span>
                    </div>
                    <span className="text-foreground/20 group-hover:text-[#ffb690] group-hover:translate-x-1 transition-all duration-500 text-sm">
                      →
                    </span>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline={`¿Necesitás un ${service.name}?`}
        ctaLabel="Hablemos de tu proyecto"
        ctaHref={`/contacto?servicio=${service.slug}`}
      />
    </>
  )
}
