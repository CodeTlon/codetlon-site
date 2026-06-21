import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Cómo CodeTlon recopila, usa y protege tus datos personales y qué cookies utiliza el sitio.',
  alternates: { canonical: 'https://codetlon.com/privacidad' },
  robots: { index: true, follow: true },
}

const ACTUALIZADO = '21 de junio de 2026'

export default function PrivacidadPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Política de Privacidad</h1>
      <p className="font-body text-sm text-foreground/50 mb-12">Última actualización: {ACTUALIZADO}</p>

      <div className="font-body text-foreground/75 leading-relaxed space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mb-3 [&_a]:text-[#ffb690] [&_a]:underline [&_a]:underline-offset-4">
        <section>
          <h2>Responsable</h2>
          <p>
            Este sitio es operado por CodeTlon Software Factory, con sede en Córdoba, Argentina. Para
            cualquier consulta sobre tus datos personales podés escribirnos a{' '}
            <a href="mailto:info@codetlon.com.ar">info@codetlon.com.ar</a>.
          </p>
        </section>

        <section>
          <h2>Qué datos recopilamos</h2>
          <p>
            Solo recopilamos los datos que nos envías voluntariamente a través del formulario de
            contacto: nombre, email y el mensaje que escribís. No almacenamos esos datos en una base
            propia: se transmiten por email mediante el servicio de envío Resend para que podamos
            responderte.
          </p>
        </section>

        <section>
          <h2>Para qué los usamos</h2>
          <p>
            Únicamente para responder tu consulta y darte seguimiento comercial. No vendemos ni
            cedemos tus datos a terceros, salvo obligación legal.
          </p>
        </section>

        <section>
          <h2>Cookies y analítica</h2>
          <p>
            Usamos cookies analíticas de Google Analytics 4 para entender de forma anónima y agregada
            cómo se usa el sitio y mejorarlo. Estas cookies <strong>no se activan hasta que las
            aceptás</strong> en el banner de consentimiento (Consent Mode v2): por defecto el rastreo
            está deshabilitado. Podés rechazarlas y el sitio funciona igual. Para borrar o revocar tu
            elección, limpiá las cookies del navegador.
          </p>
        </section>

        <section>
          <h2>Tus derechos</h2>
          <p>
            Conforme a la Ley 25.326 de Protección de los Datos Personales (Argentina), podés ejercer
            tus derechos de acceso, rectificación, actualización y supresión de tus datos
            escribiéndonos a <a href="mailto:info@codetlon.com.ar">info@codetlon.com.ar</a>. La
            Agencia de Acceso a la Información Pública es la autoridad de control.
          </p>
        </section>

        <section>
          <h2>Cambios</h2>
          <p>
            Podemos actualizar esta política. Publicaremos siempre la versión vigente en esta misma
            página con su fecha de actualización.
          </p>
        </section>
      </div>
    </article>
  )
}
