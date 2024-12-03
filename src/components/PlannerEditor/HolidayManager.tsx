'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { usePlannerSettings } from '@/lib/PlannerContext'
import { parseCSV, generateCSV } from '@/lib/utils'

const HolidayManager = () => {
  const { settings, updateSettings } = usePlannerSettings()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const holidays = parseCSV(text)
        updateSettings({ holidays })
      }
      reader.readAsText(file)
    }
  }, [updateSettings])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  })

  const downloadCSV = () => {
    const csv = generateCSV(settings.holidays)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'holidays.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Holiday Management</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* CSV Upload */}
        <div 
          {...getRootProps()} 
          className={`p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the CSV file here...</p>
          ) : (
            <p>Drag & drop a holiday CSV file here, or click to select one</p>
          )}
        </div>

        {/* Download Template */}
        <div className="flex items-center justify-center">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Current Holidays
          </button>
        </div>
      </div>

      {/* Holiday List */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Current Holidays</h3>
        <div className="max-h-60 overflow-y-auto">
          {settings.holidays.map((holiday, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <span>{holiday.date} - {holiday.name}</span>
              <button
                onClick={() => {
                  const newHolidays = settings.holidays.filter((_, i) => i !== index)
                  updateSettings({ holidays: newHolidays })
                }}
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

export default HolidayManager