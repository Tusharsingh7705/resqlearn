import { NextResponse } from "next/server"

// Static curated list for MVP. Could be moved to CMS/Firestore later.
const videos = [
  {
    id: "earthquake-shorts",
    title: "Earthquake Safety (Shorts)",
    provider: "youtube",
    ytId: "ZvfKe8gs0go", // https://youtube.com/shorts/ZvfKe8gs0go
  },
  {
    id: "flood-safety",
    title: "Flood Safety: What To Do",
    provider: "youtube",
    ytId: "9RqrUInS7GA", // https://youtu.be/9RqrUInS7GA
  },
  {
    id: "fire-safety",
    title: "Fire Safety Basics",
    provider: "youtube",
    ytId: "Xgc90CoJbDI", // https://youtu.be/Xgc90CoJbDI
  },
]

export async function GET() {
  return NextResponse.json({ videos })
}
