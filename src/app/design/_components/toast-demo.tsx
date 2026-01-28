"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Your changes have been saved.",
            variant: "success",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Heads up",
            description: "This is a neutral notification.",
          })
        }
      >
        Neutral
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "Something went wrong",
            description: "Please try again.",
            variant: "destructive",
          })
        }
      >
        Destructive
      </Button>
    </div>
  )
}
