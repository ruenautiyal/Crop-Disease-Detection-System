import { NextResponse } from "next/server"
import { getDiagnosisStats } from "@/lib/diagnosis-store"
import { getDatasetStats } from "@/lib/disease-database"
import { modelInfo } from "@/lib/model-info"

export async function GET() {
  const diagnosisStats = getDiagnosisStats()
  const datasetStats = {
    ...getDatasetStats(),
    datasetName: modelInfo.dataset.name,
    datasetSource: modelInfo.dataset.source,
    totalImages: modelInfo.dataset.totalImages,
    trainImages: modelInfo.dataset.trainImages,
    validImages: modelInfo.dataset.validImages,
    imageSize: modelInfo.dataset.imageSize,
    modelName: modelInfo.name,
    modelArchitecture: modelInfo.architecture.type,
  }

  return NextResponse.json({
    diagnosisStats,
    datasetStats,
  })
}
