'use client'

import React, { createContext, useContext, useState } from 'react'
import { PlannerSettings } from './types'

const defaultSettings: PlannerSettings = {
  theme: 'default',
  fonts: {
    header: 'Arial',
    body: 'Arial',
  },
  events: [],
  holidays: [],
}

const PlannerContext = createContext<{
  settings: PlannerSettings
  updateSettings: (settings: Partial<PlannerSettings>) => void
}>({
  settings: defaultSettings,
  updateSettings: () => {},
})

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PlannerSettings>(defaultSettings)

  const updateSettings = (newSettings: Partial<PlannerSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }))
  }

  return (
    <PlannerContext.Provider value={{ settings, updateSettings }}>
      {children}
    </PlannerContext.Provider>
  )
}

export const usePlannerSettings = () => useContext(PlannerContext)
