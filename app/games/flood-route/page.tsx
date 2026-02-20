"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "bridge", label: "Bridge with water", good: false, x: 30, y: 40 },
  { id: "high-ground", label: "High Ground", good: true, x: 70, y: 25 },
  { id: "underpass", label: "Underpass", good: false, x: 50, y: 65 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Flood Route Finder"
      description="Choose the safest route during a flood situation."
      moduleId="game-flood-route"
      hint="Avoid low areas, underpasses, and bridges over rising water. Move to high ground and stay away from fast-moving water."
      zones={zones}
      background={<>
        <div className="absolute left-[50%] top-[60%] w-3/4 h-10 -translate-x-1/2 bg-blue-300/40 blur rounded-full" />
        <div className="absolute left-[70%] top-[25%] w-20 h-20 bg-green-300/60 rounded-full" />
      </>}
    />
  )
}
