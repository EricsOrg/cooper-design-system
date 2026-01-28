"use client"

import * as React from "react"

import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

const PEOPLE: Array<{ id: string; name: string; role: string }> = [
  { id: "1", name: "Ava Chen", role: "Product" },
  { id: "2", name: "Mateo Rivera", role: "Engineering" },
  { id: "3", name: "Noah Patel", role: "Design" },
  { id: "4", name: "Sofia Nguyen", role: "Research" },
  { id: "5", name: "Inez Park", role: "Ops" },
  { id: "6", name: "Omar Ali", role: "Support" },
  { id: "7", name: "Priya Shah", role: "Engineering" },
  { id: "8", name: "Ethan Brooks", role: "Design" },
]

function toOptions(rows: typeof PEOPLE): ComboboxOption[] {
  return rows.map((p) => ({
    value: p.id,
    label: p.name,
    description: p.role,
  }))
}

export function AsyncComboboxDemo() {
  const [value, setValue] = React.useState<string | undefined>(undefined)
  const [query, setQuery] = React.useState("")
  const [options, setOptions] = React.useState<ComboboxOption[]>(toOptions(PEOPLE))
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let alive = true

    // Simulate async search (debounced).
    const debounceHandle = window.setTimeout(() => {
      setLoading(true)

      const q = query.trim().toLowerCase()
      const latency = 450

      window.setTimeout(() => {
        if (!alive) return

        const filtered = !q
          ? PEOPLE
          : PEOPLE.filter((p) => {
              const haystack = `${p.name} ${p.role}`.toLowerCase()
              return haystack.includes(q)
            })

        setOptions(toOptions(filtered))
        setLoading(false)
      }, latency)
    }, 250)

    return () => {
      alive = false
      window.clearTimeout(debounceHandle)
    }
  }, [query])

  return (
    <div className="grid gap-2">
      <Combobox
        inputProps={{ id: "assignee", autoComplete: "off" }}
        value={value}
        onValueChange={setValue}
        query={query}
        onQueryChange={setQuery}
        options={options}
        loading={loading}
        emptyText="No people match that search."
        placeholder="Search people…"
        filter={false}
      />
      <p className="text-xs text-muted-foreground">
        Async search demo: type to fetch, use ↑/↓ to navigate, Enter to select, Esc to close.
      </p>
    </div>
  )
}
