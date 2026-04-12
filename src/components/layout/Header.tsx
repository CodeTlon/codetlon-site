'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
import { NAV_LINKS, INSTAGRAM_URL } from '@/lib/constants'
import { GradientButton } from '@/components/ui/GradientButton'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logos/codetlon-icon.png"
              alt="CodeTlon"
              width={36}
              height={36}
              className="rounded-full"
            />
            <Image
              src="/logos/codetlon-crema.png"
              alt="CodeTlon"
              width={110}
              height={28}
              className="hidden sm:block"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de CodeTlon"
              className="text-foreground/50 hover:text-primary transition-colors hidden sm:block"
            >
              <InstagramIcon />
            </a>
            <GradientButton href="/contacto" size="sm" className="hidden sm:inline-flex">
              Hablemos
            </GradientButton>
            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden text-foreground/70 hover:text-foreground transition-colors p-1"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="md:hidden bg-surface-low border-t border-white/8 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'font-body text-base py-1 transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/70'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-white/8">
            <GradientButton href="/contacto" size="sm" onClick={() => setMenuOpen(false)}>
              Hablemos
            </GradientButton>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de CodeTlon"
              className="text-foreground/50 hover:text-primary transition-colors"
            >
              <InstagramIcon />
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
