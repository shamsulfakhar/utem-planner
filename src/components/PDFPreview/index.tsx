'use client'

import React from 'react'
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { usePlannerSettings } from '@/lib/PlannerContext'

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'column',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Times-Roman',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  monthSection: {
    width: '15.5%',
  },
  monthTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  }
})

const monthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
]

const PDFPreview = () => {
  const { settings } = usePlannerSettings()
  const year = 2024
  const months = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="h-screen">
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A3" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
              <Text style={[styles.title, { fontFamily: settings.fonts.header }]}>
                UTeM {year} Planner Semester 2 Session 2023/2024
              </Text>
            </View>
            <View style={styles.monthsContainer}>
              {months.map((month) => (
                <View key={month} style={styles.monthSection}>
                  <Text style={styles.monthTitle}>
                    {monthNames[month]}
                  </Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}

export default PDFPreview