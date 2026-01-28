"use client";

import * as React from "react";

import { Menu } from "lucide-react";

import { AppHeader } from "@/components/ds/navigation/app-header";
import { Sidebar } from "@/components/ds/navigation/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type AppShellProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  /** Optional nav-rail content shown on larger screens instead of full sidebar. */
  navRail?: React.ReactNode;
  children: React.ReactNode;
  /**
   * When true, render a compact nav-rail (md+). A full sidebar remains available in the mobile dialog.
   */
  useRailOnDesktop?: boolean;
  className?: string;
};

export function AppShell({
  header,
  sidebar,
  navRail,
  children,
  useRailOnDesktop,
  className,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const mobileSidebar = (
    <Sidebar className="h-[80vh] w-full border-r-0" variant="sidebar">
      {sidebar}
    </Sidebar>
  );

  return (
    <div className={cn("grid min-h-dvh grid-rows-[auto_1fr]", className)}>
      {header ? (
        header
      ) : (
        <AppHeader
          title="Cooper"
          navButton={
            <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm p-0">
                <DialogHeader className="border-b px-4 py-3">
                  <DialogTitle>Navigation</DialogTitle>
                </DialogHeader>
                <div className="p-2">{mobileSidebar}</div>
              </DialogContent>
            </Dialog>
          }
        />
      )}

      <div className="grid min-h-0 grid-cols-1 md:grid-cols-[auto_1fr]">
        {/* Desktop nav */}
        <div className={cn("hidden md:block")}>
          {useRailOnDesktop ? (
            <Sidebar variant="rail">{navRail ?? sidebar}</Sidebar>
          ) : (
            <Sidebar variant="sidebar">{sidebar}</Sidebar>
          )}
        </div>

        <main id="main-content" className="min-h-0 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
