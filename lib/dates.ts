import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
  getDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  setDate,
  getDate,
  getMonth,
  getYear,
  setMonth,
  setYear,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isSameDay
} from 'date-fns'

export const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const WEEKDAY_FULL_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
export const ORDINAL_NAMES = ['first', 'second', 'third', 'fourth', 'last'] as const

export interface RecurringDateOptions {
  startDate: Date
  endDate?: Date
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  weekdaysOnly?: boolean
  selectedWeekdays?: number[]
  monthlyPattern?: 'date' | 'weekday'
  monthlyOrdinal?: 'first' | 'second' | 'third' | 'fourth' | 'last'
  monthlyWeekday?: number
  yearlyMonth?: number
  yearlyDate?: number
}

export function generateRecurringDates(
  options: RecurringDateOptions,
  maxOccurrences: number = 50
): Date[] {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    weekdaysOnly = false,
    selectedWeekdays = [1, 2, 3, 4, 5],
    monthlyPattern = 'date',
    monthlyOrdinal = 'first',
    monthlyWeekday = 1,
    yearlyMonth = 1,
    yearlyDate = 1
  } = options

  const dates: Date[] = []
  let currentDate = new Date(startDate)
  let occurrenceCount = 0

  while (occurrenceCount < maxOccurrences) {
    if (endDate && isAfter(currentDate, endDate)) {
      break
    }

    if (shouldIncludeDate(currentDate, { ...options, selectedWeekdays })) {
      dates.push(new Date(currentDate))
      occurrenceCount++
    }

    currentDate = getNextDate(currentDate, recurrenceType, interval)
  }

  return dates
}

function shouldIncludeDate(date: Date, options: RecurringDateOptions): boolean {
  const { recurrenceType, weekdaysOnly = false, selectedWeekdays = [] } = options

  if (recurrenceType === 'daily' && weekdaysOnly) {
    const dayOfWeek = getDay(date)
    return dayOfWeek >= 1 && dayOfWeek <= 5 // Monday to Friday
  }

  if (recurrenceType === 'weekly') {
    const dayOfWeek = getDay(date)
    return selectedWeekdays.includes(dayOfWeek)
  }

  return true
}

function getNextDate(
  currentDate: Date,
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  interval: number
): Date {
  switch (recurrenceType) {
    case 'daily':
      return addDays(currentDate, interval)
    case 'weekly':
      return addWeeks(currentDate, interval)
    case 'monthly':
      return addMonths(currentDate, interval)
    case 'yearly':
      return addYears(currentDate, interval)
    default:
      return currentDate
  }
}

export function generateMonthlyRecurringDates(
  startDate: Date,
  endDate: Date | null,
  interval: number,
  pattern: 'date' | 'weekday',
  ordinal: 'first' | 'second' | 'third' | 'fourth' | 'last',
  weekday: number,
  maxOccurrences: number = 50
): Date[] {
  const dates: Date[] = []
  let currentDate = new Date(startDate)
  let occurrenceCount = 0

  while (occurrenceCount < maxOccurrences) {
    if (endDate && isAfter(currentDate, endDate)) {
      break
    }

    if (pattern === 'date') {
      const targetDate = getDate(startDate)
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(currentDate)
      const candidateDate = setDate(monthStart, targetDate)

      if (candidateDate <= monthEnd) {
        dates.push(candidateDate)
        occurrenceCount++
      }
    } else {
      const targetDate = getNthWeekdayOfMonth(currentDate, ordinal, weekday)
      if (targetDate) {
        dates.push(targetDate)
        occurrenceCount++
      }
    }

    currentDate = addMonths(currentDate, interval)
  }

  return dates
}

export function getNthWeekdayOfMonth(
  date: Date,
  ordinal: 'first' | 'second' | 'third' | 'fourth' | 'last',
  weekday: number
): Date | null {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const matchingDays = daysInMonth.filter(day => getDay(day) === weekday)

  if (matchingDays.length === 0) return null

  switch (ordinal) {
    case 'first':
      return matchingDays[0]
    case 'second':
      return matchingDays[1] || null
    case 'third':
      return matchingDays[2] || null
    case 'fourth':
      return matchingDays[3] || null
    case 'last':
      return matchingDays[matchingDays.length - 1]
    default:
      return null
  }
}

export function formatRecurrencePattern(options: RecurringDateOptions): string {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    weekdaysOnly = false,
    selectedWeekdays = [],
    monthlyPattern = 'date',
    monthlyOrdinal = 'first',
    monthlyWeekday = 0,
    yearlyMonth = 1,
    yearlyDate = 1
  } = options

  let pattern = ''

  if (recurrenceType === 'daily') {
    pattern = weekdaysOnly
      ? 'Every weekday'
      : interval === 1 ? 'Daily' : `Every ${interval} days`
  } else if (recurrenceType === 'weekly') {
    const weekdayNames = selectedWeekdays.map(day => WEEKDAY_NAMES[day]).join(', ')
    pattern = interval === 1
      ? `Weekly on ${weekdayNames}`
      : `Every ${interval} weeks on ${weekdayNames}`
  } else if (recurrenceType === 'monthly') {
    if (monthlyPattern === 'date') {
      const date = getDate(startDate)
      pattern = interval === 1
        ? `Monthly on day ${date}`
        : `Every ${interval} months on day ${date}`
    } else {
      const weekdayName = WEEKDAY_FULL_NAMES[monthlyWeekday ?? 0]
      pattern = interval === 1
        ? `The ${monthlyOrdinal} ${weekdayName} of every month`
        : `The ${monthlyOrdinal} ${weekdayName} of every ${interval} months`
    }
  } else if (recurrenceType === 'yearly') {
    const monthName = MONTH_NAMES[(yearlyMonth ?? 1) - 1]
    pattern = interval === 1
      ? `Yearly on ${monthName} ${yearlyDate}`
      : `Every ${interval} years on ${monthName} ${yearlyDate}`
  }

  const startDateStr = format(startDate, 'MMMM d, yyyy')
  let dateRange = ` starting from ${startDateStr}`

  if (endDate) {
    const endDateStr = format(endDate, 'MMMM d, yyyy')
    dateRange += ` until ${endDateStr}`
  }

  return pattern + dateRange
}

export function getCalendarDates(date: Date): Date[] {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
}

export function isDateInRecurringPattern(
  date: Date,
  recurringDates: Date[]
): boolean {
  return recurringDates.some(recurringDate => isSameDay(date, recurringDate))
}

export function validateRecurringDatePattern(options: {
  startDate: Date | null
  endDate: Date | null
  hasEndDate: boolean
  recurrenceType: string
  selectedWeekdays?: number[]
}): string[] {
  const errors: string[] = []

  if (!options.startDate) {
    errors.push('No start date selected')
  }

  if (options.hasEndDate && options.endDate && options.startDate) {
    if (options.endDate <= options.startDate) {
      errors.push('End date must be after start date')
    }
  }

  if (options.recurrenceType === 'weekly' && (options.selectedWeekdays?.length ?? 0) === 0) {
    errors.push('At least one weekday must be selected for weekly recurrence')
  }

  return errors
}
