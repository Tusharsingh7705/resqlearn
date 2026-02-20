"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { href: "/", label: "Home" },
  { href: "/student", label: "Student" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/emergency", label: "Emergency" },
  { href: "/games", label: "Games" },
  { href: "/feedback", label: "Feedback" },
  { href: "/teacher/auth", label: "Teacher" },
  { href: "/admin/auth", label: "Admin" },
  { href: "/parent", label: "Parent" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-base md:text-lg">
          <span className="sr-only">ResQLearn</span>
          ResQ<span className="text-primary">Learn</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm hover:bg-muted",
                pathname === l.href ? "text-primary font-medium" : "text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="md:hidden bg-transparent" variant="outline">
            <Link href="/student">Start</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
