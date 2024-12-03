import { Holiday } from './types'

export const parseCSV = (csv: string): Holiday[] => {
  const lines = csv.split('\n').filter(line => line.trim())
  // Remove header line but don't store it
  lines.shift()
  
  return lines.map(line => {
    const values = line.split(',')
    return {
      date: values[0]?.trim() || '',
      name: values[1]?.trim() || '',
      type: values[2]?.trim() as 'National' | 'State'
    }
  }).filter(item => item.date && item.name)
}

export const generateCSV = (holidays: Holiday[]): string => {
  const headers = ['date,name,type']
  const rows = holidays.map(holiday => 
    `${holiday.date},${holiday.name},${holiday.type}`
  )
  
  return [...headers, ...rows].join('\n')
}