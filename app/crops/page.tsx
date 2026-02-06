"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  Leaf,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Bug,
  Pill,
  Shield,
  Search,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SeverityBadge } from "@/components/severity-badge"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface CropData {
  name: string
  scientificName: string
  diseases: string[]
  description: string
  totalClasses: number
}

interface DiseaseData {
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

export default function CropsPage() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [selectedDisease, setSelectedDisease] = useState<DiseaseData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: cropsData } = useSWR("/api/disease?all", fetcher)
  const { data: cropDiseases } = useSWR(
    selectedCrop ? `/api/disease?crop=${encodeURIComponent(selectedCrop)}` : null,
    fetcher
  )

  const crops: CropData[] = cropsData?.crops ?? []
  const diseases: DiseaseData[] = cropDiseases?.diseases ?? []

  const filteredCrops = crops.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Disease detail view
  if (selectedDisease) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => setSelectedDisease(null)}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to {selectedCrop}
          </Button>

          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  selectedDisease.isHealthy ? "bg-emerald-100" : "bg-amber-100"
                )}
              >
                {selectedDisease.isHealthy ? (
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
              </div>
              <div>
                <h1 className="text-balance text-xl font-bold text-foreground md:text-2xl">
                  {selectedDisease.isHealthy
                    ? `${selectedDisease.crop} - Healthy`
                    : selectedDisease.disease}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedDisease.crop}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Overview */}
            <Card>
              <CardContent className="p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {selectedDisease.description}
                </p>
                {!selectedDisease.isHealthy && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <SeverityBadge severity={selectedDisease.severity} />
                    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      Spread: {selectedDisease.spreadRate}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Symptoms */}
            {selectedDisease.symptoms.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Bug className="h-4 w-4 text-red-500" />
                    Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {selectedDisease.symptoms.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Causes */}
            {selectedDisease.causes.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Causes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {selectedDisease.causes.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Treatments */}
            {selectedDisease.treatments.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Pill className="h-4 w-4 text-primary" />
                    Treatments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {selectedDisease.treatments.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Prevention */}
            {selectedDisease.preventionTips.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    Prevention Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {selectedDisease.preventionTips.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Crop disease list view
  if (selectedCrop) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => setSelectedCrop(null)}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            All Crops
          </Button>

          <div className="mb-6">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
              {selectedCrop}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {crops.find((c) => c.name === selectedCrop)?.scientificName} -{" "}
              {diseases.length} classification{diseases.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {diseases.map((d) => (
              <Card
                key={d.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setSelectedDisease(d)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedDisease(d)
                }
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        d.isHealthy ? "bg-emerald-100" : "bg-amber-100"
                      )}
                    >
                      {d.isHealthy ? (
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {d.isHealthy ? "Healthy" : d.disease}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {d.description.slice(0, 80)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={d.severity} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Main crop grid view
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
            Crop Library
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse all 14 crops and 38 disease classes from the New Plant
            Diseases Dataset
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Crop Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map((crop) => (
            <Card
              key={crop.name}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => setSelectedCrop(crop.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && setSelectedCrop(crop.name)
              }
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  {crop.name}
                </h3>
                <p className="text-xs italic text-muted-foreground">
                  {crop.scientificName}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {crop.diseases.length > 0 ? (
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      <AlertTriangle className="h-2.5 w-2.5" />
                      {crop.diseases.length} disease
                      {crop.diseases.length !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <ShieldCheck className="h-2.5 w-2.5" />
                      Healthy only
                    </span>
                  )}
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {crop.totalClasses} class{crop.totalClasses !== 1 ? "es" : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">
              No crops match your search
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
