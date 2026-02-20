"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "balcony", label: "Stand on balcony", good: false, x: 25, y: 30 },
  { id: "indoor-center", label: "Stay indoor center room", good: true, x: 60, y: 50 },
  { id: "near-window", label: "Near windows", good: false, x: 80, y: 25 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Cyclone Prep Choice"
      description="Choose the safest place during cyclone winds."
      moduleId="game-cyclone-prep"
      hint="Stay away from windows and balconies. Shelter in interior rooms on lower floors."
      zones={zones}
      background={<>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(59,130,246,.25),transparent_40%)]" />
      </>}
    />
  )
}
