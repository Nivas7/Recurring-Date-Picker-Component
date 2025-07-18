'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Button } from '@/components/ui/button'
import { WEEKDAY_NAMES } from '@/lib/dates'

export function WeekdaysSelector() {
  const { selectedWeekdays, toggleWeekday } = useRecurringDatePickerStore()

  return (
    <div className="grid grid-cols-7 gap-2">
      {WEEKDAY_NAMES.map((name, index) => {
        const isSelected = selectedWeekdays.includes(index)

        return (
          <Button
            key={index}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleWeekday(index)}
            className={`h-10 text-sm font-medium ${isSelected
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
              }`}
          >
            {name}
          </Button>
        )
      })}
    </div>
  )
}
