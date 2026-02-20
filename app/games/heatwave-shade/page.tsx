"use client"

import { ChoiceGame, type ChoiceZone } from "@/components/games/choice-game"

const zones: ChoiceZone[] = [
  { id: "open-sun", label: "Open Sun", good: false, x: 30, y: 40 },
  { id: "shade", label: "Tree Shade", good: true, x: 60, y: 35 },
  { id: "car", label: "Inside Parked Car", good: false, x: 80, y: 45 },
]

export default function Page() {
  return (
    <ChoiceGame
      title="Heatwave Shade Choice"
      description="Find the best spot to cool down during heatwaves."
      moduleId="game-heatwave-shade"
      hint="Avoid direct sun and parked cars. Rest in shade, drink water."
      zones={zones}
      background={<>
        <div className="absolute left-[60%] top-[35%] w-24 h-24 bg-lime-300/50 rounded-full" />
        <div className="absolute left-[15%] top-[10%] w-16 h-16 bg-yellow-300/60 rounded-full" />
      </>}
    />
  )
}
