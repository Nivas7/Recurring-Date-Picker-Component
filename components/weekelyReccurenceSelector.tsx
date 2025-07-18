'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Label } from '@/components/ui/lable'
import { Select, SelectItem } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WeekdaysSelector } from './weekdaysSelector'

export function WeeklyRecurrencePanel() {
  const { interval, selectedWeekdays, setInterval } = useRecurringDatePickerStore()

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Weekly Recurrence Settings</CardTitle>
        <CardDescription>Configure weekly patterns and select specific days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Interval Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Repeat Frequency</Label>
          <div className="flex items-center space-x-4">
            <Label className="text-sm text-muted-foreground">Repeat every</Label>
            <Select value={interval.toString()} onValueChange={(value) => setInterval(parseInt(value))} className="w-20">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </Select>
            <span className="text-sm text-muted-foreground">week(s)</span>
          </div>
        </div>

        {/* Weekdays Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Select Days of the Week
          </Label>
          <WeekdaysSelector />
          <p className="text-xs text-muted-foreground">
            Selected: {selectedWeekdays.length} day(s) - Click to toggle days
          </p>
        </div>

        {/* Examples */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Examples:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Mon, Wed, Fri: Gym sessions</li>
            <li>• Tue, Thu: Team meetings</li>
            <li>• Every 2 weeks on Monday: Bi-weekly reviews</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
