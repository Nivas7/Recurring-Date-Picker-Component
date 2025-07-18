export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type MonthlyPattern = 'date' | 'weekday'

export type MonthlyOrdinal = 'first' | 'second' | 'third' | 'fourth' | 'last'

export interface RecurringDatePickerState {
  // Core date settings
  startDate: Date | null
  endDate: Date | null
  hasEndDate: boolean

  // Recurrence settings
  recurrenceType: RecurrenceType
  interval: number

  // Weekly/Daily specific
  weekdaysOnly: boolean
  selectedWeekdays: number[]

  // Monthly specific
  monthlyPattern: MonthlyPattern
  monthlyOrdinal: MonthlyOrdinal
  monthlyWeekday: number

  // Yearly specific
  yearlyMonth: number
  yearlyDate: number

  // UI state
  isAdvancedMode: boolean
}

export interface RecurringDatePickerActions {
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setHasEndDate: (hasEndDate: boolean) => void
  setRecurrenceType: (type: RecurrenceType) => void
  setInterval: (interval: number) => void
  setWeekdaysOnly: (weekdaysOnly: boolean) => void
  setSelectedWeekdays: (weekdays: number[]) => void
  toggleWeekday: (weekday: number) => void
  setMonthlyPattern: (pattern: MonthlyPattern) => void
  setMonthlyOrdinal: (ordinal: MonthlyOrdinal) => void
  setMonthlyWeekday: (weekday: number) => void
  setYearlyMonth: (month: number) => void
  setYearlyDate: (date: number) => void
  setIsAdvancedMode: (isAdvanced: boolean) => void
  reset: () => void
}

export type RecurringDatePickerStore = RecurringDatePickerState & RecurringDatePickerActions
