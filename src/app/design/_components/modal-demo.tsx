"use client"

import * as React from "react"

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export function ModalDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="outline">Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
          <ModalDescription>
            This is a simple modal built with Radix Dialog primitives.
          </ModalDescription>
        </ModalHeader>
        <div className="text-sm text-muted-foreground">
          Put forms, confirmations, or any content here.
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
