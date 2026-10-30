import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addLocatorHandler(page.getByRole('button', { name: 'Recusar opcionais' }), button => button.click())
})

test('monthly packages agree across pages and prepare the selected plan for WhatsApp', async ({ page }) => {
  for (const route of ['/', '/creche', '/servicos']) {
    await page.goto(`${route}#planos`)
    const plans = page.getByRole('region', { name: /Mais dias juntos/ })
    await expect(plans).toBeVisible()
    await expect(plans.locator('article')).toHaveCount(5)
    for (const [index, days, price] of [[0, 4, 220], [1, 8, 400], [2, 12, 540], [3, 16, 640], [4, 20, 760]]) {
      const plan = plans.locator('article').nth(index)
      await expect(plan).toContainText(`${days} diárias por mês`)
      const url = new URL((await plan.getByRole('link').getAttribute('href'))!)
      expect(url.pathname).toBe('/5571993972239')
      expect(url.searchParams.get('text')).toContain(`${days} diárias por mês`)
      expect(url.searchParams.get('text')).toContain(`${price},00`)
    }
    await expect(plans).toContainText('das 7h às 18h')
    await expect(plans).toContainText('mais de um cão')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
  }
})

test('home packages link reaches plans and daily request permits 18h checkout', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Ver pacotes e valores' }).click()
  await expect(page).toHaveURL(/#planos$/)
  await expect(page.getByRole('heading', { name: /Mais dias juntos/ })).toBeInViewport()
  await page.locator('#planos').getByRole('link', { name: 'Planejar um dia de creche' }).click()
  await expect(page).toHaveURL(/servico=daycare/)
  await expect(page.locator('#departure')).toHaveValue('18:00')
  await page.locator('#startDate').fill('2027-01-04')
  await page.locator('#endDate').fill('2027-01-04')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.locator('#name')).toBeVisible()
})
