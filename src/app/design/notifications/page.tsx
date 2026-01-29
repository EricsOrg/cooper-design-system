import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { NotificationCenterDemo } from "@/app/design/_components/notification-center-demo"
import { ToastDemo } from "@/app/design/_components/toast-demo"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificationsDesignPage() {
  return (
    <main id="main-content">
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Design</p>
            <h1 className="text-xl font-semibold tracking-tight">
              /design/notifications
            </h1>
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
            title="Notifications"
            description="Toasts are transient. The Notification Center is persistent and supports unread/read."
          />

          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Toast (existing)</CardTitle>
              </CardHeader>
              <CardContent>
                <ToastDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Center (persistent)</CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationCenterDemo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A11y checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="list-disc pl-5">
                  <li>
                    Toasts are announced via <code>aria-live</code> and auto-dismiss.
                  </li>
                  <li>
                    Notification Center announces <em>new</em> items via a dedicated
                    live region, but the list itself is not a live region.
                  </li>
                  <li>
                    Popover trigger is keyboard focusable, and items support arrow-key
                    navigation and shortcuts.
                  </li>
                  <li>
                    Dismiss and mark read/unread controls have accessible names.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
