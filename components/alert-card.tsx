"use client"

import type { AlertItem } from "@/lib/types"
import { cn } from "@/lib/utils"

export function AlertCard({ alert }: { alert: AlertItem }) {
  const colors = {
    info: "bg-accent/50 border-accent",
    warning: "bg-secondary/70 border-secondary",
    danger: "bg-destructive/10 border-destructive",
  } as const

  const label = alert.severity === "danger" ? "Danger" : alert.severity === "warning" ? "Warning" : "Info"

  return (
    <div
      role="region"
      aria-label="Emergency alert"
      className={cn("rounded-md border p-4", colors[alert.severity] ?? "bg-card")}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex px-2 py-0.5 text-xs rounded bg-primary text-primary-foreground">{label}</span>
            <h4 className="font-medium">{alert.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
          <p className="text-xs mt-2 text-muted-foreground">
            Region: <span className="font-mono">{alert.region}</span> · {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
        {alert.smsSent ? (
          <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">SMS sent</span>
        ) : null}
      </div>
    </div>
  )
}
