"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MascotBubble } from "@/components/mascot-bubble"
import { playGood, playBad, playClick } from "@/components/sfx"

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

type Vec = { x: number; y: number }

type Item = { x: number; y: number; r: number; kind: "water" | "med" | "flash" }

type Hazard = { x: number; y: number; r: number; vx: number; vy: number }

export default function DisasterRunner() {
  const userId = getUserId()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [collected, setCollected] = useState(0)
  const [finished, setFinished] = useState<null | { pct: number }>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    const W = 760
    const H = 420
    canvas.width = W * DPR
    canvas.height = H * DPR
    canvas.style.width = W + "px"
    canvas.style.height = H + "px"
    ctx.scale(DPR, DPR)

    // World
    const player: Vec & { r: number } = { x: 120, y: 200, r: 10 }
    const speed = 2.2
    const keys: Record<string, boolean> = {}

    // Items & hazards
    const items: Item[] = []
    const hazards: Hazard[] = []

    // Spawn helpers
    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }
    const kinds: Item["kind"][] = ["water", "med", "flash"]
    for (let i = 0; i < 10; i++) {
      items.push({ x: rand(60, W - 60), y: rand(60, H - 60), r: 8, kind: kinds[i % kinds.length] })
    }
    for (let i = 0; i < 6; i++) {
      hazards.push({ x: rand(60, W - 60), y: rand(60, H - 60), r: 12, vx: rand(-1.2, 1.2), vy: rand(-1.2, 1.2) })
    }

    // Zones (regions) with simple visuals
    const zones = [
      { x: 0, y: 0, w: W, h: 120, color: "rgba(99,102,241,0.08)" }, // shelter zone
      { x: 0, y: 150, w: W, h: 120, color: "rgba(34,197,94,0.08)" }, // park
      { x: 0, y: 300, w: W, h: 120, color: "rgba(236,72,153,0.08)" }, // residential
    ]

    // Input
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase()
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
        keys[k] = e.type === "keydown"
        e.preventDefault()
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onKey)

    // Loop
    let raf = 0
    let frames = 0
    function loop() {
      if (!running) return
      raf = requestAnimationFrame(loop)
      frames++

      // Update
      const dx = (keys["d"] || keys["arrowright"] ? 1 : 0) - (keys["a"] || keys["arrowleft"] ? 1 : 0)
      const dy = (keys["s"] || keys["arrowdown"] ? 1 : 0) - (keys["w"] || keys["arrowup"] ? 1 : 0)
      player.x = Math.max(10, Math.min(W - 10, player.x + dx * speed))
      player.y = Math.max(10, Math.min(H - 10, player.y + dy * speed))

      for (const h of hazards) {
        h.x += h.vx
        h.y += h.vy
        if (h.x < 12 || h.x > W - 12) h.vx *= -1
        if (h.y < 12 || h.y > H - 12) h.vy *= -1
      }

      // Collisions
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i]
        const dd = (it.x - player.x) ** 2 + (it.y - player.y) ** 2
        if (dd < (it.r + player.r) ** 2) {
          items.splice(i, 1)
          setCollected((c) => c + 1)
          setScore((s) => s + 10)
          playGood()
        }
      }
      for (const h of hazards) {
        const dd = (h.x - player.x) ** 2 + (h.y - player.y) ** 2
        if (dd < (h.r + player.r) ** 2) {
          // hit hazard → lose some score, knockback
          playBad()
          setScore((s) => Math.max(0, s - 5))
          player.x -= Math.sign(h.x - player.x) * 8
          player.y -= Math.sign(h.y - player.y) * 8
        }
      }

      // Win condition
      if (items.length === 0) {
        const pct = Math.min(100, Math.round(60 + score))
        setFinished({ pct })
      }

      // Draw
      ctx.clearRect(0, 0, W, H)
      // Background tiles
      for (const z of zones) {
        ctx.fillStyle = z.color
        ctx.fillRect(z.x, z.y, z.w, z.h)
      }
      // Decorative wavy background overlay
      ctx.fillStyle = "rgba(125, 211, 252, 0.08)"
      for (let x = 0; x < W; x += 40) {
        const y = 10 * Math.sin((frames / 20 + x) * 0.05)
        ctx.fillRect(x, 200 + y, 30, 2)
      }

      // Items
      for (const it of items) {
        ctx.beginPath()
        ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2)
        ctx.fillStyle = it.kind === "water" ? "#38bdf8" : it.kind === "med" ? "#f43f5e" : "#fbbf24"
        ctx.fill()
      }
      // Hazards
      for (const h of hazards) {
        ctx.beginPath()
        ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(239,68,68,0.6)"
        ctx.fill()
      }
      // Player
      ctx.beginPath()
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2)
      ctx.fillStyle = "#22c55e"
      ctx.fill()

      // HUD
      ctx.fillStyle = "#0f172a"
      ctx.font = "14px system-ui, sans-serif"
      ctx.fillText(`Score: ${score}`, 12, 18)
      ctx.fillText(`Items: ${collected}/10`, 100, 18)
      ctx.fillText("Collect all preparedness items. Avoid hazards!", 12, H - 12)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  async function submit() {
    if (!finished) return
    const pct = finished.pct
    playClick()
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId: "game-disaster-runner", score: pct }),
    })
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-4">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Disaster Runner</h2>
        <p className="text-sm text-muted-foreground">Move with WASD/Arrows. Collect preparedness items (water, med kit, flashlight), avoid hazards, and finish the mission!</p>
      </header>

      <MascotBubble
        text="Tip: Stay away from hazards, plan routes through safe zones, and collect essentials to be disaster-ready!"
        color="from-sky-400 to-emerald-400"
      />

      <div className="rounded-lg border bg-card p-3 grid gap-3">
        <canvas ref={canvasRef} className="mx-auto rounded border" />
        <div className="flex items-center gap-2">
          <Button variant={running ? "secondary" : "default"} onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Resume"}
          </Button>
          {finished ? (
            <>
              <div className="text-sm text-muted-foreground">Mission complete! Score: {finished.pct}%</div>
              <Button onClick={submit}>Claim XP</Button>
            </>
          ) : null}
        </div>
      </div>
    </main>
  )
}
