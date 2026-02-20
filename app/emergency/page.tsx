"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function EmergencyPage() {
  const [loc, setLoc] = useState("")
  const [sos, setSos] = useState("I need help. Please contact me.")

  function useMyLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      setLoc(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
    })
  }

  const smsBody = encodeURIComponent(`${sos}\nLocation: ${loc || "Unknown"}`)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 grid gap-8">
      <header className="grid gap-1">
        <h2 className="text-2xl font-semibold">Emergency</h2>
        <p className="text-sm text-muted-foreground">Quick actions, contacts, and guidance during disasters.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">Emergency Contacts</h3>
          <ul className="text-sm grid gap-1">
            <li><strong>112</strong> – All‑in‑one Emergency Number (India)</li>
            <li><strong>100</strong> – Police · <strong>101</strong> – Fire · <strong>102</strong> – Ambulance</li>
            <li><strong>1070</strong> – Disaster Management Control Room (varies by state)</li>
          </ul>
          <div className="flex gap-2 mt-2">
            <Button asChild><a href="tel:112">Call 112</a></Button>
            <Button asChild variant="secondary"><a href="tel:100">Police</a></Button>
            <Button asChild variant="secondary"><a href="tel:101">Fire</a></Button>
            <Button asChild variant="secondary"><a href="tel:102">Ambulance</a></Button>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-5 grid gap-3">
          <h3 className="font-medium">Share SOS + Location</h3>
          <div className="grid gap-2">
            <label className="text-sm">Your Location (auto or manual)</label>
            <div className="flex gap-2">
              <Input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="lat, long or address" />
              <Button onClick={useMyLocation} type="button">Use GPS</Button>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">SOS Message</label>
            <Textarea value={sos} onChange={(e) => setSos(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2">
            <Button asChild><a href={`sms:?&body=${smsBody}`}>Prepare SMS</a></Button>
            <Button asChild variant="secondary"><a target="_blank" rel="noreferrer" href={`https://wa.me/?text=${smsBody}`}>Share on WhatsApp</a></Button>
          </div>
        </article>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <article className="rounded-lg border bg-card p-5 grid gap-2">
          <h4 className="font-medium">Earthquake</h4>
          <ul className="text-sm list-disc pl-5">
            <li>Drop, Cover, Hold On.</li>
            <li>Stay away from windows and heavy objects.</li>
            <li>After shaking, evacuate safely; expect aftershocks.</li>
          </ul>
        </article>
        <article className="rounded-lg border bg-card p-5 grid gap-2">
          <h4 className="font-medium">Flood</h4>
          <ul className="text-sm list-disc pl-5">
            <li>Move to higher ground immediately.</li>
            <li>Do not walk/drive through flood water.</li>
            <li>Switch off mains if safe; keep battery radio.</li>
          </ul>
        </article>
        <article className="rounded-lg border bg-card p-5 grid gap-2">
          <h4 className="font-medium">Cyclone/Storm</h4>
          <ul className="text-sm list-disc pl-5">
            <li>Stay indoors; away from windows.</li>
            <li>Secure doors; keep emergency kit ready.</li>
            <li>Follow official advisories.</li>
          </ul>
        </article>
      </section>

      <div className="flex items-center gap-2">
        <Button asChild variant="secondary"><Link href="/games">Practice with Games</Link></Button>
        <Button asChild><Link href="/quizzes">Test with Quizzes</Link></Button>
      </div>
    </main>
  )
}
