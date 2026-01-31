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

export default function PullRequestChecklistPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs / Standards</p>
            <h1 className="text-xl font-semibold tracking-tight">PR checklist</h1>
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
            title="A PR that reviewers can merge confidently"
            description="A concrete, copy/paste friendly checklist. If something doesn’t apply, explain why in the PR description."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PR description</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    States the user-visible outcome (what changed) and the why.
                  </ChecklistItem>
                  <ChecklistItem>
                    Links relevant issues/tickets and includes rollout/migration notes if needed.
                  </ChecklistItem>
                  <ChecklistItem>
                    Includes screenshots/video for visual changes (light + dark).
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demos & docs (required for DS changes)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Updated an existing <span className="font-mono">/design</span> page or added a new one proving variants + states.
                  </ChecklistItem>
                  <ChecklistItem>
                    Demo is keyboard navigable and reveals focus order (tab through it).
                  </ChecklistItem>
                  <ChecklistItem>
                    Any new/changed component API is reflected in the demo usage.
                  </ChecklistItem>
                  <ChecklistItem>
                    If behavior/expectations changed, docs were updated (or a note added explaining why not).
                  </ChecklistItem>
                </ul>
                <p className="text-muted-foreground">
                  See also: <Link className="underline" href="/docs/standards/component-checklist">component definition of done</Link>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility (a11y)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Keyboard interaction verified end-to-end (Tab/Shift+Tab/Enter/Space, Escape to dismiss overlays).
                  </ChecklistItem>
                  <ChecklistItem>
                    Focus visible (no outline removal without replacement).
                  </ChecklistItem>
                  <ChecklistItem>
                    Labels/announcements are correct: icon-only buttons named; form errors announced (e.g.
                    <span className="font-mono"> aria-invalid</span> + <span className="font-mono">aria-describedby</span>).
                  </ChecklistItem>
                  <ChecklistItem>
                    Ran <span className="font-mono">npm run test:a11y</span> (or noted why it’s not applicable).
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tokens & styling</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>No hard-coded hex values in components.</ChecklistItem>
                  <ChecklistItem>
                    Uses semantic tokens/classes (<span className="font-mono">bg-background</span>, <span className="font-mono">text-foreground</span>, etc.).
                  </ChecklistItem>
                  <ChecklistItem>
                    If new tokens were added: updated <span className="font-mono">src/styles/tokens.css</span> (and TS mappings where needed).
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tests & checks</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="grid gap-2">
                  <ChecklistItem>
                    Updated/added Playwright tests when behavior changed (visual and/or interaction).
                  </ChecklistItem>
                  <ChecklistItem>
                    If visuals intentionally changed: baselines updated and committed.
                  </ChecklistItem>
                  <ChecklistItem>
                    Local checks passed:
                    <span className="font-mono"> npm run lint</span>,
                    <span className="font-mono"> npm run typecheck</span>,
                    <span className="font-mono"> npm run build</span>.
                  </ChecklistItem>
                </ul>
              </CardContent>
            </Card>

            <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
              Reviewer expectation: they can open <span className="font-mono">/design</span>, verify light/dark + mobile quickly, and see tests that prevent regressions.
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
