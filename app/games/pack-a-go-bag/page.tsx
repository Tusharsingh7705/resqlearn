"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MascotBubble } from "@/components/mascot-bubble"
import { playGood, playBad, playClick } from "@/components/sfx"

const ESSENTIALS = [
  { id: "water", label: "Water bottle" },
  { id: "flashlight", label: "Flashlight" },
  { id: "batteries", label: "Batteries" },
  { id: "docs", label: "Important docs" },
  { id: "snacks", label: "Snacks" },
]

const NON_ESSENTIALS = [
  { id: "console", label: "Game console" },
  { id: "teddy", label: "Giant teddy" },
  { id: "skate", label: "Skateboard" },
]

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

export default function PackAGoBagPage() {
  const userId = useMemo(() => getUserId(), [])
  const [bag, setBag] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [flash, setFlash] = useState<"good" | "bad" | null>(null)
  const confettiRef = useRef<HTMLDivElement | null>(null)

  const items = [...ESSENTIALS, ...NON_ESSENTIALS]

  function onDragStart(e: React.DragEvent, id: string) {
    e.dataTransfer.setData("text/plain", id)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    const essentialIds = new Set(ESSENTIALS.map((i) => i.id))
    const isGood = essentialIds.has(id)
    setFlash(isGood ? "good" : "bad")
    setTimeout(() => setFlash(null), 500)
    setBag((prev) => (prev.includes(id) ? prev : [...prev, id]))
    if (isGood) playGood()
    else playBad()
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  function removeFromBag(id: string) {
    setBag((prev) => prev.filter((x) => x !== id))
  }

  async function submit() {
    // scoring: +1 for each essential selected, -1 for each non-essential selected, min 0
    const essentialIds = new Set(ESSENTIALS.map((i) => i.id))
    let points = 0
    for (const id of bag) {
      points += essentialIds.has(id) ? 1 : -1
    }
    const max = ESSENTIALS.length
    const raw = Math.max(0, points)
    const pct = Math.round((raw / max) * 100)
    setScore(pct)
    setDone(true)

    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId: "game-pack-a-go-bag", score: pct }),
    })

    if (pct >= 80) spawnConfetti()
    playClick()
  }

  function spawnConfetti() {
    if (!confettiRef.current) return
    const host = confettiRef.current
    host.innerHTML = ""
    const emojis = ["🎉", "✨", "🌟", "🎈", "🥳"]
    for (let i = 0; i < 30; i++) {
      const span = document.createElement("span")
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      span.style.position = "absolute"
      span.style.left = Math.random() * 100 + "%"
      span.style.top = "-10%"
      span.style.fontSize = 16 + Math.random() * 18 + "px"
      span.style.transform = `rotate(${Math.random() * 360}deg)`
      span.style.animation = `fall ${2 + Math.random() * 1.5}s linear forwards`
      host.appendChild(span)
    }
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `@keyframes fall { to { transform: translateY(120vh) rotate(720deg); opacity: 0; } }`
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-6 relative">
      <div ref={confettiRef} className="pointer-events-none absolute inset-0 z-10" />
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Pack a Go‑Bag</h2>
        <p className="text-sm text-muted-foreground">
          Drag the items you need into the bag. Choose smartly!
        </p>
      </header>

      <MascotBubble text={showHint ? "Hint: Water, snacks, flashlight, batteries and important documents are essentials!" : "Hi! Pack your emergency bag by dragging the right items. Tap Speak if you want me to read the tip!"} />

      {done ? (
        <section className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">Great job!</h3>
          <p className="text-sm text-muted-foreground">Your score: {score}% — XP and coins awarded.</p>
          <div>
            <Button asChild>
              <a href="/games">Back to Games</a>
            </Button>
          </div>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-medium mb-2">Items</h4>
            <div className="grid gap-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, it.id)}
                  className="rounded-md border px-3 py-2 bg-background cursor-grab active:cursor-grabbing hover:shadow-sm transition"
                  aria-grabbed={false}
                >
                  {it.label}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-lg border bg-card p-4 min-h-60 flex flex-col transition ${
              flash === "good" ? "ring-2 ring-green-400" : flash === "bad" ? "ring-2 ring-red-400" : ""
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            aria-label="Go-bag drop zone"
          >
            <h4 className="font-medium mb-2">Your Go‑Bag</h4>
            <div className="flex-1 rounded-md border border-dashed p-3 grid gap-2 bg-background">
              {bag.length === 0 ? (
                <p className="text-sm text-muted-foreground">Drag items here</p>
              ) : (
                bag.map((id) => {
                  const it = items.find((x) => x.id === id)!
                  return (
                    <div key={id} className="flex items-center justify-between rounded-md border px-3 py-2 bg-white/50 dark:bg-black/20">
                      <span>{it.label}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeFromBag(id)}>
                        Remove
                      </Button>
                    </div>
                  )
                })
              )}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Button variant="outline" onClick={() => setShowHint((v) => !v)}>{showHint ? "Hide Hint" : "Show Hint"}</Button>
              <Button onClick={submit} disabled={bag.length === 0}>
                Submit
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
