import { expect, test, type Page } from '@playwright/test'

async function events(page: Page) {
  return page.evaluate(() => (window.dataLayer || []).flatMap((item) => {
    const row = item as { event?: string; [key: number]: unknown }
    if (row.event && row.event !== 'gtm.js') return [row]
    return row[0] === 'event' ? [{ event: row[1], ...(row[2] as object) }] : []
  }))
}
test.beforeEach(async ({ page }) => {
  // No test is sent to Google or WhatsApp. Inspect the real application queue.
  await page.route(/googletagmanager\.com|google-analytics\.com/, route => route.fulfill({ body: '', contentType: 'application/javascript' }))
  await page.addInitScript(() => window.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a[href^="https://wa.me/"]')) event.preventDefault()
  }))
})
test('no optional script or attribution storage before consent or after rejection', async ({ page }) => {
  let requests = 0
  page.on('request', request => { if (request.url().includes('googletagmanager.com')) requests++ })
  await page.goto('/hotel?utm_source=google&utm_medium=cpc')
  await expect(page.getByRole('complementary', { name: 'Preferências de privacidade' })).toBeVisible()
  expect(await page.evaluate(() => sessionStorage.getItem('auzen:attribution:v1'))).toBeNull()
  expect(await events(page)).toEqual([])
  await page.getByRole('button', { name: 'Recusar opcionais' }).click()
  await page.getByRole('link', { name: 'Consultar hospedagem' }).click()
  await page.reload()
  await expect(page.getByRole('complementary', { name: 'Preferências de privacidade' })).not.toBeVisible()
  expect(requests).toBe(0)
  expect(await events(page)).toEqual([])
})
test('one page view per SPA route, one WhatsApp event, safe attribution, revocation', async ({ page }, testInfo) => {
  await page.goto('/hotel?utm_source=google&utm_medium=cpc&utm_campaign=auzen_pesquisa_local_teste_01&utm_content=hotel&gclid=TEST_click_identifier_12345&email=cliente@example.com&text=mensagem_privada&utm_term=71999999999')
  await page.getByRole('button', { name: 'Aceitar análise de visitas' }).click()
  await page.getByRole('link', { name: 'Consultar hospedagem' }).click()
  let measured = await events(page)
  expect(measured.filter(e => e.event === 'page_view')).toHaveLength(1)
  expect(measured.filter(e => e.event === 'whatsapp_click')).toHaveLength(1)
  expect(measured.find(e => e.event === 'whatsapp_click')).toMatchObject({ service: 'hotel', button_location: 'service_hero', utm_source: 'google' })
  await page.getByRole('navigation', { name: 'Navegação do rodapé' }).getByRole('link', { name: 'Creche para cães', exact: true }).click()
  await expect(page).toHaveURL(/\/creche$/)
  await page.getByRole('link', { name: 'Consultar creche' }).click()
  measured = await events(page)
  expect(measured.filter(e => e.event === 'page_view')).toHaveLength(2)
  expect(measured.filter(e => e.event === 'view_daycare')).toHaveLength(1)
  expect(measured.filter(e => e.event === 'whatsapp_click')).toHaveLength(2)
  const payload = JSON.stringify(measured)
  for (const sensitive of ['cliente@example.com', 'mensagem_privada', '71999999999', 'wa.me', 'text=']) expect(payload).not.toContain(sensitive)
  expect(payload).toContain('TEST_click_identifier_12345')
  const script = await page.locator('#auzen-analytics-script').getAttribute('src')
  expect(script).toContain(testInfo.project.name.startsWith('gtm') ? '/gtm.js?id=GTM-TESTAUZEN' : '/gtag/js?id=G-TESTAUZEN')
  await page.getByRole('button', { name: 'Preferências de cookies', exact: true }).click()
  await page.getByRole('button', { name: 'Recusar opcionais' }).click()
  await expect(page.locator('#auzen-analytics-script')).toHaveCount(0)
  expect(await page.evaluate(() => sessionStorage.getItem('auzen:attribution:v1'))).toBeNull()
})
test('unknown URLs and arbitrary UTMs never enter measurement payloads', async ({ page }) => {
  await page.goto('/cliente@example.com?utm_source=cliente@example.com&utm_campaign=71999999999')
  await page.getByRole('button', { name: 'Aceitar análise de visitas' }).click()
  const payload = JSON.stringify(await events(page))
  expect(payload).toContain('/404')
  expect(payload).not.toContain('cliente@example.com')
  expect(payload).not.toContain('71999999999')
})
