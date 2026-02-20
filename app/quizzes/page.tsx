import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QuizzesHomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Quizzes</h2>
        <p className="text-sm text-muted-foreground">Choose your level to test your disaster safety knowledge.</p>
      </header>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <div>
            <h3 className="font-medium">Beginner</h3>
            <p className="text-sm text-muted-foreground mt-1">20 basics questions. Great for starters.</p>
          </div>
          <div>
            <Button asChild>
              <Link href="/quizzes/beginner">Start</Link>
            </Button>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <div>
            <h3 className="font-medium">Intermediate</h3>
            <p className="text-sm text-muted-foreground mt-1">20 applied questions. Get practical.</p>
          </div>
          <div>
            <Button asChild>
              <Link href="/quizzes/intermediate">Start</Link>
            </Button>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <div>
            <h3 className="font-medium">Advanced</h3>
            <p className="text-sm text-muted-foreground mt-1">20 deeper questions. Challenge yourself.</p>
          </div>
          <div>
            <Button asChild>
              <Link href="/quizzes/advanced">Start</Link>
            </Button>
          </div>
        </article>
      </section>
    </main>
  )
}
