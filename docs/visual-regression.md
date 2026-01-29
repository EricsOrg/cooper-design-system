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

## Determinism / reducing flake

The Playwright config is tuned for repeatable screenshots:

- Fixed viewport (1280×720) and `deviceScaleFactor: 1`
- `animations: 'disabled'` + `reducedMotion: 'reduce'`
- Fixed locale/timezone (`en-US`, `UTC`)
- CI installs a consistent Noto font set on Linux

If you see unexpected diffs, check for:
- a missing `await document.fonts.ready` before screenshots
- components with time-based rendering (dates, random IDs, async skeletons)

## CI (GitHub Actions)

- The workflow runs on PRs, can be triggered manually, and also runs nightly on the default branch.
- On failure, CI uploads Playwright artifacts (`test-results/**` and `playwright-report/**`) so you can inspect diffs/screenshots and traces.
