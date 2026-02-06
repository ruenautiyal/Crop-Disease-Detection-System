import { NextResponse } from "next/server"
import { analyzeImage } from "@/lib/image-analyzer"
import { addDiagnosis, type DiagnosisRecord } from "@/lib/diagnosis-store"
import { modelInfo } from "@/lib/model-info"
import sharp from "sharp"

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

    // Decode image properly using sharp - resize to 128x128 to match CNN input
    // This gives us actual RGB pixel data, not compressed file bytes
    const decoded = await sharp(buffer)
      .resize(128, 128, { fit: "cover" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { data: pixelData, info } = decoded

    console.log(
      `[v0] Image decoded: ${info.width}x${info.height}, ${info.channels} channels, ${pixelData.length} bytes`
    )

    // Run the color-profile analysis on properly decoded pixels
    const analysisResult = analyzeImage(pixelData, info.width, info.height)

    const topResult = analysisResult.topResults[0]

    console.log(
      `[v0] Top diagnosis: ${topResult.disease.className} (${topResult.confidence}%)`
    )
    console.log(
      `[v0] Color profile: green=${analysisResult.colorProfile.greenRatio.toFixed(3)}, brown=${analysisResult.colorProfile.brownRatio.toFixed(3)}, yellow=${analysisResult.colorProfile.yellowRatio.toFixed(3)}, dark=${analysisResult.colorProfile.darkSpotRatio.toFixed(3)}, white=${analysisResult.colorProfile.whiteRatio.toFixed(3)}`
    )

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
    console.error("[v0] Diagnosis error:", error)
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    )
  }
}
