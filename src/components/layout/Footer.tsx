import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS, INSTAGRAM_URL, WHATSAPP_CTA_URL } from '@/lib/constants'

// --- Iconos ---

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  )
}


const LINKEDIN_URL = 'https://www.linkedin.com/company/codetlon'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61576536284674&locale=es_LA'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-white/[0.04] pt-24 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand & Socials - Aumentamos el margen negativo (-ml-3 / -ml-4) */}
          <div className="md:col-span-2 flex flex-col items-start gap-6">
            <Link href="/" className="inline-block group">
              <Image
                src="/logos/codetlon-crema.png"
                alt="CodeTlon"
                width={140}
                height={36}
                className="w-28 md:w-36 h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Link>
            <p className="font-body text-sm text-foreground/50 leading-relaxed max-w-sm font-light text-left">
              Software Factory en Córdoba, Argentina. Combinamos diseño de vanguardia con tecnología robusta para construir el futuro digital que tu negocio merece.
            </p>
            
            <div className="flex items-center gap-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Instagram" className="text-foreground/40 hover:text-[#ffb690] transition-all duration-500">
                <InstagramIcon />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en Facebook" className="text-foreground/40 hover:text-[#ffb690] transition-all duration-500">
                <FacebookIcon />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Seguinos en LinkedIn" className="text-foreground/40 hover:text-[#ffb690] transition-all duration-500">
                <LinkedInIcon />
              </a>
              <a href={WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactanos por WhatsApp" className="text-foreground/40 hover:text-[#ffb690] transition-all duration-500">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col items-start">
            <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#ffb690]/80 mb-8">
              Navegación
            </h3>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-foreground/50 hover:text-foreground transition-colors duration-500 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-start">
            <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#ffb690]/80 mb-8">
              Contacto
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hola@codetlon.com"
                className="font-body text-sm text-foreground/50 hover:text-foreground transition-colors duration-500 w-fit underline-offset-4 hover:underline"
              >
                hola@codetlon.com
              </a>
              <a
                href="tel:+5493518922024"
                className="font-body text-sm text-foreground/50 hover:text-foreground transition-colors duration-500 w-fit"
              >
                +54 9 351 892 2024
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-body text-[10px] md:text-[11px] text-foreground/30 tracking-[0.15em] uppercase text-left w-full">
            © {currentYear} CODETLON SOFTWARE FACTORY. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>

      </div>
    </footer>
  )
}