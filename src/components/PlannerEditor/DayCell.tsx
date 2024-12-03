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
      className={`
        h-[8mm] min-h-[8mm] 
        border-b border-gray-300 
        flex items-center 
        ${isWeekend || isHoliday ? 'bg-[#66666640]' : ''}
      `}
    >
      {/* Day and Date */}
      <div className="w-[20%] flex items-center pl-2 space-x-1">
        <span className="text-[10px] w-8 opacity-75">{dayName}</span>
        <span className="text-xs font-medium">{formattedDate}</span>
      </div>

      {/* Events */}
      <div className="flex-1 pr-2 text-[10px] truncate">
        {isSalaryDay && (
          <span className="inline-block mr-1">💰 Gaji</span>
        )}
        {events.map((event, index) => (
          <span 
            key={event.id} 
            className={`
              inline-block mr-1
              ${event.type === 'academic' ? 'border-b border-dashed' : ''}
              ${event.type === 'holiday' ? 'border-b border-solid' : ''}
            `}
          >
            {event.title}
            {event.endDate && " →"}
          </span>
        ))}
      </div>
    </div>
  )
}

export default DayCell