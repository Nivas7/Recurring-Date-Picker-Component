'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Label } from '@/components/ui/lable'
import { Select, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function DailyRecurrencePanel() {
  const { interval, weekdaysOnly, setInterval, setWeekdaysOnly } = useRecurringDatePickerStore()

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Daily Recurrence Settings</CardTitle>
        <CardDescription>Configure how often the event should repeat daily</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
            <span className="text-sm text-muted-foreground">day(s)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Day Type</Label>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="weekdays-only"
              checked={weekdaysOnly}
              onCheckedChange={(checked) => setWeekdaysOnly(checked as boolean)}
            />
            <Label htmlFor="weekdays-only" className="text-sm text-foreground">
              Weekdays only (Monday - Friday)
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            When enabled, the event will only repeat on business days
          </p>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Examples:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Every day: Daily standup meetings</li>
            <li>• Every 2 days: Exercise routine</li>
            <li>• Weekdays only: Work-related tasks</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
