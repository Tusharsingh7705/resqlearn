"use client"

import useSWR from "swr"
import { useState } from "react"
import type { AlertItem, Module } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertCard } from "@/components/alert-card"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function TeacherPage() {
  const { data: modulesData } = useSWR<{ modules: Module[] }>("/api/modules", fetcher)
  const { data: alertsData, mutate: refreshAlerts } = useSWR<{ alerts: AlertItem[] }>("/api/alerts", fetcher, {
    refreshInterval: 8000,
  })

  const [form, setForm] = useState({
    title: "",
    message: "",
    region: "",
    severity: "info",
    sms: false,
  })

  async function sendAlert() {
    const res = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm((prev) => ({ ...prev, title: "", message: "" }))
      refreshAlerts()
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Teacher / Admin Dashboard</h2>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <article className="rounded-lg border p-5 grid gap-3">
          <h3 className="font-medium">Broadcast Emergency Alert</h3>

          <div className="grid gap-2">
            <label className="text-sm">Title</label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Cyclone Warning Level Orange"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Message</label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Clear instructions and actions to take."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Region</label>
            <Input
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              placeholder="e.g., Chennai"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Severity</label>
            <select
              className="rounded-md border bg-background px-3 py-2"
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value as any })}
              aria-label="Severity"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 mt-1">
            <input type="checkbox" checked={form.sms} onChange={(e) => setForm({ ...form, sms: e.target.checked })} />
            <span className="text-sm">Send via SMS gateway (stub)</span>
          </label>

          <div className="flex items-center justify-end">
            <Button onClick={sendAlert} disabled={!form.title || !form.message || !form.region}>
              Send Alert
            </Button>
          </div>
        </article>

        <article className="rounded-lg border p-5 grid gap-3">
          <h3 className="font-medium">Assign Modules & Drills</h3>
          <p className="text-sm text-muted-foreground">
            Select modules to recommend. Assignment persistence can be added with a database later.
          </p>
          <ul className="list-disc pl-5 text-sm">
            {modulesData?.modules?.map((m) => (
              <li key={m.id} className="mt-1">
                {m.title} · {m.estimatedMinutes} min
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button variant="secondary" disabled>
              Schedule Drill (stub)
            </Button>
          </div>
        </article>
      </section>

      <section className="grid gap-3">
        <h3 className="font-medium">Recent Broadcasts</h3>
        <div className="grid gap-3">
          {(alertsData?.alerts || []).map((a) => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      </section>
    </main>
  )
}
