import Link from "next/link";

import { ThemeToggle } from "@/app/docs/_components/theme-toggle";
import { Container, Section, SectionHeader } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MOLECULE_GROUPS = [
  {
    title: "Forms",
    description: "Composed inputs that standardize labeling, validation, and layout.",
    demo: "/design/forms",
    items: [
      { name: "Field", source: "@/components/ds/forms/field", note: "Label + help + error wrapper." },
      { name: "Textarea", source: "@/components/ds/forms/textarea", note: "Multi-line text input." },
      { name: "Select", source: "@/components/ds/forms/select", note: "Select with trigger + listbox." },
      { name: "Choice", source: "@/components/ds/forms/choice", note: "Checkbox + radio primitives." },
      { name: "Combobox", source: "@/components/ui/combobox", note: "Searchable async-ready select." },
    ],
  },
  {
    title: "Navigation",
    description: "Reusable navigation patterns for app shells and pages.",
    demo: "/design/navigation",
    items: [
      { name: "Breadcrumbs", source: "@/components/ds/navigation/breadcrumbs", note: "Inline page trail." },
      { name: "NavItem", source: "@/components/ds/navigation/nav-item", note: "Sidebar link with states." },
      { name: "AppHeader", source: "@/components/ds/navigation/app-header", note: "Top bar with actions." },
      { name: "Sidebar", source: "@/components/ds/navigation/sidebar", note: "Navigation rail." },
      { name: "AppShell", source: "@/components/ds/navigation/app-shell", note: "Layout wrapper for header + nav." },
    ],
  },
  {
    title: "Overlays + feedback",
    description: "Transient UI for actions, confirmations, and help text.",
    demo: "/design/overlays",
    items: [
      { name: "Dialog", source: "@/components/ui/dialog", note: "Radix-based dialog." },
      { name: "Modal", source: "@/components/ui/modal", note: "Opinionated dialog wrapper." },
      { name: "Toast", source: "@/components/ui/toast", note: "Transient notification." },
      { name: "Tooltip", source: "@/components/ui/tooltip", note: "Short helper text." },
      { name: "Popover", source: "@/components/ui/popover", note: "Anchored content panel." },
      { name: "DropdownMenu", source: "@/components/ui/dropdown-menu", note: "Menu + item list." },
    ],
  },
  {
    title: "Data + layout",
    description: "Structures for content grouping, paging, and data presentation.",
    demo: "/design/data",
    items: [
      { name: "Card", source: "@/components/ui/card", note: "Content container + header/footer." },
      { name: "Tabs", source: "@/components/ui/tabs", note: "Switch between views." },
      { name: "Pagination", source: "@/components/ui/pagination", note: "Page navigation for lists." },
      { name: "DataTable", source: "@/components/ds/data/data-table", note: "Structured table primitive." },
      { name: "FilterBar", source: "@/components/ds/data/filter-bar", note: "Search + filter controls." },
    ],
  },
  {
    title: "Messaging",
    description: "Empty and notification patterns for status communication.",
    demo: "/design/notifications",
    items: [
      { name: "EmptyState", source: "@/components/ui/empty-state", note: "No data / no results state." },
      { name: "NotificationCenter", source: "@/components/ui/notification-center", note: "Persistent inbox." },
    ],
  },
  {
    title: "Layout helpers",
    description: "Thin DS wrappers to keep layout consistent across pages.",
    demo: "/design/marketing",
    items: [
      { name: "Container", source: "@/components/ds/container", note: "Constrain content width." },
      { name: "Section", source: "@/components/ds/section", note: "Vertical rhythm + padding." },
      { name: "SectionHeader", source: "@/components/ds/section-header", note: "Consistent title/description block." },
      { name: "FeatureGrid", source: "@/components/ds/feature-grid", note: "Marketing feature layout." },
      { name: "CTA", source: "@/components/ds/cta", note: "Call-to-action block." },
      { name: "FormSection", source: "@/components/ds/form-section", note: "Grouped form layout." },
    ],
  },
];

export default function MoleculesDocsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">Molecules</h1>
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
            title="Molecules = composed building blocks"
            description="Molecules combine atoms into reusable controls and layout patterns. Keep them small, composable, and demo-backed."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>Compose atoms; don’t introduce one-off styles.</li>
                  <li>Expose variant props instead of branching class names in usage sites.</li>
                  <li>Every molecule must have a demo under <span className="font-mono">/design</span>.</li>
                  <li>Document expected empty/disabled/error states here.</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">token-driven</Badge>
                  <Badge variant="secondary">composable</Badge>
                  <Badge variant="secondary">demo-backed</Badge>
                </div>
              </CardContent>
            </Card>

            {MOLECULE_GROUPS.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm">
                  <p className="text-muted-foreground">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={group.demo}>Open demo</Link>
                    </Button>
                  </div>
                  <ul className="grid gap-3">
                    {group.items.map((item) => (
                      <li key={item.name} className="grid gap-1 rounded-lg border p-3">
                        <span className="font-medium">{item.name}</span>
                        <p className="text-muted-foreground">{item.note}</p>
                        <p className="text-xs font-mono text-muted-foreground">{item.source}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
