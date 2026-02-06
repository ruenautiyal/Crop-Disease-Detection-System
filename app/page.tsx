"use client"

import Link from "next/link"
import useSWR from "swr"
import {
  Upload,
  Leaf,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Microscope,
  History,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SeverityBadge } from "@/components/severity-badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function DashboardPage() {
  const { data: stats } = useSWR("/api/stats", fetcher, {
    refreshInterval: 5000,
  })

  const diagnosisStats = stats?.diagnosisStats
  const datasetStats = stats?.datasetStats

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Crop Disease Detection
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Upload leaf images for AI-powered disease diagnosis across 14 crops and 26 diseases
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/diagnose" className="group">
          <Card className="h-full border-2 border-dashed border-primary/30 transition-all hover:border-primary hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                New Diagnosis
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload a leaf image to detect diseases
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                Get Started <ArrowRight className="h-3 w-3" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/crops" className="group">
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
                <Leaf className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Crop Library
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Browse all 14 crops and their diseases
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/history" className="group sm:col-span-2 lg:col-span-1">
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
                <History className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Diagnosis History
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Review past diagnoses and trends
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                View History <ArrowRight className="h-3 w-3" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Scans
            </CardTitle>
            <Microscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {diagnosisStats?.total ?? 0}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Images analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Healthy
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {diagnosisStats?.healthyCount ?? 0}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Clean results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Diseased
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              {diagnosisStats?.diseasedCount ?? 0}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Issues detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dataset Coverage
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {datasetStats?.totalClasses ?? 38}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {datasetStats?.totalCrops ?? 14} crops covered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Dataset Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Diagnoses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Recent Diagnoses
            </CardTitle>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {(!diagnosisStats?.recentDiagnoses ||
              diagnosisStats.recentDiagnoses.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Microscope className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  No diagnoses yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upload your first leaf image to get started
                </p>
                <Link href="/diagnose" className="mt-4">
                  <Button size="sm" className="text-xs">
                    Start Diagnosis
                  </Button>
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {diagnosisStats.recentDiagnoses.map(
                  (record: {
                    id: string
                    cropDetected: string
                    diseaseDetected: string
                    confidence: number
                    severity: string
                    isHealthy: boolean
                    timestamp: string
                  }) => (
                    <li
                      key={record.id}
                      className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {record.diseaseDetected}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.cropDetected} - {record.confidence}% confidence
                        </p>
                      </div>
                      <SeverityBadge severity={record.severity} />
                    </li>
                  )
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Supported Crops Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Supported Crops
            </CardTitle>
            <Link href="/crops">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Tomato", diseases: 9 },
                { name: "Corn", diseases: 3 },
                { name: "Grape", diseases: 3 },
                { name: "Apple", diseases: 3 },
                { name: "Potato", diseases: 2 },
                { name: "Cherry", diseases: 1 },
                { name: "Peach", diseases: 1 },
                { name: "Bell Pepper", diseases: 1 },
                { name: "Strawberry", diseases: 1 },
                { name: "Squash", diseases: 1 },
                { name: "Orange", diseases: 1 },
                { name: "Soybean", diseases: 0 },
                { name: "Blueberry", diseases: 0 },
                { name: "Raspberry", diseases: 0 },
              ].map((crop) => (
                <div
                  key={crop.name}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                >
                  <span className="text-xs font-medium text-foreground">
                    {crop.name}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {crop.diseases > 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3" />
                        {crop.diseases}
                      </>
                    ) : (
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
