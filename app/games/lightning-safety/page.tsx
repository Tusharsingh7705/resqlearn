"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "tree", label: "Under Tree", good: false, x: 40, y: 35 },
  { id: "shelter", label: "Enclosed Shelter", good: true, x: 70, y: 40 },
  { id: "field", label: "Open Field", good: false, x: 20, y: 50 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Lightning Safety"
      description="Where should you go during lightning?"
      moduleId="game-lightning-safety"
      hint="Go inside an enclosed building or car. Avoid open fields and tall isolated trees."
      zones={zones}
      background={<>
        <div className="absolute left-[70%] top-[40%] w-24 h-14 bg-slate-700/60 rounded" />
        <div className="absolute left-[40%] top-[35%] w-12 h-20 bg-green-700/60 rounded" />
      </>}
    />
  )
}
