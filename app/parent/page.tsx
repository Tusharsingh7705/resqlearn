"use client"

import { useState } from "react"
import useSWR from "swr"
import type { AlertItem } from "@/lib/types"
import { AlertCard } from "@/components/alert-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ParentPage() {
  const [region, setRegion] = useState("")
  const {
    data: alertsData,
    isValidating,
    mutate,
  } = useSWR<{ alerts: AlertItem[] }>(
    () => (region ? `/api/alerts?region=${encodeURIComponent(region)}` : null),
    fetcher,
    { refreshInterval: 10000 },
  )

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 grid gap-8">
      <header>
        <h2 className="text-xl font-semibold">Parent Portal</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Receive alerts and access safety resources to protect your family.
        </p>
      </header>

      <section className="grid gap-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="text-sm" htmlFor="region">
              Your Region
            </label>
            <Input id="region" placeholder="e.g., Kolkata" value={region} onChange={(e) => setRegion(e.target.value)} />
          </div>
          <Button disabled={!region} onClick={() => mutate()}>
            Refresh Alerts
          </Button>
        </div>

        {region ? (
          <div className="grid gap-3">
            <h4 className="font-medium">
              Region Alerts {isValidating ? <span className="text-xs text-muted-foreground">(updating)</span> : null}
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
          <p className="text-sm text-muted-foreground">Enter your region to view alerts.</p>
        )}
      </section>

      <section className="rounded-lg border p-5">
        <h3 className="font-medium">Home Safety Resources</h3>
        <ul className="list-disc pl-5 text-sm mt-2 text-pretty">
          <li>Create and practice a family evacuation plan with two exit routes.</li>
          <li>Prepare a go-kit: documents, water, snacks, flashlight, medicines.</li>
          <li>Store emergency contacts and local helplines on your phone.</li>
          <li>Follow official guidance (NDMA/State Authority) for verified information.</li>
        </ul>
      </section>
    </main>
  )
}
