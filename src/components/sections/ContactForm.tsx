'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sendContact } from '@/app/actions/contact'

const PROJECT_TYPES = [
  'Web Institucional',
  'Plataforma / App Web',
  'E-commerce',
  'MVP / Startup',
  'Aún no lo sé'
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex items-center justify-between gap-8 px-8 py-5 bg-[#ffb690] text-[#0e1516] overflow-hidden w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
      <span className="relative z-10 font-body text-[13px] font-bold uppercase tracking-[0.25em]">
        {pending ? 'Enviando...' : 'Enviar propuesta'}
      </span>
    </button>
  )
}

export function ContactForm() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [state, formAction] = useFormState(sendContact, null)

  if (state?.success) {
    return (
      <div className="flex flex-col items-start justify-center p-12 border border-white/10 bg-white/[0.02]">
        <div className="w-12 h-12 rounded-full bg-[#ffb690]/10 flex items-center justify-center mb-6 border border-[#ffb690]/30">
          <CheckCircle2 className="w-6 h-6 text-[#ffb690]" />
        </div>
        <h3 className="font-display text-3xl text-foreground mb-4">Mensaje enviado.</h3>
        <p className="font-body text-base text-foreground/50 font-light text-pretty">
          Recibimos los detalles de tu proyecto. En menos de 48 horas uno de nuestros expertos se va a contactar con vos.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <input type="hidden" name="serviceInterest" value={selectedType} />

      {/* 1. Selección de Idea General */}
      <div className="flex flex-col gap-4">
        <label className="font-body text-xs font-bold text-[#ffb690]/70 uppercase tracking-[0.2em]">
          1. ¿Qué tenés en mente?
        </label>
        <div className="flex flex-wrap gap-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={cn(
                'px-5 py-3 font-body text-sm transition-all duration-300 border',
                selectedType === type
                  ? 'bg-[#ffb690] text-[#0e1516] border-[#ffb690] font-medium'
                  : 'bg-white/[0.02] text-foreground/50 border-white/10 hover:border-[#ffb690]/50 hover:text-foreground'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 w-full" />

      {/* 2. Datos y Detalles */}
      <div className="flex flex-col gap-6">
        <label className="font-body text-xs font-bold text-[#ffb690]/70 uppercase tracking-[0.2em]">
          2. Detalles del proyecto
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#ffb690]/50 focus:bg-white/[0.04] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Tu email"
              className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#ffb690]/50 focus:bg-white/[0.04] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Contanos sobre tu proyecto. ¿Cuál es el objetivo? ¿Tenés referencias? Mientras más detalles, mejor."
            className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#ffb690]/50 focus:bg-white/[0.04] transition-colors resize-none"
          />
        </div>
      </div>

      {state?.error && (
        <p className="font-body text-sm text-red-400">{state.error}</p>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <SubmitButton />
      </div>
    </form>
  )
}