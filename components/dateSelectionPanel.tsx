'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Input } from '@/components/ui//input'
import { Label } from '@/components/ui/lable'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from 'lucide-react'

export function DateSelectionPanel() {
  const {
    startDate,
    endDate,
    hasEndDate,
    setStartDate,
    setEndDate,
    setHasEndDate
  } = useRecurringDatePickerStore()

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setStartDate(new Date(value))
    } else {
      setStartDate(null)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setEndDate(new Date(value))
    } else {
      setEndDate(null)
    }
  }

  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-card-foreground">Date Selection</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="start-date" className="text-sm font-medium text-muted-foreground">
            Start Date *
          </Label>
          <div className="relative">
            <Input
              id="start-date"
              type="date"
              value={formatDateForInput(startDate)}
              onChange={handleStartDateChange}
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="end-date" className="text-sm font-medium text-muted-foreground">
            End Date (Optional)
          </Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-end-date"
                checked={hasEndDate}
                onCheckedChange={(checked) => setHasEndDate(checked as boolean)}
              />
              <Label htmlFor="has-end-date" className="text-sm text-muted-foreground">
                Set end date
              </Label>
            </div>

            {hasEndDate && (
              <div className="relative">
                <Input
                  id="end-date"
                  type="date"
                  value={formatDateForInput(endDate)}
                  onChange={handleEndDateChange}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
