"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "elevator", label: "Elevator", good: false, x: 35, y: 30 },
  { id: "stairs", label: "Stair Exit", good: true, x: 65, y: 50 },
  { id: "window", label: "Window", good: false, x: 80, y: 20 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Fire Exit Maze"
      description="Pick the safest way out during a fire."
      moduleId="game-fire-exit"
      hint="Use stairs, not elevators. Stay low if there's smoke and follow exit signs."
      zones={zones}
      background={<>
        <div className="absolute left-[65%] top-[50%] w-24 h-10 bg-emerald-400/50 rounded" />
        <div className="absolute left-[35%] top-[30%] w-10 h-24 bg-slate-500/50 rounded" />
      </>}
    />
  )
}
