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
        border-b border-gray-200 
        flex items-center 
        ${isWeekend || isHoliday ? 'bg-[#66666640]' : ''}
      `}
    >
      {/* Day and Date */}
      <div className="flex items-center gap-1 w-16 pl-1">
        <span className="text-[10px] opacity-75 w-8">{dayName}</span>
        <span className="text-xs font-medium">{formattedDate}</span>
      </div>

      {/* Events Area */}
      <div className="flex-1 pr-1 text-[10px] truncate flex items-center gap-1">
        {isSalaryDay && (
          <span className="inline-block">💰 Gaji</span>
        )}
        {events.map((event) => (
          <span 
            key={event.id} 
            className={`
              inline-block
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