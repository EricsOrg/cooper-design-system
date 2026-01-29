import { test, expect, type Page } from '@playwright/test';

async function stabilizePage(page: Page) {
  // Try to reduce visual noise across runs.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  });

  // Ensure webfonts have settled before taking a screenshot.
  await page.evaluate(async () => {
    // Ensure webfonts have settled before taking a screenshot.
    if ("fonts" in document && document.fonts) {
      await document.fonts.ready
    }

    // Let layout/paint flush.
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
  })
}

test.describe('visual: design system routes', () => {
  test('design index', async ({ page }) => {
    await page.goto('/design', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');
    await stabilizePage(page);

    await expect(page).toHaveScreenshot('design-index.png', { fullPage: true });
  });

  test('overlays page + popover open', async ({ page }) => {
    await page.goto('/design/overlays', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');
    await stabilizePage(page);

    await expect(page).toHaveScreenshot('design-overlays.png', { fullPage: true });

    // Open a popover (overlay state screenshot).
    const openPopover = page.getByRole('button', { name: /^open popover$/i }).first();
    if (await openPopover.count()) {
      await openPopover.click();
      // Radix PopoverContent is rendered in a portal; wait for some content.
      await page.getByText('Quick settings').waitFor({ state: 'visible' });
      await stabilizePage(page);
      await expect(page).toHaveScreenshot('design-overlays-popover-open.png', { fullPage: true });
    }
  });
});
