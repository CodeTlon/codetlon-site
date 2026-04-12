# Deployment Guide — CodeTlon Site

## Prerequisites

- Node.js 18+
- Supabase account
- Resend account
- Vercel account
- Domain configured (codetlon.com)

---

## 1. Supabase Setup

### Create project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `codetlon-site`, region: South America (São Paulo)
3. Save the project URL and keys

### Run migration
In the Supabase Dashboard → SQL Editor, paste and run:
```
supabase/migrations/001_contact_leads.sql
```

### Get credentials
- **Project URL**: Settings → API → Project URL
- **Anon Key**: Settings → API → Project API Keys → `anon public`
- **Service Role Key**: Settings → API → Project API Keys → `service_role` ⚠️ Keep secret

---

## 2. Resend Setup

1. Go to [resend.com](https://resend.com) → Create API key
2. Add your domain (codetlon.com) and verify DNS records
3. Once verified, update `RESEND_FROM_EMAIL` to `noreply@codetlon.com`

---

## 3. Environment Variables

Create `.env.local` in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Never expose this to the client

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@codetlon.com
RESEND_FROM_NAME=CodeTlon

# Company
COMPANY_EMAIL=hola@codetlon.com

# Social
NEXT_PUBLIC_WHATSAPP_NUMBER=+5493511234567
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/codetlon/

# Site
NEXT_PUBLIC_SITE_URL=https://codetlon.com
```

---

## 4. Vercel Deploy

### First deploy
```bash
# Install Vercel CLI
npm i -g vercel

# From the project root
vercel

# Follow prompts: link to existing project or create new
```

### Add environment variables
In Vercel Dashboard → Project → Settings → Environment Variables, add all variables from `.env.local`.

**Important:** `SUPABASE_SERVICE_ROLE_KEY` must be added with scope **Production + Preview** only (never exposed to browser).

### Production deploy
```bash
vercel --prod
```

Or push to `main` branch if GitHub integration is configured.

---

## 5. Domain Setup (Vercel)

1. Vercel Dashboard → Project → Settings → Domains
2. Add `codetlon.com` and `www.codetlon.com`
3. Update DNS records at your registrar:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`

---

## 6. Post-Deploy Checklist

- [ ] Visit `https://codetlon.com` — site loads
- [ ] Submit contact form — check email received at `hola@codetlon.com`
- [ ] Check Supabase Dashboard → Table Editor → `contact_leads` — row inserted
- [ ] Check `https://codetlon.com/sitemap.xml` — all URLs present
- [ ] Run Lighthouse in Chrome DevTools on production
  - Performance ≥ 85
  - SEO ≥ 95
  - Accessibility ≥ 90
- [ ] Check all OG images via [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Verify WhatsApp button opens correct chat
- [ ] Verify Instagram link points to @codetlon

---

## 7. Supabase RLS Verification

```sql
-- Should return 0 rows (SELECT blocked for anon)
SELECT * FROM public.contact_leads;

-- Should succeed (INSERT allowed for anon)
INSERT INTO public.contact_leads (name, email, message)
VALUES ('Test', 'test@test.com', 'Test message');
```
