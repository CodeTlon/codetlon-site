'use client'

// Reemplaza el <html>/<body> entero cuando el root layout falla — por eso
// NO puede depender de Header/Footer/ErrorFallback (viven en el árbol que
// acaba de romperse). Estilos inline, sin next/image, mismo void/cosmos
// (fondo #0a0f10, texto #e8ddd4, peach #ffb690) a mano.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#0a0f10',
          color: '#e8ddd4',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/codetlon-crema.png"
          alt="CodeTlon"
          width={140}
          height={36}
          style={{ height: 'auto', width: '140px', opacity: 0.9 }}
        />
        <h1 style={{ fontSize: '1.75rem', fontWeight: 300, margin: 0 }}>Algo salió mal</h1>
        <p style={{ maxWidth: '28rem', opacity: 0.65, lineHeight: 1.6, margin: 0 }}>
          Ocurrió un error inesperado a nivel de la aplicación. Podés reintentar.
        </p>
        <button
          onClick={reset}
          style={{
            borderRadius: '9999px',
            backgroundColor: '#ffb690',
            color: '#0e1516',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  )
}
