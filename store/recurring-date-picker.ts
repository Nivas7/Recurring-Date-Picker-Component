import { create } from 'zustand'
import { RecurringDatePickerStore } from '@/types/recurring-date-picker'

const initialState = {
  startDate: null,
  endDate: null,
  hasEndDate: false,
  recurrenceType: 'daily' as const,
  interval: 1,
  weekdaysOnly: false,
  selectedWeekdays: [1, 2, 3, 4, 5], // Monday to Friday
  monthlyPattern: 'date' as const,
  monthlyOrdinal: 'first' as const,
  monthlyWeekday: 1, // Monday
  yearlyMonth: 1, // January
  yearlyDate: 1,
  isAdvancedMode: false,
}

export const useRecurringDatePickerStore = create<RecurringDatePickerStore>((set, get) => ({
  ...initialState,

  setStartDate: (date) => set({ startDate: date }),

  setEndDate: (date) => set({ endDate: date }),

  setHasEndDate: (hasEndDate) => set((state) => ({
    hasEndDate,
    endDate: hasEndDate ? state.endDate : null
  })),

  setRecurrenceType: (type) => set({ recurrenceType: type }),

  setInterval: (interval) => set({ interval }),

  setWeekdaysOnly: (weekdaysOnly) => set({ weekdaysOnly }),

  setSelectedWeekdays: (weekdays) => set({ selectedWeekdays: weekdays }),

  toggleWeekday: (weekday) => set((state) => {
    const currentWeekdays = state.selectedWeekdays
    const newWeekdays = currentWeekdays.includes(weekday)
      ? currentWeekdays.filter(day => day !== weekday)
      : [...currentWeekdays, weekday].sort((a, b) => a - b)

    return { selectedWeekdays: newWeekdays }
  }),

  setMonthlyPattern: (pattern) => set({ monthlyPattern: pattern }),

  setMonthlyOrdinal: (ordinal) => set({ monthlyOrdinal: ordinal }),

  setMonthlyWeekday: (weekday) => set({ monthlyWeekday: weekday }),

  setYearlyMonth: (month) => set({ yearlyMonth: month }),

  setYearlyDate: (date) => set({ yearlyDate: date }),

  setIsAdvancedMode: (isAdvanced) => set({ isAdvancedMode: isAdvanced }),

  reset: () => set(initialState),
}))
