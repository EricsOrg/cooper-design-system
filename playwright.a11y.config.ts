import { defineConfig, devices } from '@playwright/test';

// A11y smoke tests run against a production build (next build + next start)
// on a fixed port to keep results consistent and CI-friendly.

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3101;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.a11y\.spec\.ts/,
  timeout: 60_000,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    colorScheme: 'light',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
