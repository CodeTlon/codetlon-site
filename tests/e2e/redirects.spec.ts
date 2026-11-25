import { test, expect } from '@playwright/test'

// Slugs del viejo catálogo de niveles (L1–L9): deben responder 301 al servicio nuevo
// (ver next.config.mjs). Se pide sin seguir el redirect para ver el código real.
const legacy: Record<string, string> = {
  landing: 'desarrollo-web',
  'marketing-site': 'desarrollo-web',
  'sitio-estatico': 'desarrollo-web',
  ecommerce: 'desarrollo-web',
  'dashboard-usuarios': 'software-a-medida',
  'sitio-automatizacion': 'automatizacion-e-integraciones',
  automatizacion: 'automatizacion-e-integraciones',
  'ia-integrada': 'automatizacion-e-integraciones',
  refactor: 'modernizacion-de-sistemas',
}

test.describe('Redirects de slugs viejos', () => {
  for (const [from, to] of Object.entries(legacy)) {
    test(`/servicios/${from} → 301 /servicios/${to}`, async ({ request }) => {
      const response = await request.get(`/servicios/${from}`, { maxRedirects: 0 })
      expect(response.status()).toBe(301)
      expect(new URL(response.headers()['location'], 'http://x').pathname).toBe(`/servicios/${to}`)
    })
  }

  test('el redirect termina en una página válida', async ({ page }) => {
    const response = await page.goto('/servicios/landing')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/servicios\/desarrollo-web$/)
  })
})
