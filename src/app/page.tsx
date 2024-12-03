'use client'

import React from 'react'
import PlannerEditor from '@/components/PlannerEditor'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <PlannerEditor />
      </div>
    </main>
  )
}