import { type NextRequest, NextResponse } from "next/server"
import { getUserProgress, upsertProgress, awardForScore, getUserMeta } from "@/lib/store"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })
  const progress = getUserProgress(userId)
  const meta = getUserMeta(userId)
  return NextResponse.json({ progress, meta })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { userId, moduleId, score } = body || {}
  if (!userId || !moduleId || typeof score !== "number") {
    return NextResponse.json({ error: "userId, moduleId, score required" }, { status: 400 })
  }
  const record = {
    userId,
    moduleId,
    score,
    completedAt: Date.now(),
  }
  upsertProgress(record)
  awardForScore(userId, score)
  const meta = getUserMeta(userId)
  return NextResponse.json({ ok: true, record, meta })
}
