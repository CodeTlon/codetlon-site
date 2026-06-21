import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Condiciones de uso del sitio web de CodeTlon Software Factory.',
  alternates: { canonical: 'https://codetlon.com/terminos' },
  robots: { index: true, follow: true },
}

const ACTUALIZADO = '21 de junio de 2026'

export default function TerminosPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Términos y Condiciones</h1>
      <p className="font-body text-sm text-foreground/50 mb-12">Última actualización: {ACTUALIZADO}</p>

      <div className="font-body text-foreground/75 leading-relaxed space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mb-3 [&_a]:text-[#ffb690] [&_a]:underline [&_a]:underline-offset-4">
        <section>
          <h2>Aceptación</h2>
          <p>
            Al usar este sitio aceptás estos términos. Si no estás de acuerdo, te pedimos que no lo
            utilices. El sitio es operado por CodeTlon Software Factory, Córdoba, Argentina.
          </p>
        </section>

        <section>
          <h2>Uso del sitio</h2>
          <p>
            El contenido de codetlon.com es informativo y promocional sobre nuestros servicios. Te
            comprometés a usarlo de buena fe, sin intentar dañar, sobrecargar o acceder de forma no
            autorizada a sus sistemas.
          </p>
        </section>

        <section>
          <h2>Propiedad intelectual</h2>
          <p>
            Los textos, el diseño, los logotipos y demás materiales del sitio son propiedad de
            CodeTlon, salvo que se indique lo contrario. No podés reproducirlos ni reutilizarlos sin
            autorización previa.
          </p>
        </section>

        <section>
          <h2>Formulario de contacto</h2>
          <p>
            Los datos que envíes por el formulario se tratan según nuestra{' '}
            <a href="/privacidad">Política de Privacidad</a>. Enviar una consulta no genera ninguna
            obligación contractual; cualquier propuesta o presupuesto se acuerda por separado.
          </p>
        </section>

        <section>
          <h2>Limitación de responsabilidad</h2>
          <p>
            El sitio se ofrece &ldquo;tal cual&rdquo;. Hacemos lo razonable por mantenerlo disponible y
            actualizado, pero no garantizamos ausencia de errores ni continuidad ininterrumpida del
            servicio.
          </p>
        </section>

        <section>
          <h2>Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia se
            someterá a los tribunales ordinarios de la ciudad de Córdoba.
          </p>
        </section>

        <section>
          <h2>Contacto</h2>
          <p>
            Ante cualquier duda escribinos a <a href="mailto:info@codetlon.com.ar">info@codetlon.com.ar</a>.
          </p>
        </section>
      </div>
    </article>
  )
}
