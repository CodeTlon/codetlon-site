import { test, expect } from '@playwright/test'

test.describe('WhatsApp Button', () => {
  test('floating WhatsApp button is visible on home', async ({ page }) => {
    await page.goto('/')
    const btn = page.locator('a[aria-label="Contactar por WhatsApp"]')
    await expect(btn).toBeVisible()
  })

  test('WhatsApp button has correct wa.me href', async ({ page }) => {
    await page.goto('/')
    const btn = page.locator('a[aria-label="Contactar por WhatsApp"]')
    const href = await btn.getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\//)
  })

  test('WhatsApp button is fixed and accessible on all pages', async ({ page }) => {
    const routes = ['/', '/nosotros', '/servicios', '/contacto']
    for (const route of routes) {
      await page.goto(route)
      const btn = page.locator('a[aria-label="Contactar por WhatsApp"]')
      await expect(btn).toBeVisible()
    }
  })

  test('WhatsApp button opens in new tab', async ({ page }) => {
    await page.goto('/')
    const btn = page.locator('a[aria-label="Contactar por WhatsApp"]')
    await expect(btn).toHaveAttribute('target', '_blank')
    await expect(btn).toHaveAttribute('rel', /noopener/)
  })
})
