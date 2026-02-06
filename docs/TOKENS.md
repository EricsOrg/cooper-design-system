# Tokens Usage Guide

**Scope:** spacing, radii, shadows/elevation, motion, semantic colors.

## Spacing
Use the scale from `--space-0` through `--space-24` for padding, margins, and gaps.
- Small controls: `--space-2`–`--space-4`
- Cards/panels: `--space-4`–`--space-8`
- Section spacing: `--space-12`–`--space-24`

## Radii
Use the base radius (`--radius`) and derive component-specific radii via Tailwind classes.
- Buttons/inputs: `rounded-[var(--radius)]`
- Cards/modals: `rounded-lg` or `rounded-[calc(var(--radius)+2px)]`

## Elevation / Shadows
Use `--elevation-0` … `--elevation-5` for consistent depth.
- Inputs/menus: `--elevation-1`–`--elevation-2`
- Dropdowns/modals: `--elevation-3`–`--elevation-4`
- Heavy overlays: `--elevation-5`

## Motion
Use duration + easing tokens; respect reduced-motion.
- Fast: `--motion-duration-fast` for hovers, focus
- Medium: `--motion-duration-medium` for open/close
- Ease: `--motion-ease-standard`

## Semantic Colors
Use semantic variables (`--background`, `--foreground`, `--primary`, etc.).
Avoid hard-coded color values in components.

## Implementation Notes
Tokens are defined in `src/styles/tokens.css` and mapped in `app/globals.css`.
