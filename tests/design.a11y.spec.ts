import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type Route = {
  name: string;
  path: string;
  // Whether we expect the left nav / pagination etc. to mark an active item.
  expectAriaCurrent?: boolean;
};

const routes: Route[] = [
  { name: 'Design', path: '/design' },
  { name: 'Overlays', path: '/design/overlays' },
  { name: 'Navigation', path: '/design/navigation', expectAriaCurrent: true },
  { name: 'Forms', path: '/design/forms' },
  { name: 'Roadmap', path: '/design/roadmap' },
  { name: 'Tokens', path: '/design/tokens' },
  { name: 'Data', path: '/design/data' },
];

// Smoke-level allowlist for known acceptable issues.
// Keep this small and well-documented — we only allowlist with a clear reason.
//
// Format: route path -> violation ids.
const allowlist: Record<string, string[]> = {
  // Example:
  // '/design/forms': [
  //   // Radix demo: nested interactive elements in a sandboxed demo container.
  //   'nested-interactive',
  // ],
};

function isAllowlisted(routePath: string, violationId: string) {
  return allowlist[routePath]?.includes(violationId) ?? false;
}

test.describe('a11y smoke: /design/*', () => {
  for (const route of routes) {
    test(route.name, async ({ page, baseURL }) => {
      const response = await page.goto(route.path, { waitUntil: 'networkidle' });

      // Some environments may not include all routes (e.g., during partial builds).
      // If a route is missing, skip rather than fail the suite.
      if (response?.status() === 404) {
        test.skip(true, `${route.path} returned 404 (route not present)`);
      }

      // Minimal regression checks for navigation/focus affordances.
      // - aria-current should be used for active nav/pagination state where applicable.
      if (route.expectAriaCurrent) {
        const ariaCurrentCount = await page.locator('[aria-current="page"]').count();
        expect(
          ariaCurrentCount,
          `Expected at least one aria-current="page" element on ${route.path} (${baseURL}${route.path})`,
        ).toBeGreaterThan(0);
      }

      // - Ensure we have at least one interactive element using focus-visible styles.
      //   This is intentionally DOM-level (classnames) to avoid brittle computed-style checks.
      const focusVisibleCount = await page
        .locator(
          'a[class*="focus-visible"],button[class*="focus-visible"],[role="button"][class*="focus-visible"],input[class*="focus-visible"],select[class*="focus-visible"],textarea[class*="focus-visible"]',
        )
        .count();
      expect(
        focusVisibleCount,
        `Expected focus-visible styles to exist on ${route.path} (${baseURL}${route.path})`,
      ).toBeGreaterThan(0);

      // axe-core scan
      const results = await new AxeBuilder({ page })
        // Keep to common WCAG tags.
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // Color contrast is valuable, but it is also the noisiest for design docs.
        // We track it separately; this suite is intended to be a fast smoke test.
        .disableRules(['color-contrast'])
        .analyze();

      const seriousOrCritical = results.violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .filter((v) => !isAllowlisted(route.path, v.id));

      // Helpful, compact failure output.
      const formatted = seriousOrCritical
        .map((v) => {
          const targets = v.nodes
            .map((n) => n.target?.join(', '))
            .filter(Boolean)
            .slice(0, 3)
            .join(' | ');
          return `${v.id} (${v.impact}) - ${v.help}\n  ${v.description}\n  Targets: ${targets}`;
        })
        .join('\n\n');

      expect(
        seriousOrCritical,
        `A11y violations (serious/critical) on ${route.path} (${baseURL}${route.path})\n\n${formatted}`,
      ).toEqual([]);
    });
  }
});
