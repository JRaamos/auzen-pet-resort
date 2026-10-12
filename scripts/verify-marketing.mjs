import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { chromium } from '@playwright/test'
const campaign = JSON.parse(await readFile('docs/marketing/campaign-draft.json', 'utf8'))
assert.equal(campaign.activationAuthorized, false)
assert.equal(campaign.totalBudget, 150)
assert.equal(campaign.durationDays, 15)
assert.equal(campaign.status, 'PAUSED')
assert.equal(campaign.startDate, null)
assert.equal(campaign.networks.display, false)
assert.equal(campaign.networks.searchPartners, false)
assert.equal(campaign.adGroups.length, 2)
for (const group of campaign.adGroups) {
  assert.equal(group.status, 'PAUSED')
  assert.ok(group.headlines.length >= 3 && group.headlines.length <= 15)
  assert.ok(group.descriptions.length >= 2 && group.descriptions.length <= 4)
  for (const title of group.headlines) assert.ok(title.length <= 30, title)
  for (const description of group.descriptions) assert.ok(description.length <= 90, description)
  assert.ok(group.phraseKeywords.length && group.exactKeywords.length)
  assert.ok(!group.broadKeywords)
}
const posts = JSON.parse(await readFile('docs/marketing/social-content.json','utf8'))
assert.equal(posts.length, 7)
for (const post of posts) { await access(`public/images/${post.image}`); await access(`docs/marketing/assets/${post.id}.png`); assert.ok(post.caption.length > 100) }
console.log('PASS: inactive local campaign, R$150/15 days, 2 groups, RSA limits, 7 captions and rendered assets')
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 568 } })
  await page.goto(pathToFileURL(resolve('docs/marketing/results-dashboard.html')).href)
  assert.equal(await page.locator('dd').filter({ hasText: 'Indisponível' }).count(), 9)
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  const sample = { period: 'SYNTHETIC TEST ONLY', source: 'Automated fixture', visitors: 8, sessions: 10, sessionsWithWhatsappClick: 2, whatsappClicks: 3, adSpendBRL: 20, adClicks: 10, paidWhatsappClicks: 2, qualifiedLeads: null, confirmedBookings: null }
  await page.locator('#file').setInputFiles({ name: 'synthetic-test.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(sample)) })
  await page.waitForFunction(() => document.querySelector('#status').textContent.includes('SYNTHETIC TEST ONLY'))
  assert.ok((await page.locator('#metrics').textContent()).includes('20%'))
  assert.equal(await page.locator('dd').filter({ hasText: 'Indisponível' }).count(), 2)
  await page.locator('#file').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{bad}') })
  await page.waitForSelector('#status.error')
  console.log('PASS: local dashboard empty state, aggregate import, correct formulas, invalid input and 320px layout (synthetic test data only)')
} finally { await browser.close() }
