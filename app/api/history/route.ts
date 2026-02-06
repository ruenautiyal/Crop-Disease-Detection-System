import { NextResponse } from "next/server"
import { getDiagnosisHistory, getDiagnosisById } from "@/lib/diagnosis-store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const record = getDiagnosisById(id)
    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }
    return NextResponse.json({ record })
  }

  const history = getDiagnosisHistory()
  return NextResponse.json({ history })
}
