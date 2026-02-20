"use client"

import useSWR, { mutate } from "swr"
import { useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getUserId(): string {
  if (typeof window === "undefined") return "anonymous"
  const k = "resqlearn_user_id"
  let id = window.localStorage.getItem(k)
  if (!id) {
    id = `u_${Math.random().toString(36).slice(2)}`
    window.localStorage.setItem(k, id)
  }
  return id
}

export default function RewardsPage() {
  const userId = useMemo(() => getUserId(), [])
  const { data, isValidating } = useSWR(() => `/api/rewards?userId=${encodeURIComponent(userId)}`, fetcher)

  async function buy(id: string) {
    await fetch("/api/rewards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, rewardId: id }),
    })
    await mutate(`/api/rewards?userId=${encodeURIComponent(userId)}`)
    await mutate(`/api/progress?userId=${encodeURIComponent(userId)}`)
  }

  const owned = new Set<string>(data?.meta?.ownedRewards || [])

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 grid gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Rewards</h2>
        <div className="text-sm text-muted-foreground">
          Coins: <span className="font-medium">{data?.meta?.coins ?? 0}</span>
          {isValidating ? <span className="ml-2 text-xs">(updating)</span> : null}
        </div>
      </header>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(data?.catalog || []).map((item: any) => {
          const isOwned = owned.has(item.id)
          return (
            <article key={item.id} className="rounded-lg border bg-card p-4 grid gap-3">
              <div className="relative w-full h-28 bg-muted rounded-md overflow-hidden">
                <Image src={item.assetUrl} alt={item.name} fill sizes="200px" className="object-contain" />
              </div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">Cost: {item.cost} coins</div>
              <div>
                <Button disabled={isOwned || (data?.meta?.coins ?? 0) < item.cost} onClick={() => buy(item.id)}>
                  {isOwned ? "Owned" : "Redeem"}
                </Button>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
