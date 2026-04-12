# Technical Documentation — CodeTlon Site

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4 |
| UI Components | Shadcn/UI | 4.x |
| Icons | Lucide React | latest |
| Database | Supabase (PostgreSQL) | 2.x |
| Email | Resend | 6.x |
| Validation | Zod | 4.x |
| Images | sharp | 0.34+ |
| Deploy | Vercel | — |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: Header, Footer, WhatsApp, fonts
│   ├── page.tsx                # Home (/)
│   ├── nosotros/page.tsx       # /nosotros
│   ├── servicios/
│   │   ├── page.tsx            # /servicios — grid of all 9 services
│   │   └── [slug]/page.tsx     # /servicios/[slug] — dynamic service detail
│   ├── proceso/page.tsx        # /proceso — FOS Method
│   ├── contacto/page.tsx       # /contacto — contact form + info
│   ├── gracias/page.tsx        # /gracias — post-submit confirmation
│   ├── sitemap.ts              # Dynamic sitemap (15 URLs)
│   ├── robots.ts               # Robots.txt (blocks /gracias)
│   └── actions/
│       └── contact.ts          # Server Action: form → Supabase + Resend
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Glassmorphism header, hamburger
│   │   ├── Footer.tsx          # Logo, links, social icons, CodeTlonBadge
│   │   ├── MobileMenu.tsx      # 'use client', Sheet/drawer
│   │   ├── WhatsAppButton.tsx  # Fixed floating button
│   │   └── CodeTlonBadge.tsx   # Required badge in footer
│   ├── sections/               # Page sections, all Server Components unless noted
│   │   ├── HeroHome.tsx
│   │   ├── ServicesTeaser.tsx
│   │   ├── FOSMethod.tsx
│   │   ├── MetricsStrip.tsx
│   │   ├── WhyCodeTlon.tsx
│   │   ├── EvolucionContinua.tsx
│   │   ├── CTABanner.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── PageHero.tsx        # Reusable page header
│   │   └── ContactForm.tsx     # 'use client', useFormState + useFormStatus
│   ├── ui/                     # Custom Shadcn-based UI primitives
│   │   ├── GradientButton.tsx
│   │   ├── GhostButton.tsx
│   │   ├── GlassCard.tsx
│   │   └── ...
│   └── seo/
│       └── JsonLd.tsx          # Schema.org JSON-LD injector
├── lib/
│   ├── services-data.ts        # Static typed array of 9 services
│   ├── constants.ts            # WhatsApp, Instagram, nav links
│   ├── supabase.ts             # Supabase client with placeholder fallbacks
│   ├── utils.ts                # cn() helper
│   └── validations/
│       └── contact.ts          # Zod schema for contact form
└── ...
```

---

## Design System — Kinetic Editorial

### Color Tokens (Tailwind)

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0e1516` | Page background |
| `foreground` | `#e8ddd4` | Primary text |
| `primary` | `#ffb690` | CTAs, accents, numbers |
| `secondary` | `#a4cddb` | Tech chips, secondary accents |
| `surface-low` | `#161d1e` | Alternate sections |
| `surface-container` | `#1a2122` | Cards, form backgrounds |
| `surface-highest` | `#2f3637` | Inputs |

### Typography

- **Display** — Newsreader (Google Fonts, serif, italic variants)
- **Body** — Inter (Google Fonts, sans-serif)
- Loaded via `next/font/google` with `display: 'swap'`, never `@import`

### Custom Utilities (globals.css)

```css
.glass        /* Glassmorphism: backdrop-blur-xl + bg-white/5 + border border-white/10 */
.gradient-cta /* Linear gradient 135deg: #ffb690 → #ff8c52 */
.gradient-hero /* Radial glow background */
```

---

## Contact Form Flow

```
User fills form (/contacto)
  → ContactForm.tsx (client component)
  → useFormState(sendContact) from react-dom
  → Server Action: src/app/actions/contact.ts
      ├── Zod validation (contactSchema)
      ├── Supabase INSERT → contact_leads (service_role, bypasses RLS)
      ├── Resend → team notification email (reply_to = user email)
      └── Resend → user confirmation email
  → state.success = true → shows success UI inline
```

**Why service_role in the Server Action?**  
The RLS policy only allows `INSERT` for anon. `SELECT` and `UPDATE` require service_role. The Server Action runs server-side only, so the key is never exposed to the browser.

---

## Static Generation

All 9 service pages (`/servicios/[slug]`) are statically generated at build time via `generateStaticParams()`. The data comes from `src/lib/services-data.ts` (pure TypeScript, no DB calls). This gives:

- Zero Supabase queries at request time for service pages
- Full static HTML for maximum performance
- `try/catch` in `generateStaticParams` prevents build failure if data is unavailable (Bug #24)

---

## Known Constraints

- **Instagram icon**: `lucide-react` (current version) doesn't export `Instagram`. Using inline SVG in `Header.tsx` and `Footer.tsx`.
- **next.config.mjs**: Uses `.mjs` (not `.ts`) — required for Next.js 14 (Bug #20).
- **viewport export**: Always separate from `metadata` in `layout.tsx` to avoid Next.js 14 warning (Bug #1).
- **useFormState**: Must import from `react-dom` not `react` in Next.js 14 (Bug #4).
- **Server Action signature**: First param must be `prevState: unknown` (Bug #5).
