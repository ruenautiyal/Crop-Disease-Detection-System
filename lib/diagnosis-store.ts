// In-memory diagnosis history store (server-side)
// In production, this would be backed by PostgreSQL/SQLite

export interface DiagnosisRecord {
  id: string
  timestamp: string
  cropDetected: string
  diseaseDetected: string
  diseaseId: string
  confidence: number
  severity: string
  isHealthy: boolean
  imageFileName: string
  topResults: {
    disease: string
    crop: string
    confidence: number
    diseaseId: string
  }[]
}

// Global in-memory store
const diagnosisHistory: DiagnosisRecord[] = []

export function addDiagnosis(record: DiagnosisRecord): void {
  diagnosisHistory.unshift(record)
  // Keep last 100 records
  if (diagnosisHistory.length > 100) {
    diagnosisHistory.pop()
  }
}

export function getDiagnosisHistory(): DiagnosisRecord[] {
  return [...diagnosisHistory]
}

export function getDiagnosisById(id: string): DiagnosisRecord | undefined {
  return diagnosisHistory.find((r) => r.id === id)
}

export function getDiagnosisStats() {
  const total = diagnosisHistory.length
  const healthyCount = diagnosisHistory.filter((r) => r.isHealthy).length
  const diseasedCount = total - healthyCount

  const byCrop: Record<string, number> = {}
  const byDisease: Record<string, number> = {}
  const bySeverity: Record<string, number> = {}

  for (const record of diagnosisHistory) {
    byCrop[record.cropDetected] = (byCrop[record.cropDetected] || 0) + 1
    if (!record.isHealthy) {
      byDisease[record.diseaseDetected] = (byDisease[record.diseaseDetected] || 0) + 1
    }
    bySeverity[record.severity] = (bySeverity[record.severity] || 0) + 1
  }

  return {
    total,
    healthyCount,
    diseasedCount,
    byCrop,
    byDisease,
    bySeverity,
    recentDiagnoses: diagnosisHistory.slice(0, 5),
  }
}
