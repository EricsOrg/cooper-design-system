import Link from "next/link";

import { ThemeToggle } from "@/app/docs/_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container, CTA, FeatureGrid, Section, SectionHeader } from "@/components/ds";
import { DialogDemo } from "@/app/docs/_components/dialog-demo";

export default function DocsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">EricsOrg</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Cooper Design System
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/standards">Contribution standards</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/contacts">Contacts</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/organisms">Organisms</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Components"
            description="A small, copy/paste friendly starter set (shadcn/ui + a thin DS layer)."
          />

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:max-w-sm">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Disabled" disabled />
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
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <DialogDemo />
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="border-t">
        <Container>
          <SectionHeader
            title="Design-system layer"
            description="A minimal DS abstraction that composes shadcn/ui primitives."
          />

          <div className="mt-8 grid gap-8">
            <FeatureGrid
              features={[
                {
                  title: "Copy/paste friendly",
                  description:
                    "No publishing step required. Components live in-repo and are easy to evolve.",
                },
                {
                  title: "Token driven",
                  description:
                    "Light/dark via CSS variables. Tailwind picks them up through @theme mappings.",
                },
                {
                  title: "Composable",
                  description:
                    "DS components are thin wrappers; primitives remain directly usable.",
                },
              ]}
            />

            <CTA
              title="Next: add real tokens"
              description="Swap the brand/surface tokens in globals.css, then expand the component catalog."
              href="/docs"
              ctaLabel="Stay here"
              variant="secondary"
            />
          </div>
        </Container>
      </Section>

      <footer className="border-t">
        <Container className="py-10">
          <p className="text-sm text-muted-foreground">
            Built with Next.js + Tailwind + shadcn/ui. Not intended for npm publishing.
          </p>
        </Container>
      </footer>
    </main>
  );
}
