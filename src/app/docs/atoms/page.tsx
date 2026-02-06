import Link from "next/link";

import { ThemeToggle } from "@/app/docs/_components/theme-toggle";
import { Container, Section, SectionHeader } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ATOMS = [
  {
    name: "Button",
    description: "Primary action trigger with size + tone variants.",
    source: "@/components/ui/button",
    demo: "/design",
  },
  {
    name: "Badge",
    description: "Small status + taxonomy labels.",
    source: "@/components/ui/badge",
    demo: "/design",
  },
  {
    name: "Input",
    description: "Text input primitives (email, search, etc.).",
    source: "@/components/ui/input",
    demo: "/design",
  },
  {
    name: "Spinner",
    description: "Inline loading indicator for async actions.",
    source: "@/components/ui/spinner",
    demo: "/design",
  },
  {
    name: "Skeleton",
    description: "Placeholder blocks for loading states.",
    source: "@/components/ui/skeleton",
    demo: "/design",
  },
  {
    name: "Progress",
    description: "Linear progress indicator for task completion.",
    source: "@/components/ui/progress",
    demo: "/design",
  },
];

export default function AtomsDocsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">Atoms</h1>
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
            title="Atoms = primitives + foundational controls"
            description="Keep atoms minimal, token-driven, and reusable across every component layer. If it’s a single element or simple primitive, it belongs here."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Foundations</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  Tokens and typography set the baseline for every atom. Update
                  these first before touching component styles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/design/tokens">Open tokens</Link>
                  </Button>
                  <Badge variant="secondary">light + dark ready</Badge>
                  <Badge variant="secondary">CSS variables</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atom inventory</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <ul className="grid gap-3">
                  {ATOMS.map((atom) => (
                    <li key={atom.name} className="grid gap-1 rounded-lg border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium">{atom.name}</span>
                        <Button asChild size="xs" variant="ghost">
                          <Link href={atom.demo}>Demo</Link>
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{atom.description}</p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {atom.source}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage notes</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>Atoms are the default building blocks for every molecule and organism.</li>
                  <li>Avoid app-specific styling in atoms—use semantic tokens only.</li>
                  <li>If an atom needs variants, add them via <span className="font-mono">cva</span>.</li>
                  <li>Document new atoms here and add a visual demo under <span className="font-mono">/design</span>.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
