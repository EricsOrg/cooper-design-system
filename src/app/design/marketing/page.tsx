import Link from "next/link"
import * as React from "react"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, CTA, FeatureGrid, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    title: "Token-first theming",
    description:
      "Everything is driven by CSS variables (brand/surface/background), so templates inherit your product theme automatically.",
  },
  {
    title: "Composable sections",
    description:
      "Hero, proof, features, testimonials, and CTA are built from DS primitives so you can swap content without rethinking layout.",
  },
  {
    title: "Responsive by default",
    description:
      "Grid + spacing patterns collapse cleanly to a single column and preserve readable line-lengths on mobile.",
  },
  {
    title: "Accessible components",
    description:
      "Buttons, cards, and structure follow the same a11y patterns used across the DS demos.",
  },
  {
    title: "Content-ready",
    description:
      "Opinionated type scale + muted foreground tones make it easy to drop in real copy and still look polished.",
  },
  {
    title: "Shippable defaults",
    description:
      "Uses only DS components + utilities already in the repo—no bespoke component debt.",
  },
]

const testimonials = [
  {
    quote:
      "We replaced a one-off landing page with a template built from DS primitives. Updates now take minutes instead of days.",
    name: "Avery Chen",
    title: "Product Design Lead",
  },
  {
    quote:
      "The hero + proof pattern instantly raised trust. The best part is how consistent it stays with the rest of the UI.",
    name: "Jordan Rivera",
    title: "Growth Engineer",
  },
  {
    quote:
      "The template is a great smoke-test for tokens: change brand/surface and the whole page still feels intentional.",
    name: "Sam Patel",
    title: "Design Systems",
  },
]

export default function MarketingLandingTemplatePage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Templates</p>
            <h1 className="text-xl font-semibold tracking-tight">/design/marketing</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/design">Catalog</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs">Docs</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section className="border-b bg-surface">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Template</Badge>
                <Badge variant="outline">Marketing landing</Badge>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  A landing page pattern built from Cooper DS primitives
                </h2>
                <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
                  Hero → proof → features → testimonials → CTA. Use this as a starting point for
                  product marketing pages that stay consistent with the app.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/design/roadmap">See roadmap</Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Tip: Try toggling dark mode — the layout should remain legible and contrast-safe.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="border bg-card">
                <CardContent className="p-6">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Conversion-ready structure</p>
                      <Badge variant="outline">v1</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A lightweight “visual” card to stand in for an image, product screenshot, or
                      illustrative graphic.
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Stat label="Teams" value="120+" />
                      <Stat label="Time to ship" value="1 day" />
                      <Stat label="Support" value="DS" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniCallout title="Fast" desc="Copy in, ship out." />
                <MiniCallout title="Consistent" desc="Uses the same tokens as the app." />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROOF */}
      <Section>
        <Container>
          <SectionHeader
            title="Proof"
            description="A simple trust pattern: recognizable names + a compact set of outcomes."
          />

          <div className="mt-8 grid gap-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <LogoPill>Northwind</LogoPill>
              <LogoPill>Acme</LogoPill>
              <LogoPill>Globex</LogoPill>
              <LogoPill>Umbrella</LogoPill>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-card">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold tracking-tight">30%</p>
                  <p className="mt-1 text-sm text-muted-foreground">higher sign-up conversion</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold tracking-tight">2×</p>
                  <p className="mt-1 text-sm text-muted-foreground">faster page iteration</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-6">
                  <p className="text-2xl font-semibold tracking-tight">0</p>
                  <p className="mt-1 text-sm text-muted-foreground">new bespoke components</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section className="border-t bg-background">
        <Container>
          <SectionHeader
            title="Features"
            description="FeatureGrid is a DS organism built on Card — use it for benefits, capabilities, or product pillars."
          />
          <FeatureGrid className="mt-8" features={features} columns={3} />
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="border-t">
        <Container>
          <SectionHeader
            title="Testimonials"
            description="Keep quotes short and skimmable. Use Card for consistent spacing + borders."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-card">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      aria-hidden
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-foreground"
                    >
                      {t.name
                        .split(" ")
                        .slice(0, 2)
                        .map((s) => s[0])
                        .join("")}
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t">
        <Container>
          <CTA
            title="Ready to ship a consistent marketing page?"
            description="Start from this template and swap in real copy, screenshots, and customer logos."
            href="/design"
            ctaLabel="Back to /design"
            variant="secondary"
          />
        </Container>
      </Section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-surface p-3">
      <p className="text-sm font-medium">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function MiniCallout({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}

function LogoPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-xl border bg-card px-4 py-3">
      <p className="text-sm font-medium text-muted-foreground">{children}</p>
    </div>
  )
}
