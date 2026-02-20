"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "slope", label: "Steep Slope", good: false, x: 40, y: 60 },
  { id: "away", label: "Move Away from Slope", good: true, x: 70, y: 40 },
  { id: "riverbank", label: "Riverbank", good: false, x: 20, y: 55 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Landslide Safe Route"
      description="Pick the safest route near unstable slopes."
      moduleId="game-landslide-route"
      hint="Avoid steep slopes and riverbanks. Move to stable ground away from the slide path."
      zones={zones}
      background={<>
        <div className="absolute left-[40%] top-[60%] w-40 h-10 bg-amber-700/40 rounded rotate-12" />
      </>}
    />
  )
}
