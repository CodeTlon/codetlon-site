'use client'

import { useEffect, useRef } from 'react'

/**
 * Campo de partículas del sistema void/cosmos — la firma visual del referente,
 * con la paleta CodeTlon. Estrellas (mayoría) + micro-formas geométricas de acento,
 * con profundidad (parallax), parpadeo y brillo — efecto espacio profundo real.
 *
 * Sin dependencias: canvas + requestAnimationFrame. Respeta prefers-reduced-motion
 * (render estático). ponytail: heurística simple; subir `count` si se quiere más densidad.
 *
 * - `count`: cantidad de partículas (hero denso ~130; capa global sutil 220,
 *   repartidas sobre la altura completa del documento — no solo el viewport).
 * - `cluster`: si true, se agrupan hacia el centro (hero). Si false, se reparten
 *   parejo y tenue — ideal como fondo global de página.
 * - `depth`: 0..1, simula distancia — más cerca = más grande, brilla más, deriva
 *   más rápido y reacciona más al cursor (parallax).
 */

const COLORS = ['#ffb690', '#a4cddb', '#e8ddd4'] // peach, celeste, bone
// Mayoría estrellas (círculo) para que lea como espacio; formas geométricas como acento.
const SHAPES: Shape[] = ['circle', 'circle', 'circle', 'circle', 'tri', 'diamond', 'square']

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
  maxAlpha: number // objetivo al que el alpha actual converge (fade-in tras un respawn)
  shape: Shape
  depth: number // 0..1 — parallax: distancia simulada
  twinkleSpeed: number
  twinklePhase: number
}

function drawShape(ctx: CanvasRenderingContext2D, p: P, alpha: number) {
  ctx.fillStyle = p.color
  ctx.globalAlpha = alpha
  const s = p.size
  switch (p.shape) {
    case 'circle':
      // Brillo en las estrellas más cercanas: un halo grande y tenue debajo,
      // sin shadowBlur (evita el costo de la pasada de blur en canvas 2D).
      if (p.depth > 0.6) {
        ctx.globalAlpha = alpha * 0.35
        ctx.beginPath()
        ctx.arc(p.x, p.y, s * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = alpha
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
    let particles: P[] = []
    let w = 0
    let h = 0
    let raf = 0
    // Cursor en coordenadas locales del canvas; lejos del lienzo = sin efecto.
    const mouse = { x: -9999, y: -9999 }
    const ATTRACT_RADIUS = 320 // gravedad: atrae partículas dentro de este radio
    const REPEL_RADIUS = 60 // muy cerca del cursor, empuja para no apilarse
    const EASE = 0.9 // qué tan rápido relaja la velocidad hacia la deriva base
    const RESPAWN_MS = 200 // cada cuánto se reciclan partículas a posiciones nuevas
    const RESPAWN_FRACTION = 0.015 // % del total reciclado por tick — da sensación de campo vivo

    const randomAlpha = () => (cluster ? 0.15 : 0.12) + Math.random() * (cluster ? 0.55 : 0.4)

    const seed = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Densidad relativa al viewport de escritorio (1440x800), sin techo relativo
      // a `count` — una página de 6000px necesita ~7x las partículas para verse
      // igual de pobladas que un solo viewport. Solo un tope absoluto por perf.
      const density = (w * h) / (1440 * 800)
      const n = Math.max(24, Math.min(Math.round(count * density), 1400))

      particles = Array.from({ length: n }, () => {
        // cluster: densidad gaussiana hacia el centro (cosmos del hero).
        // si no, reparto uniforme y tenue (fondo global de página).
        const cx = cluster ? (Math.random() + Math.random() + Math.random()) / 3 : Math.random()
        const cy = cluster ? (Math.random() + Math.random() + Math.random()) / 3 : Math.random()
        const depth = 0.25 + Math.random() * 0.75
        const bvx = (Math.random() - 0.5) * 0.15 * depth
        const bvy = (Math.random() - 0.5) * 0.15 * depth
        const maxAlpha = randomAlpha()
        return {
          x: cx * w,
          y: cy * h,
          vx: bvx,
          vy: bvy,
          bvx,
          bvy,
          size: (1 + Math.random() * (cluster ? 3.5 : 2.5)) * (0.45 + 0.55 * depth),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: maxAlpha,
          maxAlpha,
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          depth,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
        }
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      const t = performance.now() * 0.002
      for (const p of particles) {
        // parpadeo: oscila entre ~65% y 100% del brillo objetivo — vivo, no plano
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * p.twinkleSpeed + p.twinklePhase)
        drawShape(ctx, p, p.alpha * twinkle)
      }
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
            // las partículas "más cerca" (depth alto) reaccionan más — parallax,
            // pero incluso las lejanas se mueven algo (0.5 piso) para que se note.
            const pull = 0.09 * (1 - dist / ATTRACT_RADIUS) * (0.5 + 0.5 * p.depth)
            p.vx += (dx / dist) * pull
            p.vy += (dy / dist) * pull
          } else {
            // demasiado cerca del cursor: empuja hacia afuera
            const push = 1.1 * (1 - dist / REPEL_RADIUS) * (0.5 + 0.5 * p.depth)
            p.vx -= (dx / dist) * push
            p.vy -= (dy / dist) * push
          }
        }
        // relaja hacia la deriva base — efecto resorte amortiguado, sin oscilar
        p.vx = p.bvx + (p.vx - p.bvx) * EASE
        p.vy = p.bvy + (p.vy - p.bvy) * EASE

        // fade-in tras un respawn (o el valor ya está en su objetivo — no-op)
        p.alpha += (p.maxAlpha - p.alpha) * 0.06

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
      if (canvas.getBoundingClientRect().width === w && canvas.getBoundingClientRect().height === h) return
      cancelAnimationFrame(raf)
      seed()
      if (reduced) render()
      else raf = requestAnimationFrame(tick)
    }
    // Observa el propio canvas (no solo window) — así también reacciona cuando
    // el documento crece/encoge por contenido (imágenes, fuentes), no solo por resize.
    const ro = new ResizeObserver(onResize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    if (!reduced) {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseleave', onLeave)
    }

    // Pestaña en background: corta el rAF — cada página del sitio corre este
    // loop, no tiene sentido gastar CPU/batería si no se está viendo.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Recicla un puñado de partículas a posiciones nuevas cada tanto — el
    // campo se siente vivo en vez de una foto fija, aun sin mover el cursor.
    let respawnTimer = 0
    if (!reduced) {
      respawnTimer = window.setInterval(() => {
        const batch = Math.max(1, Math.round(particles.length * RESPAWN_FRACTION))
        for (let i = 0; i < batch; i++) {
          const p = particles[Math.floor(Math.random() * particles.length)]
          const depth = 0.25 + Math.random() * 0.75
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.depth = depth
          p.size = (1 + Math.random() * (cluster ? 3.5 : 2.5)) * (0.45 + 0.55 * depth)
          p.bvx = (Math.random() - 0.5) * 0.15 * depth
          p.bvy = (Math.random() - 0.5) * 0.15 * depth
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)]
          p.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
          p.twinkleSpeed = 0.5 + Math.random() * 1.5
          p.twinklePhase = Math.random() * Math.PI * 2
          p.maxAlpha = randomAlpha()
          p.alpha = 0
        }
      }, RESPAWN_MS)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.clearInterval(respawnTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
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
