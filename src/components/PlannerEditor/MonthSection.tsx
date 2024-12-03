'use client'

import React from 'react'
import { Event } from '@/lib/types'
import DayCell from './DayCell'

interface MonthSectionProps {
  month: number
  year: number
  events: Event[]
  holidays: string[]
}

const MonthSection = ({ month, year, events, holidays }: MonthSectionProps) => {
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ]

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDaysInMonth = () => {
    const date = new Date(year, month, 1)
    const days = []
    
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => {
      if (!event.endDate) {
        return event.date === dateStr
      }
      // Handle multi-day events
      const eventStart = new Date(event.date)
      const eventEnd = new Date(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  const isHoliday = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return holidays.includes(dateStr)
  }

  const daysInMonth = getDaysInMonth()

  return (
    <div className="flex-1 min-w-0 border-r border-gray-200 last:border-r-0">
      {/* Month Header */}
      <h2 className="text-base font-bold px-2 py-1 border-b border-gray-300">
        {monthNames[month]}
      </h2>

      {/* Days Grid */}
      <div className="divide-y divide-gray-200">
        {daysInMonth.map((date) => {
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const dateEvents = getEventsForDate(date)
          
          return (
            <DayCell
              key={date.toISOString()}
              date={date}
              dayName={dayNames[date.getDay()]}
              isWeekend={isWeekend}
              isHoliday={isHoliday(date)}
              events={dateEvents}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MonthSection