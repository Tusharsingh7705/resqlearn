import Link from "next/link"
import type { Module } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ModuleCard({ m, progress }: { m: Module; progress?: number }) {
  return (
    <article className="rounded-lg border bg-card p-5 flex flex-col gap-3 transition hover:shadow-sm">
      <div>
        <h3 className="font-medium">{m.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{m.summary}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{m.estimatedMinutes} min</span>
        {typeof progress === "number" ? (
          <span className="text-primary font-medium">{progress}%</span>
        ) : (
          <span className="text-muted-foreground">Not started</span>
        )}
      </div>
      {typeof progress === "number" ? <Progress value={progress} className="h-2" /> : null}
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href={`/modules/${m.id}`}>Start Module</Link>
        </Button>
      </div>
    </article>
  )
}
