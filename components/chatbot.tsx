"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I’m your safety helper. Ask me about disaster preparedness, drills, go‑bags, or safe actions during hazards." },
  ])
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  async function send() {
    const text = value.trim()
    if (!text) return
    setMessages((m) => [...m, { role: "user", content: text }])
    setValue("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error("Chat failed")
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "I couldn’t find that. Try rephrasing your question." }])
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I had trouble answering. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button onClick={() => setOpen((v) => !v)} className="rounded-full shadow-lg">
        {open ? "Close Chat" : "Chat"}
      </Button>

      {/* Panel */}
      {open ? (
        <div className="mt-2 w-[320px] md:w-[380px] rounded-xl border bg-card shadow-2xl grid" style={{ gridTemplateRows: "auto 1fr auto" }}>
          <header className="p-3 border-b">
            <div className="text-sm font-medium">ResQLearn Assistant</div>
            <div className="text-xs text-muted-foreground">Ask how to prepare, what to do during hazards, or where to find modules.</div>
          </header>
          <div ref={listRef} className="p-3 overflow-y-auto max-h-[50dvh] grid gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === "user" ? "justify-self-end" : "justify-self-start"} max-w-[85%]` }>
                <div className={`rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading ? <div className="text-xs text-muted-foreground">Thinking…</div> : null}
          </div>
          <form
            className="p-3 border-t flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} placeholder="Ask a question…" />
            <Button type="submit" disabled={loading}>Send</Button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
