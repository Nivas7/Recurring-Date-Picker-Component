'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Label } from '@/components/ui/lable'
import { Select, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MONTH_NAMES } from '@/lib/dates'

export function YearlyRecurrencePanel() {
  const {
    interval,
    yearlyMonth,
    yearlyDate,
    setInterval,
    setYearlyMonth,
    setYearlyDate,
  } = useRecurringDatePickerStore()

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Yearly Recurrence Settings</CardTitle>
        <CardDescription>Configure yearly patterns and specific dates</CardDescription>
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
            <span className="text-sm text-muted-foreground">year(s)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Date Configuration</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Month</Label>
              <Select
                value={yearlyMonth.toString()}
                onValueChange={(value) => setYearlyMonth(parseInt(value))}
                className="w-32"
              >
                {MONTH_NAMES.map((month, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Day</Label>
              <Input
                type="number"
                min="1"
                max="31"
                value={yearlyDate}
                onChange={(e) => setYearlyDate(parseInt(e.target.value) || 1)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Current Configuration:</h4>
          <p className="text-sm text-muted-foreground">
            {interval === 1 ? 'Yearly' : `Every ${interval} years`} on {MONTH_NAMES[yearlyMonth - 1]} {yearlyDate}
          </p>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Examples:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• January 1: New Year's Day</li>
            <li>• July 4: Independence Day</li>
            <li>• December 25: Christmas</li>
            <li>• Every 2 years on March 15: Biennial conference</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
