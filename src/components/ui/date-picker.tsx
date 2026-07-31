import * as React from "react"

import { cn } from "@/lib/utils"

interface DatePickerProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  value?: string
  onChange: (value: string) => void
  emptyLabel?: string
}

function DatePicker({
  value,
  onChange,
  emptyLabel = "Seleccionar fecha",
  className,
  ...props
}: DatePickerProps) {
  const isEmpty = !value
  const inputId = React.useId()
  const id = props.id ?? inputId

  return (
    <div className="relative">
      <input
        {...props}
        id={id}
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        data-slot="date-picker"
        className={cn(
          "border-input dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isEmpty && "text-transparent",
          className,
        )}
      />
      {isEmpty && (
        <label
          htmlFor={id}
          className="text-muted-foreground pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm italic"
        >
          {emptyLabel}
        </label>
      )}
    </div>
  )
}

export { DatePicker }
