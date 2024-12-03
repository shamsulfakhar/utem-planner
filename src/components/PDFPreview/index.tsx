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
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  monthSection: {
    width: '15.5%',
  },
  dayCell: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 4,
    minHeight: 20,
  },
  weekend: {
    backgroundColor: '#e5e5e5',
  },
  dayText: {
    fontSize: 8,
  },
  eventText: {
    fontSize: 6,
  },
})

const PDFPreview = () => {
  const { settings } = usePlannerSettings()

  return (
    <div className="h-screen">
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A3" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>
                UTeM 2024 Planner Semester 2 Session 2023/2024
              </Text>
            </View>
            {/* PDF content will be implemented here */}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}

export default PDFPreview