'use client'

import React from 'react'
import { Event } from '@/lib/types'
import DayCell from './DayCell'

interface MonthSectionProps {
  month: number
  year: number
  events: Event[]
  holidays: string[] // Array of holiday dates in YYYY-MM-DD format
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
    return events.filter(event => event.date === dateStr)
  }

  const isHoliday = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return holidays.includes(dateStr)
  }

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-lg font-bold mb-2">{monthNames[month]}</h2>
      <div className="border-t border-gray-300">
        {getDaysInMonth().map((date) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            dayName={dayNames[date.getDay()]}
            isWeekend={date.getDay() === 0 || date.getDay() === 6}
            isHoliday={isHoliday(date)}
            events={getEventsForDate(date)}
          />
        ))}
      </div>
    </div>
  )
}

export default MonthSection