import { NextResponse } from "next/server"

const KB: { pattern: RegExp; answer: string }[] = [
  { pattern: /112|emergency/i, answer: "In India, dial 112 for emergencies. Keep it for real emergencies only." },
  { pattern: /go[- ]?bag|kit|emergency kit/i, answer: "A go‑bag should include: water, non‑perishable food, first‑aid kit, flashlight, batteries, whistle, multi‑tool, power bank, cash, IDs, medicines, and a small radio." },
  { pattern: /earthquake|quake/i, answer: "During an earthquake: Drop, Cover, and Hold On. Stay indoors away from windows; if outside, move to open area away from buildings and wires." },
  { pattern: /flood|water level|inundation/i, answer: "During floods: Move to higher ground, avoid walking or driving through flood water, switch off mains if safe, and keep a battery radio for updates." },
  { pattern: /cyclone|hurricane|typhoon|wind/i, answer: "During a cyclone: Stay indoors, keep away from windows, secure doors, switch off gas, and keep an emergency kit and radio ready." },
  { pattern: /fire|smoke/i, answer: "In a fire: Evacuate using stairs (not lifts), stay low under smoke, feel doors for heat, and call 112 once safe." },
  { pattern: /tsunami|seismic sea|coast/i, answer: "If the sea recedes quickly or you feel a strong quake near the coast: move inland and to higher ground immediately; wait for official all‑clear." },
  { pattern: /landslide|slope/i, answer: "During landslides: Move away from slopes to open stable ground, watch for cracks, and follow local authority guidance." },
]

function fallback(q: string) {
  return (
    "I’m not sure yet. Try asking about earthquakes, floods, cyclones, fires, landslides, tsunamis, go‑bags, or the emergency number 112. " +
    "You can also explore the Games and Quizzes for interactive learning."
  )
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const q: string = String(message || "")
    const found = KB.find((k) => k.pattern.test(q))
    const reply = found ? found.answer : fallback(q)
    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ reply: fallback("") }, { status: 200 })
  }
}
