# Visual regression (Playwright screenshots)

This repo uses Playwright's built-in screenshot assertions (`toHaveScreenshot`) for lightweight visual regression against `/design` routes.

## Run locally

```bash
npm ci
npm run test:visual
```

## Update baselines

When changes are intentional (new UI, different spacing, etc.), update the committed snapshots.

```bash
# Option A: direct (recommended)
npm run test:visual:update

# Option B: wrapper script
node scripts/update-visual-baselines.mjs
```

Then review the changes:

```bash
git status
git diff
```

Commit the updated `*-snapshots/*.png` files along with the code change.

## CI (GitHub Actions)

- A workflow runs on every PR.
- On failure, CI uploads Playwright artifacts (`test-results/**` and `playwright-report/**`) so you can inspect diffs/screenshots and traces.
