"use client"

import useSWR from "swr"
import { useState, useMemo } from "react"
import { ModuleCard } from "@/components/module-card"
import { AlertCard } from "@/components/alert-card"
import type { Module, AlertItem } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getUserId(): string {
  if (typeof window === "undefined") return "anonymous"
  const k = "resqlearn_user_id"
  let id = window.localStorage.getItem(k)
  if (!id) {
    id = `u_${Math.random().toString(36).slice(2)}`
    window.localStorage.setItem(k, id)
  }
  return id
}

export default function StudentPage() {
  const userId = useMemo(() => getUserId(), [])
  const { data: modulesData } = useSWR<{ modules: Module[] }>("/api/modules", fetcher)
  const { data: progData } = useSWR(() => `/api/progress?userId=${encodeURIComponent(userId)}`, fetcher)

  const [region, setRegion] = useState("")
  const {
    data: alertsData,
    isValidating,
    mutate,
  } = useSWR<{ alerts: AlertItem[] }>(
    () => (region ? `/api/alerts?region=${encodeURIComponent(region)}` : null),
    fetcher,
    { refreshInterval: 8000 }, // simple polling to simulate real-time
  )

  const progressMap = useMemo(() => {
    const map: Record<string, number> = {}
    for (const rec of progData?.progress || []) {
      map[rec.moduleId] = rec.score
    }
    return map
  }, [progData])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Student Dashboard</h2>
        <span className="text-xs text-muted-foreground font-mono">ID: {userId}</span>
      </header>

      {/* Meta Strip */}
      <section className="rounded-lg border bg-card p-4 flex flex-wrap items-center gap-4">
        <div className="text-sm">
          <div>
            <span className="text-muted-foreground">XP:</span> <span className="font-medium">{progData?.meta?.xp ?? 0}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Coins:</span> <span className="font-medium">{progData?.meta?.coins ?? 0}</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Badges</div>
          <div className="flex gap-2 flex-wrap">
            {(progData?.meta?.badges || []).length === 0 ? (
              <span className="text-xs text-muted-foreground">No badges yet</span>
            ) : (
              (progData?.meta?.badges || []).map((b: string) => (
                <span key={b} className="text-xs rounded-full border px-2 py-0.5 bg-background">
                  {b}
                </span>
              ))
            )}
          </div>
        </div>
        <div className="ml-auto">
          <Button asChild variant="secondary">
            <Link href="/student/rewards">Open Rewards</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4">
        <h3 className="font-medium">Your Learning Modules</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {modulesData?.modules?.map((m) => (
            <ModuleCard key={m.id} m={m} progress={progressMap[m.id]} />
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="region" className="text-sm">
              Your Region
            </label>
            <Input
              id="region"
              placeholder="e.g., Mumbai, Chennai, Delhi"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <Button disabled={!region} onClick={() => mutate()}>
            Refresh Alerts
          </Button>
        </div>

        {region ? (
          <div className="grid gap-3">
            <h4 className="font-medium">
              Region-Specific Alerts ({region}){" "}
              {isValidating ? <span className="text-xs text-muted-foreground">(updating)</span> : null}
            </h4>
            {(alertsData?.alerts || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts for this region.</p>
            ) : (
              <div className="grid gap-3">
                {alertsData?.alerts?.map((a) => (
                  <AlertCard key={a.id} alert={a} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter your region to see alerts and guidance.</p>
        )}
      </section>
    </main>
  )
}
