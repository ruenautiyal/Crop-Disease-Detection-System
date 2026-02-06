"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, ImageIcon, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onImageSelected: (file: File) => void
  isAnalyzing: boolean
  previewUrl: string | null
  onClear: () => void
}

export function ImageUploader({
  onImageSelected,
  isAnalyzing,
  previewUrl,
  onClear,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        onImageSelected(file)
      }
    },
    [onImageSelected]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        onImageSelected(file)
      }
    },
    [onImageSelected]
  )

  if (previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl border-2 border-border">
        <div className="relative aspect-square max-h-[400px] w-full bg-muted">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Uploaded leaf for diagnosis"
            className="h-full w-full object-contain"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <Loader2 className="mb-3 h-10 w-10 animate-spin text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Analyzing image...
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Running disease classification
              </p>
            </div>
          )}
        </div>
        {!isAnalyzing && (
          <button
            onClick={onClear}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/70 text-background transition-colors hover:bg-foreground"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all md:p-12",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent/30"
      )}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload leaf image for diagnosis"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        {isDragging ? (
          <ImageIcon className="h-8 w-8 text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-primary" />
        )}
      </div>

      <h3 className="text-base font-semibold text-foreground">
        {isDragging ? "Drop your image here" : "Upload Leaf Image"}
      </h3>
      <p className="mt-1.5 text-center text-sm text-muted-foreground">
        Drag and drop or click to select a photo of a plant leaf
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Supports JPG, PNG, WEBP (max 10MB)
      </p>

      <Button variant="outline" size="sm" className="mt-5 bg-transparent">
        Choose File
      </Button>
    </div>
  )
}
