"use client"

import { Button } from "@/components/ui/button"
import {
  NotificationCenterPopover,
  useNotificationCenter,
} from "@/components/ui/notification-center"
import { useToast } from "@/components/ui/toast"

export function NotificationCenterDemo() {
  const { notify } = useNotificationCenter()
  const { toast } = useToast()

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <NotificationCenterPopover />
        <Button
          variant="outline"
          onClick={() =>
            notify({
              title: "Deployment finished",
              description: "View logs for the full report.",
              variant: "info",
            })
          }
        >
          Add info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            notify({
              title: "Your session expires soon",
              description: "Save your work to avoid losing changes.",
              variant: "warning",
            })
          }
        >
          Add warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            notify({
              title: "Payment failed",
              description: "Update your card details and try again.",
              variant: "error",
            })
          }
        >
          Add error
        </Button>
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Pattern notes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <span className="font-medium">Toast</span>: transient feedback; automatically
            dismisses; announced via <code>aria-live</code>.
          </li>
          <li>
            <span className="font-medium">Notification Center</span>: persistent alerts;
            unread/read; keyboard navigation inside the list (↑/↓, Enter, Delete).
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast({
                title: "Saved",
                description: "This is a toast (transient).",
                variant: "success",
              })
            }
          >
            Show toast
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              toast({
                title: "Sync issue",
                description: "We\"ll keep trying in the background.",
              })
              notify({
                title: "Sync is delayed",
                description: "You can continue working; we\"ll notify you when it completes.",
                variant: "warning",
              })
            }}
          >
            Toast + persistent
          </Button>
        </div>
      </div>
    </div>
  )
}
