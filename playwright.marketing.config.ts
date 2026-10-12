import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/marketing', fullyParallel: true, reporter: 'list', outputDir: 'qa/marketing-tests',
  use: { headless: true, reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [
    { name: 'ga4-desktop', use: { baseURL: 'http://127.0.0.1:4180', viewport: { width: 1440, height: 1000 } } },
    { name: 'ga4-mobile', use: { baseURL: 'http://127.0.0.1:4180', viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true } },
    { name: 'gtm-tablet', use: { baseURL: 'http://127.0.0.1:4181', viewport: { width: 768, height: 1024 } } },
  ],
  webServer: [
    { command: 'pnpm dev --host 127.0.0.1 --port 4180 --strictPort', url: 'http://127.0.0.1:4180', env: { VITE_GA4_ID: 'G-TESTAUZEN', VITE_GTM_ID: '', VITE_ANALYTICS_DEBUG: 'true' }, reuseExistingServer: false },
    { command: 'pnpm dev --host 127.0.0.1 --port 4181 --strictPort', url: 'http://127.0.0.1:4181', env: { VITE_GA4_ID: 'G-TESTAUZEN', VITE_GTM_ID: 'GTM-TESTAUZEN', VITE_ANALYTICS_DEBUG: 'true' }, reuseExistingServer: false },
  ],
})
