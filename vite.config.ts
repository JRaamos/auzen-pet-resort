import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawUrl = (
    process.env.VITE_SITE_URL ||
    env.VITE_SITE_URL ||
    'https://auzen-pet-resort.vercel.app'
  ).trim()
  const parsedUrl = rawUrl ? new URL(rawUrl) : null
  if (
    parsedUrl &&
    (!['https:', 'http:'].includes(parsedUrl.protocol) ||
      parsedUrl.username ||
      parsedUrl.password ||
      parsedUrl.search ||
      parsedUrl.hash ||
      parsedUrl.pathname !== '/')
  ) {
    throw new Error(
      'VITE_SITE_URL must be an HTTP(S) origin, without credentials, path, query, or fragment.',
    )
  }
  const siteUrl = parsedUrl?.origin ?? ''

  return {
    plugins: [
      react(),
      {
        name: 'auzen-seo-meta',
        transformIndexHtml(html) {
          if (!siteUrl) return html

          return {
            html: html.replace(
              'content="/images/hero-garden-1600.jpg"',
              `content="${siteUrl}/images/hero-garden-1600.jpg"`,
            ),
            tags: [
              {
                tag: 'link',
                attrs: { rel: 'canonical', href: `${siteUrl}/` },
                injectTo: 'head',
              },
              {
                tag: 'meta',
                attrs: { property: 'og:url', content: `${siteUrl}/` },
                injectTo: 'head',
              },
            ],
          }
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
          })
          if (siteUrl) {
            const paths = [
              '/',
              '/quem-somos',
              '/servicos',
              '/promocoes',
              '/espaco',
              '/contato',
              '/informacoes',
              '/reservar',
            ]
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${siteUrl}${path}</loc></url>`).join('')}</urlset>\n`,
            })
          }
        },
      },
    ],
  }
})
