"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

export function OverlaysDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-medium">Tooltip</p>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover or focus</Button>
              </TooltipTrigger>
              <TooltipContent>
                Radix tooltips are keyboard accessible and use aria-describedby.
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Tooltip on primary button</Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                Tip: you can tab to this and see the tooltip.
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-medium">Popover</p>
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-3">
                <div>
                  <p className="text-sm font-medium">Quick settings</p>
                  <p className="text-xs text-muted-foreground">
                    Popovers should close on Escape and keep focus behavior sane.
                  </p>
                </div>
                <label className="grid gap-1">
                  <span className="text-xs font-medium">Name</span>
                  <Input placeholder="Cooper" />
                </label>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Popover on primary</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p className="text-sm">
                Use <code>PopoverContent</code> alignment + side offsets to position.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-medium">Dropdown / Menu</p>
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={(v) => setShowStatusBar(Boolean(v))}
                >
                  Status bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={(v) => setShowActivityBar(Boolean(v))}
                >
                  Activity bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Position</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Custom action
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Menu on primary</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-muted-foreground">
          State: status bar {showStatusBar ? "on" : "off"}, activity bar {showActivityBar ? "on" : "off"},
          position {position}.
        </p>
      </div>
    </div>
  )
}
