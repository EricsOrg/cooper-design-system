# Cooper Design System

This repo is a **Next.js** app that hosts Cooper Design System docs and UI component examples.

## Getting started

Install deps and start the dev server:

```bash
npm ci
npm run dev
```

Open http://localhost:3000

Start editing pages under `src/app/` (e.g. `src/app/page.tsx`).

## Common commands

- `npm test` → runs the full CI suite (lint + typecheck + Playwright a11y + visual)
- `npm run test:quick` → fast local check (lint + typecheck)

## Contributing

For contribution guidelines (workflow, checks, snapshots), see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Docs

- [PRD](./PRD.md)
- [Completion Checklist](./CHECKLIST.md)
- [Design Taxonomy](./docs/DESIGN_TAXONOMY.md)
- [Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)

## Visual regression tests (Playwright)

This repo includes lightweight Playwright screenshot tests for key `/design` routes.

### One-time setup

```bash
npm ci

# installs browsers (and Linux deps in CI)
npx playwright install --with-deps
```

### Run visual tests

```bash
npm run test:visual
```

### Update baselines (approve new screenshots)

```bash
npm run test:visual:update
```

Baselines are stored as Playwright snapshots under `tests/visual/**/*-snapshots/` and are committed to git.

More details (including CI + determinism notes): see [`docs/visual-regression.md`](./docs/visual-regression.md).

Tips:
- If you changed component styles intentionally, run `test:visual:update` and commit the updated snapshots.
- If you only want to re-generate a single test, pass `-g`:
  ```bash
  npx playwright test -g "overlays" --update-snapshots
  ```

## Accessibility smoke tests (axe + Playwright)

This repo includes a fast accessibility smoke suite for `/design/*` using `@axe-core/playwright`.

### Run a11y smoke tests

```bash
npm run test:a11y
```

Notes:
- Runs against a production build (`next build` + `next start`) on a fixed port (default `3101`).
- Only fails on **serious/critical** axe violations (smoke-level).
- `color-contrast` is intentionally excluded from this smoke suite (too noisy for docs pages); track it separately.
- If you need a different port, set `PW_PORT`.
