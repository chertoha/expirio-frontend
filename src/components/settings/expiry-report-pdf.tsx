import type { Batch } from '@/types/entities'

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    backgroundColor: '#f9fafc',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
  },
  table: {
    width: '100%',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 4,
    flexGrow: 1,
  },
  redHeader: { backgroundColor: '#db5f0c' },
  yellowHeader: { backgroundColor: '#fef9c3' },

  textMuted: { color: '#555' },
})

type ExpiryReportPDFProps = {
  batches: Batch[]
  generatedAt: string
}

export const ExpiryReportPDF = ({
  batches,
  generatedAt,
}: ExpiryReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Pharmacy Expiry Report</Text>
        <Text style={styles.date}>Generated: {generatedAt}</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: '#c53232' }]}>
        Expired Products
      </Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader, styles.redHeader]}>
          <Text style={[styles.tableCol, { flex: 0.4 }]}>#</Text>
          <Text style={[styles.tableCol, { flex: 1.5 }]}>Product</Text>
          <Text style={[styles.tableCol, { flex: 1 }]}>Batch №</Text>
          <Text style={[styles.tableCol, { flex: 0.8 }]}>Qty</Text>
          <Text style={[styles.tableCol, { flex: 1 }]}>Storages</Text>
          <Text style={[styles.tableCol, { flex: 1 }]}>Manufacture</Text>
          <Text style={[styles.tableCol, { flex: 1 }]}>Expiration</Text>
        </View>

        {batches.map(
          (
            {
              batchNumber,
              manufactureDate,
              expirationDate,
              product: { name },
              storages,
            },
            i,
          ) => (
            <View style={styles.tableRow} key={batchNumber}>
              <Text style={[styles.tableCol, { flex: 0.4 }]}>{i + 1}</Text>
              <Text style={[styles.tableCol, { flex: 1.5 }]}>{name}</Text>
              <Text style={[styles.tableCol, { flex: 1 }]}>{batchNumber}</Text>
              <Text style={[styles.tableCol, { flex: 0.8 }]}>
                {storages.reduce((acc, { qty }) => (acc += qty), 0)}
              </Text>
              <Text style={[styles.tableCol, { flex: 1 }, styles.textMuted]}>
                {storages
                  .map(({ qty, storage }) => `${storage.name}: ${qty}`)
                  .join(', ')}{' '}
              </Text>
              <Text style={[styles.tableCol, { flex: 1 }]}>
                {format(manufactureDate, 'yyyy-MM-dd')}
              </Text>
              <Text style={[styles.tableCol, { flex: 1 }]}>
                {format(expirationDate, 'yyyy-MM-dd')}
              </Text>
            </View>
          ),
        )}
      </View>
    </Page>
  </Document>
)
