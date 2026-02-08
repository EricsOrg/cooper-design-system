# Contributing

Thanks for helping improve the Cooper Design System.

This repo is a **Next.js** app that hosts the design-system docs and UI component examples.

## Prerequisites

- Node.js 20+ (CI uses Node 20)
- npm (this repo is currently locked via `package-lock.json`)

## Setup

```bash
npm ci
```

Run the dev server:

```bash
npm run dev
```

## Project structure (high level)

- `src/components/ds/` – design-system primitives/components
- `src/components/ui/` – app/docs UI components
- `src/design-system/` – tokens, utilities, and DS-specific modules
- `src/app/` – Next.js routes (including `/design/*`)
- `docs/` – engineering notes (e.g. visual regression details)
- `tests/` – Playwright test suites (visual + a11y)

## Development workflow

1. Create a branch from the default branch (`master`)
2. Keep changes focused and small when possible
3. Add/update docs pages when behavior or API changes
4. Run the checks below before opening a PR

### Troubleshooting: `git pull` fails with missing upstream ref

If you see something like:

> Your configuration specifies to merge with the ref ... but no such ref was fetched.

…it usually means your local branch is tracking a remote branch that was deleted.

Fix (safe defaults):

```bash
# update your local view of remote branches, including deletions
git fetch --prune

# (optional) see which local branches have a deleted upstream
# git branch -vv | rg ': gone]'

# either switch back to the default branch
git checkout master

# or, on your current branch, detach the missing upstream
git branch --unset-upstream
```

Then re-run `git pull` (or `git pull --rebase`).

### Local checks

Lint:

```bash
npm run lint
# autofix where possible
npm run lint:fix
```

Typecheck:

```bash
npm run typecheck
```

Accessibility smoke (axe + Playwright):

```bash
npm run test:a11y
```

Visual regression (Playwright screenshots):

```bash
npm run test:visual
```

If your change intentionally updates visuals, update baselines and commit the snapshots:

```bash
npm run test:visual:update
```

## Coding standards

### TypeScript / React

- Prefer **explicit, exported component props** (`type`/`interface`) with docs-worthy naming.
- Avoid breaking changes when possible; if unavoidable, call them out clearly in the PR.
- Keep components accessible by default:
  - Ensure keyboard interaction works
  - Provide sensible ARIA labeling hooks
  - Avoid removing focus outlines without replacement

### Styling

- Prefer tokens/utilities from `src/design-system/` over ad-hoc values.
- Keep class lists readable; extract variants via utilities (e.g. CVA) when complexity grows.

### Tests

- For UI changes: update/add Playwright coverage when it meaningfully reduces regressions.
- For accessibility: a11y smoke is intended to be **fast**; avoid adding noisy rules.

## Commit / PR guidance

- Write PR titles that explain the user-visible intent (e.g. `Button: add loading state`)
- Use the PR template (auto-populated on GitHub)
- Include screenshots for visual changes (before/after)
- If you updated snapshots, mention it explicitly

## Releasing / deployment

This repo is deployed via Vercel/Next.js. If your change affects runtime behavior, include any migration notes in the PR.
