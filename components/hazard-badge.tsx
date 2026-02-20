"use client"

import React from "react"

type Kind =
  | "earthquake"
  | "flood"
  | "cyclone"
  | "fire"
  | "landslide"
  | "tsunami"
  | "multi"

const PALETTE: Record<Kind, { label: string; hex: string }> = {
  earthquake: { label: "Earthquake", hex: "#ef4444" }, // red
  flood: { label: "Flood", hex: "#38bdf8" }, // sky
  cyclone: { label: "Cyclone", hex: "#22c55e" }, // green
  fire: { label: "Fire", hex: "#f59e0b" }, // amber
  landslide: { label: "Landslide", hex: "#84cc16" }, // lime
  tsunami: { label: "Tsunami", hex: "#0ea5e9" }, // blue
  multi: { label: "Multi‑Hazard", hex: "#a78bfa" }, // violet
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "")
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `${r}, ${g}, ${b}`
}

export function HazardBadge({ kind, small = false }: { kind: Kind; small?: boolean }) {
  const { label, hex } = PALETTE[kind]
  const rgb = hexToRgb(hex)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 ${
        small ? "text-[11px] py-[2px]" : "text-xs py-[3px]"
      }`}
      style={{
        background: `${hex}1A`,
        borderColor: hex,
        color: hex,
        // glowing pulse uses this rgb var
        // @ts-ignore CSS var
        "--hb-rgb": rgb,
      }}
    >
      <span className="inline-block size-1.5 rounded-full" style={{ background: hex }} />
      <span className="hazard-glow select-none">{label}</span>
    </span>
  )
}
