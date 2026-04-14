'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-background/90 backdrop-blur-md py-4 border-b border-white/[0.04] shadow-sm' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Aumentamos el margen negativo para contrarrestar el espacio transparente del PNG */}
          <Link href="/" className="flex items-center shrink-0 group z-10 -ml-3 md:-ml-4">
            <Image
              src="/logos/codetlon-crema.png"
              alt="CodeTlon"
              width={160}
              height={40}
              className="w-32 sm:w-36 md:w-40 h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500 object-left"
              priority 
            />
          </Link>

          {/* Contenedor derecho: Nav + Botón Mobile */}
          <div className="flex items-center gap-8 z-10">
            
            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-body text-sm font-medium capitalize transition-colors duration-500',
                    pathname === link.href ? 'text-[#ffb690]' : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden text-foreground/70 hover:text-[#ffb690] transition-colors p-1"
            >
              {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
            
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-xl',
          menuOpen ? 'max-h-screen border-t border-white/[0.04] py-8' : 'max-h-0 py-0'
        )}
      >
        <nav className="flex flex-col gap-6 px-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'font-display text-xl capitalize transition-colors duration-500',
                pathname === link.href ? 'text-[#ffb690] italic' : 'text-foreground/60 hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}