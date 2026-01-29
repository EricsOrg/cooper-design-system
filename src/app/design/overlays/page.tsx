import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverlaysDemo } from "@/app/design/_components/overlays-demo"

export default function OverlaysDesignPage() {
  return (
    <main id="main-content">
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Design</p>
            <h1 className="text-xl font-semibold tracking-tight">/design/overlays</h1>
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

      <Section>
        <Container>
          <SectionHeader
            title="Overlay primitives"
            description="Popover, Dropdown/Menu, and Tooltip — built on Radix UI for keyboard + screen reader support."
          />

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demos</CardTitle>
              </CardHeader>
              <CardContent>
                <OverlaysDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A11y basics checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="list-disc pl-5">
                  <li>Tab to triggers: focus ring should be visible.</li>
                  <li>Escape closes popovers/menus; focus returns to trigger.</li>
                  <li>Menu items are navigable via arrow keys.</li>
                  <li>Tooltips use aria-describedby; they are not required to operate the UI.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
