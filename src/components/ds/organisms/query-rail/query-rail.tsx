"use client";

import * as React from "react";

import { XIcon, SlidersHorizontal } from "lucide-react";

import { Checkbox } from "@/components/ds/forms/choice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type QueryRailFacetOption = {
  value: string;
  label: string;
  description?: string;
  count?: number;
  disabled?: boolean;
};

export type QueryRailFacet = {
  id: string;
  label: string;
  description?: string;
  options: QueryRailFacetOption[];
};

export type QueryRailSelection = Record<string, string[]>;

export type QueryRailVariant = "default" | "branded";

export type QueryRailProps = {
  /** Free-text query shown in the search input. */
  query: string;
  onQueryChange: (value: string) => void;

  /** Faceted filters rendered as checkbox lists. */
  facets: QueryRailFacet[];

  /** Selected facet values, keyed by facet id. */
  selection: QueryRailSelection;
  onSelectionChange: (next: QueryRailSelection) => void;

  /** Optional: hide search input (facets only). */
  showSearch?: boolean;

  /** Optional: customize placeholder for the search input. */
  searchPlaceholder?: string;

  /** Optional: called when the user clicks Clear all. */
  onClearAll?: () => void;

  /** Optional: render a compact chip row above facets. Defaults to true. */
  showActiveChips?: boolean;

  /** Optional: label used in the mobile dialog header. */
  mobileTitle?: string;

  /** Visual style variant. */
  variant?: QueryRailVariant;

  className?: string;
};

type Chip =
  | { type: "query"; key: string; label: string }
  | {
      type: "facet";
      key: string;
      facetId: string;
      optionValue: string;
      label: string;
    };

function toggleSelectionValue(
  current: QueryRailSelection,
  facetId: string,
  value: string,
) {
  const existing = current[facetId] ?? [];
  const has = existing.includes(value);
  const nextValues = has
    ? existing.filter((v) => v !== value)
    : [...existing, value];

  const next: QueryRailSelection = { ...current };
  if (nextValues.length) next[facetId] = nextValues;
  else delete next[facetId];

  return next;
}

function getActiveChips(
  query: string,
  facets: QueryRailFacet[],
  selection: QueryRailSelection,
): Chip[] {
  const chips: Chip[] = [];

  if (query.trim()) {
    chips.push({
      type: "query",
      key: `query:${query}`,
      label: `Search: ${query.trim()}`,
    });
  }

  const facetMap = new Map(facets.map((f) => [f.id, f] as const));
  for (const [facetId, values] of Object.entries(selection)) {
    const facet = facetMap.get(facetId);
    if (!facet) continue;

    const optionMap = new Map(facet.options.map((o) => [o.value, o] as const));
    for (const v of values) {
      const opt = optionMap.get(v);
      chips.push({
        type: "facet",
        key: `facet:${facetId}:${v}`,
        facetId,
        optionValue: v,
        label: opt ? `${facet.label}: ${opt.label}` : `${facet.label}: ${v}`,
      });
    }
  }

  return chips;
}

function QueryRailPanel({
  query,
  onQueryChange,
  facets,
  selection,
  onSelectionChange,
  showSearch = true,
  searchPlaceholder = "Search…",
  onClearAll,
  showActiveChips = true,
  variant = "default",
}: Omit<QueryRailProps, "className" | "mobileTitle">) {
  const chips = React.useMemo(
    () => getActiveChips(query, facets, selection),
    [query, facets, selection],
  );

  const canClear = chips.length > 0;

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
      return;
    }
    onQueryChange("");
    onSelectionChange({});
  };

  const surfaceClasses =
    variant === "branded"
      ? "border-primary/25 bg-primary/5"
      : "border bg-surface";

  return (
    <div
      className={cn(
        "rounded-2xl p-4 text-surface-foreground",
        "space-y-4",
        surfaceClasses,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-tight">Filters</p>
          <p className="text-xs text-muted-foreground">
            Refine results by searching and selecting facets.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          disabled={!canClear}
        >
          Clear all
        </Button>
      </div>

      {showSearch ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Search</p>
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
      ) : null}

      {showActiveChips ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Active filters
            </p>
            <span className="text-xs text-muted-foreground">
              {chips.length || "0"}
            </span>
          </div>

          {chips.length ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Badge
                  key={chip.key}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <span className="truncate">{chip.label}</span>
                  <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Remove ${chip.label}`}
                    onClick={() => {
                      if (chip.type === "query") {
                        onQueryChange("");
                        return;
                      }
                      onSelectionChange(
                        toggleSelectionValue(
                          selection,
                          chip.facetId,
                          chip.optionValue,
                        ),
                      );
                    }}
                  >
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No filters applied.
            </p>
          )}
        </div>
      ) : null}

      <div className="space-y-4">
        {facets.map((facet) => (
          <div key={facet.id} className="space-y-2">
            <div>
              <p className="text-sm font-medium">{facet.label}</p>
              {facet.description ? (
                <p className="text-xs text-muted-foreground">
                  {facet.description}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              {facet.options.map((opt) => {
                const id = `${facet.id}-${opt.value}`;
                const checked = (selection[facet.id] ?? []).includes(opt.value);
                const label = opt.count != null ? `${opt.label} (${opt.count})` : opt.label;

                return (
                  <Checkbox
                    key={opt.value}
                    id={id}
                    label={label}
                    description={opt.description}
                    checked={checked}
                    disabled={opt.disabled}
                    onChange={() =>
                      onSelectionChange(
                        toggleSelectionValue(selection, facet.id, opt.value),
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QueryRail({
  query,
  onQueryChange,
  facets,
  selection,
  onSelectionChange,
  showSearch,
  searchPlaceholder,
  onClearAll,
  showActiveChips,
  mobileTitle = "Filters",
  variant = "default",
  className,
}: QueryRailProps) {
  const [open, setOpen] = React.useState(false);

  const panelProps = {
    query,
    onQueryChange,
    facets,
    selection,
    onSelectionChange,
    showSearch,
    searchPlaceholder,
    onClearAll,
    showActiveChips,
    variant,
  };

  return (
    <div className={cn(className)}>
      {/* Mobile trigger */}
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
              </span>
              <span className="text-xs text-muted-foreground">Tap to refine</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm p-0">
            <DialogHeader className="border-b px-4 py-3">
              <DialogTitle>{mobileTitle}</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <QueryRailPanel {...panelProps} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop rail */}
      <div className="hidden md:block">
        <QueryRailPanel {...panelProps} />
      </div>
    </div>
  );
}
