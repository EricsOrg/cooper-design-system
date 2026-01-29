import { defineConfig } from '@playwright/test';

// Lightweight visual regression for v0:
// - Runs against a locally started Next.js server (see webServer)
// - Uses Playwright's built-in snapshot comparison (toHaveScreenshot)
// - Baselines live in the test snapshot folder (tracked in git)

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    // Make screenshots as deterministic as possible across CI runs.
    // Keep a small tolerance for rare subpixel/font rasterization differences.
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
    },
  },
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',

    // Determinism knobs for visual regression.
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
