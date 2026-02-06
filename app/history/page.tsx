"use client"

import useSWR from "swr"
import Link from "next/link"
import {
  Clock,
  Leaf,
  Microscope,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SeverityBadge } from "@/components/severity-badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface HistoryRecord {
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

function formatDate(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function HistoryPage() {
  const { data, isLoading } = useSWR<{ history: HistoryRecord[] }>(
    "/api/history",
    fetcher,
    { refreshInterval: 5000 }
  )

  const history = data?.history ?? []

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
              Diagnosis History
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review past diagnoses and their results
            </p>
          </div>
          <Link href="/diagnose">
            <Button size="sm">New Scan</Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Microscope className="mb-1 h-5 w-5 text-muted-foreground" />
              <p className="text-xl font-bold text-foreground">
                {history.length}
              </p>
              <p className="text-[10px] text-muted-foreground">Total Scans</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <ShieldCheck className="mb-1 h-5 w-5 text-emerald-600" />
              <p className="text-xl font-bold text-emerald-600">
                {history.filter((r) => r.isHealthy).length}
              </p>
              <p className="text-[10px] text-muted-foreground">Healthy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <ShieldAlert className="mb-1 h-5 w-5 text-amber-600" />
              <p className="text-xl font-bold text-amber-600">
                {history.filter((r) => !r.isHealthy).length}
              </p>
              <p className="text-[10px] text-muted-foreground">Diseased</p>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="h-16 animate-pulse rounded-lg bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : history.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Microscope className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                No Diagnosis History
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by uploading a leaf image for disease detection
              </p>
              <Link href="/diagnose" className="mt-6">
                <Button>
                  Start Your First Diagnosis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((record) => (
              <Card key={record.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                          record.isHealthy ? "bg-emerald-100" : "bg-amber-100"
                        }`}
                      >
                        {record.isHealthy ? (
                          <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {record.diseaseDetected}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Leaf className="h-3 w-3" />
                            {record.cropDetected}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDate(record.timestamp)}
                          </span>
                        </div>

                        {/* Alternative matches */}
                        {record.topResults.length > 1 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {record.topResults.slice(1, 3).map((alt) => (
                              <span
                                key={alt.diseaseId}
                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {alt.disease} ({alt.confidence}%)
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <SeverityBadge severity={record.severity} />
                      <span className="text-xs font-bold text-muted-foreground">
                        {record.confidence}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
