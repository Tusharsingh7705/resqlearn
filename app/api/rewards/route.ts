import { NextResponse, type NextRequest } from "next/server"
import type { RewardItem } from "@/lib/types"
import { getUserMeta, purchaseReward } from "@/lib/store"

const CATALOG: RewardItem[] = [
  { id: "sticker-star", name: "Gold Star Sticker", cost: 3, assetUrl: "/stickers/star.svg" },
  { id: "sticker-planet", name: "Planet Sticker", cost: 4, assetUrl: "/stickers/planet.svg" },
  { id: "cap-blue", name: "Blue Cap (pet)", cost: 5, assetUrl: "/cosmetics/cap-blue.svg" },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })
  const meta = getUserMeta(userId)
  return NextResponse.json({ catalog: CATALOG, meta })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { userId, rewardId } = body || {}
  if (!userId || !rewardId) {
    return NextResponse.json({ error: "userId, rewardId required" }, { status: 400 })
  }
  const item = CATALOG.find((r) => r.id === rewardId)
  if (!item) return NextResponse.json({ error: "reward-not-found" }, { status: 404 })
  const res = purchaseReward(userId, rewardId, item.cost)
  if (!res.ok) return NextResponse.json({ error: res.reason }, { status: 400 })
  const meta = getUserMeta(userId)
  return NextResponse.json({ ok: true, meta })
}
