import { NextResponse } from "next/server"
import { MODULES } from "@/data/modules"

export async function GET() {
  return NextResponse.json({ modules: MODULES })
}
