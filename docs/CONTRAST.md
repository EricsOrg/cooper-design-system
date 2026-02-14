# Color Contrast Table

**Goal:** Ensure UI text and controls meet WCAG AA.

| Token Pair | Use | Target | Status |
|---|---|---|---|
| `--foreground` on `--background` | Body text | AA (4.5:1) | TBD |
| `--primary-foreground` on `--primary` | Buttons | AA (4.5:1) | TBD |
| `--muted-foreground` on `--muted` | Secondary text | AA (4.5:1) | TBD |
| `--accent-foreground` on `--accent` | Accent text | AA (4.5:1) | TBD |
| `--destructive` on `--background` | Error text | AA (4.5:1) | TBD |

## How to update this table
1. Open the docs page that uses the token pair.
2. Measure contrast using one of:
   - Chrome DevTools → **Elements** → **Styles** → click the color swatch (shows contrast ratio).
   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
3. Replace `TBD` with the measured ratio (e.g. `4.8:1`) and note any exceptions.

## Notes
- Fill in actual contrast ratios once colors are finalized.
- If any pair fails, adjust lightness or choose alternate semantic tokens.
