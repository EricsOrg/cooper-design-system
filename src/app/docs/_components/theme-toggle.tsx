"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  if (!mounted) return null;

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {isDark ? "Light" : "Dark"}
    </Button>
  );
}
