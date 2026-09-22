'use client'

import { useEffect, useState } from 'react'
import { Share2, Check, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  text?: string
  /** URL absoluta a compartir. Si se omite, usa window.location.href */
  url?: string
  className?: string
}

// Web Share API (móvil / navegadores compatibles) con fallback a copiar el link.
export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  // Se resuelve post-mount para evitar mismatch de hidratación (SSR no conoce navigator.share).
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
        return
      } catch {
        // Usuario canceló el share sheet — no hacer nada.
        return
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard no disponible — silencioso, no rompe la UI.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 transition-all duration-300',
        'hover:text-[#ffb690] hover:border-[#ffb690]/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50',
        className
      )}
      aria-label={copied ? 'Link copiado' : 'Compartir'}
    >
      {copied ? (
        <>
          <Check size={14} className="text-[#ffb690]" />
          Link copiado
        </>
      ) : (
        <>
          {canNativeShare ? (
            <Share2 size={14} className="transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <Link2 size={14} className="transition-transform duration-300 group-hover:scale-110" />
          )}
          Compartir
        </>
      )}
    </button>
  )
}
