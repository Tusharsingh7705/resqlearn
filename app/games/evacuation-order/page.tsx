"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "panic", label: "Panic & run", good: false, x: 30, y: 50 },
  { id: "line", label: "Line up & follow teacher", good: true, x: 60, y: 40 },
  { id: "take-bag", label: "Pack bag first", good: false, x: 80, y: 60 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Evacuation Drill Order"
      description="Pick the right action during a school drill."
      moduleId="game-evacuation-order"
      hint="Follow instructions calmly, line up, and exit in an orderly way."
      zones={zones}
      background={<>
        <div className="absolute left-[60%] top-[40%] w-24 h-10 bg-emerald-400/60 rounded" />
      </>}
    />
  )
}
