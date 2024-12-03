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
    <div className="max-w-[842px] mx-auto space-y-4"> {/* A3 width equivalent */}
      <div className="grid grid-cols-2 gap-4">
        <HolidayManager />
        <EventEditor />
      </div>
      
      <ThemeCustomizer />
      
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 
              className="text-2xl font-bold text-center"
              style={{ fontFamily: settings.fonts.header }}
            >
              UTeM 2024 Planner Semester 2 Session 2023/2024
            </h1>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            <div className="grid grid-cols-6 gap-0"> {/* Remove gap between months */}
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
      )}
    </div>
  )
}

export default PlannerEditor