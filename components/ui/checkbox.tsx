import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      onCheckedChange?.(event.target.checked)
    }

    return (
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground appearance-none",
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <Check className="absolute left-0 top-0 h-4 w-4 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none" />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
