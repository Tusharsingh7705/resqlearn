import type { Module } from "@/lib/types"

export const MODULES: Module[] = [
  {
    id: "earthquake-basics",
    title: "Earthquake Basics",
    summary: "Learn drop-cover-hold, evacuation routes, and safe spots.",
    estimatedMinutes: 10,
    questions: [
      {
        id: "q1",
        prompt: "During an earthquake indoors, what is the safest immediate action?",
        options: ["Run outside", "Drop, Cover, and Hold On", "Stand near windows", "Use elevators"],
        correctIndex: 1,
      },
      {
        id: "q2",
        prompt: "Where is the safest place to take cover?",
        options: ["Under sturdy furniture", "Near glass doors", "On a balcony", "Next to tall bookshelves"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "flood-preparedness",
    title: "Flood Preparedness",
    summary: "Recognize warnings, avoid hazards, and prepare go-kits.",
    estimatedMinutes: 8,
    questions: [
      {
        id: "q1",
        prompt: "When driving and encountering floodwater, you should:",
        options: ["Drive through quickly", "Turn around, don’t drown", "Follow the car ahead", "Stop in the water"],
        correctIndex: 1,
      },
      {
        id: "q2",
        prompt: "A go-kit should include:",
        options: ["Important documents", "Snacks & water", "Flashlight & batteries", "All of the above"],
        correctIndex: 3,
      },
    ],
  },
  {
    id: "fire-safety",
    title: "Fire Safety",
    summary: "Learn to identify hazards and evacuate safely.",
    estimatedMinutes: 7,
    questions: [
      {
        id: "q1",
        prompt: "If your clothes catch fire, you should:",
        options: ["Run outside", "Stop, Drop, and Roll", "Jump into bed", "Wave your arms"],
        correctIndex: 1,
      },
      {
        id: "q2",
        prompt: "When evacuating a smoky area, you should:",
        options: ["Walk upright", "Crawl low under smoke", "Hold breath and run", "Wait for fire to pass"],
        correctIndex: 1,
      },
    ],
  },
]
