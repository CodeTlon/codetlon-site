# ARCHITECTURE.md

Todo lo de este archivo fue verificado contra código/config/git/`gh api`/Vercel CLI el
2026-09-18 — no es una transcripción de `README.md`/`ARCHITECTURE.md` (raíz), que están
desincronizados (ver `KNOWN_ISSUES.md` #6).

## Stack real

- **Next.js 16.3.3** (App Router), TypeScript, Tailwind CSS, Shadcn/UI (base-ui), Lucide React.
- React 18. `eslint-config-next` está pineado en `15.5.24` (un minor atrás de `next`, mismatch
  menor de tooling, no rompe nada).
- `src/` con alias `@/*` → `./src/*`.
- Package manager: **npm** (`package-lock.json`, no hay `pnpm-lock.yaml` ni `yarn.lock`).

## Cadena de deploy (verificado, no asumido)

**Mecanismo:** integración nativa GitHub↔Vercel (GitHub App instalada en el repo
`CodeTlon/codetlon-site`), auto-deploy en cada push a `main`. Verificación cruzada:

1. `gh api repos/CodeTlon/codetlon-site/deployments` — historial de deployments a `Production`
   creados por `vercel[bot]`, uno por cada push a `main`.
2. `git ls-remote origin refs/heads/main` — el HEAD real de `origin/main` coincide exactamente,
   commit a commit, con el historial de deployments `Production`.
3. `vercel inspect <deployment-url>` — el deployment vivo actual tiene como alias
   `https://codetlon.com.ar`, `https://www.codetlon.com.ar` y `https://codetlon-site-git-main-
   mateo-pavonis-projects.vercel.app` — confirma que corresponde a la rama `main`.
4. `gh pr list --state all` → vacío. **No se usan Pull Requests.** El merge a `main` es directo,
   vía el comando `/cerrar` (merge local + push), no vía GitHub UI.

**No hay CI/CD**: no existe `.github/workflows/`. El build de Next que corre Vercel al recibir el
push es el único gate — un `next build` roto bloquea el deploy, pero un fallo de `lint`/`test:e2e`
no lo hace (no corren en el pipeline de deploy).

**Ambientes**: solo dos, dentro del mismo proyecto Vercel (`mateo-pavonis-projects/codetlon-site`,
projectId `prj_cHO0yAQVEFb1PgZgrk18ZlMbyjoX`):
- **Production** — pushes a `main`, dominio real.
- **Preview** — deploys por rama (cualquier otra rama), URLs `*.vercel.app` efímeras.

No hay ambiente de staging separado, ni base de datos separada por ambiente — **no hay base de
datos en absoluto** (ver más abajo). `docs/deployment-guide.md` documenta `vercel --prod` manual
como el flujo primario y el auto-deploy por Git como algo condicional ("si está configurado") —
en la práctica es al revés: el auto-deploy es el mecanismo real y activo, confirmado por 1-4.

**Nota de higiene, no de riesgo**: el clon local de este repo (donde se hizo esta auditoría) tenía
la rama `main` local desactualizada (`4b957ca`, sin fetch desde 2026-07-11) mientras el checkout
activo estaba en `chore/ts7`, cuyo HEAD (`72e8b0d`) es idéntico a `origin/main`. No es trabajo sin
mergear — ya está en producción — es solo que este clon no había hecho `git fetch`. Ver
`CURRENT_STATE.md`.

## Rutas reales (ground truth, verificado contra `sitemap.ts`/`robots.ts`)

```
/                       Home
/nosotros               Sobre la agencia
/servicios              Listado de servicios
/servicios/[slug]       Detalle de servicio (data: src/lib/services-data.ts)
/proceso                Metodología / proceso de trabajo
/contacto               Formulario de contacto
/gracias                Confirmación post-envío
/privacidad             Política de privacidad
/terminos               Términos y condiciones
```

Más: `actions/contact.ts` (Server Action), `sitemap.ts`, `robots.ts`, `not-found.tsx`,
`error.tsx`/`global-error.tsx`/`loading.tsx` a nivel raíz y por cada ruta top-level (heredado por
`servicios/[slug]` desde `servicios/`).

## Auth / autorización

**No existe ningún sistema de autenticación o autorización en este sitio.** Verificado: no hay
`src/middleware.ts`, no hay `src/app/api/**`, cero archivos `route.ts` en todo `src/`, no hay
rutas `admin`/`dashboard`/`login`. Es intencional — es un sitio de marketing puro, sin usuarios.

La única mención de "auth"/"roles" en el código es **copy de marketing**: `services-data.ts`
describe un tier de servicio ("L5") que CodeTlon *vende a sus clientes* ("Supabase Auth, roles de
usuario, dashboard CRUD") — no es algo implementado en este sitio.

Si en el futuro se agrega cualquier endpoint o panel con datos sensibles, la enforcement de
auth/autorización tiene que vivir **server-side** (Server Action o `route.ts`), nunca solo en un
chequeo de UI/cliente — no hay ningún precedente en este repo de esa práctica incorrecta porque
simplemente no hay auth todavía, pero es la primera cosa a verificar si alguna vez se agrega.

## Flujo del formulario de contacto (único efecto server-side del sitio)

`src/app/actions/contact.ts` (Server Action, patrón `useFormState` + `(prevState, formData)`):

1. Rate limit in-memory por IP (`Map`, 5 requests / 10 min) — **no distribuido**: cada instancia
   serverless de Vercel tiene su propio `Map`, así que no protege contra un atacante que golpea
   distintas instancias. Limitación autodocumentada en el propio código (comentario explícito).
2. Validación con Zod (`src/lib/validations/contact.ts`) vía `contactSchema.safeParse()` —
   **enforced dentro de la action**, no solo en el cliente.
3. `escapeHtml()` sobre name/company/serviceInterest/message antes de interpolar en el HTML del
   email — previene inyección HTML/email. El campo `email` crudo solo se usa en `to`/`replyTo`,
   nunca interpolado sin escapar en el cuerpo.
4. Envía dos emails vía Resend: notificación interna (falla propagada correctamente si Resend
   falla) y confirmación al usuario (falla **silenciada** — ver `KNOWN_ISSUES.md` #5).
5. Nunca escribe a Supabase — el insert fue removido a propósito (comentario explícito en el
   archivo: "ACÁ BORRAMOS TODA LA INSERCIÓN A SUPABASE"). No hay persistencia de ningún lead.
6. Errores de Resend se loguean server-side (`console.error`) — el usuario ve un mensaje genérico
   en español, sin stack traces ni detalles internos.

## Seguridad — headers y CSP (`next.config.mjs`)

Todos verificados presentes y correctos:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-XSS-Protection` (legacy, inofensivo)
- CSP: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com
  https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com;
  font-src 'self' data:; connect-src 'self' https://www.google-analytics.com
  https://*.google-analytics.com https://*.analytics.google.com; object-src 'none';
  base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`
  - `unsafe-inline` en `script-src` y `style-src` (sin nonces) — razón documentada en el propio
    comentario del archivo: bootstrap inline de GA4 + estilos inline de JSX. **Sin `unsafe-eval`,
    sin wildcards `*` sueltos** (todo host específico o subdominio documentado).

## Modelo de datos

No hay base de datos. Ver `DOMAIN.md` para el detalle de los archivos estáticos que hacen de
"modelo de datos" (`services-data.ts`, `projects-data.ts`, `constants.ts`).
