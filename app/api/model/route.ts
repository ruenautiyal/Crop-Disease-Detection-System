import { NextResponse } from "next/server"
import { modelInfo } from "@/lib/model-info"

export async function GET() {
  return NextResponse.json({ model: modelInfo })
}
