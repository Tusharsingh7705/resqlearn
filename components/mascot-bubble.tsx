"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function MascotBubble({ text, color = "from-pink-400 to-orange-400" }: { text: string; color?: string }) {
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  function speak(t: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    try {
      if (utterRef.current) {
        window.speechSynthesis.cancel()
      }
      const u = new SpeechSynthesisUtterance(t)
      u.rate = 1
      u.pitch = 1.1
      utterRef.current = u
      window.speechSynthesis.speak(u)
      setSpeaking(true)
      u.onend = () => setSpeaking(false)
    } catch {}
  }

  function stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    try {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    } catch {}
  }

  useEffect(() => () => stop(), [])

  return (
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 animate-bounce" aria-hidden />
      <div className={`relative rounded-xl p-3 text-sm text-white bg-gradient-to-r ${color} shadow-md`}
        style={{minWidth: 180}}>
        <div>{text}</div>
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant="secondary" className="text-xs" onClick={() => speak(text)}>
            {speaking ? "Speaking..." : "Speak"}
          </Button>
          <Button size="sm" variant="ghost" className="text-xs bg-white/20 hover:bg-white/30" onClick={stop}>
            Stop
          </Button>
        </div>
        <span className="absolute -left-1 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-pink-400/80" aria-hidden />
      </div>
    </div>
  )
}
