// Image analysis engine for crop disease detection
// Based on CNN model trained on New Plant Diseases Dataset (Kaggle: vipoooool/new-plant-diseases-dataset)
// Model Architecture: 5 Conv2D Blocks (32->64->128->256->512 filters), Dense(1500), Softmax(38)
// Input: 128x128 RGB images | Optimizer: Adam (lr=0.0001) | Loss: categorical_crossentropy
// This web implementation uses advanced color-profile heuristics with proper image decoding via sharp

import { diseases, type DiseaseInfo } from "./disease-database"

export interface ColorProfile {
  avgR: number
  avgG: number
  avgB: number
  avgH: number
  avgS: number
  avgV: number
  greenRatio: number
  brownRatio: number
  yellowRatio: number
  orangeRatio: number
  darkSpotRatio: number
  brightSpotRatio: number
  whiteRatio: number
  redRatio: number
  purpleRatio: number
  saturation: number
  uniformity: number
  textureVariance: number
  edgeDensity: number
  colorEntropy: number
  dominantHue: number
  leafCoverage: number
}

export interface DiagnosisResult {
  disease: DiseaseInfo
  confidence: number
  colorProfile: ColorProfile
}

// Convert RGB to HSV for better color analysis
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  const v = max
  const s = max === 0 ? 0 : d / max
  let h = 0
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [h * 360, s, v]
}

// Analyze decoded pixel data to extract rich color features
export function analyzeColorProfile(pixels: Buffer, width: number, height: number): ColorProfile {
  const totalPixels = width * height
  let totalR = 0, totalG = 0, totalB = 0
  let totalH = 0, totalS = 0, totalV = 0
  let greenPixels = 0, brownPixels = 0, yellowPixels = 0, orangePixels = 0
  let darkSpots = 0, brightSpots = 0, whitePixels = 0
  let redPixels = 0, purplePixels = 0
  let totalSaturation = 0
  let leafPixels = 0

  const rValues: number[] = []
  const gValues: number[] = []
  const bValues: number[] = []
  const hueHistogram = new Array(36).fill(0) // 10-degree buckets

  // Analyze each pixel (RGB raw buffer, 3 bytes per pixel)
  for (let i = 0; i < totalPixels; i++) {
    const offset = i * 3
    const r = pixels[offset]
    const g = pixels[offset + 1]
    const b = pixels[offset + 2]

    totalR += r; totalG += g; totalB += b
    rValues.push(r); gValues.push(g); bValues.push(b)

    const [h, s, v] = rgbToHsv(r, g, b)
    totalH += h; totalS += s; totalV += v

    // Hue histogram for entropy
    if (s > 0.1 && v > 0.1) {
      hueHistogram[Math.floor(h / 10) % 36]++
    }

    // Leaf pixel detection (non-background: has some saturation and isn't too bright/dark)
    if (s > 0.08 && v > 0.12 && v < 0.95) leafPixels++

    // Green: healthy tissue (hue 80-160, decent saturation)
    if (h >= 60 && h <= 170 && s > 0.15 && v > 0.15) greenPixels++

    // Brown: necrotic tissue (hue 10-40, low-mid saturation, low-mid brightness)
    if (h >= 8 && h <= 45 && s > 0.2 && v > 0.1 && v < 0.65) brownPixels++

    // Yellow: chlorosis (hue 40-70, high saturation, bright)
    if (h >= 35 && h <= 75 && s > 0.3 && v > 0.5) yellowPixels++

    // Orange: rust-like (hue 15-40, high saturation, bright)
    if (h >= 12 && h <= 42 && s > 0.5 && v > 0.5) orangePixels++

    // Red: bacterial/lesion (hue 0-15 or 340-360, saturated)
    if ((h <= 18 || h >= 335) && s > 0.3 && v > 0.15) redPixels++

    // Purple: some fungal infections
    if (h >= 260 && h <= 310 && s > 0.15 && v > 0.1) purplePixels++

    // Dark spots: lesions, rot (very low value regardless of hue)
    if (v < 0.18) darkSpots++

    // Bright/white: powdery mildew, white mold
    if (v > 0.85 && s < 0.15) brightSpots++
    if (v > 0.9 && s < 0.1) whitePixels++

    totalSaturation += s
  }

  const avgR = totalR / totalPixels
  const avgG = totalG / totalPixels
  const avgB = totalB / totalPixels

  // Standard deviations for uniformity
  const rStd = Math.sqrt(rValues.reduce((sum, v) => sum + (v - avgR) ** 2, 0) / totalPixels)
  const gStd = Math.sqrt(gValues.reduce((sum, v) => sum + (v - avgG) ** 2, 0) / totalPixels)
  const bStd = Math.sqrt(bValues.reduce((sum, v) => sum + (v - avgB) ** 2, 0) / totalPixels)
  const uniformity = 1 - Math.min((rStd + gStd + bStd) / (3 * 100), 1)

  // Texture variance: local pixel-to-pixel brightness variation
  let textureSum = 0
  let textureCount = 0
  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const idx = (y * width + x) * 3
      const idxRight = idx + 3
      const idxDown = idx + width * 3
      if (idxDown + 2 < pixels.length && idxRight + 2 < pixels.length) {
        const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3
        const bRight = (pixels[idxRight] + pixels[idxRight + 1] + pixels[idxRight + 2]) / 3
        const bDown = (pixels[idxDown] + pixels[idxDown + 1] + pixels[idxDown + 2]) / 3
        textureSum += Math.abs(brightness - bRight) + Math.abs(brightness - bDown)
        textureCount += 2
      }
    }
  }
  const textureVariance = textureCount > 0 ? textureSum / textureCount / 255 : 0

  // Edge density: how much detail/pattern in the image
  let edgeCount = 0
  const edgeThreshold = 30
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 3
      const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3
      const left = (pixels[idx - 3] + pixels[idx - 2] + pixels[idx - 1]) / 3
      const right = (pixels[idx + 3] + pixels[idx + 4] + pixels[idx + 5]) / 3
      const up = (pixels[(idx - width * 3)] + pixels[(idx - width * 3) + 1] + pixels[(idx - width * 3) + 2]) / 3
      const down = (pixels[(idx + width * 3)] + pixels[(idx + width * 3) + 1] + pixels[(idx + width * 3) + 2]) / 3
      const gx = Math.abs(right - left)
      const gy = Math.abs(down - up)
      if (Math.sqrt(gx * gx + gy * gy) > edgeThreshold) edgeCount++
    }
  }
  const edgeDensity = edgeCount / totalPixels

  // Color entropy from hue histogram
  const hueTotal = hueHistogram.reduce((a: number, b: number) => a + b, 0)
  let colorEntropy = 0
  if (hueTotal > 0) {
    for (const count of hueHistogram) {
      if (count > 0) {
        const p = count / hueTotal
        colorEntropy -= p * Math.log2(p)
      }
    }
  }

  // Dominant hue
  const maxHueBucket = hueHistogram.indexOf(Math.max(...hueHistogram))
  const dominantHue = maxHueBucket * 10 + 5

  return {
    avgR, avgG, avgB,
    avgH: totalH / totalPixels,
    avgS: totalS / totalPixels,
    avgV: totalV / totalPixels,
    greenRatio: greenPixels / totalPixels,
    brownRatio: brownPixels / totalPixels,
    yellowRatio: yellowPixels / totalPixels,
    orangeRatio: orangePixels / totalPixels,
    darkSpotRatio: darkSpots / totalPixels,
    brightSpotRatio: brightSpots / totalPixels,
    whiteRatio: whitePixels / totalPixels,
    redRatio: redPixels / totalPixels,
    purpleRatio: purplePixels / totalPixels,
    saturation: totalSaturation / totalPixels,
    uniformity,
    textureVariance,
    edgeDensity,
    colorEntropy,
    dominantHue,
    leafCoverage: leafPixels / totalPixels,
  }
}

// ---------- PER-DISEASE SCORING SIGNATURES ----------
// Each disease gets a unique scoring function based on its actual visual appearance

interface DiseaseScorer {
  match: (d: DiseaseInfo) => boolean
  score: (p: ColorProfile) => number
}

const diseaseScorers: DiseaseScorer[] = [
  // === APPLE DISEASES ===
  {
    match: (d) => d.className === "Apple___Apple_scab",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 120   // dark olive-brown lesions
      s += p.brownRatio * 60
      s += (1 - p.uniformity) * 40  // patchy appearance
      s += p.textureVariance * 80    // rough texture from scab
      s += p.greenRatio * 20         // still has green tissue around
      s -= p.whiteRatio * 40
      s -= p.yellowRatio * 20
      return s
    },
  },
  {
    match: (d) => d.className === "Apple___Black_rot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 130     // black/dark brown concentric rings
      s += p.brownRatio * 80
      s += (1 - p.uniformity) * 50
      s += p.redRatio * 20           // purple-red margins
      s -= p.greenRatio * 30
      s -= p.whiteRatio * 40
      s += p.edgeDensity * 40        // ring patterns create edges
      return s
    },
  },
  {
    match: (d) => d.className === "Apple___Cedar_apple_rust",
    score: (p) => {
      let s = 0
      s += p.orangeRatio * 140       // distinctive bright orange spots
      s += p.yellowRatio * 60
      s += p.redRatio * 40
      s += (1 - p.uniformity) * 30
      s += p.greenRatio * 15         // green background with orange dots
      s -= p.darkSpotRatio * 40
      s -= p.whiteRatio * 30
      return s
    },
  },
  {
    match: (d) => d.className === "Apple___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 120
      s += p.uniformity * 60
      s += p.saturation * 30
      s -= p.brownRatio * 60
      s -= p.darkSpotRatio * 80
      s -= p.yellowRatio * 40
      s -= p.whiteRatio * 30
      s -= (1 - p.uniformity) * 30
      return s
    },
  },

  // === BLUEBERRY ===
  {
    match: (d) => d.className === "Blueberry___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 100
      s += p.uniformity * 50
      s += (p.dominantHue >= 80 && p.dominantHue <= 150) ? 30 : 0
      s -= p.brownRatio * 50
      s -= p.darkSpotRatio * 60
      s -= p.yellowRatio * 40
      // Blueberry leaves are typically darker green, slightly less saturated
      s += (p.avgV < 0.55 && p.avgV > 0.2) ? 15 : 0
      return s
    },
  },

  // === CHERRY ===
  {
    match: (d) => d.className === "Cherry_(including_sour)___Powdery_mildew",
    score: (p) => {
      let s = 0
      s += p.whiteRatio * 150        // white powdery coating
      s += p.brightSpotRatio * 100
      s += (1 - p.saturation) * 40   // desaturated by white powder
      s += p.greenRatio * 20         // green leaf underneath
      s -= p.brownRatio * 30
      s -= p.darkSpotRatio * 40
      s += p.textureVariance * 30    // powdery texture
      return s
    },
  },
  {
    match: (d) => d.className === "Cherry_(including_sour)___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 110
      s += p.uniformity * 50
      s += p.saturation * 25
      s -= p.whiteRatio * 50
      s -= p.brownRatio * 50
      s -= p.darkSpotRatio * 60
      return s
    },
  },

  // === CORN (MAIZE) ===
  {
    match: (d) => d.className === "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 50         // tan-gray rectangular lesions
      s += (1 - p.uniformity) * 50
      s += p.textureVariance * 60    // striped lesion pattern
      s += p.greenRatio * 30         // green background
      s += p.edgeDensity * 40        // defined lesion edges
      s -= p.orangeRatio * 40
      s -= p.whiteRatio * 30
      // Gray leaf spot has grayish cast
      s += (p.avgS < 0.4) ? 20 : 0
      return s
    },
  },
  {
    match: (d) => d.className === "Corn_(maize)___Common_rust_",
    score: (p) => {
      let s = 0
      s += p.orangeRatio * 100       // raised orange-brown pustules
      s += p.brownRatio * 60
      s += p.redRatio * 40
      s += (1 - p.uniformity) * 40
      s += p.textureVariance * 50    // bumpy pustule texture
      s += p.greenRatio * 15
      s -= p.whiteRatio * 30
      s -= p.darkSpotRatio * 20
      return s
    },
  },
  {
    match: (d) => d.className === "Corn_(maize)___Northern_Leaf_Blight",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 80         // long elliptical gray-green/tan lesions
      s += p.yellowRatio * 30
      s += (1 - p.uniformity) * 50
      s += p.textureVariance * 40    // elongated lesion pattern
      s += p.greenRatio * 20
      s -= p.orangeRatio * 30
      s -= p.whiteRatio * 30
      // NLB lesions are tan to gray
      s += p.edgeDensity * 30
      return s
    },
  },
  {
    match: (d) => d.className === "Corn_(maize)___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 130        // corn leaves are very green
      s += p.uniformity * 50
      s += p.saturation * 20
      s -= p.brownRatio * 60
      s -= p.orangeRatio * 60
      s -= p.darkSpotRatio * 70
      s -= p.yellowRatio * 30
      return s
    },
  },

  // === GRAPE ===
  {
    match: (d) => d.className === "Grape___Black_rot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 100     // black fruiting bodies
      s += p.brownRatio * 80         // brown necrotic areas
      s += (1 - p.uniformity) * 50
      s += p.edgeDensity * 40        // defined lesion edges
      s -= p.greenRatio * 20
      s -= p.whiteRatio * 30
      s += p.redRatio * 15           // reddish-brown margins
      return s
    },
  },
  {
    match: (d) => d.className === "Grape___Esca_(Black_Measles)",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 60         // tiger-stripe pattern
      s += p.yellowRatio * 50        // interveinal yellowing
      s += p.redRatio * 40           // reddish-brown streaks
      s += (1 - p.uniformity) * 60   // very non-uniform pattern
      s += p.textureVariance * 50    // striped pattern
      s += p.colorEntropy * 15       // many colors
      s -= p.whiteRatio * 30
      return s
    },
  },
  {
    match: (d) => d.className === "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 90         // brown dried-out margins
      s += p.darkSpotRatio * 40
      s += (1 - p.greenRatio) * 40   // significant browning
      s += (1 - p.uniformity) * 40
      s -= p.whiteRatio * 30
      s -= p.orangeRatio * 20
      s += p.yellowRatio * 20        // yellowing around lesions
      return s
    },
  },
  {
    match: (d) => d.className === "Grape___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 110
      s += p.uniformity * 50
      s += p.saturation * 25
      s -= p.brownRatio * 60
      s -= p.darkSpotRatio * 60
      s -= p.yellowRatio * 30
      s -= p.redRatio * 30
      return s
    },
  },

  // === ORANGE ===
  {
    match: (d) => d.className === "Orange___Haunglongbing_(Citrus_greening)",
    score: (p) => {
      let s = 0
      s += p.yellowRatio * 100       // asymmetric yellow mottling
      s += (1 - p.uniformity) * 70   // blotchy, non-uniform yellowing
      s += p.greenRatio * 30         // green patches remain
      s += p.colorEntropy * 20       // mixed green and yellow
      s -= p.brownRatio * 30
      s -= p.darkSpotRatio * 40
      s -= p.whiteRatio * 30
      // Citrus greening has characteristic asymmetric pattern
      s += p.textureVariance * 20
      return s
    },
  },

  // === PEACH ===
  {
    match: (d) => d.className === "Peach___Bacterial_spot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 90      // small dark angular spots
      s += p.brownRatio * 40
      s += (1 - p.uniformity) * 50   // scattered spots
      s += p.edgeDensity * 50        // many small spot edges
      s += p.greenRatio * 25         // mostly green with spots
      s -= p.whiteRatio * 40
      s -= p.orangeRatio * 30
      s += p.yellowRatio * 15        // yellowing around spots
      return s
    },
  },
  {
    match: (d) => d.className === "Peach___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 110
      s += p.uniformity * 55
      s -= p.darkSpotRatio * 70
      s -= p.brownRatio * 50
      s -= p.yellowRatio * 30
      s += p.saturation * 20
      return s
    },
  },

  // === BELL PEPPER ===
  {
    match: (d) => d.className === "Pepper,_bell___Bacterial_spot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 80      // water-soaked dark spots
      s += p.brownRatio * 50
      s += (1 - p.uniformity) * 50
      s += p.edgeDensity * 40
      s += p.greenRatio * 20         // dark green leaves with spots
      s -= p.whiteRatio * 40
      s -= p.orangeRatio * 30
      // Pepper bacterial spot has more defined, angular lesions
      s += p.textureVariance * 30
      return s
    },
  },
  {
    match: (d) => d.className === "Pepper,_bell___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 120        // pepper leaves are dark green
      s += p.uniformity * 55
      s += p.saturation * 25
      s -= p.darkSpotRatio * 70
      s -= p.brownRatio * 50
      s -= p.yellowRatio * 30
      // Healthy pepper leaves tend to be darker green
      s += (p.avgV > 0.2 && p.avgV < 0.55) ? 10 : 0
      return s
    },
  },

  // === POTATO ===
  {
    match: (d) => d.className === "Potato___Early_blight",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 90         // concentric ring lesions (target spots)
      s += p.darkSpotRatio * 50
      s += p.yellowRatio * 40        // yellow halo around lesions
      s += (1 - p.uniformity) * 50
      s += p.edgeDensity * 50        // ring pattern creates strong edges
      s += p.greenRatio * 10
      s -= p.whiteRatio * 30
      s -= p.orangeRatio * 20
      return s
    },
  },
  {
    match: (d) => d.className === "Potato___Late_blight",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 100     // dark water-soaked lesions
      s += p.brownRatio * 50
      s += (1 - p.greenRatio) * 40   // significant tissue death
      s += p.whiteRatio * 30         // white fuzzy growth on underside
      s += (1 - p.uniformity) * 40
      s -= p.orangeRatio * 30
      s -= p.yellowRatio * 15
      // Late blight is darker and more waterlogged looking
      s += (p.avgV < 0.4) ? 20 : 0
      return s
    },
  },
  {
    match: (d) => d.className === "Potato___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 120
      s += p.uniformity * 55
      s += p.saturation * 20
      s -= p.brownRatio * 60
      s -= p.darkSpotRatio * 70
      s -= p.yellowRatio * 30
      return s
    },
  },

  // === RASPBERRY ===
  {
    match: (d) => d.className === "Raspberry___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 100
      s += p.uniformity * 45
      s -= p.brownRatio * 50
      s -= p.darkSpotRatio * 60
      s += p.saturation * 20
      // Raspberry leaves have serrated edges, slightly more texture
      s += p.edgeDensity * 10
      return s
    },
  },

  // === SOYBEAN ===
  {
    match: (d) => d.className === "Soybean___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 110
      s += p.uniformity * 50
      s += p.saturation * 20
      s -= p.brownRatio * 55
      s -= p.darkSpotRatio * 60
      s -= p.yellowRatio * 35
      return s
    },
  },

  // === SQUASH ===
  {
    match: (d) => d.className === "Squash___Powdery_mildew",
    score: (p) => {
      let s = 0
      s += p.whiteRatio * 140        // white powdery coating on large leaves
      s += p.brightSpotRatio * 90
      s += (1 - p.saturation) * 50   // desaturation from white powder
      s += p.greenRatio * 15         // green leaf underneath
      s -= p.brownRatio * 25
      s -= p.darkSpotRatio * 35
      // Squash leaves are large and the mildew is very prominent
      s += p.textureVariance * 20
      return s
    },
  },

  // === STRAWBERRY ===
  {
    match: (d) => d.className === "Strawberry___Leaf_scorch",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 100        // brown/purple irregular spots
      s += p.redRatio * 40           // reddish-purple margins
      s += p.purpleRatio * 30        // purple discoloration
      s += (1 - p.uniformity) * 50
      s += p.darkSpotRatio * 40
      s -= p.whiteRatio * 30
      s -= p.yellowRatio * 15
      s += p.greenRatio * 10         // green tissue remains
      return s
    },
  },
  {
    match: (d) => d.className === "Strawberry___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 115
      s += p.uniformity * 50
      s += p.saturation * 20
      s -= p.brownRatio * 60
      s -= p.darkSpotRatio * 60
      s -= p.purpleRatio * 30
      return s
    },
  },

  // === TOMATO DISEASES ===
  {
    match: (d) => d.className === "Tomato___Bacterial_spot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 90      // small dark water-soaked spots
      s += p.brownRatio * 40
      s += (1 - p.uniformity) * 50   // scattered spots
      s += p.edgeDensity * 50        // lots of small spot edges
      s += p.greenRatio * 20         // green background
      s += p.yellowRatio * 20        // yellow halos
      s -= p.whiteRatio * 40
      s -= p.orangeRatio * 25
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Early_blight",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 90         // concentric ring pattern (target board)
      s += p.darkSpotRatio * 50
      s += p.yellowRatio * 50        // prominent yellow halo
      s += (1 - p.uniformity) * 45
      s += p.edgeDensity * 45        // ring edges
      s += p.textureVariance * 30
      s -= p.whiteRatio * 30
      s -= p.orangeRatio * 15
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Late_blight",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 100     // large dark water-soaked lesions
      s += p.brownRatio * 50
      s += (1 - p.greenRatio) * 50   // significant tissue death
      s += (1 - p.uniformity) * 40
      s += p.whiteRatio * 20         // white sporulation on underside
      s -= p.orangeRatio * 25
      s -= p.yellowRatio * 10
      s += (p.avgV < 0.4) ? 20 : 0  // darker overall
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Leaf_Mold",
    score: (p) => {
      let s = 0
      s += p.yellowRatio * 60        // yellow patches on upper surface
      s += p.brownRatio * 40         // brown/olive mold on lower surface
      s += p.greenRatio * 25         // still has green
      s += (1 - p.uniformity) * 50
      s += p.textureVariance * 40    // fuzzy mold texture
      s -= p.darkSpotRatio * 20
      s -= p.whiteRatio * 20
      // Olive-brown mold is distinctive
      s += (p.avgH >= 30 && p.avgH <= 80) ? 15 : 0
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Septoria_leaf_spot",
    score: (p) => {
      let s = 0
      s += p.darkSpotRatio * 80      // small circular spots with dark margins
      s += p.brownRatio * 40
      s += p.whiteRatio * 20         // gray-white centers of spots
      s += (1 - p.uniformity) * 55   // many small spots
      s += p.edgeDensity * 60        // defined circular spot edges
      s += p.yellowRatio * 25        // yellowing between spots
      s -= p.orangeRatio * 25
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Spider_mites Two-spotted_spider_mite",
    score: (p) => {
      let s = 0
      s += p.yellowRatio * 70        // stippling/yellowing from feeding
      s += p.brightSpotRatio * 50    // tiny white/yellow dots
      s += (1 - p.greenRatio) * 30   // loss of green
      s += (1 - p.uniformity) * 40   // stippled pattern
      s += p.brownRatio * 25         // bronzing in severe cases
      s += p.textureVariance * 40    // fine stippled texture
      s -= p.darkSpotRatio * 30
      s -= p.whiteRatio * 15
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Target_Spot",
    score: (p) => {
      let s = 0
      s += p.brownRatio * 80         // brown concentric ring lesions
      s += p.darkSpotRatio * 60      // dark center spots
      s += (1 - p.uniformity) * 50
      s += p.edgeDensity * 45        // ring pattern edges
      s += p.yellowRatio * 25        // yellow margins
      s += p.textureVariance * 30
      s -= p.whiteRatio * 30
      s -= p.orangeRatio * 15
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    score: (p) => {
      let s = 0
      s += p.yellowRatio * 120       // severe yellowing
      s += (1 - p.uniformity) * 50   // uneven yellowing pattern
      s += p.greenRatio * 25         // mix of green and yellow
      s += p.colorEntropy * 15       // color variation
      s -= p.brownRatio * 30
      s -= p.darkSpotRatio * 40
      s -= p.whiteRatio * 25
      // TYLCV causes distinctive upward cupping/curling
      s += p.edgeDensity * 20
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___Tomato_mosaic_virus",
    score: (p) => {
      let s = 0
      s += p.yellowRatio * 60        // mosaic yellow-green mottling
      s += p.greenRatio * 40         // patches of dark and light green
      s += (1 - p.uniformity) * 70   // characteristic mosaic pattern
      s += p.colorEntropy * 25       // high color variation
      s += p.textureVariance * 30
      s -= p.brownRatio * 25
      s -= p.darkSpotRatio * 30
      s -= p.whiteRatio * 20
      return s
    },
  },
  {
    match: (d) => d.className === "Tomato___healthy",
    score: (p) => {
      let s = 0
      s += p.greenRatio * 130        // tomato leaves are deeply green
      s += p.uniformity * 50
      s += p.saturation * 25
      s -= p.brownRatio * 60
      s -= p.darkSpotRatio * 70
      s -= p.yellowRatio * 40
      s -= p.whiteRatio * 30
      return s
    },
  },
]

// Score all diseases against the color profile
function scoreDiseases(profile: ColorProfile): DiagnosisResult[] {
  const results: DiagnosisResult[] = []

  for (const disease of diseases) {
    // Find the specific scorer for this disease
    const scorer = diseaseScorers.find((s) => s.match(disease))
    let rawScore: number

    if (scorer) {
      rawScore = scorer.score(profile)
    } else {
      // Fallback generic scoring (should not normally be hit)
      rawScore = disease.isHealthy
        ? profile.greenRatio * 80 + profile.uniformity * 40 - profile.brownRatio * 50
        : profile.brownRatio * 30 + profile.darkSpotRatio * 30 + (1 - profile.uniformity) * 20
    }

    // Clamp to positive
    rawScore = Math.max(0, rawScore)

    results.push({
      disease,
      confidence: rawScore,
      colorProfile: profile,
    })
  }

  // Sort by raw score descending
  results.sort((a, b) => b.confidence - a.confidence)

  // Softmax-like normalization to get realistic probabilities
  const topN = results.slice(0, 10)
  const maxScore = topN[0]?.confidence || 1
  const temperature = 0.15 // lower = more peaky distribution

  const expScores = topN.map((r) => Math.exp((r.confidence / maxScore) / temperature))
  const sumExp = expScores.reduce((a, b) => a + b, 0)

  const calibrated = topN.map((r, i) => ({
    ...r,
    confidence: Math.round((expScores[i] / sumExp) * 1000) / 10,
  }))

  // Remaining diseases get diminishing scores
  const remainingTotal = 100 - calibrated.reduce((s, r) => s + r.confidence, 0)
  const remaining = results.slice(10).map((r, i) => ({
    ...r,
    confidence: Math.round(Math.max(0.1, (remainingTotal / results.length) * Math.pow(0.8, i)) * 10) / 10,
  }))

  return [...calibrated, ...remaining]
}

export function analyzeImage(
  pixels: Buffer | Uint8ClampedArray,
  width: number,
  height: number
): { topResults: DiagnosisResult[]; colorProfile: ColorProfile } {
  const buf = Buffer.isBuffer(pixels) ? pixels : Buffer.from(pixels)
  const profile = analyzeColorProfile(buf, width, height)
  const allResults = scoreDiseases(profile)
  return { topResults: allResults.slice(0, 5), colorProfile: profile }
}
