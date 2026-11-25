'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

// Rate limiting simple en memoria por IP, sin dependencias nuevas. No es
// distribuido (cada instancia/lambda tiene su propio Map), pero corta el caso
// común de un script/bot golpeando el form repetidas veces y agotando la
// cuota de envíos de Resend. Ventana fija: 5 envíos cada 10 minutos por IP.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

async function isRateLimited(): Promise<boolean> {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count += 1
  return false
}

export interface ContactState {
  success?: boolean
  error?: string
  fieldErrors?: {
    name?: string
    email?: string
    message?: string
  }
}

// Los campos del form van interpolados en HTML de email (abajo). Sin escapar,
// un mensaje/nombre con `<`, `>`, etc. podría inyectar markup en el email que
// recibe el equipo o en la confirmación que recibe el propio remitente.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendContact(
  prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  if (await isRateLimited()) {
    return {
      error: 'Hiciste demasiados envíos en poco tiempo. Probá de nuevo en unos minutos.',
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    serviceInterest: formData.get('serviceInterest') || undefined,
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return {
      error: 'Revisá los campos marcados abajo.',
      fieldErrors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    }
  }

  const { name: rawName, email, company: rawCompany, serviceInterest: rawServiceInterest, message: rawMessage } = parsed.data
  // Escapados para interpolar en el HTML del email de forma segura (el email
  // en sí no se interpola crudo en el HTML, solo se usa como href/to/replyTo).
  const name = escapeHtml(rawName)
  const company = rawCompany ? escapeHtml(rawCompany) : rawCompany
  const serviceInterest = rawServiceInterest ? escapeHtml(rawServiceInterest) : rawServiceInterest
  const message = escapeHtml(rawMessage)
  // `email` (sin escapar) se usa para `to`/`replyTo` de Resend; `emailHtml` es
  // la versión segura para mostrar dentro del cuerpo HTML del email.
  const emailHtml = escapeHtml(email)

  // ---- ACÁ BORRAMOS TODA LA INSERCIÓN A SUPABASE ----

  // 1. Email al equipo (a info@codetlon.com.ar)
  const { error: emailError } = await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME ?? 'CodeTlon'} <${process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'}>`,
    to: process.env.NOTIFICATIONS_EMAIL ?? 'info@codetlon.com.ar',
    replyTo: email,
    subject: `🟠 Nuevo lead: ${name}${serviceInterest ? ` · ${serviceInterest}` : ''}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0a0f10;background-image:linear-gradient(#0a0f10,#0a0f10);font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f10;background-image:linear-gradient(#0a0f10,#0a0f10);padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border:1px solid #1e2d2e;border-bottom:none;padding:28px 36px 20px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="https://i.ibb.co/PZrqYfxx/codetlon-blanco.png" alt="CodeTlon" height="20" style="display:block;height:20px;width:auto">
                </td>
                <td align="right">
                  <span style="display:inline-block;background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);color:#0e1516;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:4px 10px">Nuevo Lead</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px 28px">
            <h1 style="margin:0;font-size:28px;font-weight:700;color:#e8ddd4;letter-spacing:-0.02em">${name}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:#8a9b9c">
              <a href="mailto:${emailHtml}" style="color:#a4cddb;text-decoration:none">${emailHtml}</a>
              ${company ? `<span style="color:#4a5556;margin:0 6px">·</span><span>${company}</span>` : ''}
            </p>
          </td>
        </tr>
        ${serviceInterest ? `
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px 24px">
            <span style="display:inline-block;border:1px solid #ffb690;color:#ffb690;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:5px 12px">${serviceInterest}</span>
          </td>
        </tr>` : ''}
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px">
            <div style="height:1px;background-color:#1e2d2e;background-image:linear-gradient(#1e2d2e,#1e2d2e);"></div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:24px 36px 32px">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4a5556">Mensaje</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#c8bdb4;white-space:pre-wrap">${message}</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111a1b;background-image:linear-gradient(#111a1b,#111a1b);border:1px solid #1e2d2e;border-top:none;padding:20px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:#4a5556">
                  Respondé directamente a este email para contactar a ${name}.
                </td>
                <td align="right">
                  <a href="mailto:${emailHtml}" style="display:inline-block;background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);color:#0e1516;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:10px 20px;text-decoration:none">Responder</a>
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
    return { success: false, error: 'Hubo un error al enviar el email. Intentá nuevamente.' }
  }

  // 2. Confirmación al cliente
  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME ?? 'CodeTlon'} <${process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'}>`,
    to: email,
    subject: 'Recibimos tu consulta — CodeTlon',
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0a0f10;background-image:linear-gradient(#0a0f10,#0a0f10);font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f10;background-image:linear-gradient(#0a0f10,#0a0f10);padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
        <tr>
          <td style="background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);padding:16px 36px">
            <img src="https://i.ibb.co/jPzdpxWT/codetlon-azul.png" alt="CodeTlon" height="20" style="display:block;height:20px;width:auto">
          </td>
        </tr>
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border:1px solid #1e2d2e;border-top:none;padding:44px 36px 36px">
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
          <td style="background-color:#111a1b;background-image:linear-gradient(#111a1b,#111a1b);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:20px 36px">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:14px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4a5556;white-space:nowrap">Servicio consultado</td>
                <td style="border-left:1px solid #1e2d2e;padding-left:14px;font-size:13px;font-weight:600;color:#a4cddb">${serviceInterest}</td>
              </tr>
            </table>
          </td>
        </tr>` : ''}
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;padding:0 36px">
            <div style="height:1px;background-color:#1e2d2e;background-image:linear-gradient(#1e2d2e,#1e2d2e);"></div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0e1516;background-image:linear-gradient(#0e1516,#0e1516);border-left:1px solid #1e2d2e;border-right:1px solid #1e2d2e;border-bottom:1px solid #1e2d2e;padding:28px 36px 52px">
            <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4a5556">Qué sigue</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="vertical-align:top;padding:0 0 18px">
                  <span style="display:inline-block;width:22px;height:22px;background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">1</span>
                  <span style="font-size:14px;color:#c8bdb4">Revisamos los detalles de tu proyecto</span>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;padding:0 0 18px">
                  <span style="display:inline-block;width:22px;height:22px;background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">2</span>
                  <span style="font-size:14px;color:#c8bdb4">Te contactamos para agendar una llamada</span>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top">
                  <span style="display:inline-block;width:22px;height:22px;background-color:#ffb690;background-image:linear-gradient(#ffb690,#ffb690);color:#0e1516;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:12px">3</span>
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