import type { ReactNode } from "react"

import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <span aria-hidden className="mt-0.5 select-none text-muted-foreground">
        •
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function ComponentChecklistPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs / Standards</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Component contribution checklist
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/standards">Back to standards</Link>
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
            title="Before you call it done"
            description="A practical checklist for shipping/adjusting components in Cooper DS. If an item doesn’t apply, document why in the PR."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility (a11y)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Keyboard works end-to-end (Tab order, Shift+Tab, Enter/Space,
                    Escape for dismissable overlays).
                  </ChecklistItem>
                  <ChecklistItem>
                    Focus is visible and consistent (uses
                    <span className="font-mono"> focus-visible</span>; no outline
                    removal without replacement).
                  </ChecklistItem>
                  <ChecklistItem>
                    Correct semantics: native elements when possible; roles only
                    when needed.
                  </ChecklistItem>
                  <ChecklistItem>
                    Naming/labels: inputs have a label (or
                    <span className="font-mono"> aria-label</span>), icon-only
                    buttons are named.
                  </ChecklistItem>
                  <ChecklistItem>
                    Error + invalid states are announced (e.g.
                    <span className="font-mono"> aria-invalid</span> and
                    <span className="font-mono"> aria-describedby</span> to error
                    text).
                  </ChecklistItem>
                  <ChecklistItem>
                    No new serious/critical axe violations on the relevant demo
                    page.
                  </ChecklistItem>
                </ul>
                <p className="text-muted-foreground">
                  Tip: keep the a11y suite fast by extending
                  <span className="font-mono"> tests/design.a11y.spec.ts</span>
                  when you add a new <span className="font-mono">/design</span>
                  route.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsiveness</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Layout holds at common breakpoints (mobile / tablet /
                    desktop) without overflow.
                  </ChecklistItem>
                  <ChecklistItem>
                    Text wraps gracefully; long labels/values don’t break the
                    UI.
                  </ChecklistItem>
                  <ChecklistItem>
                    Touch targets are reasonable (buttons/controls not too
                    small).
                  </ChecklistItem>
                  <ChecklistItem>
                    Component doesn’t rely on hover-only affordances; mobile
                    behavior is discoverable.
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theming (light/dark) + density</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Works in light + dark themes with acceptable contrast.
                  </ChecklistItem>
                  <ChecklistItem>
                    Uses semantic colors (
                    <span className="font-mono">bg-background</span>,
                    <span className="font-mono"> text-foreground</span>,
                    <span className="font-mono"> border-border</span>, etc.).
                  </ChecklistItem>
                  <ChecklistItem>
                    Interactive states (hover/focus/active/disabled) are
                    distinguishable in both themes.
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tokens & styling rules</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    No hard-coded hex values in component code.
                  </ChecklistItem>
                  <ChecklistItem>
                    Spacing/typography uses Tailwind scales and semantic tokens
                    (not random pixel values).
                  </ChecklistItem>
                  <ChecklistItem>
                    If a new token was required, it was added to
                    <span className="font-mono"> src/styles/tokens.css</span> (and
                    mirrored in
                    <span className="font-mono"> src/design-system/tokens.ts</span>
                    when referenced in TypeScript).
                  </ChecklistItem>
                  <ChecklistItem>
                    Component uses consistent data hooks for debugging/selectors
                    when helpful (<span className="font-mono">data-slot</span>,
                    <span className="font-mono"> data-variant</span>,
                    <span className="font-mono"> data-size</span>).
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tests</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Updated/added Playwright coverage when behavior changes
                    (especially for focus management and interactive states).
                  </ChecklistItem>
                  <ChecklistItem>
                    a11y smoke test covers the relevant route (or a clear reason
                    why it can’t).
                  </ChecklistItem>
                  <ChecklistItem>
                    No new TypeScript/ESLint issues; build passes.
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demo page requirements (required)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  If it isn’t demoed, it isn’t done.
                </p>
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Added or updated a page under
                    <span className="font-mono"> /design</span> showing: variants,
                    states, disabled/invalid (when applicable).
                  </ChecklistItem>
                  <ChecklistItem>
                    Includes at least one composed, realistic example (not only
                    isolated atoms).
                  </ChecklistItem>
                  <ChecklistItem>
                    Demo is keyboard navigable and reveals focus order.
                  </ChecklistItem>
                  <ChecklistItem>
                    Demo is resilient (no console errors, no layout shift loops).
                  </ChecklistItem>
                  <ChecklistItem>
                    Updated the /docs inventory (atoms/molecules/organisms) with usage notes.
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
              Expectation: a reviewer should be able to open
              <span className="font-mono"> /design</span>, tab through the demo,
              and confirm light/dark + mobile without extra setup.
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
