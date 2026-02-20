import { type NextRequest, NextResponse } from "next/server"
import { alertsStore } from "@/lib/store"
import type { AlertItem } from "@/lib/types"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const region = searchParams.get("region")?.toLowerCase() || ""
  const results = region ? alertsStore.filter((a) => a.region.toLowerCase() === region) : alertsStore
  return NextResponse.json({ alerts: results.sort((a, b) => b.createdAt - a.createdAt) })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { title, message, region, severity, sms } = body || {}

  if (!title || !message || !region || !severity) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const alert: AlertItem = {
    id: `${Date.now()}`,
    title,
    message,
    region,
    severity,
    createdAt: Date.now(),
    smsSent: false,
  }

  alertsStore.push(alert)

  if (sms) {
    // Here you'd call an SMS API provider with region-targeted recipients.
    // console.log("[ResQLearn] SMS would be sent:", alert)
    alert.smsSent = true
  }

  return NextResponse.json({ ok: true, alert })
}
