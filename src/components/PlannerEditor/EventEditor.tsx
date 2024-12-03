'use client'

import React, { useState } from 'react'
import { usePlannerSettings } from '@/lib/PlannerContext'
import { Event } from '@/lib/types'

const eventTypes = [
  { value: 'academic', label: 'Academic' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'personal', label: 'Personal' }
] as const

const EventEditor = () => {
  const { settings, updateSettings } = usePlannerSettings()
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: '',
    type: 'academic',
    recurring: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEvent.title && newEvent.date) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        type: newEvent.type as Event['type'],
        recurring: newEvent.recurring,
        endDate: newEvent.endDate
      }
      
      updateSettings({
        events: [...settings.events, event]
      })
      
      setNewEvent({
        title: '',
        date: '',
        type: 'academic',
        recurring: false
      })
    }
  }

  const handleDelete = (id: string) => {
    updateSettings({
      events: settings.events.filter(event => event.id !== id)
    })
  }

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Event Management</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              value={newEvent.type}
              onChange={e => setNewEvent(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
              className="w-full p-2 border rounded"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
            <input
              type="date"
              value={newEvent.endDate || ''}
              onChange={e => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newEvent.recurring || false}
                onChange={e => setNewEvent(prev => ({ ...prev, recurring: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm font-medium">Recurring Annual Event</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Current Events</h3>
        <div className="max-h-60 overflow-y-auto">
          {settings.events.map((event) => (
            <div key={event.id} className="flex items-center justify-between py-2 border-b">
              <div>
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {event.date} {event.endDate ? `to ${event.endDate}` : ''}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                  {event.type}
                </span>
                {event.recurring && (
                  <span className="text-xs bg-blue-100 px-2 py-1 rounded ml-2">
                    Recurring
                  </span>
                )}
              </div>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventEditor