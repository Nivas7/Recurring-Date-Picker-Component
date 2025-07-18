'use client'

import { useState } from 'react'
import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay
} from 'date-fns'
import { generateRecurringDates, WEEKDAY_NAMES } from '@/lib/dates'

export function CalendarPreview() {
  const store = useRecurringDatePickerStore()
  const [currentDate, setCurrentDate] = useState(() => store.startDate || new Date())

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
  }, 100)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1))
  }

  const isRecurringDate = (date: Date) => {
    return recurringDates.some(recurringDate => isSameDay(date, recurringDate))
  }

  const isStartDate = (date: Date) => {
    return isSameDay(date, store.startDate!)
  }

  const getDayClasses = (date: Date) => {
    const baseClasses = 'w-10 h-10 flex items-center justify-center text-sm rounded-full transition-colors'
    const isCurrentMonth = isSameMonth(date, currentDate)
    const isStart = isStartDate(date)
    const isRecurring = isRecurringDate(date)

    if (isStart) {
      return `${baseClasses} bg-accent text-accent-foreground font-bold`
    } else if (isRecurring) {
      return `${baseClasses} bg-primary text-primary-foreground font-medium`
    } else if (isCurrentMonth) {
      return `${baseClasses} text-foreground hover:bg-accent/50`
    } else {
      return `${baseClasses} text-muted-foreground`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Preview Calendar</CardTitle>
        <CardDescription>
          Visual preview of your recurring dates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <h3 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h3>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="w-full">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAY_NAMES.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date) => (
              <div key={date.toISOString()} className="flex justify-center p-1">
                <div className={getDayClasses(date)}>
                  {format(date, 'd')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Start Date</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Recurring Dates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded-full border border-border"></div>
            <span className="text-muted-foreground">Other Days</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Calendar Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total recurring dates:</span>
              <span className="ml-2 font-medium text-foreground">{recurringDates.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dates this month:</span>
              <span className="ml-2 font-medium text-foreground">
                {recurringDates.filter(date => isSameMonth(date, currentDate)).length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
