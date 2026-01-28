import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContributionStandardsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Contribution standards
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs">Back to /docs</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/design">/design</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Ship components that prove themselves"
            description="Rules of the road for adding/adjusting components in Cooper DS. Keep changes small, token-driven, and demo-backed."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Component checklist</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  A QA-focused checklist (a11y, responsiveness, theming, tokens,
                  tests, and demo requirements) for shipping components.
                </p>
                <Button asChild variant="secondary" size="sm" className="w-fit">
                  <Link href="/docs/standards/component-checklist">
                    Open component checklist
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1) Adding a new component</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    <span className="font-medium">Pick the layer:</span> 
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      <li>
                        <span className="font-mono">src/components/ui</span>: primitives
                        (shadcn/ui-style, Radix-based).
                      </li>
                      <li>
                        <span className="font-mono">src/components/ds</span>: thin DS
                        wrappers/compositions (preferred for app-facing patterns).
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Create the component file</span> and
                    export named components (no default exports).
                  </li>
                  <li>
                    <span className="font-medium">Wire exports</span>:
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      <li>
                        DS layer: add to <span className="font-mono">src/components/ds/index.ts</span>.
                      </li>
                      <li>
                        UI layer: import directly from the file (we avoid a large
                        barrel for <span className="font-mono">ui</span> to keep tree-shaking clear).
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Add/extend a demo</span> under <span className="font-mono">/design</span> proving variants,
                    states, and a11y behaviors (see below).
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2) Naming conventions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium">Files:</span> kebab-case (e.g. 
                    <span className="font-mono">empty-state.tsx</span>).
                  </li>
                  <li>
                    <span className="font-medium">Components:</span> PascalCase (e.g. 
                    <span className="font-mono">EmptyState</span>).
                  </li>
                  <li>
                    <span className="font-medium">Variants:</span> use 
                    <span className="font-mono">class-variance-authority</span> ( 
                    <span className="font-mono">cva</span>) with a predictable 
                    <span className="font-mono">variant</span> + 
                    <span className="font-mono">size</span> pattern when relevant.
                  </li>
                  <li>
                    <span className="font-medium">Data attributes:</span> add 
                    <span className="font-mono">data-slot</span> and (when useful) 
                    <span className="font-mono">data-variant</span>/ 
                    <span className="font-mono">data-size</span> for debugging and stable selectors.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3) Variants & states (minimum bar)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  Every component should intentionally support the states below (or
                  explicitly document why not).
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">default</Badge>
                  <Badge variant="secondary">hover</Badge>
                  <Badge variant="secondary">focus-visible</Badge>
                  <Badge variant="secondary">disabled</Badge>
                  <Badge variant="secondary">error/invalid</Badge>
                  <Badge variant="secondary">loading (if applicable)</Badge>
                </div>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Prefer composable props over &quot;one-off&quot; booleans. If a boolean exists,
                    it should map to a clear state.
                  </li>
                  <li>
                    Keep the public API small: start with fewer variants; add more
                    only when the catalog proves the need.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4) Accessibility expectations</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium">Keyboard first:</span> all interactive
                    elements reachable via Tab; no keyboard traps.
                  </li>
                  <li>
                    <span className="font-medium">Visible focus:</span> use 
                    <span className="font-mono">focus-visible</span> rings and don&apos;t remove outlines
                    without replacing them.
                  </li>
                  <li>
                    <span className="font-medium">Semantics:</span> correct underlying
                    elements/roles (prefer Radix primitives for complex widgets).
                  </li>
                  <li>
                    <span className="font-medium">Labels:</span> inputs need a label
                    (or <span className="font-mono">aria-label</span>), and errors must
                    be announced (e.g. <span className="font-mono">aria-invalid</span>,
                    described-by).
                  </li>
                  <li>
                    <span className="font-medium">Contrast:</span> token combinations
                    must be legible in light + dark.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5) Demo requirements (required)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  If it isn&apos;t demoed, it isn&apos;t done. Every DS change must add or extend a
                  page under <span className="font-mono">/design</span>.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Add a card to <span className="font-mono">/design</span> or extend
                    the relevant section page (e.g. <span className="font-mono">/design/forms</span>).
                  </li>
                  <li>
                    Show variants + states + a11y behaviors (keyboard, focus order,
                    escape/close for overlays).
                  </li>
                  <li>
                    Include a &quot;real&quot; usage snippet (a small composed example), not only isolated
                    parts.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6) Token usage rules</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium">Prefer semantic tokens</span>: use
                    Tailwind classes like <span className="font-mono">bg-background</span>, <span className="font-mono">text-foreground</span>, <span className="font-mono">border-border</span>, etc.
                  </li>
                  <li>
                    <span className="font-medium">No hard-coded hex</span> in components.
                    If you need a new value, add a token in 
                    <span className="font-mono">src/styles/tokens.css</span> and (if referenced
                    in TS) add it to <span className="font-mono">src/design-system/tokens.ts</span>.
                  </li>
                  <li>
                    Keep tokens <span className="font-medium">semantic</span> (what it
                    represents) not raw (how it&apos;s implemented).
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7) Export patterns</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Use <span className="font-medium">named exports</span> for
                    components and helpers.
                  </li>
                  <li>
                    Export the style recipe when helpful (e.g. 
                    <span className="font-mono">buttonVariants</span>) so downstream
                    compositions can reuse it.
                  </li>
                  <li>
                    Keep exports stable: changing component names or prop APIs is a
                    breaking change-update demos and grep usages.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
              Quick check before you open a PR: build passes, demo updated, and you
              can tab through the demo without surprises.
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
