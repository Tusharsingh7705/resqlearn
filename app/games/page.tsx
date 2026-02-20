"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { HazardBadge } from "@/components/hazard-badge"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function GamesHomePage() {
  const { data: vidData } = useSWR<{ videos: { id: string; title: string; provider: string; ytId?: string }[] }>(
    "/api/videos",
    fetcher,
  )

  return (
    <main
      className="mx-auto max-w-6xl px-4 py-8 grid gap-8"
      style={{ backgroundImage: "url('/bg/pattern.svg')", backgroundSize: "160px 160px" }}
    >
      <div className="relative overflow-hidden rounded-xl border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,.25),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,.25),transparent_40%)] animate-pulse" />
        <header className="relative grid gap-1 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Play & Learn</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Explore interactive games and videos that teach disaster safety in a colorful, fun way for all ages.
          </p>
        </header>
      </div>

      <Tabs defaultValue="games" className="grid gap-6">
        <TabsList className="w-max border">
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="focus:outline-none">
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Survival Royale (Beta)</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <HazardBadge kind="multi" small />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Top‑down survival: enemies, loot, medkits, and evacuation objective.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/survival-royale">Play</Link>
                </Button>
              </div>
            </article>
            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Preparedness Arena (Phaser)</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <HazardBadge kind="multi" small />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Animated top‑down arena: collect essentials, avoid hazards, complete mission.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/preparedness-arena">Play</Link>
                </Button>
              </div>
            </article>
            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Disaster Runner</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <HazardBadge kind="earthquake" small />
                  <HazardBadge kind="flood" small />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Top‑down action: collect go‑bag items, dodge hazards, finish the mission.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/disaster-runner">Play</Link>
                </Button>
              </div>
            </article>
            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Pack a Go‑Bag</h3>
                <p className="text-sm text-muted-foreground mt-1">Drag essentials into your emergency kit.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/pack-a-go-bag">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Earthquake Safe Spots</h3>
                <p className="text-sm text-muted-foreground mt-1">Pick the safest place to stay during a quake.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/earthquake-safe-spots">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Flood Route Finder</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose safe paths away from floodwaters.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/flood-route">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Fire Exit Maze</h3>
                <p className="text-sm text-muted-foreground mt-1">Pick stairs and safe exits, avoid elevators.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/fire-exit">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Cyclone Prep Choice</h3>
                <p className="text-sm text-muted-foreground mt-1">Find the safest indoor spot during winds.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/cyclone-prep">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">heatwave Shade Choice</h3>
                <p className="text-sm text-muted-foreground mt-1">Find shade and avoid dangerous hot spots.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/heatwave-shade">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Lightning Safety</h3>
                <p className="text-sm text-muted-foreground mt-1">Find enclosed shelter, avoid trees and fields.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/lightning-safety">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Landslide Safe Route</h3>
                <p className="text-sm text-muted-foreground mt-1">Move away from slopes to stable ground.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/landslide-route">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Tsunami Beach Safety</h3>
                <p className="text-sm text-muted-foreground mt-1">If sea recedes, head inland and up.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/tsunami-beach">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">First Aid Basics</h3>
                <p className="text-sm text-muted-foreground mt-1">Choose the right immediate care.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/first-aid-basics">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Emergency Calls</h3>
                <p className="text-sm text-muted-foreground mt-1">Call 112, avoid prank calls.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/emergency-calls">Play</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-5 grid gap-3">
              <div>
                <h3 className="font-medium">Evacuation drill Order</h3>
                <p className="text-sm text-muted-foreground mt-1">Line up and follow instructions calmly.</p>
              </div>
              <div>
                <Button asChild>
                  <Link href="/games/evacuation-order">Play</Link>
                </Button>
              </div>
            </article>
          </section>
        </TabsContent>

        <TabsContent value="videos" className="focus:outline-none">
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(vidData?.videos || []).map((v) => (
              <article key={v.id} className="rounded-lg border bg-card p-4 grid gap-2 hover:shadow-sm transition">
                <div className="rounded-md overflow-hidden border">
                  <AspectRatio ratio={16 / 9}>
                    {v.provider === "youtube" && v.ytId ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${v.ytId}`}
                        title={v.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                  </AspectRatio>
                </div>
                <div className="text-sm font-medium">{v.title}</div>
              </article>
            ))}
          </section>
        </TabsContent>
      </Tabs>
    </main>
  )
}
