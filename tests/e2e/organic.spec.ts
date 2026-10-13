import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addLocatorHandler(page.getByRole('button', { name: 'Recusar opcionais' }), button => button.click())
})

test('organic guides are discoverable, readable and linked to services', async ({ page }, testInfo) => {
  await page.goto('/hotel')
  await page.getByRole('link', { name: 'hotel ou creche: qual escolher?', exact: true }).click()
  await expect(page).toHaveURL(/\/guias\/hotel-ou-creche$/)
  for (const slug of ['hotel-ou-creche', 'hospedagem-feriados']) {
    await page.goto(`/guias/${slug}`)
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main article section')).toHaveCount(5)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://auzenpetresort.com.br/guias/${slug}`)
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}')['@graph']
    expect(graph.find((entry: { '@type': string }) => entry['@type'] === 'Article')).toBeTruthy()
    expect(graph.find((entry: { '@type': string }) => entry['@type'] === 'BreadcrumbList').itemListElement).toHaveLength(3)
    await page.locator('main img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())))
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    await expect(page.getByRole('link', { name: 'Hotel para cães em Lauro de Freitas', exact: true })).toHaveAttribute('href', '/hotel')
    await page.screenshot({ path: `qa/organic-${slug}-${testInfo.project.name}.png`, fullPage: true })
  }
  await page.getByRole('navigation', { name: 'Caminho da página' }).getByRole('link', { name: 'Guias', exact: true }).click()
  await expect(page.locator('main h2')).toHaveCount(3)
  await page.goto('/guias/nao-existe')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow')
})
