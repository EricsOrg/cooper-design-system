# Design System Taxonomy (Atomic Design)

## Principles
- **Atoms & Molecules are the quality bar.** They must be perfect, documented, and accessible.
- **Organisms are composed, not bespoke.** Build from atoms/molecules; no new styles there.
- **Tokens are the source of truth.** Color, type, spacing, motion, radii, shadows.

## Inventory (v1)

### Atoms (foundation + primitives)
- Typography (type scale + headings + body)
- Color tokens (primary/secondary/neutral/status)
- Spacing + radii + shadows + motion tokens
- Button (variants, sizes, states)
- Input (text, number, password, search)
- Icon system + sizing
- Links + inline text styles
- Badge/Tag
- Divider
- Loader/Spinner

### Molecules (composed controls)
- Form field (label/help/error)
- Select/Combobox
- Checkbox/Radio/Toggle
- Input group (prefix/suffix)
- Alerts/Inline messages
- Toasts
- Breadcrumbs
- Pagination
- Tabs
- Tooltip/Popover
- Dropdown menu

### Organisms/Templates (layout patterns)
- Data table (sorting/selection/row actions)
- Filter bar + date range picker
- KPI cards + trends
- Empty states (no data / no results / first run)
- App shell / navigation

## Suggested Code Organization
```
src/
  tokens/
  ui/
    atoms/
    molecules/
  ds/
    organisms/
    templates/
```

## Quality Gates (Required)
- A11y: keyboard nav + focus + ARIA notes + contrast checks
- Docs: usage guidance + do/don’t + examples
- Tests: basic rendering + interactions + a11y scan
