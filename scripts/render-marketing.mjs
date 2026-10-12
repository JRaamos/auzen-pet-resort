import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { chromium } from '@playwright/test'
const root = process.cwd()
const server = createServer(async (req, res) => {
  const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
  if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return }
  try { const file = await readFile(path); res.setHeader('Content-Type', ({ '.html':'text/html; charset=utf-8', '.json':'application/json', '.jpg':'image/jpeg', '.woff2':'font/woff2' })[extname(path)] || 'application/octet-stream'); res.end(file) } catch { res.writeHead(404).end() }
})
await new Promise(done => server.listen(0, '127.0.0.1', done))
const browser = await chromium.launch()
try {
  await mkdir('docs/marketing/assets', { recursive:true })
  const page = await browser.newPage({ viewport:{width:1800,height:1500}, deviceScaleFactor:1 })
  await page.goto(`http://127.0.0.1:${server.address().port}/docs/marketing/social-preview.html`)
  await page.waitForSelector('html[data-ready="true"]')
  await page.locator('#facebook-cover').evaluate(cover => {
    cover.style.width = '1640px'
    cover.style.height = '624px'
    const photo = cover.querySelector('img')
    photo.src = '/public/images/garden-dog-900.jpg'
    photo.alt = 'Cão no jardim real do Auzen Pet Resort'
    photo.style.objectPosition = 'center 72%'
    cover.querySelector('.copy').style.top = '240px'
  })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.post img').evaluateAll(images => Promise.all(images.map(image => image.decode())))
  for (const post of await page.locator('.post').all()) {
    const id = await post.getAttribute('id')
    await post.screenshot({ path:`docs/marketing/assets/${id}.png` })
    console.log(`Rendered ${id}`)
  }
} finally { await browser.close(); server.close() }
