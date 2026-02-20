"use client"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDashboardPage() {
  const { data: alertsData } = useSWR<{ alerts: any[] }>("/api/alerts", fetcher)

  const [site, setSite] = useState({ title: "ResQLearn", banner: "Welcome! Stay safe, learn safety." })

  function saveSite() {
    // Stub: POST /api/admin/site
    console.log("save site", site)
    alert("Saved (stub). In production, this would persist to the DB.")
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <div className="text-sm text-muted-foreground">Configure platform and view system status.</div>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">Site Settings</h3>
          <div className="grid gap-2">
            <label className="text-sm">Site Title</label>
            <Input value={site.title} onChange={(e) => setSite({ ...site, title: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Banner Message</label>
            <Input value={site.banner} onChange={(e) => setSite({ ...site, banner: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button onClick={saveSite}>Save</Button>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">Manage Users (Stub)</h3>
          <p className="text-sm text-muted-foreground">Invite or remove Teachers/Admins. Hook to backend later.</p>
          <div className="flex gap-2">
            <Button variant="secondary">Invite Teacher</Button>
            <Button variant="secondary">Invite Admin</Button>
          </div>
        </article>
      </section>

      <section className="grid gap-3">
        <h3 className="font-medium">Recent Alerts</h3>
        <div className="rounded-lg border bg-card p-4 text-sm">
          {(alertsData?.alerts || []).length === 0 ? (
            <div className="text-muted-foreground">No alerts yet.</div>
          ) : (
            <ul className="grid gap-2">
              {(alertsData!.alerts).slice(0, 10).map((a: any) => (
                <li key={a.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.region} · {a.severity}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(a.createdAt || Date.now()).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
