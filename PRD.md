# Design System Completion PRD

## Goal
Finish the Cooper Design System to be **ready to build with** across multiple products, with Atomic Design rigor (atoms/molecules perfect first), scalable components, and accessible, documented usage.

## Success Criteria (Definition of Done)
- Atomic Design coverage: **Atoms + Molecules 100% complete** with documentation + tests.
- Organisms/Templates are composable from atoms/molecules.
- Accessibility baseline: contrast checks + keyboard/focus + ARIA notes.
- Docs: component pages + usage guidance + do/don’t + examples.
- QA: regression checklist + visual review plan.

## Scope (P0)
### Atoms (perfect & complete)
- Typography (type scale, headings, paragraphs)
- Color tokens (primary/secondary/neutral/status)
- Spacing + radii + shadows + motion tokens
- Buttons (all variants + states)
- Inputs (text, number, password, search)
- Icons system + sizes
- Links + inline text styles
- Badges/Tags
- Dividers
- Loader/Spinner

### Molecules (perfect & complete)
- Form field (label, help, error)
- Select/Combobox
- Checkbox/Radio/Toggle
- Input groups (prefix/suffix, search)
- Alerts/Inline message
- Toasts
- Breadcrumbs
- Pagination
- Tabs
- Tooltip/Popover
- Dropdown menu

### DS Infrastructure
- Docs site with component pages
- Accessibility notes per component
- Examples for each component

## P1 (High Priority)
- Data table (sorting, selection, row actions)
- Filter bar + date range picker
- Stat/KPI cards + trend indicators
- Empty states (no data / no results / first run)

## P2 (Later)
- Charts (line/bar/area)
- Drawer/Sheet
- Avatar + User menu
- Audit/activity feed components

## Workstreams
- **Tech Lead:** architecture/guardrails
- **Design:** audit + missing components + token integrity
- **Frontend:** build components
- **QA:** a11y + regression

## Milestones
- PRD v1 → Checklist → First batch of atoms/molecules
