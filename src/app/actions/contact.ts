'use server'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { contactSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

// service_role para bypassear RLS en insert
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
)

// Bug #5: prevState OBLIGATORIO como primer parámetro
export async function sendContact(prevState: unknown, formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    serviceInterest: formData.get('serviceInterest') || undefined,
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { error: 'Datos inválidos. Revisá los campos.' }
  }

  const { name, email, company, serviceInterest, message } = parsed.data

  // Guardar en DB primero — si el email falla, el lead no se pierde
  const { error: dbError } = await supabase.from('contact_leads').insert({
    name,
    email,
    company,
    service_interest: serviceInterest,
    message,
    source_page: formData.get('sourcePage') as string | null,
  })
  if (dbError) console.error('DB error:', dbError)

  // Email al equipo
  const { error: emailError } = await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME ?? 'CodeTlon'} <${process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'}>`,
    to: process.env.COMPANY_EMAIL ?? 'hola@codetlon.com',
    replyTo: email,
    subject: `Nuevo lead: ${name}${serviceInterest ? ` — ${serviceInterest}` : ''}`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#0e1516;color:#e8ddd4;padding:32px;border-radius:12px;max-width:560px">
        <h2 style="font-size:24px;color:#ffb690;margin:0 0 24px">Nuevo mensaje desde codetlon.com</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#8a9b9c;font-size:14px">Nombre</td><td style="padding:8px 0;font-size:14px">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#8a9b9c;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#ffb690">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 0;color:#8a9b9c;font-size:14px">Empresa</td><td style="padding:8px 0;font-size:14px">${company}</td></tr>` : ''}
          ${serviceInterest ? `<tr><td style="padding:8px 0;color:#8a9b9c;font-size:14px">Servicio</td><td style="padding:8px 0;font-size:14px">${serviceInterest}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px;padding:16px;background:#1a2122;border-radius:8px;font-size:14px;line-height:1.6">
          ${message}
        </div>
        <p style="margin-top:24px;font-size:12px;color:#4a5556">CodeTlon Software Factory — codetlon.com</p>
      </div>
    `,
  })

  if (emailError) {
    console.error('Email error:', emailError)
    return { success: true, warning: 'Mensaje guardado pero el email puede demorar.' }
  }

  // Confirmación al cliente
  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME ?? 'CodeTlon'} <${process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'}>`,
    to: email,
    subject: 'Recibimos tu consulta — CodeTlon',
    html: `
      <div style="font-family:Inter,sans-serif;background:#0e1516;color:#e8ddd4;padding:32px;border-radius:12px;max-width:560px">
        <h2 style="font-size:24px;color:#ffb690;margin:0 0 16px">Hola ${name}!</h2>
        <p style="font-size:16px;line-height:1.6;color:#e8ddd4">Recibimos tu mensaje. Lo revisamos y te respondemos en menos de 48hs.</p>
        ${serviceInterest ? `<p style="font-size:14px;color:#8a9b9c;margin-top:12px">Servicio consultado: <strong style="color:#a4cddb">${serviceInterest}</strong></p>` : ''}
        <div style="margin-top:32px;padding:16px;background:#1a2122;border-radius:8px">
          <p style="font-size:13px;color:#8a9b9c;margin:0 0 8px">Mientras tanto, podés conocernos en:</p>
          <a href="https://www.instagram.com/codetlon/" style="color:#ffb690;font-size:13px">@codetlon en Instagram →</a>
        </div>
        <p style="margin-top:24px;font-size:12px;color:#4a5556">CodeTlon Software Factory · Córdoba, Argentina</p>
      </div>
    `,
  }).catch((err) => console.error('Confirmation email error:', err))

  return { success: true }
}
