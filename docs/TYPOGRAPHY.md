# Typography

## Goals
- Provide a consistent, scalable type system for UI and docs.
- Establish token names that map cleanly to CSS variables and component usage.
- Keep the scale compact (UI-first) while allowing a couple of display sizes.

## Type Scale (Step Size ≈ 1.2)
> Base: 16px. Line-height defaults target readable UI rhythm.

| Token | Name | Size | Line Height | Weight (default) | Use |
|---|---|---:|---:|---|---|
| `--font-size-xs` | XS | 12px | 16px | 400 | Metadata, helper text |
| `--font-size-sm` | SM | 14px | 20px | 400 | Secondary labels, captions |
| `--font-size-md` | MD | 16px | 24px | 400 | Body text, form labels |
| `--font-size-lg` | LG | 18px | 28px | 500 | Section titles, emphasized text |
| `--font-size-xl` | XL | 20px | 28px | 600 | Card titles, modal titles |
| `--font-size-2xl` | 2XL | 24px | 32px | 600 | Page titles |
| `--font-size-3xl` | 30px | 36px | 700 | Display (marketing) |

### Notes
- Keep weights lightweight in UI: 400/500 for body/labels, 600 for headings, 700 for display.
- Line-height is defined as px for predictable alignment; components can override.

## Token Map (CSS)
```css
:root {
  --font-family-sans: "Inter", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  --font-family-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New";

  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;

  --line-height-xs: 16px;
  --line-height-sm: 20px;
  --line-height-md: 24px;
  --line-height-lg: 28px;
  --line-height-xl: 28px;
  --line-height-2xl: 32px;
  --line-height-3xl: 36px;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

## Usage Guidance
- **Body text:** `md` / 16px / line-height 24px.
- **Buttons:** `sm`–`md` sizes depending on density.
- **Form labels:** `sm` or `md` depending on control size.
- **Card titles:** `lg` or `xl` with semibold weight.
- **Page titles:** `2xl` for product surfaces.

## Component Mapping (Draft)
| Component | Default Token | Notes |
|---|---|---|
| Button | `sm`/`md` | Size based on density variants |
| Input | `md` | Placeholder in `sm` or 400 weight |
| Card title | `lg` | Use semibold |
| Modal title | `xl` | Use semibold |
| Toast title | `md` | Use semibold |

## Next Steps
- Validate with Riley’s audit findings (font families + display usage).
- Confirm scale with Casey before component build.
- Add to token files once token structure is locked.
