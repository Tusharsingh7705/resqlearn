"use client"

import { useMemo, useState } from "react"
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

// Simple room layout with clickable zones
const ZONES = [
  { id: "window", label: "Near Window", good: false, x: 70, y: 20 },
  { id: "doorway", label: "Doorway", good: false, x: 50, y: 10 },
  { id: "under-table", label: "Under Table", good: true, x: 30, y: 55 },
  { id: "bookshelf", label: "Beside Bookshelf", good: false, x: 80, y: 65 },
  { id: "open-floor", label: "Open Floor Away from Glass", good: true, x: 55, y: 60 },
]

export default function EarthquakeSafeSpots() {
  const userId = useMemo(() => getUserId(), [])
  const [picked, setPicked] = useState<string | null>(null)
  const [result, setResult] = useState<null | { correct: boolean; score: number }>(null)
  const [showHint, setShowHint] = useState(false)

  function choose(id: string) {
    setPicked(id)
    const zone = ZONES.find((z) => z.id === id)!
    if (zone.good) {
      playGood()
    } else {
      playBad()
    }
  }

  async function submit() {
    if (!picked) return
    playClick()
    const zone = ZONES.find((z) => z.id === picked)!
    const correct = !!zone.good
    const score = correct ? 100 : 0
    setResult({ correct, score })
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId: "game-earthquake-safe-spots", score }),
    })
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-6">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Earthquake Safe Spots</h2>
        <p className="text-sm text-muted-foreground">Tap the safest place to protect yourself during shaking.</p>
      </header>

      <MascotBubble
        text={
          showHint
            ? "Hint: Drop, Cover, and Hold On. Under sturdy furniture or open floor away from glass is safer. Avoid windows and tall shelves."
            : "Find the safest spot in the room! Toggle hint if you want a tip, or press Speak to hear me."
        }
        color="from-indigo-400 to-fuchsia-400"
      />

      {result ? (
        <section className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">{result.correct ? "Correct!" : "Not quite."}</h3>
          <p className="text-sm text-muted-foreground">Score: {result.score}% — XP and coins updated.</p>
          <div className="flex gap-2">
            <Button asChild>
              <a href="/games">Back to Games</a>
            </Button>
            <Button onClick={() => { setPicked(null); setResult(null) }}>Play Again</Button>
          </div>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-medium mb-2">Room</h4>
            <div className="relative h-72 rounded-md overflow-hidden bg-gradient-to-br from-amber-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 border">
              {/* Simple furniture blocks */}
              <div className="absolute left-[20%] top-[50%] w-28 h-10 bg-amber-300/80 rounded shadow" aria-hidden />
              <div className="absolute left-[68%] top-[60%] w-8 h-24 bg-slate-600/70 rounded shadow" aria-hidden />
              <div className="absolute left-[68%] top-[15%] w-16 h-8 bg-sky-300/70 rounded shadow" aria-hidden />

              {ZONES.map((z) => {
                const active = picked === z.id
                return (
                  <button
                    key={z.id}
                    onClick={() => choose(z.id)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs border backdrop-blur transition ${
                      active ? (z.good ? "border-green-500 bg-green-200/70" : "border-red-500 bg-red-200/70") : "bg-white/50 dark:bg-black/30"
                    }`}
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  >
                    {z.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 grid gap-3 content-start">
            <h4 className="font-medium">Your Choice</h4>
            <p className="text-sm text-muted-foreground min-h-10">
              {picked ? `Selected: ${ZONES.find((z) => z.id === picked)?.label}` : "Tap a spot in the room."}
            </p>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setShowHint((v) => !v)}>{showHint ? "Hide Hint" : "Show Hint"}</Button>
              <Button onClick={submit} disabled={!picked}>Submit</Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
