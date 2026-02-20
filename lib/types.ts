export type Question = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export type Module = {
  id: string
  title: string
  summary: string
  estimatedMinutes: number
  questions: Question[]
}

export type AlertSeverity = "info" | "warning" | "danger"
export type AlertItem = {
  id: string
  title: string
  message: string
  region: string
  severity: AlertSeverity
  createdAt: number
  // optional fields for expansion
  smsSent?: boolean
}

export type ProgressRecord = {
  userId: string
  moduleId: string
  score: number // 0-100
  completedAt: number
}

// --- Gamification Types ---
export type UserMeta = {
  userId: string
  xp: number
  coins: number
  badges: string[]
  streak: number
  lastActive: number
  ownedRewards?: string[]
}

export type RewardItem = {
  id: string
  name: string
  cost: number
  assetUrl: string
}
