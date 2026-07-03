'use client'

import { useEffect, useRef } from 'react'

/**
 * Campo de partículas del sistema void/cosmos — la firma visual del referente,
 * con la paleta CodeTlon. Micro-formas (triángulos, círculos, diamantes) que
 * derivan lento sobre el void y se densifican hacia el centro.
 *
 * Sin dependencias: canvas + requestAnimationFrame. Respeta prefers-reduced-motion
 * (render estático). ponytail: heurística simple; subir `count` si se quiere más densidad.
 *
 * - `count`: cantidad de partículas (hero denso ~130; capa global sutil ~55).
 * - `cluster`: si true, se agrupan hacia el centro (hero). Si false, se reparten
 *   parejo y tenue — ideal como fondo global de página.
 */

const COLORS = ['#ffb690', '#a4cddb', '#e8ddd4'] // peach, celeste, bone

type Shape = 'tri' | 'circle' | 'diamond' | 'square'

interface P {
  x: number
  y: number
  vx: number
  vy: number
  bvx: number // deriva base — a esta velocidad relaja cuando el cursor se aleja
  bvy: number
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

interface ParticleFieldProps {
  className?: string
  count?: number
  cluster?: boolean
}

export function ParticleField({ className, count = 130, cluster = true }: ParticleFieldProps) {
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
    // Cursor en coordenadas locales del canvas; lejos del lienzo = sin efecto.
    const mouse = { x: -9999, y: -9999 }
    const ATTRACT_RADIUS = 220 // gravedad: atrae partículas dentro de este radio
    const REPEL_RADIUS = 36 // muy cerca del cursor, empuja para no apilarse
    const EASE = 0.94 // qué tan rápido relaja la velocidad hacia la deriva base

    const seed = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Densidad relativa al viewport de escritorio — evita amontonamiento en mobile.
      const density = Math.min(1, (w * h) / (1440 * 800))
      const n = Math.max(24, Math.round(count * density))

      particles = Array.from({ length: n }, () => {
        // cluster: densidad gaussiana hacia el centro (cosmos del hero).
        // si no, reparto uniforme y tenue (fondo global de página).
        const cx = cluster ? (Math.random() + Math.random() + Math.random()) / 3 : Math.random()
        const cy = cluster ? (Math.random() + Math.random() + Math.random()) / 3 : Math.random()
        const bvx = (Math.random() - 0.5) * 0.15
        const bvy = (Math.random() - 0.5) * 0.15
        return {
          x: cx * w,
          y: cy * h,
          vx: bvx,
          vy: bvy,
          bvx,
          bvy,
          size: 1.5 + Math.random() * (cluster ? 3.5 : 2.5),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: (cluster ? 0.15 : 0.12) + Math.random() * (cluster ? 0.55 : 0.4),
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
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < ATTRACT_RADIUS && dist > 0.01) {
          if (dist > REPEL_RADIUS) {
            // gravedad: cuanto más cerca del radio, más tira (sin llegar a singularidad)
            const pull = 0.03 * (1 - dist / ATTRACT_RADIUS)
            p.vx += (dx / dist) * pull
            p.vy += (dy / dist) * pull
          } else {
            // demasiado cerca del cursor: empuja hacia afuera
            const push = 0.6 * (1 - dist / REPEL_RADIUS)
            p.vx -= (dx / dist) * push
            p.vy -= (dy / dist) * push
          }
        }
        // relaja hacia la deriva base — efecto resorte amortiguado, sin oscilar
        p.vx = p.bvx + (p.vx - p.bvx) * EASE
        p.vy = p.bvy + (p.vy - p.bvy) * EASE

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
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('resize', onResize)
    if (!reduced) {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
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
