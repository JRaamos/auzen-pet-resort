import { expect, test } from '@playwright/test'

test('contact details align their icons and identify Renata with her role', async ({ page }) => {
  await page.goto('/contato')
  const details = page.getByLabel('Canais de contato e informações')
  await expect(details).toContainText('Coordenadora de comunicações - Renata')
  await expect(details).not.toContainText('Renato')
  await expect(details.locator(':scope > article')).toHaveCount(4)
  for (const row of await details.locator(':scope > article').all()) {
    expect(await row.evaluate((element) => getComputedStyle(element).display)).toBe('grid')
    const icon = await row.locator(':scope > span').boundingBox()
    const content = await row.locator(':scope > div').boundingBox()
    expect(icon).not.toBeNull()
    expect(content).not.toBeNull()
    expect(icon!.x + icon!.width).toBeLessThan(content!.x)
    expect(Math.abs(icon!.y - content!.y)).toBeLessThan(2)
    await expect(row.locator(':scope > span > svg')).toHaveAttribute('aria-hidden', 'true')
  }
  await expect(details.getByRole('link', { name: 'Conversar com a Renata' })).toHaveAttribute('href', /wa.me\/5571982412339/)
  await expect(details.getByRole('link', { name: '(71) 98241-2339' })).toHaveAttribute('href', 'tel:+5571982412339')
  await expect(details.getByRole('link', { name: '@auzenpetresort' })).toHaveAttribute('href', 'https://www.instagram.com/auzenpetresort/')
  await expect(details.locator('dl')).toContainText('Até 09h')
  await details.scrollIntoViewIfNeeded()
  await expect(page.locator('[data-floating-contact]')).not.toBeVisible()
})

test('all routes load directly, render without overflow and keep the new contact', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const route of [
    '/',
    '/quem-somos',
    '/servicos',
    '/promocoes',
    '/espaco',
    '/contato',
    '/informacoes',
    '/reservar',
    '/not-found',
  ]) {
    await page.goto(route)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('footer')).toContainText('Febraio Tech')
    await expect(page.locator('footer')).toContainText('(71) 98241-2339')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy()
    expect(await page.locator('a[href*="5511921404143"]').count()).toBe(0)
  }
  expect(errors).toEqual([])
})
test('navigation and lateral mobile menu work with browser back', async ({
  page,
}) => {
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  if (await menu.isVisible()) {
    await menu.click()
    await expect(page.locator('#mobile-navigation')).toBeVisible()
    await page
      .getByRole('navigation', { name: 'Navegação mobile' })
      .getByRole('link', { name: 'Quem somos' })
      .click()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible()
  } else
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Quem somos' })
      .click()
  await expect(page).toHaveURL(/quem-somos/)
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
})
test('complete reservation validates, supports two dogs and prepares one WhatsApp message', async ({
  page,
}) => {
  await page.goto('/reservar?cupom=MAISDIAS')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('data de entrada válida')
  await page.locator('#startDate').fill('2027-01-01')
  await page.locator('#endDate').fill('2027-01-06')
  await page.locator('#transport').selectOption('Buscar e levar')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  for (const [id, value] of Object.entries({
    name: 'Ana Teste',
    phone: '71999999999',
    email: 'ana@example.com',
    address: 'Rua Teste, 100, Lauro de Freitas',
    emergencyName: 'Carlos Teste',
    emergencyPhone: '71988888888',
  }))
    await page.locator(`#${id}`).fill(value)
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  const fillPet = async (index: number, name: string) => {
    for (const [key, value] of Object.entries({
      name,
      breed: 'SRD',
      age: '3',
      weight: '12',
      health: 'Sem alergias',
      medication: 'Nenhum',
      feeding: 'Ração habitual às 08h e 18h',
      notes: 'Medo de chuva',
    }))
      await page.locator(`#pet-${index}-${key}`).fill(value)
    for (const [key, value] of Object.entries({
      size: 'Médio',
      sex: 'Macho',
      neutered: 'Sim',
      vaccination: 'Em dia — apresentarei a carteira',
      parasite: 'Em dia',
      behavior: 'Sociável',
    }))
      await page.locator(`#pet-${index}-${key}`).selectOption(value)
  }
  await fillPet(0, 'Bento')
  await page.getByRole('button', { name: 'Adicionar outro cão' }).click()
  await fillPet(1, 'Mel')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(
    page.getByRole('complementary', { name: 'Estimativa da reserva' }),
  ).toContainText('900,00')
  const final = page.getByRole('link', {
    name: 'Abrir solicitação no WhatsApp',
  })
  await final.click()
  await expect(page.getByRole('alert')).toContainText('autoriza compartilhar')
  await page.locator('#payment').selectOption('Cartão de crédito')
  await page.locator('#notes').fill('Favor combinar a busca')
  await page.getByRole('checkbox').check()
  const destination = new URL((await final.getAttribute('href'))!)
  expect(destination.pathname).toBe('/5571982412339')
  const text = destination.searchParams.get('text')!
  for (const value of [
    'Ana Teste',
    'Carlos Teste',
    'Bento',
    'Mel',
    '900,00',
    'Cartão de crédito',
    'Favor combinar a busca',
    'Ração habitual',
    'Buscar e levar',
  ])
    expect(text).toContain(value)
  await page.getByText('Ver a mensagem completa que será preparada').click()
  await expect(page.locator('pre')).toContainText('SOLICITAÇÃO DE RESERVA')
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur()
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.screenshot({
    path: `qa/reservation-${test.info().project.name}.png`,
    fullPage: true,
  })
  // No external message is sent during QA.
})
test('daycare preselection and visual pages', async ({ page }) => {
  await page.goto('/reservar?servico=daycare')
  await expect(page.getByRole('radio', { name: /Creche/ })).toBeChecked()
  for (const route of ['/quem-somos', '/servicos', '/promocoes', '/contato']) {
    await page.goto(route)
    await expect(page.locator('main h1')).toBeVisible()
    await page.evaluate(async () => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>('main img'),
      )
      images.forEach((image) => {
        image.loading = 'eager'
      })
      await Promise.all(images.map((image) => image.decode()))
    })
    await page.screenshot({
      path: `qa/${route.slice(1)}-${test.info().project.name}.png`,
      fullPage: true,
    })
  }
})
