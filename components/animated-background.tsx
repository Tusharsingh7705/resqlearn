"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement | null>(null)

  // Optional subtle parallax on mouse move
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onMove(e: MouseEvent) {
      const node = ref.current
      if (!node) return
      const { innerWidth: W, innerHeight: H } = window
      const x = (e.clientX / W - 0.5) * 6 // max tilt degrees
      const y = (e.clientY / H - 0.5) * 6
      node.style.setProperty("--tiltX", `${-y}deg`)
      node.style.setProperty("--tiltY", `${x}deg`)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 [transform:perspective(800px)_rotateX(var(--tiltX,0))_rotateY(var(--tiltY,0))]"
    >
      {/* Floating cartoon shapes */}
      <svg className="absolute -left-8 top-10 animate-float-slow opacity-70" width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="gA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="url(#gA)" />
      </svg>
      <svg className="absolute right-8 top-24 animate-float-medium opacity-60" width="200" height="140" viewBox="0 0 200 140">
        <path d="M10,70 C40,20 160,20 190,70 C160,120 40,120 10,70 Z" fill="#FDE68A" />
      </svg>
      <svg className="absolute left-10 bottom-16 animate-float-fast opacity-60" width="180" height="140" viewBox="0 0 180 140">
        <rect x="20" y="30" width="140" height="80" rx="20" fill="#FBCFE8" />
      </svg>
      <svg className="absolute right-16 bottom-10 animate-float-medium opacity-70" width="160" height="160" viewBox="0 0 160 160">
        <polygon points="80,10 110,60 150,70 120,110 130,150 80,130 30,150 40,110 10,70 50,60" fill="#BAE6FD" />
      </svg>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.0),rgba(0,0,0,0.06))]" />

      {/* Route-controlled dark overlay for readability (uses --abg-overlay) */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,var(--abg-overlay,0))" }}
      />

      {/* Extra readability boost only in dark mode */}
      <div className="absolute inset-0 hidden dark:block" style={{ backgroundColor: "rgba(0,0,0,0.12)" }} />
    </div>
  )
}
