# Cooper Design System — Gap Analysis

**Date:** 2026-02-06

## Summary
The DS codebase already contains the majority of atoms and molecules. The primary gaps are **documentation, checklist accuracy, and QA coverage**, not missing components.

## Atoms (code present)
- Button, Input, Badge, Icon, Link, Divider, Spinner
- Tokens: `src/styles/tokens.css`

### Atom Gaps
- Typography scale + usage docs
- Color contrast table
- Spacing/radii/shadows/motion usage docs

## Molecules (code present)
- Form Field, Select/Combobox, Checkbox/Radio/Toggle, Input Group
- Inline Message/Alerts, Toasts
- Breadcrumbs, Pagination, Tabs, Tooltip/Popover, Dropdown Menu

### Molecule Gaps
- Checklist + docs coverage (most exist but not reflected in CHECKLIST.md)

## Next Actions
1) Reconcile CHECKLIST.md with actual repo inventory.
2) Add/expand component docs for atoms + molecules.
3) Add QA checklist + a11y notes for each component.
