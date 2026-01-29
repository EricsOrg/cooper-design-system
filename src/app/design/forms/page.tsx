import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { AsyncComboboxDemo } from "@/app/design/forms/_components/async-combobox-demo"
import { Container, FormSection, Section, SectionHeader } from "@/components/ds"
import { FormField, Select, Checkbox, Radio, Textarea } from "@/components/ds/forms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FormsDesignPage() {
  return (
    <main id="main-content">
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Organism</p>
            <h1 className="text-xl font-semibold tracking-tight">Forms suite</h1>
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
            title="FormSection + primitives"
            description="Reusable field patterns: consistent labels, hint/error copy, and accessible descriptions."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FormSection
              title="Contact"
              description="This section is built from primitives (FormField + Input/Select/Textarea) and stays token-driven."
            >
              <FormField
                label="Work email"
                htmlFor="email"
                hint="We’ll only use this to send the demo link."
                required
              >
                <Input id="email" type="email" placeholder="name@company.com" />
              </FormField>

              <FormField label="Company size" htmlFor="size">
                <Select id="size" defaultValue="10-50">
                  <option value="1-10">1–10</option>
                  <option value="10-50">10–50</option>
                  <option value="50-200">50–200</option>
                  <option value="200+">200+</option>
                </Select>
              </FormField>

              <FormField
                label="What are you trying to ship?"
                htmlFor="goal"
                error="Example error state for the demo (P0 if this blocks submit)."
              >
                <Textarea id="goal" placeholder="Short description…" />
              </FormField>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button>Submit</Button>
                <Button variant="outline">Secondary</Button>
              </div>
            </FormSection>

            <FormSection
              title="Preferences"
              description="Checkbox + radio patterns. These are intentionally simple but consistent."
            >
              <Checkbox
                id="updates"
                label="Send me updates"
                description="Occasional progress notes + links."
                defaultChecked
              />
              <Checkbox
                id="share"
                label="Share artifacts with my team"
                description="Lets us send the demo URL to a small group."
              />

              <div className="grid gap-2">
                <p className="text-sm font-medium">Priority</p>
                <Radio
                  id="prio-wow"
                  name="priority"
                  label="Wow-first"
                  description="Optimize for fast, visible output."
                  defaultChecked
                />
                <Radio
                  id="prio-correct"
                  name="priority"
                  label="Correctness-first"
                  description="Optimize for rigor and completeness."
                />
              </div>
            </FormSection>
          </div>

          <div className="mt-10 max-w-lg">
            <SectionHeader
              title="Combobox / Autocomplete"
              description="Async search + keyboard navigation + loading/empty states."
            />

            <div className="mt-6">
              <FormField
                label="Assign to"
                htmlFor="assignee"
                hint="Start typing to simulate an async fetch."
              >
                <AsyncComboboxDemo />
              </FormField>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
