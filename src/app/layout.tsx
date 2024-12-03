import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PlannerProvider } from '@/lib/PlannerContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UTeM Planner Generator',
  description: 'Generate academic planners for UTeM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlannerProvider>
          {children}
        </PlannerProvider>
      </body>
    </html>
  )
}
