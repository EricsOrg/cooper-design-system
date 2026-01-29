import Link from "next/link"

import type { VariantProps } from "class-variance-authority"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ItemStatus = "done" | "in_progress" | "next" | "later"

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

function StatusBadge({ status }: { status: ItemStatus }) {
  const map: Record<ItemStatus, { label: string; variant: BadgeVariant }> = {
    done: { label: "✅ Done", variant: "secondary" },
    in_progress: { label: "🔄 In progress", variant: "outline" },
    next: { label: "⏭ Next", variant: "default" },
    later: { label: "🕓 Later", variant: "outline" },
  }
  const v = map[status]
  return <Badge variant={v.variant}>{v.label}</Badge>
}

function Row({
  title,
  desc,
  status,
  tag,
}: {
  title: string
  desc: React.ReactNode
  status: ItemStatus
  tag?: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="font-medium leading-6">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        {tag ? (
          <p className="mt-2 text-xs font-mono text-muted-foreground">{tag}</p>
        ) : null}
      </div>
      <div className="shrink-0"> <StatusBadge status={status} /> </div>
    </div>
  )
}

export default function RoadmapPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Source of truth</p>
            <h1 className="text-xl font-semibold tracking-tight">DS Gap Checklist / Roadmap</h1>
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
            title="What’s missing (and what we’re shipping next)"
            description="This is the living backlog for making the design system ‘build almost anything’ without reinventing primitives."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>A11y sweep checklist (verified)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">What we checked on /design demos</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Keyboard navigation: tab order + visible focus rings on primary interactive elements.</li>
                    <li>
                      Navigation active state uses <code>aria-current=&quot;page&quot;</code> (NavItem + Pagination).
                    </li>
                    <li>Breadcrumbs use a landmark: <code>aria-label=&quot;Breadcrumb&quot;</code>.</li>
                    <li>
                      Dialog behavior: Escape closes; focus is trapped while open and returns to trigger (Radix Dialog).
                    </li>
                    <li>
                      Overlay behavior: menus/popovers close on Escape; menu items are arrow-key navigable (Radix primitives).
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-foreground">Remaining gaps</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Run automated audits (axe/Playwright) in CI for /design routes.</li>
                    <li>Do a documented contrast pass for token pairs (incl. dark mode).</li>
                    <li>Validate headings/landmarks hierarchy across all pages (especially templates as they land).</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Foundations (Tokens)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Row
                  title="Semantic colors + theme"
                  desc="brand/surface/background/fg/border/ring + light/dark"
                  status="done"
                  tag="shipped"
                />
                <Row
                  title="Typography system"
                  desc="type scale, font families/weights, heading rules"
                  status="done"
                  tag="tokens/typography → /design/tokens"
                />
                <Row
                  title="Spacing + elevation tokens"
                  desc="documented scale + consistent shadow/backdrop layers"
                  status="done"
                  tag="tokens/spacing,elevation → /design/tokens"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Primitives (Atoms / Molecules)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Row
                  title="Core controls"
                  desc="Button, Input, Card, Badge, Tabs, Modal, Toast, Select, Checkbox/Radio, Textarea"
                  status="done"
                  tag="/design + /design/forms"
                />
                <Row
                  title="Overlays suite"
                  desc="Popover, Dropdown/Menu, Tooltip (keyboard + focus + aria)"
                  status="done"
                  tag="/design/overlays"
                />
                <Row
                  title="Loading + feedback"
                  desc="Spinner, Progress, Skeleton, EmptyState"
                  status="done"
                  tag="feedback"
                />
                <Row
                  title="Combobox / Autocomplete"
                  desc="searchable select pattern"
                  status="later"
                  tag="combobox"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organisms (Patterns)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Row
                  title="Navigation suite"
                  desc="AppHeader + Sidebar/NavRail + Breadcrumbs + NavItem"
                  status="done"
                  tag="/design/navigation"
                />
                <Row
                  title="Forms suite"
                  desc="FormSection + field patterns (hint/error/required)"
                  status="done"
                  tag="/design/forms"
                />
                <Row
                  title="Data suite"
                  desc="DataTable + FilterBar + Pagination + empty/loading"
                  status="done"
                  tag="/design/data"
                />
                <Row
                  title="Notification center"
                  desc="pattern for persistent alerts vs transient toasts"
                  status="done"
                  tag="/design/notifications"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates (Pages / Layouts)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Row
                  title="AppShell"
                  desc="nav + header + content layout pattern"
                  status="done"
                  tag="used by /design/navigation"
                />
                <Row
                  title="MarketingLanding"
                  desc="hero → proof → features → testimonials → CTA"
                  status="done"
                  tag="/design/marketing"
                />
                <Row
                  title="CRUD list/detail"
                  desc="filters + table + pagination; detail w/ sections"
                  status="later"
                  tag="templates/crud"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System quality</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Row
                  title="A11y sweep"
                  desc="keyboard, focus order, aria, contrast across demos"
                  status="next"
                  tag="a11y"
                />
                <Row
                  title="Contribution standards"
                  desc={
                    <>
                      How to add a component; naming; variants; demo requirements. See{" "}
                      <Link
                        className="underline underline-offset-4"
                        href="/docs/standards"
                      >
                        /docs/standards
                      </Link>
                      .
                    </>
                  }
                  status="next"
                  tag="docs/standards"
                />
                <Row
                  title="Visual regression"
                  desc="baseline screenshots or lightweight checks"
                  status="in_progress"
                  tag="playwright screenshot tests + CI groundwork"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
            Rule: every DS change should either (1) close a checklist item, or (2) deepen a demo page that proves it.
          </div>
        </Container>
      </Section>
    </main>
  )
}
