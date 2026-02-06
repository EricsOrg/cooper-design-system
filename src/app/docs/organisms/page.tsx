import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OrganismListItem = { name: string; description: string; href?: string }

type PlannedOrganism = { name: string; description: string }

const IMPLEMENTED_ORGANISMS: OrganismListItem[] = [
  {
    name: "QueryRail",
    description: "Search + faceted filters + active chips + clear all (responsive)",
    href: "/docs/organisms/query-rail",
  },
  {
    name: "ResultsTable",
    description: "Power list table: sorting + pagination + selection + column visibility",
    href: "/docs/organisms/results-table",
  },
  {
    name: "AppLayout",
    description: "App shell layout wrapper for header + navigation + content.",
  },
  {
    name: "DataTablePage",
    description: "Filter bar + bulk actions + table + pagination layout.",
  },
]

const PLANNED_ORGANISMS: PlannedOrganism[] = [
  { name: "DashboardOverview", description: "Cards + filters + (stub) charts" },
  { name: "DetailPage", description: "Header/actions + metadata + tabs" },
  { name: "CreateEditForm", description: "Sectioned form + validation + sticky footer actions" },
  { name: "WizardStepper", description: "Multi-step flow + review" },
  { name: "Auth", description: "Sign-in + SSO + forgot password" },
  { name: "Settings", description: "Settings layout + toggles" },
  { name: "NotificationsCenter", description: "Inbox/feed + preferences" },
  { name: "MarketingLanding", description: "Hero + social proof + pricing + CTA" },
]

export default function OrganismsDocsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">Organisms</h1>
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
            title="Organisms = app-ready compositions"
            description="Organisms are higher-level compositions built from atoms + molecules. The list below tracks what exists today and what remains in the backlog."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract (non-negotiables)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    Compose from existing primitives (no one-off bespoke markup when a DS component exists).
                  </li>
                  <li>
                    Variants come from a styling layer (e.g. <span className="font-mono">tone</span>, <span className="font-mono">density</span>, <span className="font-mono">surface</span>)
                     not random per-page CSS.
                  </li>
                  <li>
                    Slot-based APIs: allow teams to swap header/actions/empty states without forking.
                  </li>
                  <li>
                    Each organism must have: a demo in <span className="font-mono">/design</span>, responsive behavior, keyboard/a11y sanity, and clear usage notes.
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">token-driven</Badge>
                  <Badge variant="secondary">themeable</Badge>
                  <Badge variant="secondary">responsive</Badge>
                  <Badge variant="secondary">a11y-clean</Badge>
                  <Badge variant="secondary">demo-backed</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implemented organisms</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ol className="list-decimal space-y-2 pl-5">
                  {IMPLEMENTED_ORGANISMS.map((o) => (
                    <li key={o.name}>
                      <span className="font-medium">
                        {o.href ? <Link href={o.href}>{o.name}</Link> : o.name}
                      </span>
                      : {o.description}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Planned / backlog</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                  {PLANNED_ORGANISMS.map((o) => (
                    <li key={o.name}>
                      <span className="font-medium text-foreground">{o.name}</span>: {o.description}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
