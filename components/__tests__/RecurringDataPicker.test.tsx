import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecurringDatePicker } from '../index'
import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'

jest.mock('@/store/recurring-date-picker')

describe('RecurringDatePicker', () => {
  const mockStore = {
    startDate: null,
    endDate: null,
    hasEndDate: false,
    recurrenceType: 'daily',
    interval: 1,
    weekdaysOnly: false,
    selectedWeekdays: [1, 2, 3, 4, 5],
    monthlyPattern: 'date',
    monthlyOrdinal: 'first',
    monthlyWeekday: 1,
    yearlyMonth: 1,
    yearlyDate: 1,
    isAdvancedMode: false,
    setStartDate: jest.fn(),
    setEndDate: jest.fn(),
    setHasEndDate: jest.fn(),
    setRecurrenceType: jest.fn(),
    setInterval: jest.fn(),
    setWeekdaysOnly: jest.fn(),
    setSelectedWeekdays: jest.fn(),
    toggleWeekday: jest.fn(),
    setMonthlyPattern: jest.fn(),
    setMonthlyOrdinal: jest.fn(),
    setMonthlyWeekday: jest.fn(),
    setYearlyMonth: jest.fn(),
    setYearlyDate: jest.fn(),
    setIsAdvancedMode: jest.fn(),
    reset: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
      ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue(mockStore)
  })

  it('renders the main component', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Schedule Recurring Dates')).toBeInTheDocument()
    expect(screen.getByText('Date Selection')).toBeInTheDocument()
    expect(screen.getByText('Recurrence Type')).toBeInTheDocument()
  })

  it('shows validation errors when start date is missing', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Please fix the following issues:')).toBeInTheDocument()
    expect(screen.getByText('No start date selected')).toBeInTheDocument()
  })

  it('shows success message after saving', async () => {
    const user = userEvent.setup()
      ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
        ...mockStore,
        startDate: new Date('2024-01-15'),
      })

    render(<RecurringDatePicker />)

    const saveButton = screen.getByText('Save Pattern')
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Recurring date pattern saved successfully!')).toBeInTheDocument()
    })
  })

  it('handles reset button click', async () => {
    const user = userEvent.setup()
    render(<RecurringDatePicker />)

    const resetButton = screen.getByText('Reset')
    await user.click(resetButton)

    expect(mockStore.reset).toHaveBeenCalled()
  })

  it('shows calendar preview when start date is set', () => {
    ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
      ...mockStore,
      startDate: new Date('2024-01-15'),
    })

    render(<RecurringDatePicker />)

    expect(screen.getByText('Preview Calendar')).toBeInTheDocument()
  })

  it('shows recurrence summary when start date is set', () => {
    ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
      ...mockStore,
      startDate: new Date('2024-01-15'),
    })

    render(<RecurringDatePicker />)

    expect(screen.getByText('Recurrence Summary')).toBeInTheDocument()
  })

  it('displays different panels based on recurrence type', () => {
    // Test daily panel
    ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
      ...mockStore,
      recurrenceType: 'daily',
    })

    const { rerender } = render(<RecurringDatePicker />)
    expect(screen.getByText('Daily Recurrence Settings')).toBeInTheDocument()

      // Test weekly panel
      ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
        ...mockStore,
        recurrenceType: 'weekly',
      })

    rerender(<RecurringDatePicker />)
    expect(screen.getByText('Weekly Recurrence Settings')).toBeInTheDocument()

      // Test monthly panel
      ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
        ...mockStore,
        recurrenceType: 'monthly',
      })

    rerender(<RecurringDatePicker />)
    expect(screen.getByText('Monthly Recurrence Settings')).toBeInTheDocument()

      // Test yearly panel
      ; (useRecurringDatePickerStore as jest.Mock).mockReturnValue({
        ...mockStore,
        recurrenceType: 'yearly',
      })

    rerender(<RecurringDatePicker />)
    expect(screen.getByText('Yearly Recurrence Settings')).toBeInTheDocument()
  })
})
