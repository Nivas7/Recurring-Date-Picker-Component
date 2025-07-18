'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Button } from '@/components/ui/button'
import { RecurrenceType } from '@/types/recurring-date-picker'
import { Calendar, Clock, Hash, CalendarDays } from 'lucide-react'

export function RecurrenceTypeSelector() {
  const { recurrenceType, setRecurrenceType } = useRecurringDatePickerStore()

  const recurrenceOptions: {
    type: RecurrenceType;
    label: string;
    icon: React.ComponentType<any>;
    description: string;
  }[] = [
      {
        type: 'daily',
        label: 'Daily',
        icon: Clock,
        description: 'Every day or every X days'
      },
      {
        type: 'weekly',
        label: 'Weekly',
        icon: CalendarDays,
        description: 'Weekly on specific days'
      },
      {
        type: 'monthly',
        label: 'Monthly',
        icon: Calendar,
        description: 'Monthly patterns'
      },
      {
        type: 'yearly',
        label: 'Yearly',
        icon: Hash,
        description: 'Yearly on specific dates'
      }
    ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground">Recurrence Type</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recurrenceOptions.map((option) => {
          const Icon = option.icon
          const isSelected = recurrenceType === option.type

          return (
            <Button
              key={option.type}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => setRecurrenceType(option.type)}
              className={`h-auto p-4 flex flex-col items-center gap-2 ${isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
                }`}
            >
              <Icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs opacity-75 mt-1">{option.description}</div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
