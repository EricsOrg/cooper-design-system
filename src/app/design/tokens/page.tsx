import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDesignTokens } from "@/lib/design-tokens"

function getTextUtility(label: string) {
  return label === "base" ? "text-base" : `text-${label}`
}

function getElevationUtilityHints(n: number) {
  switch (n) {
    case 0:
      return "shadow-none"
    case 1:
      return "shadow-2xs / shadow-xs"
    case 2:
      return "shadow / shadow-sm"
    case 3:
      return "shadow-md"
    case 4:
      return "shadow-lg"
    case 5:
      return "shadow-xl / shadow-2xl"
    default:
      return ""
  }
}

export default async function TokensPage() {
  const { typeScale, spacingScale, elevationScale } = await getDesignTokens()

  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Foundations</p>
            <h1 className="text-xl font-semibold tracking-tight">/design/tokens</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/design">Back to /design</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Tokens (Typography • Spacing • Elevation)"
            description="Visual smoke-test for token-driven foundations. Source of truth: src/styles/tokens.css. Tailwind mapping: src/app/globals.css (@theme inline)."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">src/styles/tokens.css</Badge>
            <Badge variant="outline">Tailwind v4 @theme inline</Badge>
          </div>

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography scale</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Public API: Tailwind <span className="font-mono">text-*</span> utilities. Values
                  come from <span className="font-mono">--type-*</span> tokens.
                </p>

                <div className="grid gap-4">
                  {typeScale.map((t) => {
                    const utility = getTextUtility(t.label)

                    return (
                      <div key={t.label} className="grid gap-3 rounded-lg border bg-card p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium">{utility}</p>
                          <p className="text-xs font-mono text-muted-foreground">
                            {t.sizeToken} / {t.lineToken}
                          </p>
                        </div>

                        <p className={utility}>The quick brown fox jumps over the lazy dog.</p>

                        <div className="grid gap-2 rounded-md border bg-muted/20 p-3">
                          <p className="text-xs font-medium text-muted-foreground">
                            Source of truth
                          </p>
                          <pre className="overflow-x-auto text-xs leading-relaxed" tabIndex={0}>
                            <code className="font-mono text-foreground">
                              {`${t.sizeToken}: ${t.size};\n${t.lineToken}: ${t.line};`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="grid gap-2 rounded-lg border bg-muted/20 p-4">
                  <p className="text-sm font-medium">Heading rules</p>
                  <p className="text-sm text-muted-foreground">
                    Headings use <span className="font-mono">--heading-*</span> tokens and are
                    styled globally in <span className="font-mono">src/app/globals.css</span>.
                  </p>
                  <div className="grid gap-3">
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing scale</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Tailwind spacing is driven by <span className="font-mono">--spacing</span>. We
                  set <span className="font-mono">--spacing = --space-1</span> (4px).
                </p>

                <div className="grid gap-3">
                  {spacingScale.map((s) => (
                    <div key={s.token} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                      <div
                        className="shrink-0 rounded bg-brand/20 ring-1 ring-brand/20"
                        style={{ width: `var(${s.token})`, height: `var(${s.token})` }}
                        title={`${s.token} (${s.value})`}
                        aria-hidden
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium">
                            {s.token} <span className="text-muted-foreground">({s.value})</span>
                          </p>
                          <p className="text-xs font-mono text-muted-foreground">
                            p-{s.n} / gap-{s.n} (via --spacing)
                          </p>
                        </div>

                        <div className="mt-2 rounded-md border bg-muted/20 p-3">
                          <pre className="overflow-x-auto text-xs leading-relaxed" tabIndex={0}>
                            <code className="font-mono text-foreground">{`${s.token}: ${s.value};`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Elevation + backdrops</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Elevation is defined by <span className="font-mono">--elevation-*</span> tokens.
                  Tailwind shadow utilities map to these tokens in{" "}
                  <span className="font-mono">src/app/globals.css</span>.
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {elevationScale.map((e) => (
                    <div
                      key={e.token}
                      className="rounded-xl border bg-card p-4"
                      style={{ boxShadow: `var(${e.token})` }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium">{e.token}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {getElevationUtilityHints(e.n)}
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Use for panels, menus, modals, and floating UI.
                      </p>

                      <div className="mt-3 rounded-md border bg-muted/20 p-3">
                        <pre className="overflow-x-auto text-xs leading-relaxed" tabIndex={0}>
                          <code className="font-mono text-foreground">{`${e.token}: ${e.value};`}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-xl border bg-muted/10 p-6">
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">Backdrop scrim</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-mono">--backdrop-scrim</span> +{" "}
                      <span className="font-mono">--backdrop-blur</span>
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border bg-card p-4 shadow-sm">
                      <p className="text-sm font-medium">Underlying content</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Imagine this is the page under a modal.
                      </p>
                    </div>
                    <div className="relative rounded-xl border bg-card p-4 shadow-sm">
                      <div
                        className="absolute inset-0 rounded-xl bg-[color:var(--backdrop-scrim)] backdrop-blur-[var(--backdrop-blur)]"
                        aria-hidden
                      />
                      <div className="relative">
                        <p className="text-sm font-medium">Scrim + blur</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Tokenized overlay layer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
