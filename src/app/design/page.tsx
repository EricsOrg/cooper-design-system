import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModalDemo } from "@/app/design/_components/modal-demo"
import { ToastDemo } from "@/app/design/_components/toast-demo"

export default function DesignCatalogPage() {
  return (
    <main id="main-content">
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Catalog</p>
            <h1 className="text-xl font-semibold tracking-tight">/design</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs">Docs</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Core components"
            description="A shippable catalog view of the primitives used across the DS."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">Token-driven</Badge>
            <Badge variant="outline">Tailwind + CSS variables</Badge>
          </div>

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tokens</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <TokenSwatch name="--brand" className="bg-brand text-brand-foreground" />
                  <TokenSwatch
                    name="--surface"
                    className="bg-surface text-surface-foreground border"
                  />
                  <TokenSwatch
                    name="--background"
                    className="bg-background text-foreground border"
                  />
                  <TokenSwatch name="--card" className="bg-card text-card-foreground border" />
                </div>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/design/tokens">Open tokens page</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:max-w-sm">
                <label className="grid gap-1">
                  <span className="text-xs font-medium">Email</span>
                  <Input id="catalog-email" placeholder="name@company.com" type="email" />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-medium">Disabled input</span>
                  <Input id="catalog-disabled" placeholder="Disabled" disabled />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Card content</p>
                  <p className="text-sm text-muted-foreground">
                    Use cards for grouping content, settings, and dashboards.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modal</CardTitle>
              </CardHeader>
              <CardContent>
                <ModalDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="one" className="max-w-xl">
                  <TabsList>
                    <TabsTrigger value="one">Tab One</TabsTrigger>
                    <TabsTrigger value="two">Tab Two</TabsTrigger>
                    <TabsTrigger value="three">Tab Three</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Tabs are built on Radix UI primitives.
                    </p>
                  </TabsContent>
                  <TabsContent value="two" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Keep demos tiny and focused.
                    </p>
                  </TabsContent>
                  <TabsContent value="three" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Use tokens (background/foreground) for theming.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toast</CardTitle>
              </CardHeader>
              <CardContent>
                <ToastDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Toasts (transient) vs Notification Center (persistent, unread/read).
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/notifications">Open demo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overlays</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Tooltip + Popover + Dropdown/Menu primitives for lightweight UI overlays.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/overlays">Open demo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation suite</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  AppHeader + Sidebar/NavRail + Breadcrumbs + NavItem, composed into an AppShell.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/navigation">Open demo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forms suite</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  FormField + Select + Textarea + Checkbox/Radio, composed into a reusable FormSection.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/forms">Open demo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing landing template</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  A ready-to-swap marketing page: hero → proof → features → testimonials → CTA.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/marketing">Open template</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DS Gap Checklist</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  The living backlog: what exists, what’s missing, and what we’re burning down next.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/design/roadmap">Open</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <footer className="border-t">
        <Container className="py-10">
          <p className="text-sm text-muted-foreground">
            Tip: keep this page as a quick visual smoke-test for tokens and primitives.
          </p>
        </Container>
      </footer>
    </main>
  )
}

function TokenSwatch({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <div className="grid gap-2">
      <div
        className={`rounded-lg p-4 ${className ?? ""}`}
        style={{ minHeight: 72 }}
      >
        <p className="text-sm font-medium">Aa</p>
        <p className="text-xs opacity-80">Preview</p>
      </div>
      <p className="text-xs font-mono text-muted-foreground">{name}</p>
    </div>
  )
}
