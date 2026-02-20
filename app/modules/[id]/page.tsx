import { notFound } from "next/navigation"
import { MODULES } from "@/data/modules"
import { QuizRunner } from "@/components/quiz-runner"

export default function ModulePage({ params }: { params: { id: string } }) {
  const module = MODULES.find((m) => m.id === params.id)
  if (!module) return notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 grid gap-6">
      <header>
        <h2 className="text-xl font-semibold">{module.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{module.summary}</p>
      </header>
      <QuizRunner module={module} />
    </main>
  )
}
