'use client'

import React from 'react'
import { usePlannerSettings } from '@/lib/PlannerContext'
import MonthSection from './MonthSection'
import HolidayManager from './HolidayManager'

const PlannerEditor = () => {
  const { settings } = usePlannerSettings()
  const year = 2024
  const months = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="space-y-4">
      <HolidayManager />
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-center mb-4">
          <h1 className={`text-2xl font-bold`} style={{ fontFamily: settings.fonts.header }}>
            UTeM 2024 Planner Semester 2 Session 2023/2024
          </h1>
        </div>
        <div className="flex gap-4">
          {months.map((month) => (
            <MonthSection
              key={month}
              month={month}
              year={year}
              events={settings.events}
              holidays={settings.holidays.map(h => h.date)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlannerEditor