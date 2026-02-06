# Accessibility Notes (Atoms + Molecules)

## General
- All interactive elements must be keyboard accessible.
- Visible focus rings required (use `--ring`).
- Respect reduced motion settings.

## Components
- Button: focus ring, disabled state, aria-labels for icon-only.
- Input: label association, error messaging via `aria-describedby`.
- Select/Combobox: keyboard navigation, aria-expanded, role=combobox.
- Checkbox/Radio/Switch: proper role + state, label click target.
- Tooltip/Popover: `aria-describedby`, escape key closes.
- Toast/Alerts: announce via `aria-live`.

## QA Checklist (summary)
- Tab through all controls
- Screen reader labels present
- Color contrast meets AA
