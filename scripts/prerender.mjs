import { readFile, writeFile } from 'node:fs/promises'
import { render, pageMetadata, publicPaths, notFoundMetadata, siteConfig } from '../.ssr/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const path of [...publicPaths, '/404']) {
  const metadata = pageMetadata[path] || notFoundMetadata
  const { body, styles } = await render(path)
  const url = `${siteConfig.siteUrl}${path}`
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`)
  for (const [key, value] of Object.entries({ description: metadata.description, 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': url, 'og:image': `${siteConfig.siteUrl}/images/${metadata.image || 'hero-garden-1600.jpg'}` })) {
    html = html.replace(new RegExp(`<meta\\s+(?:name|property)="${key}"\\s+content="[^"]*"\\s*/?>`, 'g'), `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`)
  }
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  if (path !== '/') html = html.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?>/g, '')
  html = html.replace('</head>', `${styles}<meta name="robots" content="${path === '/404' ? 'noindex,follow' : 'index,follow'}" /><meta name="twitter:title" content="${escape(metadata.title)}" /><meta name="twitter:description" content="${escape(metadata.description)}" /><meta name="twitter:image" content="${siteConfig.siteUrl}/images/${metadata.image || 'hero-garden-1600.jpg'}" /><noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript></head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  if (path === '/reservar') html = html.replace('<body>', '<body><noscript><p>Para preencher a reserva, ative o JavaScript ou <a href="https://wa.me/5571993972239">converse com o Auzen pelo WhatsApp</a>.</p></noscript>')
  await writeFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, html)
  console.log(`Prerendered ${path}`)
}
