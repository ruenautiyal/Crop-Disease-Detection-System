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
  Cpu,
  Zap,
  GitBranch,
  BarChart3,
  Box,
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

const cnnLayers = [
  { block: 1, filters: 32, operation: "Conv2D(32,3) + Conv2D(32,3) + MaxPool(2,2)" },
  { block: 2, filters: 64, operation: "Conv2D(64,3) + Conv2D(64,3) + MaxPool(2,2)" },
  { block: 3, filters: 128, operation: "Conv2D(128,3) + Conv2D(128,3) + MaxPool(2,2)" },
  { block: 4, filters: 256, operation: "Conv2D(256,3) + Conv2D(256,3) + MaxPool(2,2)" },
  { block: 5, filters: 512, operation: "Conv2D(512,3) + Conv2D(512,3) + MaxPool(2,2)" },
]

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            About the Project
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            Understanding the dataset, CNN model architecture, and training
            pipeline that powers CropGuard
          </p>
        </div>

        {/* Dataset Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-5 w-5 text-primary" />
              New Plant Diseases Dataset
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground">
              This project uses the{" "}
              <strong>New Plant Diseases Dataset</strong> from Kaggle (by
              vipoooool), which is a recreated and augmented version of the
              original PlantVillage dataset. It contains over 87K images of crop
              leaves organized into train and validation directories, covering
              both healthy and diseased samples across 38 categories.
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              The dataset is split into a <strong>training set</strong> (~70,295
              images) and <strong>validation set</strong> (~17,572 images),
              covering 14 crop species with 26 disease classes and 12 healthy
              classes. Images are 128x128 RGB format, preprocessed using{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                tf.keras.utils.image_dataset_from_directory
              </code>{" "}
              with a batch size of 32.
            </p>
            <a
              href="https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="bg-transparent">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                View Dataset on Kaggle
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
              <p className="text-xs text-muted-foreground">Total Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <ImageIcon className="mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold text-foreground">87K+</p>
              <p className="text-xs text-muted-foreground">Total Images</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <AlertTriangle className="mb-2 h-6 w-6 text-amber-600" />
              <p className="text-2xl font-bold text-amber-600">26</p>
              <p className="text-xs text-muted-foreground">Disease Classes</p>
            </CardContent>
          </Card>
        </div>

        {/* CNN Model Architecture */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="h-5 w-5 text-primary" />
              CNN Model Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground">
              The disease classification model is a{" "}
              <strong>Sequential Convolutional Neural Network (CNN)</strong>{" "}
              built with TensorFlow/Keras. It features 5 convolutional blocks
              with increasing filter depths (32 to 512), followed by dropout
              regularization and a dense classification head.
            </p>

            {/* Architecture Diagram */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2.5 pr-4 text-left text-xs font-semibold text-muted-foreground">
                      Block
                    </th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                      Filters
                    </th>
                    <th className="py-2.5 pl-4 text-left text-xs font-semibold text-muted-foreground">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cnnLayers.map((layer) => (
                    <tr
                      key={layer.block}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-foreground">
                        Conv Block {layer.block}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {layer.filters}
                        </span>
                      </td>
                      <td className="py-2.5 pl-4">
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                          {layer.operation}
                        </code>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-border/50">
                    <td className="py-2.5 pr-4 font-medium text-foreground">
                      Regularization
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                        25%
                      </span>
                    </td>
                    <td className="py-2.5 pl-4">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                        {"Dropout(0.25) + Flatten()"}
                      </code>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2.5 pr-4 font-medium text-foreground">
                      Dense Layer
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        1500
                      </span>
                    </td>
                    <td className="py-2.5 pl-4">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                        {"Dense(1500, relu) + Dropout(0.4)"}
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-foreground">
                      Output
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                        38
                      </span>
                    </td>
                    <td className="py-2.5 pl-4">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                        {"Dense(38, softmax)"}
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Training Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-5 w-5 text-primary" />
              Training Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Optimizer
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Adam
                </p>
                <p className="text-xs text-muted-foreground">
                  Learning rate: 0.0001
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Loss Function
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Categorical Crossentropy
                </p>
                <p className="text-xs text-muted-foreground">
                  Multi-class classification
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Epochs
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">10</p>
                <p className="text-xs text-muted-foreground">
                  Batch size: 32
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Input Size
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  128 x 128 RGB
                </p>
                <p className="text-xs text-muted-foreground">
                  3 color channels
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Training Set
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  ~70,295 images
                </p>
                <p className="text-xs text-muted-foreground">
                  Shuffled, batched
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Validation Set
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  ~17,572 images
                </p>
                <p className="text-xs text-muted-foreground">
                  Used for evaluation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ML Pipeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GitBranch className="h-5 w-5 text-primary" />
              ML Pipeline Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                {
                  step: "1. Data Loading",
                  detail:
                    "Load train/valid directories using tf.keras.utils.image_dataset_from_directory with 128x128 resizing and categorical labels",
                },
                {
                  step: "2. Model Building",
                  detail:
                    "Construct Sequential CNN with 5 Conv2D blocks (32->512 filters), Dropout(0.25), Dense(1500, relu), Dropout(0.4), Dense(38, softmax)",
                },
                {
                  step: "3. Model Training",
                  detail:
                    "Train for 10 epochs with Adam optimizer (lr=0.0001), categorical_crossentropy loss, tracking accuracy on both train and validation sets",
                },
                {
                  step: "4. Model Evaluation",
                  detail:
                    "Evaluate using confusion matrix, classification report (precision, recall, F1-score), and accuracy/loss visualization plots",
                },
                {
                  step: "5. Model Saving",
                  detail:
                    "Save trained model as trained_plant_disease_model.keras and training history as training_hist.json",
                },
                {
                  step: "6. Inference",
                  detail:
                    "Load model, preprocess single image to 128x128, predict class using np.argmax on softmax output, map to class name",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-lg border border-border p-3"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.step}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Metrics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-5 w-5 text-primary" />
              Evaluation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground">
              The model is evaluated using multiple metrics from
              scikit-learn, including a <strong>classification report</strong>{" "}
              (precision, recall, F1-score per class) and a{" "}
              <strong>confusion matrix</strong> visualized as a 38x38 heatmap.
              Accuracy and loss curves are plotted for both training and
              validation sets across all epochs.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-accent/50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">38</p>
                <p className="text-xs text-muted-foreground">Output Classes</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-accent/50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">10</p>
                <p className="text-xs text-muted-foreground">
                  Training Epochs
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-accent/50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">87K+</p>
                <p className="text-xs text-muted-foreground">
                  Total Samples
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                      ~87,000+
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Box className="h-5 w-5 text-primary" />
              System Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Frontend / Presentation
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Web Dashboard (React / Next.js)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Real-time image upload, result display, interactive crop
                    library, and diagnosis history
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
                    Handles image processing, classification, and treatment
                    recommendation logic
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    ML / Model
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    CNN Classifier (TensorFlow/Keras)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    5-block CNN trained on New Plant Diseases Dataset - 38
                    classes, 128x128 input, saved as .keras model
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Data Storage
                  </h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    In-Memory Store + Disease Knowledge Base
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Diagnosis history, treatment database for all 38 classes, and
                    disease reference data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notebooks Reference */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="h-5 w-5 text-primary" />
              Notebook Reference
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">
                Train_plant_disease.ipynb
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Data loading, CNN model construction, training (10 epochs),
                evaluation (accuracy, confusion matrix, classification report),
                model saving, and accuracy visualization
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">
                Test_plant_disease.ipynb
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Model loading, single image prediction pipeline (load, resize to
                128x128, predict, argmax), and disease name visualization on
                test images
              </p>
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
                The web interface currently uses color-profile heuristics to
                simulate classification. For production deployment, the trained
                CNN model (trained_plant_disease_model.keras) should be served
                via TensorFlow Serving, TensorFlow.js, or a Python API endpoint
                for full accuracy. The model trained on the New Plant Diseases
                Dataset achieves high accuracy on the validation set. Always
                consult agricultural professionals for critical decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
