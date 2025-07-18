'use client'

import { useState } from 'react'
import { useRecurringDatePickerStore } from '@/store/recurring-date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DateSelectionPanel } from './dateSelectionPanel'
import { RecurrenceTypeSelector } from './recurrenceTypeSelector'
import { DailyRecurrencePanel } from './dailyrecurrencePannel'
import { WeeklyRecurrencePanel } from './weekelyReccurenceSelector'
import { MonthlyRecurrencePanel } from './monthlyRecurrencepanel'
import { YearlyRecurrencePanel } from './yearlyreccurencepanel'
import { CalendarPreview } from './calender-preview'
import { RecurrenceSummary } from './recurrenceSummary'
import { validateRecurringDatePattern } from '@/lib/dates'
import { RotateCcw, Save } from 'lucide-react'

export function RecurringDatePicker() {
  const {
    recurrenceType,
    startDate,
    endDate,
    hasEndDate,
    reset
  } = useRecurringDatePickerStore()

  const [showSuccess, setShowSuccess] = useState(false)

  const validationErrors = validateRecurringDatePattern(useRecurringDatePickerStore.getState())
  const isValid = validationErrors.length === 0

  const handleSave = () => {
    if (isValid) {
      // In a real app, this would save to a database or API
      console.log('Saving recurring date pattern:', useRecurringDatePickerStore.getState())
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleReset = () => {
    reset()
    setShowSuccess(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Schedule Recurring Dates
          </CardTitle>
          <CardDescription>
            Create complex recurring date patterns with advanced customization options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary">
                    Recurring date pattern saved successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-destructive">
                    Please fix the following issues:
                  </h3>
                  <ul className="mt-2 text-sm text-destructive/80 list-disc list-inside">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Date Selection */}
          <DateSelectionPanel />

          {/* Recurrence Type Selection */}
          <RecurrenceTypeSelector />

          {/* Recurrence Pattern Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-card-foreground">Recurrence Pattern</h3>

            {recurrenceType === 'daily' && <DailyRecurrencePanel />}
            {recurrenceType === 'weekly' && <WeeklyRecurrencePanel />}
            {recurrenceType === 'monthly' && <MonthlyRecurrencePanel />}
            {recurrenceType === 'yearly' && <YearlyRecurrencePanel />}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button
              onClick={handleSave}
              disabled={!isValid}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Pattern
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Preview */}
      {startDate && <CalendarPreview />}

      {/* Summary */}
      {startDate && <RecurrenceSummary />}
    </div>
  )
}
