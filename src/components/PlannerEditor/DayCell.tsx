'use client'

import React from 'react'
import { Event } from '@/lib/types'

interface DayCellProps {
  date: Date
  dayName: string
  isWeekend: boolean
  isHoliday: boolean
  events: Event[]
}

const DayCell = ({ date, dayName, isWeekend, isHoliday, events }: DayCellProps) => {
  const formattedDate = date.getDate().toString().padStart(2, '0')
  const isSalaryDay = date.getDate() === 25
  
  return (
    <div 
      className={`h-8 border-b border-gray-300 p-1 ${
        isWeekend || isHoliday ? 'bg-gray-200' : ''
      }`}
    >
      <div className="flex items-center h-full">
        <span className="text-xs w-16 flex">
          <span className="w-8">{dayName}</span>
          <span className="font-medium">{formattedDate}</span>
        </span>
        <div className="flex-1 text-xs">
          {isSalaryDay && <span className="mr-1">💰 Gaji</span>}
          {events.map((event, index) => (
            <span key={event.id} className="mr-1">
              {event.title}
              {index < events.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DayCell