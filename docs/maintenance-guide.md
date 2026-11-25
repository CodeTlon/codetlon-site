# Maintenance Guide — CodeTlon Site

## Routine Tasks

### Monthly
- [ ] Check `npm outdated` — update non-breaking deps
- [ ] Review Supabase `contact_leads` — update lead statuses
- [ ] Check Vercel Analytics for performance regressions
- [ ] Verify contact form is still working end-to-end

### Quarterly
- [ ] Run Lighthouse on production — ensure scores hold
- [ ] Run `npm audit` and fix any high-severity issues
- [ ] Review Resend email delivery rates
- [ ] Update Next.js patch version (`npm install next@latest`)

---

## Adding a New Service

1. Open `src/lib/services-data.ts`
2. Add a new object to the `services` array following the existing TypeScript interface
3. Set a unique `slug` (URL-safe, kebab-case)
4. Pick a Lucide `icon`
5. Fill `whatYouGet[]`, `techStack[]`, `relatedSlugs[]` (no durations/levels — see `.ai/context/DECISIONS.md`)
5b. If you rename or remove a published slug, add a 301 in `next.config.mjs` (`legacyServiceRedirects`)
6. The page `/servicios/[slug]` will be automatically generated at build time
7. Home (`ServicesTeaser`), `/servicios` (`ServicesGrid`), sitemap, JSON-LD and the contact form options update automatically
8. Redeploy: `git commit -m "feat: add [service-name] service" && git push`

---

## Editing Contact Leads (Supabase)

Only accessible via service_role (Supabase Dashboard or direct SQL):

```sql
-- View all new leads
SELECT * FROM contact_leads WHERE status = 'new' ORDER BY created_at DESC;

-- Update lead status
UPDATE contact_leads SET status = 'contacted', notes = 'Llamé el 15/03' WHERE id = 'uuid-here';
```

**Status values:** `new` → `contacted` → `proposal_sent` → `closed_won` / `closed_lost`

---

## Updating Content

### Home page sections
Each section is a separate component in `src/components/sections/`. Edit the relevant file:
- `HeroHome.tsx` — headline, subtitle, CTA text
- `MetricsStrip.tsx` — the 4 metric numbers/labels
- `WhyCodeTlon.tsx` — the 3 differentiator cards
- `EvolucionContinua.tsx` — post-delivery features list

### FOS Method phases
Edit `src/app/proceso/page.tsx` → `phases` array at the top of the file.

### FAQ
Edit `src/app/proceso/page.tsx` → `faqs` array.

### Navigation links
Edit `src/lib/constants.ts` → `NAV_LINKS` array.

---

## Email Templates

The contact emails are HTML strings inside `src/app/actions/contact.ts`. To update:
- Team notification email: search for `// Email al equipo`
- Client confirmation email: search for `// Confirmación al cliente`

Both use inline styles with the Kinetic Editorial palette (`#0e1516` bg, `#ffb690` accent).

---

## Environment Variable Changes

1. Update `.env.local` locally
2. Add/update in Vercel Dashboard → Project → Settings → Environment Variables
3. Trigger a new Vercel deployment (push a commit or redeploy manually)

---

## Re-running E2E Tests

```bash
# Install browsers (first time only)
npx playwright install

# Run all tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# View last report
npm run test:e2e:report
```

**Note:** Tests require the dev server running (auto-started by `playwright.config.ts`). For CI, set `PLAYWRIGHT_BASE_URL` to point to the deployed URL.

---

## Troubleshooting

### Contact form not sending emails
1. Check `RESEND_API_KEY` is set correctly in Vercel
2. Check Resend Dashboard → Logs for bounced emails
3. Verify `RESEND_FROM_EMAIL` domain is verified in Resend
4. Check Supabase → Table Editor → contact_leads — if rows are being inserted, Supabase is working but email is failing

### Build failures
- `sharp` module: run `npm install sharp` — required for Next.js Image Optimization
- TypeScript errors: run `npx tsc --noEmit` locally to catch them before deploying
- Tailwind class not found: make sure the class is in `src/` files (Tailwind scans `./src/**/*.{ts,tsx}`)

### WhatsApp button not working
1. Check `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
2. Format must include country code: `+5493518922024` (no spaces)
3. Verify in `src/lib/constants.ts` → `WHATSAPP_CTA_URL`
