"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
  disabled?: boolean
  description?: string
}

export type ComboboxProps = {
  options: ComboboxOption[]

  /** Pass-through props for the underlying input (id, name, autoComplete, etc.). */
  inputProps?: Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "disabled" | "placeholder"
  >

  /** Selected value (controlled). */
  value?: string
  /** Initial selected value (uncontrolled). */
  defaultValue?: string
  onValueChange?: (value: string | undefined, option?: ComboboxOption) => void

  /** Input query text (controlled). */
  query?: string
  /** Initial input query text (uncontrolled). */
  defaultQuery?: string
  onQueryChange?: (query: string) => void

  placeholder?: string
  disabled?: boolean

  /** Useful for async search. */
  loading?: boolean
  loadingText?: string
  emptyText?: string

  /** By default we filter client-side by label. Pass false when options are already filtered (ex: async). */
  filter?: boolean

  className?: string
  inputClassName?: string
  listClassName?: string

  renderOption?: (
    option: ComboboxOption,
    state: { active: boolean; selected: boolean }
  ) => React.ReactNode
}

export function Combobox({
  options,
  inputProps,
  value: valueProp,
  defaultValue,
  onValueChange,
  query: queryProp,
  defaultQuery,
  onQueryChange,
  placeholder = "Search…",
  disabled,
  loading,
  loadingText = "Loading…",
  emptyText = "No results.",
  filter = true,
  className,
  inputClassName,
  listClassName,
  renderOption,
}: ComboboxProps) {
  const reactId = React.useId()
  const listboxId = `cb-listbox-${reactId}`

  const isValueControlled = valueProp !== undefined
  const isQueryControlled = queryProp !== undefined

  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue)
  const [uncontrolledQuery, setUncontrolledQuery] = React.useState(
    defaultQuery ?? ""
  )

  const value = isValueControlled ? valueProp : uncontrolledValue
  const query = isQueryControlled ? (queryProp as string) : uncontrolledQuery

  const selectedOption = React.useMemo(
    () => (value ? options.find((o) => o.value === value) : undefined),
    [options, value]
  )

  const filteredOptions = React.useMemo(() => {
    if (!filter) return options
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query, filter])

  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (!open) setActiveIndex(-1)
  }, [open])

  // If a value is selected and the user hasn't typed anything, show the selected label.
  React.useEffect(() => {
    if (open) return
    if (queryProp !== undefined) return // controlled query
    if (!selectedOption) return
    if (uncontrolledQuery.trim().length > 0) return
    setUncontrolledQuery(selectedOption.label)
  }, [open, queryProp, selectedOption, uncontrolledQuery])

  function setQuery(next: string) {
    if (!isQueryControlled) setUncontrolledQuery(next)
    onQueryChange?.(next)
  }

  function setSelected(next: string | undefined, option?: ComboboxOption) {
    if (!isValueControlled) setUncontrolledValue(next)
    onValueChange?.(next, option)
  }

  const visibleOptions = filteredOptions

  function moveActive(delta: number) {
    const len = visibleOptions.length
    if (len === 0) return
    setActiveIndex((prev) => {
      const start = prev < 0 ? (delta > 0 ? -1 : 0) : prev
      let next = (start + delta + len) % len

      // Skip disabled options.
      for (let i = 0; i < len; i++) {
        if (!visibleOptions[next]?.disabled) return next
        next = (next + delta + len) % len
      }

      return prev
    })
  }

  function selectAtIndex(index: number) {
    const option = visibleOptions[index]
    if (!option || option.disabled) return
    setSelected(option.value, option)
    setQuery(option.label)
    setOpen(false)
    // Keep focus for keyboard flows.
    queueMicrotask(() => inputRef.current?.focus())
  }

  const activeId =
    activeIndex >= 0 ? `cb-opt-${reactId}-${activeIndex}` : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("w-full", className)}>
        <PopoverAnchor asChild>
          <div className="relative">
            <input
              {...inputProps}
              ref={inputRef}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={activeId}
              aria-disabled={disabled}
              disabled={disabled}
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                inputProps?.onChange?.(e)
                setQuery(e.target.value)
                if (!open) setOpen(true)
              }}
              onFocus={(e) => {
                inputProps?.onFocus?.(e)
                if (!disabled) setOpen(true)
              }}
              onBlur={(e) => {
                inputProps?.onBlur?.(e)
                // If focus is moving into an option, keep it open.
                const next = e.relatedTarget as HTMLElement | null
                if (next && next.getAttribute("data-cb-option") === "true") return
                setOpen(false)
              }}
              onKeyDown={(e) => {
                inputProps?.onKeyDown?.(e)
                if (e.defaultPrevented) return
                if (disabled) return

                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  if (!open) setOpen(true)
                  moveActive(1)
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault()
                  if (!open) setOpen(true)
                  moveActive(-1)
                }

                if (e.key === "Enter") {
                  if (!open) return
                  e.preventDefault()
                  if (activeIndex >= 0) selectAtIndex(activeIndex)
                }

                if (e.key === "Escape") {
                  e.preventDefault()
                  setOpen(false)
                }
              }}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                inputClassName
              )}
            />
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          sideOffset={6}
          className={cn("w-[--radix-popover-trigger-width] p-1", listClassName)}
          onOpenAutoFocus={(e) => {
            // Keep focus on input so arrow keys keep working.
            e.preventDefault()
          }}
        >
          <div
            id={listboxId}
            role="listbox"
            aria-label="Suggestions"
            className="max-h-64 overflow-auto"
          >
            {loading ? (
              <div className="px-2 py-2 text-sm text-muted-foreground">
                {loadingText}
              </div>
            ) : visibleOptions.length === 0 ? (
              <div className="px-2 py-2 text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              <div className="grid gap-1">
                {visibleOptions.map((option, idx) => {
                  const selected = option.value === value
                  const active = idx === activeIndex

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      id={`cb-opt-${reactId}-${idx}`}
                      aria-selected={selected}
                      data-cb-option="true"
                      disabled={option.disabled}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => {
                        // Prevent input blur before click.
                        e.preventDefault()
                      }}
                      onClick={() => selectAtIndex(idx)}
                      className={cn(
                        "w-full rounded-md px-2 py-2 text-left text-sm",
                        active && "bg-accent text-accent-foreground",
                        selected && "font-medium",
                        option.disabled && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {renderOption ? (
                        renderOption(option, { active, selected })
                      ) : (
                        <div className="grid">
                          <span>{option.label}</span>
                          {option.description ? (
                            <span className="text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}
