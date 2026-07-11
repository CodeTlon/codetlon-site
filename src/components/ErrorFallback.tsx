'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ErrorFallbackProps {
  reset: () => void
  title?: string
  message?: string
}

// Fallback de error de marca — logo + peach como único acento, mismo tono
// que Header/Footer. Usado por cada error.tsx de segmento (dentro del layout,
// con Header/Footer ya presentes). No usar en global-error.tsx: ese reemplaza
// el <html> entero y no puede depender de este árbol.
export function ErrorFallback({ reset, title = 'Algo salió mal', message }: ErrorFallbackProps) {
  return (
    <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/logos/codetlon-crema.png"
        alt="CodeTlon"
        width={140}
        height={36}
        className="mb-10 h-auto w-28 opacity-90 sm:w-32"
      />
      <h1 className="font-display display-thin text-3xl text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="font-body mt-4 mb-10 max-w-md leading-relaxed text-foreground/65">
        {message ?? 'Ocurrió un error inesperado. Podés reintentar o volver al inicio.'}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="font-body rounded-full bg-[#ffb690] px-6 py-3 text-sm font-medium text-[#0e1516] transition-opacity duration-500 hover:opacity-90"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="font-body rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors duration-500 hover:text-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
