import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { RouteTheme } from "@/components/route-theme"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "ResQLearn — Learn Safety, Live Safely",
  description: "Disaster preparedness and response education for schools and colleges.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>
            <RouteTheme>
              <AnimatedBackground />
              <SiteHeader />
              <main className="min-h-dvh">{children}</main>
              <SiteFooter />
              <Analytics />
              <Chatbot />
            </RouteTheme>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
