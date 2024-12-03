'use client'

import React from 'react'
import { Event } from '@/lib/types'
import DayCell from './DayCell'
import { usePlannerSettings } from '@/lib/PlannerContext'

interface MonthSectionProps {
  month: number
  year: number
  events: Event[]
  holidays: string[]
}

const MonthSection = ({ month, year, events, holidays }: MonthSectionProps) => {
  const { settings } = usePlannerSettings()
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
      const eventStart = new Date(event.date)
      const eventEnd = new Date(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  const isHoliday = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return holidays.includes(dateStr)
  }

  return (
    <div className="flex flex-col" style={{ fontFamily: settings.fonts.body }}>
      {/* Month Header */}
      <div className="px-2 py-1">
        <h2 className="text-lg font-bold">{monthNames[month]}</h2>
      </div>

      {/* Days */}
      <div className="flex-1">
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