import { notFound } from "next/navigation"
import { QUIZ_MODULES } from "@/data/quizzes"
import { QuizRunner } from "@/components/quiz-runner"

export default function QuizLevelPage({ params }: { params: { level: string } }) {
  const m = QUIZ_MODULES[params.level]
  if (!m) return notFound()
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 grid gap-6">
      <header>
        <h2 className="text-xl font-semibold">{m.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{m.summary}</p>
      </header>
      <QuizRunner module={m} />
    </main>
  )
}
