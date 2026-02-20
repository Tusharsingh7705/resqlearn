"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MascotBubble } from "@/components/mascot-bubble"

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

export default function PreparednessArena() {
  const gameRef = useRef<any | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const params = useSearchParams()
  const scenario = params?.get("scenario") || "default"

  useEffect(() => {
    let destroyed = false
    const userId = getUserId()

    async function boot() {
      // Ensure container exists
      if (!containerRef.current) {
        setErr("Container not ready. Try reloading the page.")
        return
      }
      let P: any
      try {
        P = (await import("phaser")).default
      } catch (e: any) {
        setErr("Phaser failed to load. Run 'npm install' and restart dev server.")
        return
      }

      const floodMode = scenario === "flood"

      class MainScene extends P.Scene {
        player!: any
        cursors!: any
        speed = 180
        items!: any
        hazards!: any
        obstacles!: any
        shelter!: any
        score = 0
        collected = 0
        scoreText!: any
        objText!: any
        startTime = 0
        // Power-ups
        powerups!: any
        boostUntil = 0
        armor = 0
        radar = false
        jacketUntil = 0
        // Particles
        sparks!: any
        burst!: any
        hitBurst!: any
        // Virtual joystick
        joyBase!: any
        joyThumb!: any
        joyActive = false
        joyVec = new P.Math.Vector2(0, 0)
        // Flood current vector
        current = new P.Math.Vector2(floodMode ? 0.6 : 0, floodMode ? 0.35 : 0)

        preload() {
          // Generate simple textures for player frames and items
          const g = this.add.graphics()
          // Player frame A
          g.fillStyle(0x22c55e, 1)
          g.fillCircle(10, 10, 10)
          g.generateTexture("playerA", 20, 20)
          g.clear()
          // Player frame B (simple animation blink)
          g.fillStyle(0x16a34a, 1)
          g.fillCircle(10, 10, 10)
          g.generateTexture("playerB", 20, 20)
          g.clear()
          // Item textures
          g.fillStyle(0x38bdf8, 1)
          g.fillCircle(6, 6, 6)
          g.generateTexture("itm-water", 12, 12)
          g.clear()
          g.fillStyle(0xf43f5e, 1)
          g.fillCircle(6, 6, 6)
          g.generateTexture("itm-med", 12, 12)
          g.clear()
          g.fillStyle(0xfbbf24, 1)
          g.fillCircle(6, 6, 6)
          g.generateTexture("itm-flash", 12, 12)
          g.clear()
          // Hazard texture
          g.fillStyle(0xef4444, 0.85)
          g.fillCircle(8, 8, 8)
          g.generateTexture("hazard", 16, 16)
          g.destroy()

          // Spark texture for particles
          const g2 = this.add.graphics()
          g2.fillStyle(0xffffff, 1)
          g2.fillCircle(2, 2, 2)
          g2.generateTexture("spark", 4, 4)
          g2.destroy()

          // Obstacle and shelter textures
          const g3 = this.add.graphics()
          g3.fillStyle(0x0f172a, 0.6); g3.fillRoundedRect(0, 0, 64, 14, 6); g3.generateTexture("wall", 64, 14); g3.clear()
          g3.fillStyle(0x10b981, 0.4); g3.fillRoundedRect(0, 0, 80, 50, 8); g3.generateTexture("shelter", 80, 50); g3.clear()
          // Power-ups
          g3.fillStyle(0x22c55e, 1); g3.fillCircle(8, 8, 8); g3.generateTexture("pu-boots", 16, 16); g3.clear()
          g3.fillStyle(0x3b82f6, 1); g3.fillCircle(8, 8, 8); g3.generateTexture("pu-radio", 16, 16); g3.clear()
          g3.fillStyle(0xf59e0b, 1); g3.fillCircle(8, 8, 8); g3.generateTexture("pu-helmet", 16, 16); g3.clear()
          g3.fillStyle(0x0ea5e9, 1); g3.fillCircle(8, 8, 8); g3.generateTexture("pu-jacket", 16, 16); g3.destroy()
        }

        create() {
          const W = this.scale.width
          const H = this.scale.height

          // Background zones (flood gets watery tones)
          if (floodMode) {
            this.add.rectangle(W / 2, 90, W, 160, 0x7dd3fc, 0.22)
            this.add.rectangle(W / 2, 260, W, 160, 0x38bdf8, 0.18)
            this.add.rectangle(W / 2, 430, W, 160, 0x0ea5e9, 0.16)
          } else {
            this.add.rectangle(W / 2, 90, W, 160, 0x93c5fd, 0.15)
            this.add.rectangle(W / 2, 260, W, 160, 0x86efac, 0.15)
            this.add.rectangle(W / 2, 430, W, 160, 0xfbcfe8, 0.15)
          }

          // Wavy decorative lines
          const lines = this.add.group()
          for (let x = 0; x < W; x += 40) {
            const color = floodMode ? 0x38bdf8 : 0x7dd3fc
            const r = this.add.rectangle(x, 220 + Math.sin(x * 0.05) * 8, 30, 2, color, floodMode ? 0.22 : 0.15)
            lines.add(r)
          }
          this.tweens.add({
            targets: lines.getChildren(),
            y: "+=6",
            duration: 1400,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          })

          // Player
          this.player = this.physics.add.sprite(120, 260, "playerA")
          this.player.setCircle(10)
          this.player.setCollideWorldBounds(true)
          this.anims.create({ key: "run", frames: [{ key: "playerA" }, { key: "playerB" }], frameRate: 6, repeat: -1 })
          this.player.play("run")

          // Obstacles
          this.obstacles = this.physics.add.staticGroup()
          const wallPositions = [
            [200, 160], [260, 160], [320, 160],
            [420, 300], [480, 300], [540, 300],
            [360, 440], [420, 440], [480, 440],
          ] as const
          wallPositions.forEach(([x, y]) => this.obstacles.create(x, y, "wall"))

          // Shelter (goal)
          this.shelter = this.physics.add.staticImage(700, 80, "shelter")

          // Items
          this.items = this.physics.add.group()
          const kinds = ["itm-water", "itm-med", "itm-flash"]
          for (let i = 0; i < 12; i++) {
            const it = this.items.create(P.Math.Between(60, W - 60), P.Math.Between(80, H - 80), kinds[i % kinds.length])
            it.setCircle(6)
          }

          // Hazards (flood: more drift)
          this.hazards = this.physics.add.group()
          for (let i = 0; i < (floodMode ? 9 : 7); i++) {
            const hz = this.hazards.create(P.Math.Between(60, W - 60), P.Math.Between(80, H - 80), "hazard") as any
            hz.setCircle(8)
            const vx = P.Math.Between(floodMode ? -40 : -80, floodMode ? 100 : 80)
            const vy = P.Math.Between(floodMode ? 40 : -80, floodMode ? 120 : 80)
            hz.setVelocity(vx, vy).setBounce(1, 1).setCollideWorldBounds(true)
          }

          // Power-ups
          this.powerups = this.physics.add.group()
          const puKinds = floodMode ? ["pu-jacket", "pu-radio", "pu-boots"] : ["pu-boots", "pu-helmet", "pu-radio"]
          for (let i = 0; i < 4; i++) {
            const pu = this.powerups.create(P.Math.Between(70, W - 70), P.Math.Between(90, H - 90), puKinds[i % puKinds.length]) as any
            pu.setCircle(8)
          }

          // Particles
          this.sparks = this.add.particles(0, 0, "spark", {
            speed: { min: 40, max: 120 },
            angle: { min: 0, max: 360 },
            lifespan: 450,
            scale: { start: 1, end: 0 },
            quantity: 0,
            emitting: false,
          })
          this.burst = this.sparks.createEmitter()
          this.hitBurst = this.sparks.createEmitter({ tint: 0xff5555 })

          // Overlaps
          this.physics.add.overlap(this.player, this.items, (_p: any, itObj: any) => {
            const it = itObj as any
            it.destroy()
            this.collected += 1
            this.score += 10
            this.burst.emitParticleAt(it.x, it.y, 12)
          })
          this.physics.add.overlap(this.player, this.hazards, (_p: any, hzObj: any) => {
            const hz = hzObj as any
            // knockback and score penalty
            const dirX = Math.sign(this.player.x - hz.x) || 1
            const dirY = Math.sign(this.player.y - hz.y) || 1
            this.player.x += dirX * 10
            this.player.y += dirY * 10
            const penalty = this.armor > 0 ? 2 : 5
            this.score = Math.max(0, this.score - penalty)
            this.hitBurst.emitParticleAt(hz.x, hz.y, 16)
            this.cameras.main.shake(120, 0.004)
          })
          this.physics.add.overlap(this.player, this.powerups, (_p: any, puObj: any) => {
            const pu = puObj as any
            const key = pu.texture.key
            pu.destroy()
            if (key === "pu-boots") {
              this.boostUntil = this.time.now + 10000 // +10s speed
              this.burst.emitParticleAt(this.player.x, this.player.y, 20)
            } else if (key === "pu-helmet") {
              this.armor = 1
              this.hitBurst.emitParticleAt(this.player.x, this.player.y, 10)
            } else if (key === "pu-jacket") {
              this.jacketUntil = this.time.now + 15000 // +15s reduced current push
              this.burst.emitParticleAt(this.player.x, this.player.y, 24)
            } else if (key === "pu-radio") {
              this.radar = true
            }
          })

          // Colliders
          this.physics.add.collider(this.player, this.obstacles)
          this.physics.add.collider(this.hazards, this.obstacles)
          this.physics.add.collider(this.hazards, this.hazards)

          // Enter shelter to finish if items collected
          this.physics.add.overlap(this.player, this.shelter, () => {
            if (this.collected >= 12) this.finish()
          })

          // UI
          this.scoreText = this.add.text(12, 12, "Score: 0\nItems: 0/12", { fontSize: "14px", color: "#0f172a" })
          const baseObj = floodMode
            ? "Flood: Avoid fast water and debris. Collect essentials, wear life jacket, then reach high ground shelter."
            : "Objective: Collect 12 items, then reach the shelter (green)."
          this.objText = this.add.text(12, 40, baseObj, { fontSize: "12px", color: "#334155" })

          // Input
          this.cursors = this.input.keyboard!.createCursorKeys()
          this.input.keyboard!.addKeys("W,A,S,D")

          // Virtual joystick (bottom-left)
          this.joyBase = this.add.circle(90, H - 90, 40, 0x94a3b8, 0.18).setScrollFactor(0).setDepth(20)
          this.joyThumb = this.add.circle(90, H - 90, 22, 0x64748b, 0.35).setScrollFactor(0).setDepth(21)
          this.joyBase.setInteractive({ useHandCursor: false, draggable: false })
          this.input.on("pointerdown", (p: any) => {
            if (p.x < W / 2 && p.y > H / 2) {
              this.joyActive = true
              this.joyBase.setPosition(p.x, p.y)
              this.joyThumb.setPosition(p.x, p.y)
              this.joyVec.set(0, 0)
            }
          })
          this.input.on("pointermove", (p: any) => {
            if (!this.joyActive) return
            const dx = p.x - this.joyBase.x
            const dy = p.y - this.joyBase.y
            const len = Math.min(40, Math.hypot(dx, dy))
            const angle = Math.atan2(dy, dx)
            this.joyThumb.setPosition(this.joyBase.x + Math.cos(angle) * len, this.joyBase.y + Math.sin(angle) * len)
            this.joyVec.set(Math.cos(angle), Math.sin(angle)).scale(len / 40)
          })
          this.input.on("pointerup", () => {
            this.joyActive = false
            this.joyVec.set(0, 0)
            this.joyBase.setPosition(90, H - 90)
            this.joyThumb.setPosition(90, H - 90)
          })

          // Mission timer end condition
          this.time.addEvent({ delay: 180000, callback: () => this.finish(), callbackScope: this }) // 3 minutes
          this.startTime = this.time.now
        }

        finish() {
          // Submit score
          const timeSec = Math.round((this.time.now - this.startTime) / 1000)
          const timeBonus = Math.max(0, 40 - Math.floor(timeSec / 10))
          const pct = Math.min(100, Math.round(50 + this.score + timeBonus + (floodMode ? 5 : 0)))
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, moduleId: "game-preparedness-arena", score: pct }),
          })
          // End scene and show overlay text
          const W = this.scale.width
          const H = this.scale.height
          this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.35).setDepth(10)
          this.add.text(W / 2, H / 2, `Mission Complete\nScore ${pct}%\nTime ${timeSec}s`, {
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
          }).setOrigin(0.5).setDepth(10)
          this.scene.pause()
        }

        update(_t: number, dt: number) {
          if (!this.player || !this.cursors) return
          const k = this.input.keyboard!
          const left = this.cursors.left!.isDown || (k.keys.find((x: any) => x?.keyCode === 65 /*A*/)?.isDown ?? false)
          const right = this.cursors.right!.isDown || (k.keys.find((x: any) => x?.keyCode === 68 /*D*/)?.isDown ?? false)
          const up = this.cursors.up!.isDown || (k.keys.find((x: any) => x?.keyCode === 87 /*W*/)?.isDown ?? false)
          const down = this.cursors.down!.isDown || (k.keys.find((x: any) => x?.keyCode === 83 /*S*/)?.isDown ?? false)

          let vx = (left ? -1 : 0) + (right ? 1 : 0)
          let vy = (up ? -1 : 0) + (down ? 1 : 0)

          // Override with joystick if active
          if (this.joyActive) {
            vx = this.joyVec.x
            vy = this.joyVec.y
          }

          const curSpeed = this.time.now < this.boostUntil ? this.speed + 80 : this.speed
          // Apply flood current push (reduced with jacket)
          if (floodMode) {
            const reduce = this.time.now < this.jacketUntil ? 0.4 : 1
            vx += this.current.x * reduce
            vy += this.current.y * reduce
          }
          this.player.setVelocity(vx * curSpeed, vy * curSpeed)
          if (vx !== 0 || vy !== 0) this.player.play("run", true)

          // Update UI
          this.scoreText.setText(`Score: ${this.score}\nItems: ${this.collected}/12`)
          if (floodMode) {
            const jacketIcon = this.time.now < this.jacketUntil ? " (Jacket ON)" : ""
            const radioIcon = this.radar ? " (Radar)" : ""
            this.objText.setText(`Flood: Avoid fast water & debris${jacketIcon}${radioIcon}. Reach high ground shelter!`)
          } else {
            if (this.collected < 12) {
              this.objText.setText("Objective: Collect 12 items, then reach the shelter (green).")
            } else {
              this.objText.setText("Objective: Go to the shelter (green) to escape!")
            }
          }

          // Win when all items collected
          if (this.collected >= 12) {
            this.finish()
          }

          // Minimap HUD (top-right)
          const W = this.scale.width
          const g = this.add.graphics()
          g.fillStyle(0x000000, 0.08)
          const mx = W - 150
          const my = 16
          g.fillRect(mx, my, 134, 100)
          const sx = (x: number) => mx + 8 + (x / this.scale.width) * 118
          const sy = (y: number) => my + 8 + (y / this.scale.height) * 84
          // Player dot
          g.fillStyle(0x16a34a, 1); g.fillCircle(sx(this.player.x), sy(this.player.y), 2)
          // Items
          if (this.radar) {
            this.items.getChildren().forEach((c: any) => { g.fillStyle(0x38bdf8, 1); g.fillCircle(sx(c.x), sy(c.y), 2) })
          }
          // Shelter
          g.fillStyle(0x10b981, 1); g.fillRect(mx + 110, my + 8, 12, 8)
          g.destroy()
        }
      }

      const config: any = {
        type: P.AUTO,
        width: 760,
        height: 520,
        parent: containerRef.current!,
        backgroundColor: "#ffffff",
        physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
        scene: [MainScene],
      }

      if (!destroyed) gameRef.current = new P.Game(config)
    }

    boot()

    return () => {
      destroyed = true
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-4">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Preparedness Arena (Phaser)</h2>
        <p className="text-sm text-muted-foreground">Animated top‑down arena. Collect essentials, avoid hazards, complete the mission, and earn XP.</p>
      </header>

      <MascotBubble
        text="Move with WASD/Arrow keys. Grab water, med kits, flashlights; avoid red hazards. Collect all or beat the timer!"
        color="from-indigo-400 to-emerald-400"
      />

      <div className="rounded-lg border bg-card p-3 grid gap-3">
        {err ? (
          <div className="text-sm text-red-600">{err}</div>
        ) : null}
        <div ref={containerRef} className="mx-auto rounded overflow-hidden border min-h-[520px]" />
        <div className="text-sm text-muted-foreground">Tip: Try pathing through safe zones and avoid hazard patrols.</div>
        <div className="flex gap-2">
          <Button asChild>
            <a href="/games">Back to Games</a>
          </Button>
        </div>
      </div>
    </main>
  )
}
