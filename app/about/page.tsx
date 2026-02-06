"use client"

import {
  Database,
  Leaf,
  Microscope,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  Layers,
  ImageIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const datasetCrops = [
  { crop: "Apple", classes: 4, diseases: 3, samples: "~3,171" },
  { crop: "Blueberry", classes: 1, diseases: 0, samples: "~1,502" },
  { crop: "Cherry", classes: 2, diseases: 1, samples: "~1,906" },
  { crop: "Corn (Maize)", classes: 4, diseases: 3, samples: "~3,852" },
  { crop: "Grape", classes: 4, diseases: 3, samples: "~4,062" },
  { crop: "Orange", classes: 1, diseases: 1, samples: "~5,507" },
  { crop: "Peach", classes: 2, diseases: 1, samples: "~2,657" },
  { crop: "Bell Pepper", classes: 2, diseases: 1, samples: "~2,475" },
  { crop: "Potato", classes: 3, diseases: 2, samples: "~2,152" },
  { crop: "Raspberry", classes: 1, diseases: 0, samples: "~1,000" },
  { crop: "Soybean", classes: 1, diseases: 0, samples: "~5,090" },
  { crop: "Squash", classes: 1, diseases: 1, samples: "~1,835" },
  { crop: "Strawberry", classes: 2, diseases: 1, samples: "~1,565" },
  { crop: "Tomato", classes: 10, diseases: 9, samples: "~18,345" },
]

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            About the Dataset
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            Understanding the PlantVillage dataset that powers CropGuard disease
            detection
          </p>
        </div>

        {/* Dataset Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-5 w-5 text-primary" />
              PlantVillage Dataset
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground">
              The PlantVillage dataset is a publicly available collection of
              over 54,000 images of crop leaves, covering both healthy and
              diseased samples. Originally curated by researchers at Penn State
              University, the dataset has become one of the most widely used
              benchmarks for plant disease classification using deep learning.
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              The dataset contains images across 14 crop species and 38
              classification categories (26 disease classes + 12 healthy
              classes). Images are captured under controlled lab conditions with
              consistent backgrounds, making them ideal for training
              convolutional neural networks (CNNs).
            </p>
            <a
              href="https://www.kaggle.com/datasets/emmarex/plantdisease"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="bg-transparent">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                View on Kaggle
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <Leaf className="mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">14</p>
              <p className="text-xs text-muted-foreground">Crop Species</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <Layers className="mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">38</p>
              <p className="text-xs text-muted-foreground">
                Total Classes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <AlertTriangle className="mb-2 h-6 w-6 text-amber-600" />
              <p className="text-2xl font-bold text-amber-600">26</p>
              <p className="text-xs text-muted-foreground">
                Disease Classes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <ImageIcon className="mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">54K+</p>
              <p className="text-xs text-muted-foreground">Total Images</p>
            </CardContent>
          </Card>
        </div>

        {/* Crop Breakdown Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Microscope className="h-5 w-5 text-primary" />
              Complete Crop Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2.5 pr-4 text-left text-xs font-semibold text-muted-foreground">
                      Crop
                    </th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                      Classes
                    </th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                      Diseases
                    </th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                      Healthy
                    </th>
                    <th className="py-2.5 pl-4 text-right text-xs font-semibold text-muted-foreground">
                      Approx. Samples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datasetCrops.map((item) => (
                    <tr
                      key={item.crop}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-foreground">
                        {item.crop}
                      </td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground">
                        {item.classes}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {item.diseases > 0 ? (
                          <span className="inline-flex items-center gap-1 text-amber-600">
                            <AlertTriangle className="h-3 w-3" />
                            {item.diseases}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <ShieldCheck className="h-3 w-3" />1
                        </span>
                      </td>
                      <td className="py-2.5 pl-4 text-right text-muted-foreground">
                        {item.samples}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border font-semibold">
                    <td className="py-2.5 pr-4 text-foreground">Total</td>
                    <td className="px-4 py-2.5 text-center text-foreground">
                      38
                    </td>
                    <td className="px-4 py-2.5 text-center text-amber-600">
                      26
                    </td>
                    <td className="px-4 py-2.5 text-center text-emerald-600">
                      12
                    </td>
                    <td className="py-2.5 pl-4 text-right text-foreground">
                      ~54,119
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">System Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Frontend / Presentation
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Web Dashboard (React.js / Next.js)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Real-time image upload, result display, and interactive crop
                    library
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Backend / Application
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    API Server (Next.js API Routes)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Manages requests, processes images, and handles
                    recommendation logic
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    ML / Model
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Disease Classifier (Image Analysis Engine)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Color-profile based classification across all 38 PlantVillage
                    classes
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Data Storage
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    In-Memory Store (Diagnosis Logs)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Tracks diagnosis history, statistics, and disease reference
                    data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Important Disclaimer
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                This system is a demonstration tool for educational purposes.
                The image analysis uses color-profile heuristics rather than a
                trained CNN/ResNet50 model. For production deployment, a properly
                trained deep learning model (e.g., ResNet50, EfficientNet) on
                the PlantVillage dataset would achieve significantly higher
                accuracy (typically 95%+). Always consult agricultural
                professionals for critical decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
