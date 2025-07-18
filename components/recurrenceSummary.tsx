'use client'

import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateRecurringDates, formatRecurrencePattern } from '@/lib/dates'
import { format } from 'date-fns'

export function RecurrenceSummary() {
  const store = useRecurringDatePickerStore()

  if (!store.startDate) return null

  const recurringDates = generateRecurringDates({
    startDate: store.startDate,
    endDate: store.endDate || undefined,
    recurrenceType: store.recurrenceType,
    interval: store.interval,
    weekdaysOnly: store.weekdaysOnly,
    selectedWeekdays: store.selectedWeekdays,
    monthlyPattern: store.monthlyPattern,
    monthlyOrdinal: store.monthlyOrdinal,
    monthlyWeekday: store.monthlyWeekday,
    yearlyMonth: store.yearlyMonth,
    yearlyDate: store.yearlyDate,
  }, 50)

  const patternDescription = formatRecurrencePattern({
    startDate: store.startDate,
    endDate: store.endDate || undefined,
    recurrenceType: store.recurrenceType,
    interval: store.interval,
    weekdaysOnly: store.weekdaysOnly,
    selectedWeekdays: store.selectedWeekdays,
    monthlyPattern: store.monthlyPattern,
    monthlyOrdinal: store.monthlyOrdinal,
    monthlyWeekday: store.monthlyWeekday,
    yearlyMonth: store.yearlyMonth,
    yearlyDate: store.yearlyDate,
  })

  const nextFiveOccurrences = recurringDates.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Recurrence Summary</CardTitle>
        <CardDescription>
          Overview of your recurring date pattern
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Pattern Description */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-primary mb-2">Your Pattern</h4>
          <p className="text-sm text-primary/80">{patternDescription}</p>
        </div>

        {/* Next Occurrences */}
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">Next 5 Occurrences</h4>
          <div className="space-y-2">
            {nextFiveOccurrences.map((date, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(date, 'h:mm a')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Pattern Type</h4>
            <p className="text-sm text-muted-foreground capitalize">{store.recurrenceType}</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Frequency</h4>
            <p className="text-sm text-muted-foreground">
              Every {store.interval} {store.recurrenceType === 'daily' ? 'day' :
                store.recurrenceType === 'weekly' ? 'week' :
                  store.recurrenceType === 'monthly' ? 'month' : 'year'}{store.interval > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">Configuration Details</h4>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            {store.recurrenceType === 'daily' && store.weekdaysOnly && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Weekdays only:</span> Monday through Friday
              </div>
            )}

            {store.recurrenceType === 'weekly' && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Selected days:</span> {
                  store.selectedWeekdays.map(day =>
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]
                  ).join(', ')
                }
              </div>
            )}

            {store.recurrenceType === 'monthly' && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Monthly pattern:</span> {
                  store.monthlyPattern === 'date'
                    ? `Same date each month (${format(store.startDate, 'do')})`
                    : `${store.monthlyOrdinal} ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][store.monthlyWeekday]} of each month`
                }
              </div>
            )}

            {store.recurrenceType === 'yearly' && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Yearly date:</span> {
                  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][store.yearlyMonth - 1]
                } {store.yearlyDate}
              </div>
            )}

            {store.hasEndDate && store.endDate && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">End date:</span> {format(store.endDate, 'MMMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
