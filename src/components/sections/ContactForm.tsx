'use client'

// Bug #4: useFormState de react-dom (Next.js 14, NO useActionState de react)
import { useFormState, useFormStatus } from 'react-dom'
import { sendContact } from '@/app/actions/contact'
import { services } from '@/lib/services-data'
import { Send, CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 gradient-cta text-[#552100] font-body font-semibold px-6 py-3 rounded-full disabled:opacity-50 transition-opacity hover:opacity-90"
    >
      <Send size={16} />
      {pending ? 'Enviando...' : 'Enviar mensaje'}
    </button>
  )
}

function ServiceSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <select
      name="serviceInterest"
      defaultValue={defaultValue ?? ''}
      className="w-full bg-surface-highest border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
    >
      <option value="">¿Qué tipo de proyecto tenés en mente?</option>
      {services.map((s) => (
        <option key={s.slug} value={s.slug}>
          {s.level} — {s.name}
        </option>
      ))}
      <option value="no-se">No sé / Necesito asesoramiento</option>
    </select>
  )
}

function ContactFormInner() {
  const [state, action] = useFormState(sendContact, null)
  const searchParams = useSearchParams()
  const servicioParam = searchParams.get('servicio') ?? undefined

  if (state?.success) {
    return (
      <div
        data-testid="success-message"
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <CheckCircle2 size={48} className="text-primary" />
        <h3 className="font-display text-2xl text-foreground">¡Mensaje recibido!</h3>
        <p className="font-body text-foreground/55 max-w-sm">
          Te respondemos en menos de 48hs.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="sourcePage" value={typeof window !== 'undefined' ? window.location.pathname : '/contacto'} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-1.5 block">
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Tu nombre"
            className="w-full bg-surface-highest border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-1.5 block">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className="w-full bg-surface-highest border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-1.5 block">
          Empresa <span className="text-foreground/20">(opcional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Nombre de tu empresa"
          className="w-full bg-surface-highest border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
        />
      </div>

      <div>
        <label className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-1.5 block">
          Tipo de proyecto
        </label>
        <ServiceSelect defaultValue={servicioParam} />
      </div>

      <div>
        <label htmlFor="message" className="font-body text-xs text-foreground/40 uppercase tracking-wider mb-1.5 block">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Contanos de tu proyecto..."
          className="w-full bg-surface-highest border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
        />
      </div>

      {state?.error && (
        <p className="font-body text-sm text-red-400">{state.error}</p>
      )}

      <div className="flex items-center justify-between gap-4">
        <SubmitButton />
        <p className="font-body text-xs text-foreground/30">
          * Campos obligatorios
        </p>
      </div>
    </form>
  )
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-surface-container rounded-2xl" />}>
      <ContactFormInner />
    </Suspense>
  )
}
