"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "dirty-cloth", label: "Use dirty cloth", good: false, x: 35, y: 45 },
  { id: "clean-pressure", label: "Clean cloth + pressure", good: true, x: 65, y: 45 },
  { id: "random-ointment", label: "Random ointment", good: false, x: 50, y: 65 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="First Aid Basics"
      description="Pick the best immediate care for a small cut."
      moduleId="game-first-aid-basics"
      hint="Clean the wound and apply gentle pressure to stop bleeding. Avoid unclean materials or random ointments."
      zones={zones}
      background={<>
        <div className="absolute left-[50%] top-[50%] w-14 h-14 bg-rose-300/60 rounded-full" />
      </>}
    />
  )
}
