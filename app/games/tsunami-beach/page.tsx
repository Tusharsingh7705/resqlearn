"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "beach", label: "Stay on Beach", good: false, x: 50, y: 60 },
  { id: "inland", label: "Move Inland/High Ground", good: true, x: 70, y: 30 },
  { id: "pier", label: "Walk on Pier", good: false, x: 30, y: 50 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Tsunami Beach Safety"
      description="What do you do if the sea suddenly recedes?"
      moduleId="game-tsunami-beach"
      hint="Move inland to higher ground immediately. Do not go to the shore to watch."
      zones={zones}
      background={<>
        <div className="absolute left-[50%] top-[60%] w-full h-12 -translate-x-1/2 bg-blue-300/40 blur" />
      </>}
    />
  )
}
