'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Label } from '@/components/ui/lable'
import { Select, SelectItem } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MonthlyPattern, MonthlyOrdinal } from '@/types/recurring-date-picker'
import { WEEKDAY_FULL_NAMES, ORDINAL_NAMES } from '@/lib/dates'

export function MonthlyRecurrencePanel() {
  const {
    interval,
    monthlyPattern,
    monthlyOrdinal,
    monthlyWeekday,
    setInterval,
    setMonthlyPattern,
    setMonthlyOrdinal,
    setMonthlyWeekday,
  } = useRecurringDatePickerStore()

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Monthly Recurrence Settings</CardTitle>
        <CardDescription>Configure monthly patterns and advanced options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Repeat Frequency</Label>
          <div className="flex items-center space-x-4">
            <Label className="text-sm text-muted-foreground">Repeat every</Label>
            <Select value={interval.toString()} onValueChange={(value) => setInterval(parseInt(value))} className="w-20">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </Select>
            <span className="text-sm text-muted-foreground">month(s)</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Monthly Pattern</Label>
          <RadioGroup
            value={monthlyPattern}
            onValueChange={(value) => setMonthlyPattern(value as MonthlyPattern)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date" id="pattern-date" />
              <Label htmlFor="pattern-date" className="text-sm font-medium">
                On the same date each month
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekday" id="pattern-weekday" />
              <Label htmlFor="pattern-weekday" className="text-sm font-medium">
                On a specific weekday each month
              </Label>
            </div>
          </RadioGroup>
        </div>

        {monthlyPattern === 'weekday' && (
          <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
            <Label className="text-sm font-medium text-foreground block">
              Weekday Pattern Configuration
            </Label>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">The</span>
              <Select
                value={monthlyOrdinal}
                onValueChange={(value) => setMonthlyOrdinal(value as MonthlyOrdinal)}
                className="w-32"
              >
                {ORDINAL_NAMES.map((ordinal) => (
                  <SelectItem key={ordinal} value={ordinal}>
                    {ordinal.charAt(0).toUpperCase() + ordinal.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              <Select
                value={monthlyWeekday.toString()}
                onValueChange={(value) => setMonthlyWeekday(parseInt(value))}
                className="w-32"
              >
                {WEEKDAY_FULL_NAMES.map((weekday, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {weekday}
                  </SelectItem>
                ))}
              </Select>
              <span className="text-muted-foreground">of every month</span>
            </div>
          </div>
        )}

        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Examples:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Same date: Monthly rent payment on the 1st</li>
            <li>• Second Tuesday: Monthly team meeting</li>
            <li>• Last Friday: Monthly review session</li>
            <li>• First Monday: Monthly goal setting</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
