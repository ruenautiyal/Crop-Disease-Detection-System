import { NextResponse } from "next/server"
import { getDiagnosisStats } from "@/lib/diagnosis-store"
import { getDatasetStats } from "@/lib/disease-database"

export async function GET() {
  const diagnosisStats = getDiagnosisStats()
  const datasetStats = getDatasetStats()

  return NextResponse.json({
    diagnosisStats,
    datasetStats,
  })
}
