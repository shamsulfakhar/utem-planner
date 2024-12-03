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
  
  const renderEvents = () => {
    let items = []
    if (isSalaryDay) {
      items.push(<span key="salary" className="mr-1">💰 Gaji</span>)
    }
    
    events.forEach((event, index) => {
      let eventStyle = ''
      switch (event.type) {
        case 'academic':
          eventStyle = 'border-b border-dashed border-gray-500'
          break
        case 'administrative':
          eventStyle = 'border-b border-dotted border-gray-500'
          break
        case 'holiday':
          eventStyle = 'border-b border-solid border-gray-500'
          break
        case 'personal':
          eventStyle = 'border-b border-double border-gray-500'
          break
      }
      
      items.push(
        <span key={event.id} className={`mr-1 ${eventStyle}`}>
          {event.title}
          {event.endDate && " →"}
        </span>
      )
    })
    
    return items
  }

  return (
    <div 
      className={`h-8 px-2 py-1 flex items-center ${
        isWeekend || isHoliday ? 'bg-gray-200' : ''
      }`}
    >
      <div className="flex items-center space-x-2 w-full">
        <div className="flex-none w-16 text-xs">
          <span className="w-8 inline-block opacity-70">{dayName}</span>
          <span className="w-8 inline-block font-medium">{formattedDate}</span>
        </div>
        <div className="flex-1 text-xs truncate">
          {renderEvents()}
        </div>
      </div>
    </div>
  )
}

export default DayCell