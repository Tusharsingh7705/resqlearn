"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function SurvivalRoyale() {
  const gameRef = useRef<any | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let destroyed = false

    async function boot() {
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

      const WORLD_W = 2000
      const WORLD_H = 2000

      class MainScene extends P.Scene {
        player!: any
        enemies!: any
        loot!: any
        medkits!: any
        evac!: any
        cursors!: any
        joyBase!: any
        joyThumb!: any
        joyActive = false
        joyVec = new P.Math.Vector2(0,0)
        health = 100
        inv = { medkit: 0, loot: 0 }
        startTime = 0
        evacOpen = false
        sparks!: any
        hitBurst!: any

        preload() {
          const g = this.add.graphics()
          // Player
          g.fillStyle(0x22c55e, 1); g.fillCircle(10,10,10); g.generateTexture("pA", 20, 20); g.clear()
          g.lineStyle(3, 0x14532d, 1); g.strokeCircle(10,10,10); g.generateTexture("pB", 20, 20); g.clear()
          // Enemy
          g.fillStyle(0xef4444, 1); g.fillCircle(9,9,9); g.generateTexture("eA", 18, 18); g.clear()
          // Loot
          g.fillStyle(0xfde68a, 1); g.fillRoundedRect(0,0,12,12,3); g.generateTexture("loot", 12, 12); g.clear()
          // Medkit
          g.fillStyle(0xffffff, 1); g.fillRoundedRect(0,0,14,14,3); g.fillStyle(0xef4444,1); g.fillRect(6,2,2,10); g.fillRect(2,6,10,2); g.generateTexture("med",14,14); g.clear()
          // Evac
          g.fillStyle(0x10b981,1); g.fillRoundedRect(0,0,120,40,8); g.generateTexture("evac",120,40); g.clear()

          const p = this.add.graphics(); p.fillStyle(0xffffff,1); p.fillCircle(2,2,2); p.generateTexture("spark",4,4); p.destroy()
        }

        create() {
          this.cameras.main.setBackgroundColor(0x0b1020)
          this.physics.world.setBounds(0,0,WORLD_W, WORLD_H)

          // Decorative grid
          for (let x=0; x<=WORLD_W; x+=160) this.add.line(0,0,x,0,x,WORLD_H,0x1f2937,0.1).setOrigin(0)
          for (let y=0; y<=WORLD_H; y+=160) this.add.line(0,0,0,y,WORLD_W,y,0x1f2937,0.1).setOrigin(0)

          // Player
          this.player = this.physics.add.sprite(WORLD_W/2, WORLD_H/2, "pA").setCircle(10).setCollideWorldBounds(true)
          this.anims.create({ key:"run", frames: [{key:"pA"},{key:"pB"}], frameRate: 6, repeat: -1 })

          // Enemies
          this.enemies = this.physics.add.group()
          for (let i=0;i<20;i++) {
            const ex = P.Math.Between(80, WORLD_W-80)
            const ey = P.Math.Between(80, WORLD_H-80)
            const e = this.enemies.create(ex, ey, "eA").setCircle(9) as any
            e.speed = P.Math.Between(60, 110)
          }

          // Loot & medkits
          this.loot = this.physics.add.group()
          for (let i=0;i<40;i++) this.loot.create(P.Math.Between(60,WORLD_W-60), P.Math.Between(60,WORLD_H-60), "loot")
          this.medkits = this.physics.add.group()
          for (let i=0;i<8;i++) this.medkits.create(P.Math.Between(60,WORLD_W-60), P.Math.Between(60,WORLD_H-60), "med").setCircle(7)

          // Evac zone (locked for first 60s)
          this.evac = this.physics.add.staticImage(WORLD_W-200, 160, "evac")

          // Particles
          this.sparks = this.add.particles("spark")
          this.hitBurst = this.sparks.createEmitter({
            speed: {min:80, max:200}, angle: {min:0, max:360}, lifespan: 500, scale:{start:1,end:0}, quantity:0, emitting:false, blendMode:"ADD", tint:0xff5555
          })

          // Camera
          this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
          this.cameras.main.setZoom(1.2)

          // Collisions / overlaps
          this.physics.add.overlap(this.player, this.loot, (_p:any, it:any)=>{ it.destroy(); this.inv.loot++; })
          this.physics.add.overlap(this.player, this.medkits, (_p:any, it:any)=>{ it.destroy(); this.inv.medkit++; this.health = Math.min(100, this.health+25) })
          this.physics.add.overlap(this.player, this.enemies, (_p:any, e:any)=>{
            this.health -= 8
            this.hitBurst.emitParticleAt(this.player.x, this.player.y, 12)
            if (this.health <= 0) this.gameOver(false)
          })
          this.physics.add.overlap(this.player, this.evac, ()=>{ if (this.evacOpen) this.gameOver(true) })

          // Input
          this.cursors = this.input.keyboard!.createCursorKeys(); this.input.keyboard!.addKeys("W,A,S,D")

          // Virtual joystick (mobile)
          const H = this.scale.height, W = this.scale.width
          this.joyBase = this.add.circle(90, H-90, 40, 0x94a3b8, 0.18).setScrollFactor(0).setDepth(20)
          this.joyThumb = this.add.circle(90, H-90, 22, 0x64748b, 0.35).setScrollFactor(0).setDepth(21)
          this.joyBase.setInteractive({useHandCursor:false, draggable:false})
          this.input.on("pointerdown", (p:any)=>{ if (p.x<W/2 && p.y>H/2){ this.joyActive = true; this.joyBase.setPosition(p.x,p.y); this.joyThumb.setPosition(p.x,p.y); this.joyVec.set(0,0) } })
          this.input.on("pointermove", (p:any)=>{ if(!this.joyActive) return; const dx=p.x-this.joyBase.x, dy=p.y-this.joyBase.y; const len=Math.min(40, Math.hypot(dx,dy)); const ang=Math.atan2(dy,dx); this.joyThumb.setPosition(this.joyBase.x+Math.cos(ang)*len, this.joyBase.y+Math.sin(ang)*len); this.joyVec.set(Math.cos(ang)*(len/40), Math.sin(ang)*(len/40)) })
          this.input.on("pointerup", ()=>{ this.joyActive=false; this.joyVec.set(0,0); this.joyBase.setPosition(90, H-90); this.joyThumb.setPosition(90, H-90) })

          // Timer to open evac after 60s
          this.time.delayedCall(60000, ()=>{ this.evacOpen = true; this.add.text(this.evac.x-50, this.evac.y-30, "Evac OPEN", {color:"#16a34a"}).setDepth(30) })
          this.startTime = this.time.now

          // HUD
          this.add.text(12,12, "Survival Royale (Beta)", {color:"#e5e7eb"}).setScrollFactor(0)
        }

        update() {
          // Movement
          const up = this.cursors.up?.isDown || (this.input.keyboard as any).W?.isDown
          const down = this.cursors.down?.isDown || (this.input.keyboard as any).S?.isDown
          const left = this.cursors.left?.isDown || (this.input.keyboard as any).A?.isDown
          const right = this.cursors.right?.isDown || (this.input.keyboard as any).D?.isDown
          let vx = (left?-1:0)+(right?1:0)
          let vy = (up?-1:0)+(down?1:0)
          if (this.joyActive) { vx = this.joyVec.x; vy = this.joyVec.y }
          const spd = 190
          this.player.setVelocity(vx*spd, vy*spd)
          if (vx!==0 || vy!==0) this.player.play("run", true)

          // Enemy AI: chase when in radius
          const pr = new P.Math.Vector2(this.player.x, this.player.y)
          this.enemies.getChildren().forEach((e:any)=>{
            const v = new P.Math.Vector2(e.x, e.y)
            const d = P.Math.Distance.Between(e.x, e.y, pr.x, pr.y)
            if (d < 320) {
              const dir = pr.clone().subtract(v).normalize()
              e.setVelocity(dir.x*e.speed, dir.y*e.speed)
            } else {
              if (Math.random()<0.01) e.setVelocity(P.Math.Between(-60,60), P.Math.Between(-60,60))
            }
          })

          // Simple HUD: health and inventory
          const t = Math.max(0, 60 - Math.floor((this.time.now - this.startTime)/1000))
          this.scene.get("hud")?.events.emit("hud", { health: this.health, med: this.inv.medkit, loot: this.inv.loot, t, evac: this.evacOpen })
        }

        gameOver(win:boolean){
          const W = this.scale.width, H = this.scale.height
          this.add.rectangle(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY, W, H, 0x000000, 0.45).setScrollFactor(0)
          this.add.text(this.cameras.main.worldView.centerX-80, this.cameras.main.worldView.centerY-20, win?"Evacuated!":"Down!", {color:"#fff", fontSize:"18px"}).setScrollFactor(0)
          this.scene.pause()
        }
      }

      class HudScene extends P.Scene {
        txt!: any
        create(){
          this.txt = this.add.text(12,32, "", {color:"#e5e7eb"}).setScrollFactor(0)
          this.events.on("hud", (s:any)=>{
            this.txt.setText(`HP: ${s.health}  Medkits: ${s.med}  Loot: ${s.loot}  Time: ${s.t}s  ${s.evac?"Evac OPEN":"Survive"}`)
          })
        }
      }

      const config: any = {
        type: P.AUTO,
        width: 960,
        height: 560,
        parent: containerRef.current,
        backgroundColor: "#0b1020",
        physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
        scene: [MainScene, HudScene],
        scale: { mode: P.Scale.FIT, autoCenter: P.Scale.CENTER_BOTH },
      }

      if (!destroyed) gameRef.current = new P.Game(config)
    }

    boot()

    return () => { destroyed = true; try { gameRef.current?.destroy(true) } catch {} }
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-4">
      <header className="grid gap-1">
        <h2 className="text-xl font-semibold">Survival Royale (Beta)</h2>
        <p className="text-sm text-muted-foreground">Top‑down survival with enemies, loot, medkits, and evacuation objective. Mobile joystick supported.</p>
      </header>

      <div className="rounded-lg border bg-card p-3 grid gap-3">
        {err ? <div className="text-sm text-red-600">{err}</div> : null}
        <div ref={containerRef} className="mx-auto rounded overflow-hidden border min-h-[520px]" />
        <div className="text-sm text-muted-foreground">Tip: Collect loot and medkits, avoid enemies, survive 60s, then reach the green evac zone.</div>
        <div className="flex gap-2">
          <Button asChild><a href="/games">Back to Games</a></Button>
        </div>
      </div>
    </main>
  )
}
