'use client'

import { useEffect, useRef } from 'react'

/**
 * Campo de partículas del sistema void/cosmos — la firma visual del referente,
 * con la paleta CodeTlon. Micro-formas (triángulos, círculos, diamantes) que
 * derivan lento sobre el void y se densifican hacia el centro.
 *
 * Sin dependencias: canvas + requestAnimationFrame. Respeta prefers-reduced-motion
 * (render estático). ponytail: heurística simple; subir COUNT si se quiere más densidad.
 */

const COLORS = ['#ffb690', '#a4cddb', '#e8ddd4'] // peach, celeste, bone
const COUNT = 130

type Shape = 'tri' | 'circle' | 'diamond' | 'square'

interface P {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  shape: Shape
}

function drawShape(ctx: CanvasRenderingContext2D, p: P) {
  ctx.fillStyle = p.color
  ctx.globalAlpha = p.alpha
  const s = p.size
  switch (p.shape) {
    case 'circle':
      ctx.beginPath()
      ctx.arc(p.x, p.y, s / 2, 0, Math.PI * 2)
      ctx.fill()
      break
    case 'diamond':
      ctx.beginPath()
      ctx.moveTo(p.x, p.y - s)
      ctx.lineTo(p.x + s, p.y)
      ctx.lineTo(p.x, p.y + s)
      ctx.lineTo(p.x - s, p.y)
      ctx.closePath()
      ctx.fill()
      break
    case 'tri':
      ctx.beginPath()
      ctx.moveTo(p.x, p.y - s)
      ctx.lineTo(p.x + s, p.y + s)
      ctx.lineTo(p.x - s, p.y + s)
      ctx.closePath()
      ctx.fill()
      break
    default:
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
  }
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shapes: Shape[] = ['tri', 'circle', 'diamond', 'square']
    let particles: P[] = []
    let w = 0
    let h = 0
    let raf = 0

    const seed = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles = Array.from({ length: COUNT }, () => {
        // Densidad gaussiana hacia el centro: el cosmos se agrupa, no se reparte parejo.
        const cx = (Math.random() + Math.random() + Math.random()) / 3
        const cy = (Math.random() + Math.random() + Math.random()) / 3
        return {
          x: cx * w,
          y: cy * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: 1.5 + Math.random() * 3.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.15 + Math.random() * 0.55,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        }
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) drawShape(ctx, p)
      ctx.globalAlpha = 1
    }

    const tick = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    seed()
    if (reduced) {
      render()
    } else {
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      seed()
      if (reduced) render()
      else raf = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
