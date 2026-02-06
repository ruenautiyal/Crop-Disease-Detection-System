"use client"

import useSWR from "swr"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Microscope,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Leaf,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const COLORS = [
  "hsl(142, 64%, 30%)",
  "hsl(32, 85%, 55%)",
  "hsl(0, 72%, 50%)",
  "hsl(48, 90%, 55%)",
  "hsl(200, 70%, 45%)",
  "hsl(270, 55%, 50%)",
  "hsl(330, 65%, 50%)",
  "hsl(180, 60%, 40%)",
]

interface DatasetCropBreakdown {
  name: string
  diseases: number
  totalClasses: number
}

export default function StatisticsPage() {
  const { data: stats } = useSWR("/api/stats", fetcher, {
    refreshInterval: 5000,
  })

  const diagnosisStats = stats?.diagnosisStats
  const datasetStats = stats?.datasetStats

  // Prepare chart data for crops diseases
  const cropDiseaseData: { name: string; diseases: number; healthy: number }[] =
    (datasetStats?.cropBreakdown ?? [])
      .filter((c: DatasetCropBreakdown) => c.diseases > 0)
      .map((c: DatasetCropBreakdown) => ({
        name: c.name.length > 8 ? `${c.name.slice(0, 8)}...` : c.name,
        diseases: c.diseases,
        healthy: 1,
      }))

  // Severity distribution from user scans
  const severityData = diagnosisStats?.bySeverity
    ? Object.entries(diagnosisStats.bySeverity).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: value as number,
      }))
    : []

  // Crop distribution from user scans
  const cropScanData = diagnosisStats?.byCrop
    ? Object.entries(diagnosisStats.byCrop)
        .map(([name, value]) => ({
          name,
          scans: value as number,
        }))
        .sort((a, b) => b.scans - a.scans)
    : []

  // Disease frequency from user scans
  const diseaseFreqData = diagnosisStats?.byDisease
    ? Object.entries(diagnosisStats.byDisease)
        .map(([name, value]) => ({
          name: name.length > 20 ? `${name.slice(0, 20)}...` : name,
          count: value as number,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
    : []

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Statistics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Dataset overview and diagnosis analytics
          </p>
        </div>

        {/* Dataset Overview Stats */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            New Plant Diseases Dataset Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {datasetStats?.totalCrops ?? 14}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Crops Supported
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Activity className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {datasetStats?.totalClasses ?? 38}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Classes
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">
                    {datasetStats?.totalDiseases ?? 26}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Disease Classes
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">
                    {datasetStats?.totalHealthy ?? 12}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Healthy Classes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dataset Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Diseases per Crop */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Diseases per Crop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cropDiseaseData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={70}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                        color: "hsl(var(--foreground))",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="diseases"
                      fill="hsl(32, 85%, 55%)"
                      radius={[0, 4, 4, 0]}
                      name="Diseases"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Dataset Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Dataset Composition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Diseases",
                          value: datasetStats?.totalDiseases ?? 26,
                        },
                        {
                          name: "Healthy",
                          value: datasetStats?.totalHealthy ?? 12,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="hsl(32, 85%, 55%)" />
                      <Cell fill="hsl(142, 64%, 30%)" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                        color: "hsl(var(--foreground))",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Scan Stats */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your Diagnosis Analytics
          </h2>

          {diagnosisStats?.total > 0 ? (
            <>
              {/* Scan Overview */}
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Microscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {diagnosisStats.total}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Scans
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">
                        {diagnosisStats.healthyCount}
                      </p>
                      <p className="text-xs text-muted-foreground">Healthy</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                      <ShieldAlert className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">
                        {diagnosisStats.diseasedCount}
                      </p>
                      <p className="text-xs text-muted-foreground">Diseased</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Scans by Crop */}
                {cropScanData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">
                        Scans by Crop
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={cropScanData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="hsl(var(--border))"
                            />
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 10 }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                              contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                background: "hsl(var(--card))",
                                color: "hsl(var(--foreground))",
                                fontSize: "12px",
                              }}
                            />
                            <Bar
                              dataKey="scans"
                              fill="hsl(142, 64%, 30%)"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Severity Distribution */}
                {severityData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">
                        Severity Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={severityData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={85}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {severityData.map((_, index) => (
                                <Cell
                                  key={`cell-${
                                    // biome-ignore lint: index key is fine for static list
                                    index
                                  }`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                background: "hsl(var(--card))",
                                color: "hsl(var(--foreground))",
                                fontSize: "12px",
                              }}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Disease Frequency */}
                {diseaseFreqData.length > 0 && (
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">
                        Most Detected Diseases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={diseaseFreqData} layout="vertical">
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="hsl(var(--border))"
                            />
                            <XAxis type="number" tick={{ fontSize: 11 }} />
                            <YAxis
                              dataKey="name"
                              type="category"
                              width={120}
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip
                              contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                background: "hsl(var(--card))",
                                color: "hsl(var(--foreground))",
                                fontSize: "12px",
                              }}
                            />
                            <Bar
                              dataKey="count"
                              fill="hsl(0, 72%, 50%)"
                              radius={[0, 4, 4, 0]}
                              name="Detections"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Microscope className="mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm font-medium text-muted-foreground">
                  No scan data yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upload and diagnose leaf images to see your analytics here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
