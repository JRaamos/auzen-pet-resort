import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  use: {
    baseURL: process.env.QA_BASE_URL || 'http://127.0.0.1:4178',
    headless: true,
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  reporter: 'list',
  outputDir: 'qa/test-results',
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: 'small-mobile',
      use: {
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: process.env.QA_BASE_URL
    ? undefined
    : {
        command: 'pnpm dev --host 127.0.0.1 --port 4178',
        url: 'http://127.0.0.1:4178',
        reuseExistingServer: true,
      },
})
