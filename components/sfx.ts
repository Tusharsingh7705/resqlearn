"use client"

let ctx: AudioContext | null = null
function getCtx() {
  if (typeof window === "undefined") return null
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  return ctx
}

function beep(freq: number, duration = 0.12, type: OscillatorType = "sine", volume = 0.1) {
  const ac = getCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = volume
  osc.connect(gain)
  gain.connect(ac.destination)
  const now = ac.currentTime
  osc.start(now)
  osc.stop(now + duration)
}

export function playGood() {
  beep(880, 0.08, "sine", 0.12)
  setTimeout(() => beep(1320, 0.08, "sine", 0.1), 80)
}

export function playBad() {
  beep(220, 0.12, "square", 0.12)
}

export function playClick() {
  beep(600, 0.05, "triangle", 0.08)
}
