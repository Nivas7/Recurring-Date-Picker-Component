'use client'

import { RecurringDatePicker } from '@/components/index'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Recurring Date Picker Demo
          </h1>
          <RecurringDatePicker />
        </div>
      </div>
    </main>
  )
}
