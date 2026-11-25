import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('logo navigates to home', async ({ page }) => {
    await page.goto('/nosotros')
    await page.click('a[href="/"]')
    await expect(page).toHaveURL('/')
  })

  test('nav links work on desktop', async ({ page, viewport }) => {
    // Only test click nav on non-mobile viewports
    if ((viewport?.width ?? 0) < 768) return

    await page.goto('/')
    const navLinks = [
      { href: '/servicios', label: 'Servicios' },
      { href: '/proceso', label: 'Proceso' },
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/contacto', label: 'Contacto' },
    ]
    for (const link of navLinks) {
      await page.goto('/')
      await page.click(`nav a[href="${link.href}"]`)
      await expect(page).toHaveURL(link.href)
    }
  })

  test('all pages load without errors', async ({ page }) => {
    const routes = ['/', '/nosotros', '/servicios', '/proceso', '/contacto']
    for (const route of routes) {
      // webServer runs `next dev`: the first hit to a fresh route triggers a
      // just-in-time compile + Fast Refresh, which can interrupt a goto fired
      // right after another one. Retry once if Playwright reports the navigation
      // got interrupted by Fast Refresh's full reload.
      let response
      try {
        response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      } catch (err) {
        if (!String(err).includes('interrupted by another navigation')) throw err
        response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      }
      expect(response?.status()).toBe(200)
    }
  })

  test('service detail pages load', async ({ page }) => {
    const response = await page.goto('/servicios/landing')
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('footer links are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('footer a[href="/servicios"]')).toBeVisible()
    await expect(page.locator('footer a[href="/contacto"]')).toBeVisible()
  })
})
