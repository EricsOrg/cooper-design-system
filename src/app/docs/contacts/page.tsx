import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Design system contacts
            </h1>
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
            title="Who to talk to"
            description="Fastest path to answers for DS questions, bugs, and contributions. (If youre not sure, start with the channel.)"
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary contact</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p>
                  <span className="font-medium">Slack channel:</span>{" "}
                  <a
                    className="underline"
                    href="https://eric-playground.slack.com/archives/C0ABZSZV30R"
                    target="_blank"
                    rel="noreferrer"
                  >
                    #cooper-design-system
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Use the channel for decisions, requests, and status updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repo + issues</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p>
                  <span className="font-medium">GitHub:</span>{" "}
                  <a
                    className="underline"
                    href="https://github.com/EricsOrg/cooper-design-system"
                    target="_blank"
                    rel="noreferrer"
                  >
                    EricsOrg/cooper-design-system
                  </a>
                </p>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    Bugs / feature requests: open an issue (or drop it in Slack and
                    well convert it).
                  </li>
                  <li>
                    Changes: ship via PRs that update at least one <Link className="underline" href="/design/roadmap">/design/roadmap</Link> item.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Owners (by area)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid gap-2">
                  <p className="font-medium">Foundations (tokens, theming, layout primitives)</p>
                  <p className="text-muted-foreground">Start in #cooper-design-system  owner: Eric Hess.</p>
                </div>
                <div className="grid gap-2">
                  <p className="font-medium">Components (UI primitives + DS wrappers)</p>
                  <p className="text-muted-foreground">Start in #cooper-design-system  owner: Eric Hess.</p>
                </div>
                <div className="grid gap-2">
                  <p className="font-medium">Data suite (tables, filters, pagination, empty/loading states)</p>
                  <p className="text-muted-foreground">Start in #cooper-design-system  owner: Eric Hess.</p>
                </div>
                <div className="grid gap-2">
                  <p className="font-medium">Quality gates (a11y + visual regression)</p>
                  <p className="text-muted-foreground">Start in #cooper-design-system (CI artifacts + Playwright reports).</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data contact details (metadata)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-muted-foreground">
                <p>
                  If you meant data contact in the Sense of who owns the data behind a component
                  (e.g., table columns, event tracking, API source) well standardize that as
                  a small frontmatter block per organism/page.
                </p>
                <p>
                  For now, post the component/page name + the data question in the channel and well assign an owner.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
