import { test, expect } from '@playwright/test'

// Bug #27: use page.goto() for mobile nav, not click-only approach
test.describe('Mobile Menu', () => {
  test('hamburger button is visible on mobile', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) >= 768) return

    await page.goto('/')
    const hamburger = page.locator('button[aria-label="Abrir menú"]')
    await expect(hamburger).toBeVisible()
  })

  test('hamburger opens and closes the mobile menu', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) >= 768) return

    await page.goto('/')
    const toggle = page.locator('button[aria-label="Abrir menú"]')

    // Open — same button, its label flips to "Cerrar menú"
    await toggle.click()
    await expect(page.locator('nav[aria-label="Menú móvil"]')).toBeVisible()

    // Close — the menu wrapper collapses via max-height (CSS transition) and is
    // marked aria-hidden; the inner <nav> keeps a non-zero bounding box during/after
    // the clip, so assert on the wrapper's aria-hidden state rather than its visibility.
    await page.locator('button[aria-label="Cerrar menú"]').click()
    await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'true')
  })

  test('navigation works from mobile menu', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) >= 768) return

    await page.goto('/')
    const hamburger = page.locator('button[aria-label="Abrir menú"]')
    await hamburger.click()

    await page.locator('nav[aria-label="Menú móvil"] a[href="/servicios"]').click()
    await expect(page).toHaveURL('/servicios')
  })

  test('desktop nav is visible without hamburger', async ({ page, viewport }) => {
    if ((viewport?.width ?? 0) < 768) return

    await page.goto('/')
    await expect(page.locator('nav a[href="/servicios"]').first()).toBeVisible()
    // Hamburger should not be visible on desktop
    const hamburger = page.locator('button[aria-label="Abrir menú"]')
    await expect(hamburger).not.toBeVisible()
  })
})
