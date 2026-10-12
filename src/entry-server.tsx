/// <reference types="node" />
import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import { pageMetadata, publicPaths, notFoundMetadata } from './config/seo'
import { siteConfig } from './config/site'

export { pageMetadata, publicPaths, notFoundMetadata, siteConfig }
// Render the actual React routes at build time; no crawler-specific content or runtime server.
export async function render(path: string): Promise<{ body: string; styles: string }> {
  const sheet = new ServerStyleSheet()
  try {
    const body = await new Promise<string>((resolve, reject) => {
      const output = new PassThrough()
      const chunks: Buffer[] = []
      output.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      output.on('error', reject)
      const stream = renderToPipeableStream(sheet.collectStyles(
        <ThemeProvider theme={theme}><GlobalStyle /><MemoryRouter initialEntries={[path]}><App /></MemoryRouter></ThemeProvider>,
      ), {
        onAllReady() { stream.pipe(output) },
        onShellError: reject,
        onError: reject,
      })
    })
    return { body, styles: sheet.getStyleTags() }
  } finally { sheet.seal() }
}
