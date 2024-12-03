'use client'

import React, { useState } from 'react'
import { usePlannerSettings } from '@/lib/PlannerContext'
import MonthSection from './MonthSection'
import HolidayManager from './HolidayManager'
import EventEditor from './EventEditor'
import ThemeCustomizer from './ThemeCustomizer'
import PDFPreview from '../PDFPreview'

const PlannerEditor = () => {
  const { settings } = usePlannerSettings()
  const [showPreview, setShowPreview] = useState(false)
  const year = 2024
  const months = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <HolidayManager />
        <EventEditor />
        <ThemeCustomizer />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showPreview ? 'Hide Preview' : 'Show PDF Preview'}
        </button>
      </div>

      {showPreview ? (
        <PDFPreview />
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-center mb-4">
            <h1 
              className="text-2xl font-bold"
              style={{ 
                fontFamily: settings.fonts.header 
              }}
            >
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
      )}
    </div>
  )
}

export default PlannerEditor