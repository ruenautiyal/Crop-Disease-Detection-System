"use client"

import { useState, useCallback } from "react"
import { mutate } from "swr"
import { ImageUploader } from "@/components/image-uploader"
import { DiagnosisResult } from "@/components/diagnosis-result"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Info } from "lucide-react"

interface DiagnosisResponse {
  success: boolean
  imagePreview: string
  diseaseDetails: {
    id: string
    crop: string
    disease: string
    isHealthy: boolean
    description: string
    symptoms: string[]
    causes: string[]
    treatments: string[]
    preventionTips: string[]
    severity: string
    spreadRate: string
  }
  diagnosis: {
    confidence: number
  }
  allResults: {
    disease: {
      id: string
      crop: string
      disease: string
      isHealthy: boolean
      description: string
      symptoms: string[]
      causes: string[]
      treatments: string[]
      preventionTips: string[]
      severity: string
      spreadRate: string
    }
    confidence: number
  }[]
}

export default function DiagnosePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DiagnosisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = useCallback(async (file: File) => {
    // Create local preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResult(null)
    setError(null)
    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/diagnose", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data: DiagnosisResponse = await response.json()

      if (data.success) {
        setResult(data)
        // Revalidate stats and history
        mutate("/api/stats")
        mutate("/api/history")
      } else {
        setError("Analysis failed. Please try again.")
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      )
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const handleClear = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setResult(null)
    setError(null)
  }, [previewUrl])

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
            Disease Diagnosis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a leaf image to detect diseases and get treatment
            recommendations
          </p>
        </div>

        {/* Tip Box */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">
                CNN Model - Tips for best results
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                This system uses a 5-block CNN trained on the New Plant Diseases
                Dataset (87K+ images, 38 classes). Upload clear, well-lit photos
                of individual leaves at 128x128 resolution or higher. Supported
                crops: Apple, Tomato, Potato, Corn, Grape, Peach, Cherry,
                Strawberry, Pepper, Orange, Soybean, Squash, Raspberry, and
                Blueberry.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload + Results Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="flex flex-col gap-4">
            <ImageUploader
              onImageSelected={handleImageSelected}
              isAnalyzing={isAnalyzing}
              previewUrl={previewUrl}
              onClear={handleClear}
            />

            {result && (
              <Button
                variant="outline"
                onClick={handleClear}
                className="w-full bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Analyze Another Image
              </Button>
            )}

            {error && (
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="mt-3 bg-transparent"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              <DiagnosisResult
                topResult={result.diseaseDetails}
                confidence={result.diagnosis.confidence}
                allResults={result.allResults}
              />
            ) : (
              !isAnalyzing && (
                <Card className="flex h-full min-h-[300px] items-center justify-center">
                  <CardContent className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                      <Info className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-base font-semibold text-muted-foreground">
                      Awaiting Image
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Upload a leaf image to see diagnosis results here
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
