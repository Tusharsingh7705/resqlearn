"use client"

import { usePathname } from "next/navigation"
import React from "react"

function vars(style: Record<string, string>): React.CSSProperties {
  const css: any = {}
  for (const [k, v] of Object.entries(style)) css[`--${k}`] = v
  return css as React.CSSProperties
}

export function RouteTheme({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/"

  // Default palette (calm multi‑hazard)
  let style: Record<string, string> = {
    "abg-a": "#BAE6FD", // light blue
    "abg-b": "#FDE68A", // warm amber
    "abg-c": "#FBCFE8", // pink
    "abg-d": "#A7F3D0", // mint
    "abg-overlay": "0", // default no darken
  }

  if (path === "/" || path.startsWith("/home")) {
    style = { "abg-a": "#BAE6FD", "abg-b": "#FDE68A", "abg-c": "#FBCFE8", "abg-d": "#A7F3D0" }
  } else if (path.startsWith("/student")) {
    // Preparedness learning: fresh greens & sky
    style = { "abg-a": "#A7F3D0", "abg-b": "#86EFAC", "abg-c": "#BAE6FD", "abg-d": "#FDE68A" }
  } else if (path.startsWith("/quizzes")) {
    // Multi-hazard quiz: violet accent with contrast
    style = { "abg-a": "#DDD6FE", "abg-b": "#BFDBFE", "abg-c": "#FDE68A", "abg-d": "#FBCFE8" }
  } else if (path.startsWith("/games")) {
    // Action feel: sky + emerald
    style = { "abg-a": "#BAE6FD", "abg-b": "#86EFAC", "abg-c": "#FDE68A", "abg-d": "#C4B5FD", "abg-overlay": "0" }
  } else if (path.startsWith("/teacher")) {
    // Admin: confident blue/indigo
    style = { "abg-a": "#BFDBFE", "abg-b": "#C7D2FE", "abg-c": "#E9D5FF", "abg-d": "#A7F3D0", "abg-overlay": "0.28" }
  } else if (path.startsWith("/parent")) {
    // Reassuring: teal + soft yellow
    style = { "abg-a": "#A7F3D0", "abg-b": "#E0F2FE", "abg-c": "#FDE68A", "abg-d": "#FBCFE8", "abg-overlay": "0.32" }
  }

  return <div style={vars(style)}>{children}</div>
}
