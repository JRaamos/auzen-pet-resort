import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Consent itself is covered by tests/marketing, including the 320px viewport.
  await page.addLocatorHandler(page.getByRole('button', { name: 'Recusar opcionais' }), button => button.click())
})

test('service and privacy pages have unique metadata, usable photos, FAQs and mobile layout', async ({ page }, testInfo) => {
  const titles = new Set<string>()
  for (const path of ['/hotel', '/creche', '/privacidade']) {
    await page.goto(path)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://auzenpetresort.com.br${path}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow')
    titles.add(await page.title())
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    if (path !== '/privacidade') {
      await expect(page.locator('main details')).toHaveCount(4)
      await page.locator('main details summary').first().click()
      await expect(page.locator('main details').first()).toHaveAttribute('open', '')
      await page.locator('main img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())))
      await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0) })
      await page.screenshot({ path: `qa/marketing-${path.slice(1)}-${testInfo.project.name}.png`, fullPage: true })
    }
  }
  expect(titles.size).toBe(3)
  await page.goto('/pagina-inexistente')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow')
})
