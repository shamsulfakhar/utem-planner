'use client'

import React from 'react'
import { usePlannerSettings } from '@/lib/PlannerContext'

interface ThemeCustomizerProps {
  className?: string;
}

const webSafeFonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Tahoma'
]

const themes = [
  {
    name: 'Classic',
    headerFont: 'Times New Roman',
    bodyFont: 'Arial',
    greyShade: '40%',
    borderStyle: 'solid'
  },
  {
    name: 'Modern',
    headerFont: 'Helvetica',
    bodyFont: 'Helvetica',
    greyShade: '30%',
    borderStyle: 'solid'
  },
  {
    name: 'Professional',
    headerFont: 'Georgia',
    bodyFont: 'Verdana',
    greyShade: '35%',
    borderStyle: 'solid'
  }
]

const ThemeCustomizer = ({ className = '' }: ThemeCustomizerProps) => {
  const { settings, updateSettings } = usePlannerSettings()

  const handleThemeChange = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName)
    if (theme) {
      updateSettings({
        theme: themeName,
        fonts: {
          header: theme.headerFont,
          body: theme.bodyFont
        }
      })
    }
  }

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Theme Customization</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {themes.map(theme => (
              <option key={theme.name} value={theme.name}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Header Font</label>
          <select
            value={settings.fonts.header}
            onChange={(e) => updateSettings({
              fonts: { ...settings.fonts, header: e.target.value }
            })}
            className="w-full p-2 border rounded"
          >
            {webSafeFonts.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Body Font</label>
          <select
            value={settings.fonts.body}
            onChange={(e) => updateSettings({
              fonts: { ...settings.fonts, body: e.target.value }
            })}
            className="w-full p-2 border rounded"
          >
            {webSafeFonts.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ThemeCustomizer