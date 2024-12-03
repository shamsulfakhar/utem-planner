export const parseCSV = (csv: string) => {
  const lines = csv.split('\n')
  const headers = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    const values = line.split(',')
    return {
      date: values[0]?.trim(),
      name: values[1]?.trim(),
      type: values[2]?.trim()
    }
  }).filter(item => item.date && item.name)
}

export const generateCSV = (holidays: any[]) => {
  const headers = ['date,name,type']
  const rows = holidays.map(holiday => 
    `${holiday.date},${holiday.name},${holiday.type}`
  )
  
  return [...headers, ...rows].join('\n')
}