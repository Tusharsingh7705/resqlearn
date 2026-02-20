"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FeedbackPage() {
  const [status, setStatus] = useState<null | "ok" | "error" | "loading">(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student" as "student" | "teacher" | "parent" | "admin",
    category: "suggestion" as "bug" | "suggestion" | "content" | "safety",
    rating: 5,
    message: "",
    consent: true,
  })

  async function submit() {
    setStatus("loading")
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("fail")
      setStatus("ok")
      setForm((f) => ({ ...f, message: "" }))
    } catch (e) {
      setStatus("error")
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 grid gap-6">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Feedback</h2>
        <p className="text-sm text-muted-foreground">Help us improve ResQLearn. Share ideas, report issues, or request content.</p>
      </header>

      <section className="rounded-lg border bg-card p-5 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm">Name</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Email</label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" type="email" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="text-sm">Role</label>
            <select className="rounded-md border bg-background px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Category</label>
            <select className="rounded-md border bg-background px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}>
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug</option>
              <option value="content">Content Request</option>
              <option value="safety">Safety Concern</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Rating</label>
            <input className="rounded-md border bg-background px-3 py-2" type="range" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            <div className="text-xs text-muted-foreground">{form.rating} / 5</div>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm">Message</label>
          <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what's working well and what we can improve." />
        </div>

        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
          <span className="text-sm">I consent to my feedback being used to improve the platform.</span>
        </label>

        <div className="flex items-center gap-3">
          <Button onClick={submit} disabled={!form.message || status === "loading"}>Submit Feedback</Button>
          {status === "ok" ? <div className="text-xs text-green-600">Thanks! We received your feedback.</div> : null}
          {status === "error" ? <div className="text-xs text-red-600">Failed to send. Try again.</div> : null}
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5 grid gap-2">
        <h3 className="font-medium">Tips for helpful feedback</h3>
        <ul className="text-sm list-disc pl-5">
          <li>Describe what you were trying to do and what happened.</li>
          <li>Include the page (e.g., Games, Quizzes) and your device.</li>
          <li>Suggest how we might improve the experience.</li>
        </ul>
      </section>
    </main>
  )
}
