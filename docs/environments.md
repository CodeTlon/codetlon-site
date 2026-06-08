# Entornos — CodeTlon Site

Sitio de marketing (sin base de datos: los formularios se envían por **Resend**).
Trabaja con **dos entornos** para poder probar cambios antes de producción.

| Rama  | Vercel Environment | URL                                          | Variables           |
|-------|--------------------|----------------------------------------------|---------------------|
| `main`| **Production**     | https://codetlon.com                         | Vercel → Production |
| `dev` | **Preview**        | `codetlon-site-git-dev-<team>.vercel.app`    | Vercel → Preview    |

**Flujo:** desarrollás en `dev` → Vercel autodeploya a Preview → probás → merge `dev` → `main` → Production.

> Como no hay DB, no hace falta un segundo Supabase. La separación de entornos es solo de deploy + variables.
> Toda la infra (Vercel) la configurás vos manualmente.

---

## Setup inicial (una sola vez)

### 1. Variables en Vercel, por entorno
Vercel → Project → **Settings → Environment Variables**. Por cada variable elegí el **Environment**:

| Variable                     | ¿Difiere por entorno? | Production (`main`)            | Preview (`dev`)                  |
|------------------------------|-----------------------|-------------------------------|----------------------------------|
| `RESEND_API_KEY`             | no (compartida)       | misma                         | misma                            |
| `RESEND_FROM_NAME`           | no                    | `CodeTlon`                    | `CodeTlon [DEV]`                 |
| `RESEND_FROM_EMAIL`          | no                    | mismo                         | mismo                            |
| `COMPANY_EMAIL`              | recomendado           | `info@codetlon.com.ar`        | tu mail de prueba                |
| `NEXT_PUBLIC_GA_ID`          | **sí**                | GA4 real                      | vacío (no medir en dev)          |
| `NEXT_PUBLIC_SITE_URL`       | **sí**                | `https://codetlon.com`        | URL de la Preview                |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| no                    | mismo                         | mismo                            |
| `NEXT_PUBLIC_INSTAGRAM_URL`  | no                    | mismo                         | mismo                            |

### 2. Confirmar la rama de producción
Vercel → **Settings → Git → Production Branch = `main`**.
Con eso, cualquier otra rama (incluida `dev`) se deploya automáticamente como **Preview**.

---

## Desarrollo local
Partir de [`.env.example`](../.env.example) → `.env.local`. NUNCA committear `.env.local`.
