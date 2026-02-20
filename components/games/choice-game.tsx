"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { MascotBubble } from "@/components/mascot-bubble"
import { playGood, playBad, playClick } from "@/components/sfx"

export type ChoiceZone = { id: string; label: string; good: boolean; x?: number; y?: number }

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

export function ChoiceGame({
  title,
  description,
  moduleId,
  hint,
  zones,
  background,
}: {
  title: string
  description: string
  moduleId: string
  hint: string
  zones: ChoiceZone[]
  background?: React.ReactNode
}) {
  const userId = useMemo(() => getUserId(), [])
  const [picked, setPicked] = useState<string | null>(null)
  const [result, setResult] = useState<null | { correct: boolean; score: number }>(null)
  const [showHint, setShowHint] = useState(false)

  function choose(id: string) {
    setPicked(id)
    const zone = zones.find((z) => z.id === id)!
    if (zone.good) playGood()
    else playBad()
  }

  async function submit() {
    if (!picked) return
    playClick()
    const zone = zones.find((z) => z.id === picked)!
    const correct = !!zone.good
    const score = correct ? 100 : 0
    setResult({ correct, score })
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId, score }),
    })
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-6">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>

      <MascotBubble
        text={showHint ? hint : "Make your best choice, then submit. Toggle hint for a tip, or press Speak to hear me."}
        color="from-fuchsia-400 to-amber-400"
      />

      {result ? (
        <section className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">{result.correct ? "Great pick!" : "Let's try again next time."}</h3>
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
            <h4 className="font-medium mb-2">Scene</h4>
            <div className="relative h-72 rounded-md overflow-hidden bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border">
              {background}
              {zones.map((z) => {
                const active = picked === z.id
                return (
                  <button
                    key={z.id}
                    onClick={() => choose(z.id)}
                    className={`absolute ${z.x !== undefined ? "-translate-x-1/2 -translate-y-1/2" : ""} rounded-full px-3 py-1 text-xs border backdrop-blur transition ${
                      active ? (z.good ? "border-green-500 bg-green-200/70" : "border-red-500 bg-red-200/70") : "bg-white/50 dark:bg-black/30"
                    }`}
                    style={{ left: z.x !== undefined ? `${z.x}%` : undefined, top: z.y !== undefined ? `${z.y}%` : undefined }}
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
              {picked ? `Selected: ${zones.find((z) => z.id === picked)?.label}` : "Tap a choice in the scene."}
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
