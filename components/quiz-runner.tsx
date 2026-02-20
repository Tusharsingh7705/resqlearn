"use client"

import { useState, useMemo } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import type { Module } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getUserId(): string {
  // simple anonymous id persisted locally (no auth in MVP)
  if (typeof window === "undefined") return "anonymous"
  const k = "resqlearn_user_id"
  let id = window.localStorage.getItem(k)
  if (!id) {
    id = `u_${Math.random().toString(36).slice(2)}`
    window.localStorage.setItem(k, id)
  }
  return id
}

export function QuizRunner({ module }: { module: Module }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const q = module.questions[index]
  const userId = useMemo(() => getUserId(), [])

  const { data: progressData } = useSWR(() => `/api/progress?userId=${encodeURIComponent(userId)}`, fetcher)

  function pickOption(i: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = i
      return next
    })
  }

  async function onNext() {
    if (index < module.questions.length - 1) {
      setIndex(index + 1)
      return
    }
    // complete quiz
    const correct = module.questions.reduce((acc, qq, i) => acc + (answers[i] === qq.correctIndex ? 1 : 0), 0)
    const score = Math.round((correct / module.questions.length) * 100)
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, moduleId: module.id, score }),
    })
    await mutate(`/api/progress?userId=${encodeURIComponent(userId)}`)
    setDone(true)
  }

  if (done) {
    const correct = module.questions.reduce((acc, qq, i) => acc + (answers[i] === qq.correctIndex ? 1 : 0), 0)
    const score = Math.round((correct / module.questions.length) * 100)
    return (
      <div className="rounded-md border p-5">
        <h4 className="font-medium">Module Completed</h4>
        <p className="text-sm text-muted-foreground mt-1">
          You answered {correct} of {module.questions.length} correctly. Score:{" "}
          <span className="font-medium">{score}%</span>
        </p>
        <div className="mt-4">
          <a className="text-primary underline" href="/student">
            Back to Student Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{module.title}</h4>
        <span className="text-xs text-muted-foreground">
          Question {index + 1} of {module.questions.length}
        </span>
      </div>

      <p className="mt-3">{q.prompt}</p>

      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const selected = answers[index] === i
          return (
            <button
              key={i}
              onClick={() => pickOption(i)}
              className={`text-left rounded-md border px-3 py-2 ${selected ? "bg-primary text-primary-foreground" : "bg-card"}`}
              aria-pressed={selected}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-end">
        <Button onClick={onNext}>{index < module.questions.length - 1 ? "Next" : "Finish"}</Button>
      </div>
    </div>
  )
}
