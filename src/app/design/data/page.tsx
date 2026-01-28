import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataDemo } from "@/app/design/data.demo"

export default function DataDesignPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Design</p>
            <h1 className="text-xl font-semibold tracking-tight">/design/data</h1>
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
            title="Data suite"
            description="FilterBar + DataTable + Pagination, with shared empty/loading feedback primitives."
          />

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demos</CardTitle>
              </CardHeader>
              <CardContent>
                <DataDemo />
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
