import { NextResponse } from "next/server"
import { getDiseaseById, getDiseasesByCrop, diseases, crops } from "@/lib/disease-database"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const crop = searchParams.get("crop")
  const listAll = searchParams.get("all")

  if (id) {
    const disease = getDiseaseById(id)
    if (!disease) {
      return NextResponse.json({ error: "Disease not found" }, { status: 404 })
    }
    return NextResponse.json({ disease })
  }

  if (crop) {
    const cropDiseases = getDiseasesByCrop(crop)
    return NextResponse.json({ diseases: cropDiseases, crop })
  }

  if (listAll !== null) {
    return NextResponse.json({ diseases, crops })
  }

  return NextResponse.json({ crops })
}
