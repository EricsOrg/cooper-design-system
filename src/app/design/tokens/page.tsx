import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const typeScale = [
  { label: "text-xs", className: "text-xs" },
  { label: "text-sm", className: "text-sm" },
  { label: "text-base", className: "text-base" },
  { label: "text-lg", className: "text-lg" },
  { label: "text-xl", className: "text-xl" },
  { label: "text-2xl", className: "text-2xl" },
  { label: "text-3xl", className: "text-3xl" },
  { label: "text-4xl", className: "text-4xl" },
  { label: "text-5xl", className: "text-5xl" },
] as const

const spaceScale = [
  { n: 0, sizeClass: "h-0 w-0" },
  { n: 1, sizeClass: "h-1 w-1" },
  { n: 2, sizeClass: "h-2 w-2" },
  { n: 3, sizeClass: "h-3 w-3" },
  { n: 4, sizeClass: "h-4 w-4" },
  { n: 5, sizeClass: "h-5 w-5" },
  { n: 6, sizeClass: "h-6 w-6" },
  { n: 8, sizeClass: "h-8 w-8" },
  { n: 10, sizeClass: "h-10 w-10" },
  { n: 12, sizeClass: "h-12 w-12" },
  { n: 16, sizeClass: "h-16 w-16" },
  { n: 20, sizeClass: "h-20 w-20" },
  { n: 24, sizeClass: "h-24 w-24" },
] as const

const shadowScale = [
  { label: "shadow-2xs", className: "shadow-2xs" },
  { label: "shadow-xs", className: "shadow-xs" },
  { label: "shadow-sm", className: "shadow-sm" },
  { label: "shadow-md", className: "shadow-md" },
  { label: "shadow-lg", className: "shadow-lg" },
  { label: "shadow-xl", className: "shadow-xl" },
] as const

export default function TokensPage() {
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
            description="Visual smoke-test for our token-driven foundations. Tailwind utilities are mapped to CSS custom properties in src/styles/tokens.css + app/globals.css."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">tokens.css</Badge>
            <Badge variant="outline">Tailwind v4 @theme inline</Badge>
          </div>

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography scale</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  The public API is Tailwind’s <span className="font-mono">text-*</span> classes.
                  Values are mapped from <span className="font-mono">--type-*</span> tokens.
                </p>

                <div className="grid gap-4">
                  {typeScale.map((t) => (
                    <div
                      key={t.label}
                      className="grid gap-1 rounded-lg border bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium">{t.label}</p>
                        <p className="text-xs font-mono text-muted-foreground">{t.className}</p>
                      </div>
                      <p className={t.className}>
                        The quick brown fox jumps over the lazy dog.
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 rounded-lg border bg-muted/20 p-4">
                  <p className="text-sm font-medium">Heading rules</p>
                  <p className="text-sm text-muted-foreground">
                    Headings use <span className="font-mono">--heading-*</span> tokens and are styled
                    globally in <span className="font-mono">app/globals.css</span>.
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
                  Tailwind spacing is driven by <span className="font-mono">--spacing</span>.
                  We set <span className="font-mono">--spacing = --space-1</span> (4px).
                </p>

                <div className="grid gap-3">
                  {spaceScale.map((s) => (
                    <div
                      key={s.n}
                      className="flex items-center gap-4 rounded-lg border bg-card p-4"
                    >
                      <div
                        className={
                          "shrink-0 rounded bg-brand/20 ring-1 ring-brand/20 " +
                          s.sizeClass
                        }
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {s.n}{" "}
                          <span className="text-muted-foreground">(w-{s.n} / p-{s.n})</span>
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">--space-{s.n}</p>
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
                  Shadows map to <span className="font-mono">--elevation-*</span> tokens.
                  Overlays can reuse the shared scrim/blur tokens.
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {shadowScale.map((s) => (
                    <div
                      key={s.label}
                      className={
                        "rounded-xl border bg-card p-4 " +
                        s.className
                      }
                    >
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="mt-1 text-xs font-mono text-muted-foreground">
                        {s.className}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Use for panels, menus, modals, and floating UI.
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-xl border bg-muted/10 p-6">
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">Backdrop scrim</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-mono">--backdrop-scrim</span> +
                      <span className="font-mono"> --backdrop-blur</span>
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
