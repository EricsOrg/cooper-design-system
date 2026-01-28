import Link from "next/link";

import { Container, Section, SectionHeader, CTA } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Section className="border-b">
        <Container>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Design System</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>

          <div className="mt-6 grid gap-6">
            <SectionHeader
              title="Cooper Design System"
              description="A minimal starter repo: Next.js App Router + Tailwind + shadcn/ui + a thin DS layer."
            />

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/docs">Open docs</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/design">Open catalog</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                  shadcn/ui
                </Link>
              </Button>
            </div>

            <CTA
              title="Start here"
              description="Visit /docs to see primitives and DS components working together."
              href="/docs"
              ctaLabel="Go to docs"
            />
          </div>
        </Container>
      </Section>

      <Container className="py-10">
        <p className="text-sm text-muted-foreground">
          This repo is meant to be evolved in-place (copy/paste friendly). Not intended
          for npm publishing.
        </p>
      </Container>
    </main>
  );
}
