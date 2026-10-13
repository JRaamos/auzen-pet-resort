import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { pageMetadata, publicPaths } from '../.ssr/entry-server.js'
const titles = new Set()
for (const path of [...publicPaths, '/404']) {
  const html = await readFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, 'utf8')
  assert.match(html, /<main[^>]*>[\s\S]+<h1/)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, path)
  assert.match(html, new RegExp(`rel="canonical" href="https://auzenpetresort.com.br${path}"`))
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
  assert.ok(title && !titles.has(title), `${path}: unique title`)
  titles.add(title)
  if (pageMetadata[path]) assert.match(html, /content="index,follow"/)
  else assert.match(html, /content="noindex,follow"/)
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const graph = JSON.parse(match[1])['@graph']
    const business = graph.find(item => item['@type'] === 'LocalBusiness')
    assert.equal(business.address.postalCode, '42725-430')
    assert.equal(business.openingHoursSpecification[0].dayOfWeek.length, 7)
    assert.equal(business.openingHoursSpecification[0].closes, '17:00')
    if (path.startsWith('/guias/')) {
      const article = graph.find(item => item['@type'] === 'Article')
      assert.ok(article && html.includes(article.headline), `${path}: visible article headline`)
      assert.equal(graph.find(item => item['@type'] === 'BreadcrumbList').itemListElement.length, 3)
      assert.match(html, /<article[\s>]/)
    }
  }
  assert.ok(!html.includes('https://auzen-pet-resort.vercel.app'))
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
for (const path of publicPaths) assert.ok(sitemap.includes(`<loc>https://auzenpetresort.com.br${path}</loc>`))
assert.ok(!sitemap.includes('/404'))
console.log(`PASS: ${publicPaths.length} public pages + 404: static body, unique title, canonical, robots, schema and sitemap`)
