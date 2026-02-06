"use client"

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bug,
  Pill,
  Shield,
  Microscope,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SeverityBadge } from "@/components/severity-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DiseaseDetails {
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

interface ResultItem {
  disease: DiseaseDetails
  confidence: number
}

interface DiagnosisResultProps {
  topResult: DiseaseDetails
  confidence: number
  allResults: ResultItem[]
}

export function DiagnosisResult({
  topResult,
  confidence,
  allResults,
}: DiagnosisResultProps) {
  const [showAllResults, setShowAllResults] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["symptoms", "treatments"])
  )

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const confidenceColor =
    confidence >= 80
      ? "text-emerald-600"
      : confidence >= 60
        ? "text-amber-600"
        : "text-red-600"

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Result */}
      <Card
        className={cn(
          "border-2",
          topResult.isHealthy ? "border-emerald-200" : "border-amber-200"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  topResult.isHealthy ? "bg-emerald-100" : "bg-amber-100"
                )}
              >
                {topResult.isHealthy ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {topResult.isHealthy
                    ? `${topResult.crop} - Healthy`
                    : topResult.disease}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {topResult.crop}
                </p>
              </div>
            </div>
            <SeverityBadge severity={topResult.severity} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Confidence meter */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Confidence
              </span>
              <span className={cn("text-sm font-bold", confidenceColor)}>
                {confidence}%
              </span>
            </div>
            <Progress
              value={confidence}
              className="h-2"
            />
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-foreground">
            {topResult.description}
          </p>

          {/* Spread Rate */}
          {!topResult.isHealthy && (
            <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2">
              <Bug className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                Spread Rate:
              </span>
              <span className="text-xs font-semibold capitalize text-foreground">
                {topResult.spreadRate}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Info (for diseased results) */}
      {!topResult.isHealthy && (
        <>
          {/* Symptoms */}
          {topResult.symptoms.length > 0 && (
            <Card>
              <button
                className="flex w-full items-center justify-between px-6 py-4"
                onClick={() => toggleSection("symptoms")}
              >
                <div className="flex items-center gap-2">
                  <Microscope className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Symptoms ({topResult.symptoms.length})
                  </span>
                </div>
                {expandedSections.has("symptoms") ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("symptoms") && (
                <CardContent className="pt-0">
                  <ul className="flex flex-col gap-2">
                    {topResult.symptoms.map((symptom) => (
                      <li
                        key={symptom}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <XCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-500" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          )}

          {/* Treatments */}
          {topResult.treatments.length > 0 && (
            <Card>
              <button
                className="flex w-full items-center justify-between px-6 py-4"
                onClick={() => toggleSection("treatments")}
              >
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Treatments ({topResult.treatments.length})
                  </span>
                </div>
                {expandedSections.has("treatments") ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("treatments") && (
                <CardContent className="pt-0">
                  <ul className="flex flex-col gap-2">
                    {topResult.treatments.map((treatment) => (
                      <li
                        key={treatment}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          )}

          {/* Causes */}
          {topResult.causes.length > 0 && (
            <Card>
              <button
                className="flex w-full items-center justify-between px-6 py-4"
                onClick={() => toggleSection("causes")}
              >
                <div className="flex items-center gap-2">
                  <Bug className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Causes ({topResult.causes.length})
                  </span>
                </div>
                {expandedSections.has("causes") ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("causes") && (
                <CardContent className="pt-0">
                  <ul className="flex flex-col gap-2">
                    {topResult.causes.map((cause) => (
                      <li
                        key={cause}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          )}

          {/* Prevention */}
          {topResult.preventionTips.length > 0 && (
            <Card>
              <button
                className="flex w-full items-center justify-between px-6 py-4"
                onClick={() => toggleSection("prevention")}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Prevention Tips ({topResult.preventionTips.length})
                  </span>
                </div>
                {expandedSections.has("prevention") ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("prevention") && (
                <CardContent className="pt-0">
                  <ul className="flex flex-col gap-2">
                    {topResult.preventionTips.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <Shield className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          )}
        </>
      )}

      {/* Alternative Diagnoses */}
      {allResults.length > 1 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Alternative Diagnoses
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllResults(!showAllResults)}
                className="text-xs"
              >
                {showAllResults ? "Show Less" : "Show All"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {(showAllResults ? allResults.slice(1) : allResults.slice(1, 4)).map(
                (result) => (
                  <li
                    key={result.disease.id}
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">
                        {result.disease.isHealthy
                          ? `${result.disease.crop} - Healthy`
                          : result.disease.disease}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {result.disease.crop}
                      </p>
                    </div>
                    <span className="ml-2 text-xs font-semibold text-muted-foreground">
                      {result.confidence}%
                    </span>
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
