/**
 * Cooper Design System — v0 tokens
 *
 * Source of truth for token names used across JS/TS.
 * CSS values live in `src/styles/tokens.css`.
 */

export const cssVar = (name: `--${string}`) => `var(${name})` as const

export const tokens = {
  radius: {
    base: "--radius",
  },
  color: {
    background: "--background",
    foreground: "--foreground",

    card: "--card",
    cardForeground: "--card-foreground",

    popover: "--popover",
    popoverForeground: "--popover-foreground",

    primary: "--primary",
    primaryForeground: "--primary-foreground",

    secondary: "--secondary",
    secondaryForeground: "--secondary-foreground",

    muted: "--muted",
    mutedForeground: "--muted-foreground",

    accent: "--accent",
    accentForeground: "--accent-foreground",

    destructive: "--destructive",

    border: "--border",
    input: "--input",
    ring: "--ring",

    /** Cooper DS semantic */
    brand: "--brand",
    brandForeground: "--brand-foreground",
    surface: "--surface",
    surfaceForeground: "--surface-foreground",
  },
  motion: {
    durationFast: "--motion-duration-fast",
    durationMedium: "--motion-duration-medium",
    durationSlow: "--motion-duration-slow",
    easeStandard: "--motion-ease-standard",
  },
} as const

export type Tokens = typeof tokens

type LeafValues<T> = T extends object
  ? { [K in keyof T]: LeafValues<T[K]> }[keyof T]
  : T

export type TokenName = LeafValues<Tokens>

/**
 * Convenience helpers for inline styles.
 *
 * Example:
 *   style={{ background: tokenValue(tokens.color.background) }}
 */
export const tokenValue = (token: TokenName) => cssVar(token)
