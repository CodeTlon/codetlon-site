'use server'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { contactSchema } from '@/lib/validations/contact'

// service_role para bypassear RLS en insert
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
)

// Bug #5: prevState OBLIGATORIO como primer parámetro
export async function sendContact(prevState: unknown, formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY)
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
    to: process.env.NOTIFICATIONS_EMAIL ?? 'hola@codetlon.com',
    replyTo: email,
    subject: `🟠 Nuevo lead: ${name}${serviceInterest ? ` · ${serviceInterest}` : ''}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f10;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f10;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <tr>
          <td style="background:#0e1516;border:1px solid #1e2d2e;border-bottom:none;padding:28px 36px 20px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="https://i.ibb.co/PZrqYfxx/codetlon-blanco.png" alt="CodeTlon" height="20" style="display:block;height:20px;width:auto">
                </td>
                <td align="right">
                  <span style="display:inline-block;background:#ffb690;color:#0e1516;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:4px 10px">Nuevo Lead</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px 28px">
            <h1 style="margin:0;font-size:28px;font-weight:700;color:#e8ddd4;letter-spacing:-0.02em">${name}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:#8a9b9c">
              <a href="mailto:${email}" style="color:#a4cddb;text-decoration:none">${email}</a>
              ${company ? `<span style="color:#4a5556;margin:0 6px">·</span><span>${company}</span>` : ''}
            </p>
          </td>
        </tr>

        ${serviceInterest ? `
        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px 24px">
            <span style="display:inline-block;border:1px solid #ffb690;color:#ffb690;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:5px 12px">${serviceInterest}</span>
          </td>
        </tr>` : ''}

        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px">
            <div style="height:1px;background:#1e2d2e"></div>
          </td>
        </tr>

        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:24px 36px 32px">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4a5556">Mensaje</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#c8bdb4;white-space:pre-wrap">${message}</p>
          </td>
        </tr>

        <tr>
          <td style="background:#111a1b;border:1px solid #1e2d2e;border-top:none;padding:20px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:#4a5556">
                  Respondé directamente a este email para contactar a ${name}.
                </td>
                <td align="right">
                  <a href="mailto:${email}" style="display:inline-block;background:#ffb690;color:#0e1516;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:10px 20px;text-decoration:none">Responder</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 0 0;text-align:center">
            <p style="margin:0;font-size:11px;color:#2a3536">CodeTlon Software Factory · Córdoba, Argentina · codetlon.com.ar</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f10;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f10;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <tr>
          <td style="background:#ffb690;padding:16px 36px">
            <img src="https://i.ibb.co/jPzdpxWT/codetlon-azul.png" alt="CodeTlon" height="20" style="display:block;height:20px;width:auto">
          </td>
        </tr>

        <tr>
          <td style="background:#0e1516;border:1px solid #1e2d2e;border-top:none;padding:44px 36px 36px">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#ffb690">Confirmación de consulta</p>
            <h1 style="margin:0 0 16px;font-size:30px;font-weight:700;color:#e8ddd4;letter-spacing:-0.02em;line-height:1.2">
              Hola, ${name.split(' ')[0]}.<br>Ya recibimos tu mensaje.
            </h1>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#8a9b9c">
              Nuestro equipo revisó tu consulta y te va a responder en las próximas <strong style="color:#e8ddd4">48 horas hábiles</strong>.
            </p>
          </td>
        </tr>

        ${serviceInterest ? `
        <tr>
          <td style="background:#111a1b;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:20px 36px">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:14px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4a5556;white-space:nowrap">Servicio consultado</td>
                <td style="border-left:1px solid #1e2d2e;padding-left:14px;font-size:13px;font-weight:600;color:#a4cddb">${serviceInterest}</td>
              </tr>
            </table>
          </td>
        </tr>` : ''}

        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px">
            <div style="height:1px;background:#1e2d2e"></div>
          </td>
        </tr>

        <tr>
          <td style="background:#0e1516;border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;border-bottom:1px solid #1e2d2e;padding:28px 36px 52px">
            <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4a5556">Qué sigue</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="vertical-align:top;padding:0 0 18px">
                  <span style="display:inline-block;width:22px;height:22px;background:#ffb690;color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">1</span>
                  <span style="font-size:14px;color:#c8bdb4">Revisamos los detalles de tu proyecto</span>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;padding:0 0 18px">
                  <span style="display:inline-block;width:22px;height:22px;background:#ffb690;color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">2</span>
                  <span style="font-size:14px;color:#c8bdb4">Te contactamos para agendar una llamada</span>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top">
                  <span style="display:inline-block;width:22px;height:22px;background:#ffb690;color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">3</span>
                  <span style="font-size:14px;color:#c8bdb4">Armamos una propuesta a medida</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 0 0;text-align:center">
            <p style="margin:0 0 4px;font-size:11px;color:#2a3536">CodeTlon Software Factory · Córdoba, Argentina</p>
            <p style="margin:0;font-size:11px;color:#2a3536">codetlon.com.ar</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  }).catch((err) => console.error('Confirmation email error:', err))

  return { success: true }
}