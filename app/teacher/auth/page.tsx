"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TeacherAdminAuthPage() {
  const [tab, setTab] = useState("login")
  const router = useRouter()
  function go() { router.push("/teacher") }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 grid gap-6">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Teacher / Admin Access</h2>
        <p className="text-sm text-muted-foreground">Sign in or create an account to manage alerts, modules, and drills.</p>
      </header>

      <div className="rounded-lg border bg-card p-5 grid gap-4">
        <Tabs value={tab} onValueChange={setTab} className="grid gap-4">
          <TabsList className="w-max border">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm">Role</label>
              <select className="rounded-md border bg-background px-3 py-2" defaultValue="teacher" aria-label="Role">
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <Input placeholder="you@school.edu" type="email" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Password</label>
              <Input placeholder="••••••••" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <Button className="w-full" onClick={go}>Login</Button>
            </div>
            <div className="text-xs text-muted-foreground">
              New here? <button onClick={() => setTab("signup")} className="underline">Create an account</button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm">Role</label>
              <select className="rounded-md border bg-background px-3 py-2" defaultValue="teacher" aria-label="Role">
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Full Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <Input placeholder="you@school.edu" type="email" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Password</label>
              <Input placeholder="Create a strong password" type="password" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">School / Organization</label>
              <Input placeholder="e.g., Sunrise Public School" />
            </div>
            <div className="flex items-center justify-between">
              <Button className="w-full" onClick={go}>Create Account</Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Already have an account? <button onClick={() => setTab("login")} className="underline">Login</button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex items-center gap-2">
        <Button asChild variant="secondary"><Link href="/teacher">Go to Dashboard</Link></Button>
        <Button asChild><Link href="/">Home</Link></Button>
      </div>
    </main>
  )
}
