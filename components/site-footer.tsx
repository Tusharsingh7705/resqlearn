import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-3 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ResQLearn — Learn Safety, Live Safely</p>
          <nav className="flex items-center gap-4">
            <Link href="/teacher" className="hover:text-foreground">
              Admin
            </Link>
            <a href="https://ndma.gov.in/" target="_blank" rel="noreferrer" className="hover:text-foreground">
              NDMA
            </a>
            <a
              href="https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              NEP 2020
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
