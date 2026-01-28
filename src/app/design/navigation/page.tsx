import Link from "next/link";

import { ThemeToggle } from "@/app/docs/_components/theme-toggle";
import {
  AppHeader,
  AppShell,
  Breadcrumbs,
  Container,
  NavItem,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  HelpCircle,
} from "lucide-react";

export default function NavigationDemoPage() {
  return (
    <AppShell
      useRailOnDesktop
      header={
        <AppHeader
          title={
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
                C
              </span>
              <span className="truncate">Cooper</span>
            </div>
          }
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Design", href: "/design" },
                { label: "Navigation" },
              ]}
            />
          }
          actions={
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/design">Catalog</Link>
              </Button>
              <ThemeToggle />
            </div>
          }
        />
      }
      sidebar={
        <>
          <NavItem href="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavItem
            href="/design/navigation"
            label="Dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            active
          />
          <NavItem href="#" label="Team" icon={<Users className="h-4 w-4" />} />
          <NavItem href="#" label="Reports" icon={<FileText className="h-4 w-4" />} />

          <div className="my-2 h-px w-full bg-border" />

          <NavItem href="#" label="Settings" icon={<Settings className="h-4 w-4" />} />
          <NavItem href="#" label="Help" icon={<HelpCircle className="h-4 w-4" />} />
        </>
      }
      navRail={
        <>
          <NavItem rail href="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavItem
            rail
            href="/design/navigation"
            label="Dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            active
          />
          <NavItem rail href="#" label="Team" icon={<Users className="h-4 w-4" />} />
          <NavItem rail href="#" label="Reports" icon={<FileText className="h-4 w-4" />} />
          <div className="my-2 h-px w-full bg-border" />
          <NavItem rail href="#" label="Settings" icon={<Settings className="h-4 w-4" />} />
          <NavItem rail href="#" label="Help" icon={<HelpCircle className="h-4 w-4" />} />
        </>
      }
    >
      <div className="border-b bg-card">
        <Container className="py-8">
          <h1 className="text-2xl font-semibold tracking-tight">Navigation suite</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            AppHeader, Sidebar/NavRail, Breadcrumbs, and NavItem working together in a responsive
            layout.
          </p>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyboard + a11y checks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Tab through nav items: focus ring should be visible.</li>
                <li>
                  Active nav item uses <code>aria-current=&quot;page&quot;</code>.
                </li>
                <li>
                  Breadcrumb nav uses a landmark: <code>aria-label=&quot;Breadcrumb&quot;</code>.
                </li>
                <li>
                  On small screens, open the menu via the header button; dialog traps focus.
                </li>
                <li>Use the Skip to content link to jump to main content.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content area</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Replace this with a real dashboard or docs page.
            </CardContent>
          </Card>
        </div>
      </Container>
    </AppShell>
  );
}
