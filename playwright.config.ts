import { defineConfig, devices } from '@playwright/test';

// Lightweight visual regression for v0:
// - Runs against a locally started Next.js server (see webServer)
// - Uses Playwright's built-in snapshot comparison (toHaveScreenshot)
// - Baselines live in the test snapshot folder (tracked in git)

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    // Allow small diffs from subpixel rendering/font rasterization.
    toHaveScreenshot: {
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
    viewport: { width: 1280, height: 720 },
    // Reduce flake from animations/caret.
    colorScheme: 'light',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
