import { NextResponse } from "next/server"
import { analyzeImage } from "@/lib/image-analyzer"
import { addDiagnosis, type DiagnosisRecord } from "@/lib/diagnosis-store"
import { modelInfo } from "@/lib/model-info"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Get image data
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString("base64")
    const mimeType = imageFile.type || "image/jpeg"

    // In production, this would use the trained CNN model (trained_plant_disease_model.keras)
    // Model: 5 Conv2D Blocks (32->512 filters) + Dense(1500) + Softmax(38)
    // Input: 128x128 RGB | Dataset: New Plant Diseases Dataset (vipoooool)
    // Current implementation uses color-profile heuristics as a simulation
    const analysisResult = analyzeImageFromBuffer(buffer)

    const topResult = analysisResult.topResults[0]

    const record: DiagnosisRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      cropDetected: topResult.disease.crop,
      diseaseDetected: topResult.disease.isHealthy
        ? `${topResult.disease.crop} - Healthy`
        : topResult.disease.disease,
      diseaseId: topResult.disease.id,
      confidence: topResult.confidence,
      severity: topResult.disease.severity,
      isHealthy: topResult.disease.isHealthy,
      imageFileName: imageFile.name,
      topResults: analysisResult.topResults.map((r) => ({
        disease: r.disease.isHealthy
          ? `${r.disease.crop} - Healthy`
          : r.disease.disease,
        crop: r.disease.crop,
        confidence: r.confidence,
        diseaseId: r.disease.id,
      })),
    }

    addDiagnosis(record)

    return NextResponse.json({
      success: true,
      diagnosis: record,
      imagePreview: `data:${mimeType};base64,${base64}`,
      diseaseDetails: topResult.disease,
      allResults: analysisResult.topResults.map((r) => ({
        disease: r.disease,
        confidence: r.confidence,
      })),
      modelInfo: {
        name: modelInfo.name,
        dataset: modelInfo.dataset.name,
        datasetSource: modelInfo.dataset.source,
        architecture: `${modelInfo.architecture.type} (${modelInfo.architecture.convBlocks.length} Conv Blocks)`,
        inputShape: `${modelInfo.architecture.inputShape[0]}x${modelInfo.architecture.inputShape[1]} RGB`,
        totalClasses: modelInfo.architecture.outputClasses,
      },
    })
  } catch (error) {
    console.error("Diagnosis error:", error)
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    )
  }
}

// Server-side image analysis using raw buffer bytes
function analyzeImageFromBuffer(buffer: Buffer) {
  // Extract color information from raw image bytes
  // This analyzes the byte distribution to estimate color ratios
  const bytes = new Uint8Array(buffer)
  const sampleSize = Math.min(bytes.length, 50000)
  const step = Math.max(1, Math.floor(bytes.length / sampleSize))

  let totalR = 0, totalG = 0, totalB = 0
  let greenPixels = 0, brownPixels = 0, yellowPixels = 0
  let darkSpots = 0, brightSpots = 0, whitePixels = 0
  let totalSaturation = 0
  let pixelCount = 0

  // Skip file headers and sample triplets of bytes as RGB approximation
  const headerSkip = Math.min(100, Math.floor(bytes.length * 0.1))
  
  for (let i = headerSkip; i < bytes.length - 2; i += step * 3) {
    const r = bytes[i]
    const g = bytes[i + 1]
    const b = bytes[i + 2]
    
    totalR += r
    totalG += g
    totalB += b
    pixelCount++

    if (g > r * 1.1 && g > b * 1.1 && g > 60) greenPixels++
    if (r > 80 && r < 200 && g > 40 && g < 160 && b < 100 && r > g) brownPixels++
    if (r > 150 && g > 150 && b < 100) yellowPixels++
    if (r < 60 && g < 60 && b < 60) darkSpots++
    if (r > 200 && g > 200 && b > 200) brightSpots++
    if (r > 220 && g > 220 && b > 220) whitePixels++

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    totalSaturation += max > 0 ? (max - min) / max : 0
  }

  if (pixelCount === 0) pixelCount = 1

  const avgR = totalR / pixelCount
  const avgG = totalG / pixelCount
  const avgB = totalB / pixelCount

  // Build synthetic image data for the analyzer
  const syntheticWidth = 100
  const syntheticHeight = 100
  const syntheticData = new Uint8ClampedArray(syntheticWidth * syntheticHeight * 4)

  // Fill with analyzed color distribution
  for (let i = 0; i < syntheticData.length; i += 4) {
    const pixelIdx = Math.floor(i / 4)
    const sourceIdx = headerSkip + (pixelIdx * step * 3) % (bytes.length - headerSkip - 2)
    
    syntheticData[i] = bytes[sourceIdx] || Math.round(avgR)
    syntheticData[i + 1] = bytes[sourceIdx + 1] || Math.round(avgG)
    syntheticData[i + 2] = bytes[sourceIdx + 2] || Math.round(avgB)
    syntheticData[i + 3] = 255
  }

  return analyzeImage(syntheticData, syntheticWidth, syntheticHeight)
}
