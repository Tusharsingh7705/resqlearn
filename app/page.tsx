import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10">
      {/* Hero */}
      <section className="rounded-xl bg-primary text-primary-foreground p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="grid gap-3">
            <h1 className="text-balance text-3xl md:text-4xl font-semibold">
              ResQLearn: Disaster Preparedness for Every Campus
            </h1>
            <p className="text-pretty text-sm/6 md:text-base opacity-90">
              Gamified learning, real-time alerts, and secure communication between students, teachers, and parents—
              aligned with NDMA guidelines and NEP 2020.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="secondary">
                <Link href="/student">Explore Student Modules</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/teacher">Open Admin Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground/90 hover:bg-primary-foreground/10">
                <Link href="/parent">Parent Portal</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-primary-foreground/10 p-6">
            <ul className="list-disc pl-5 text-sm md:text-base space-y-2">
              <li>Interactive quizzes for earthquakes, floods, cyclones, and fire safety</li>
              <li>Region-specific alerts with SMS-ready API hook</li>
              <li>Assign drills and track progress across classes</li>
              <li>Offline-friendly modules to practice anywhere</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            title="Gamified Learning"
            description="Modules, interactive lessons, and quizzes for common hazards."
          />
          <FeatureCard
            title="Real-Time Alerts"
            description="Geo-specific alerts for schools and families with clear guidance."
          />
          <FeatureCard
            title="Seamless Communication"
            description="Admins and teachers broadcast verified notices instantly."
          />
        </div>
      </section>

      {/* Info */}
      <section className="grid md:grid-cols-2 gap-4">
        <InfoCard
          title="Aligned with NDMA & NEP 2020"
          body="Supports structured disaster education to reduce vulnerability in schools."
        />
        <InfoCard
          title="Future Scope"
          body="AI-personalized learning, expanded language support, and global deployment."
        />
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-card p-5 transition hover:shadow-sm">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border bg-card p-5">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </article>
  )
}
