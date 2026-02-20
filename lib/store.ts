import type { AlertItem, ProgressRecord } from "@/lib/types"

export const alertsStore: AlertItem[] = []

// Map: userId -> Map(moduleId -> ProgressRecord)
const progressMap = new Map<string, Map<string, ProgressRecord>>()

export function upsertProgress(rec: ProgressRecord) {
  let user = progressMap.get(rec.userId)
  if (!user) {
    user = new Map()
    progressMap.set(rec.userId, user)
  }
  user.set(rec.moduleId, rec)
}

export function getUserProgress(userId: string): ProgressRecord[] {
  const m = progressMap.get(userId)
  return m ? Array.from(m.values()) : []
}

// --- Gamification: User Meta (xp, coins, badges, streak) ---
import type { UserMeta } from "@/lib/types"

const userMeta = new Map<string, UserMeta>()

export function getOrCreateUserMeta(userId: string): UserMeta {
  const existing = userMeta.get(userId)
  if (existing) return existing
  const meta: UserMeta = {
    userId,
    xp: 0,
    coins: 0,
    badges: [],
    streak: 0,
    lastActive: Date.now(),
    ownedRewards: [],
  }
  userMeta.set(userId, meta)
  return meta
}

export function getUserMeta(userId: string): UserMeta {
  return getOrCreateUserMeta(userId)
}

export function awardForScore(userId: string, score: number) {
  const meta = getOrCreateUserMeta(userId)
  // Simple rules: xp = score, coins = floor(score/20) + 1
  const gainedXp = Math.max(0, Math.round(score))
  const gainedCoins = Math.max(1, Math.floor(score / 20))
  meta.xp += gainedXp
  meta.coins += gainedCoins
  // Badge examples
  if (score === 100 && !meta.badges.includes("first-try-star")) meta.badges.push("first-try-star")
  meta.lastActive = Date.now()
}

export function redeemCoins(userId: string, cost: number): boolean {
  const meta = getOrCreateUserMeta(userId)
  if (meta.coins < cost) return false
  meta.coins -= cost
  meta.lastActive = Date.now()
  return true
}

export function purchaseReward(userId: string, rewardId: string, cost: number): { ok: boolean; reason?: string } {
  const meta = getOrCreateUserMeta(userId)
  if (meta.ownedRewards?.includes(rewardId)) {
    return { ok: false, reason: "already-owned" }
  }
  if (meta.coins < cost) {
    return { ok: false, reason: "insufficient-coins" }
  }
  meta.coins -= cost
  meta.ownedRewards?.push(rewardId)
  meta.lastActive = Date.now()
  return { ok: true }
}
