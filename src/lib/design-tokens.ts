import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

type TokenMap = Record<string, string>

function parseCssCustomProperties(css: string): TokenMap {
  const tokens: TokenMap = {}
  const re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null

  // Intentionally simple: tokens.css is authored in a predictable format and we
  // want the literal source-of-truth strings for docs.
  while ((match = re.exec(css)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim()
  }

  return tokens
}

export const getDesignTokens = cache(async () => {
  const tokensPath = path.join(process.cwd(), "src", "styles", "tokens.css")
  const css = await fs.readFile(tokensPath, "utf8")
  const tokens = parseCssCustomProperties(css)

  const typeScale = Object.keys(tokens)
    .filter((k) => k.startsWith("--type-") && k.endsWith("-size"))
    .map((k) => {
      const label = k.replace(/^--type-/, "").replace(/-size$/, "")
      return {
        label,
        sizeToken: k,
        lineToken: `--type-${label}-line`,
        size: tokens[k],
        line: tokens[`--type-${label}-line`],
      }
    })
    .sort((a, b) => {
      const order = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
      ]
      return order.indexOf(a.label) - order.indexOf(b.label)
    })

  const spacingScale = Object.keys(tokens)
    .filter((k) => k.startsWith("--space-"))
    .map((k) => ({
      n: Number(k.replace(/^--space-/, "")),
      token: k,
      value: tokens[k],
    }))
    .filter((s) => Number.isFinite(s.n))
    .sort((a, b) => a.n - b.n)

  const elevationScale = Object.keys(tokens)
    .filter((k) => k.startsWith("--elevation-"))
    .map((k) => ({
      n: Number(k.replace(/^--elevation-/, "")),
      token: k,
      value: tokens[k],
    }))
    .filter((e) => Number.isFinite(e.n))
    .sort((a, b) => a.n - b.n)

  return { tokens, typeScale, spacingScale, elevationScale }
})
