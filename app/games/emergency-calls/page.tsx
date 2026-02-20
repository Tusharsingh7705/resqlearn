"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "spam", label: "Prank call", good: false, x: 30, y: 40 },
  { id: "emergency", label: "Call 112 (Emergency)", good: true, x: 60, y: 40 },
  { id: "friend", label: "Call friend", good: false, x: 80, y: 55 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Emergency Calls"
      description="Who should you call in an emergency?"
      moduleId="game-emergency-calls"
      hint="Use official emergency numbers like 112. Avoid prank calls and inform trusted adults."
      zones={zones}
      background={<>
        <div className="absolute right-4 bottom-4 w-10 h-16 bg-indigo-400/60 rounded" />
      </>}
    />
  )
}
