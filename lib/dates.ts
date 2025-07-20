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
  endDate?: Date | null
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none'
  interval: number
  weekdaysOnly?: boolean
  selectedWeekdays?: number[]
  monthlyPattern?: 'date' | 'weekday'
  monthlyDate?: number
  monthlyOrdinal?: 'first' | 'second' | 'third' | 'fourth' | 'last'
  monthlyWeekday?: number
  yearlyMonth?: number
  yearlyDate?: number
}

export function generateRecurringDates(
  options: RecurringDateOptions,
  maxOccurrences: number = 100
): Date[] {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    weekdaysOnly = false,
    selectedWeekdays = [1, 2, 3, 4, 5],
    monthlyPattern = 'date',
    monthlyDate = getDate(startDate),
    monthlyOrdinal = 'first',
    monthlyWeekday = getDay(startDate),
    yearlyMonth = getMonth(startDate) + 1,
    yearlyDate = getDate(startDate)
  } = options

  const dates: Date[] = []
  let currentSearchDate = new Date(startDate)

  if (recurrenceType === 'none') {
    dates.push(new Date(startDate));
    return dates;
  }

  let occurrenceCount = 0;

  while (occurrenceCount < maxOccurrences) {
    if (endDate && isAfter(currentSearchDate, endDate)) {
      break;
    }

    if (recurrenceType === 'daily') {
      if (!weekdaysOnly || (getDay(currentSearchDate) >= 1 && getDay(currentSearchDate) <= 5)) {
        if (!dates.some(d => isSameDay(d, currentSearchDate))) {
          dates.push(new Date(currentSearchDate));
          occurrenceCount++;
        }
      }
      currentSearchDate = addDays(currentSearchDate, interval);

    } else if (recurrenceType === 'weekly') {

      const startOfWeekForSearch = startOfWeek(currentSearchDate);
      for (let i = 0; i < 7; i++) {
        const candidateDate = addDays(startOfWeekForSearch, i);

        if (isBefore(candidateDate, startDate) && !isEqual(candidateDate, startDate)) {
          continue;
        }

        if (endDate && isAfter(candidateDate, endDate)) {
          break;
        }

        if (selectedWeekdays.includes(getDay(candidateDate))) {
          if (!dates.some(d => isSameDay(d, candidateDate))) {
            dates.push(new Date(candidateDate));
            occurrenceCount++;
            if (occurrenceCount >= maxOccurrences) break;
          }
        }
      }
      currentSearchDate = addWeeks(currentSearchDate, interval);

    } else if (recurrenceType === 'monthly') {
      let candidateInMonth: Date | null = null;
      if (monthlyPattern === 'date') {
        candidateInMonth = setDate(startOfMonth(currentSearchDate), monthlyDate);
        if (getDate(candidateInMonth) !== monthlyDate && monthlyDate > 28 && isSameMonth(candidateInMonth, currentSearchDate)) {
          candidateInMonth = null;
        } else if (!isSameMonth(candidateInMonth, currentSearchDate)) {
          candidateInMonth = null;
        }
      } else {
        candidateInMonth = getNthWeekdayOfMonth(currentSearchDate, monthlyOrdinal, monthlyWeekday);
      }

      if (candidateInMonth && !isBefore(candidateInMonth, startDate)) {
        if (!dates.some(d => isSameDay(d, candidateInMonth))) {
          dates.push(new Date(candidateInMonth));
          occurrenceCount++;
        }
      }
      currentSearchDate = addMonths(currentSearchDate, interval);

    } else if (recurrenceType === 'yearly') {
      const targetMonthIndex = yearlyMonth - 1;
      const targetDay = yearlyDate;

      let candidateInYear: Date | null = setMonth(currentSearchDate, targetMonthIndex);
      candidateInYear = setDate(candidateInYear, targetDay);

      // Handle cases where yearlyDate is beyond the end of the month
      if (getDate(candidateInYear) !== targetDay && targetDay > 28 && isSameMonth(candidateInYear, setMonth(currentSearchDate, targetMonthIndex))) {
        candidateInYear = null;
      } else if (!isSameMonth(candidateInYear, setMonth(currentSearchDate, targetMonthIndex))) {
        candidateInYear = null;
      }

      if (candidateInYear && !isBefore(candidateInYear, startDate)) {
        if (!dates.some(d => isSameDay(d, candidateInYear))) {
          dates.push(new Date(candidateInYear));
          occurrenceCount++;
        }
      }
      currentSearchDate = addYears(currentSearchDate, interval);
    }
  }

  dates.sort((a, b) => a.getTime() - b.getTime());

  return dates;
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
    monthlyDate = getDate(startDate),
    monthlyOrdinal = 'first',
    monthlyWeekday = 0,
    yearlyMonth = 1,
    yearlyDate = 1
  } = options

  let pattern = ''

  if (recurrenceType === 'none') {
    pattern = 'Once';
  } else if (recurrenceType === 'daily') {
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
      pattern = interval === 1
        ? `Monthly on day ${monthlyDate}`
        : `Every ${interval} months on day ${monthlyDate}`
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
    if (isBefore(options.endDate, options.startDate)) {
      errors.push('End date must be after start date')
    }
  }

  if (options.recurrenceType === 'weekly' && (options.selectedWeekdays?.length ?? 0) === 0) {
    errors.push('At least one weekday must be selected for weekly recurrence')
  }

  return errors
}
