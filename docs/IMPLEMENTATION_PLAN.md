# Implementation Plan (v1)

## Sequence
1. **Tokens** → define/normalize color, type, spacing, radii, shadows, motion.
2. **Atoms** → build primitives with variants/states + docs + a11y.
3. **Molecules** → compose atoms into controls + docs + a11y.
4. **Organisms** → layout patterns composed from atoms/molecules.

## First Build Batch (MVP)
- Button
- Text Input
- Card
- Modal
- Toast/Alert

## Tooling
- Storybook for docs/examples
- RTL + Axe for a11y checks
- Visual regression (Chromatic or Playwright snapshots)
- CI via GitHub Actions
- Changesets for versioning

## Definition of Done (per component)
- All variants + sizes + states
- Props/usage documented
- A11y notes + keyboard interactions
- Tests (render + interaction + a11y scan)
