import { NextResponse } from "next/server"
import { incrementDailyVisit } from "@/lib/supabase-admin"

export async function POST() {
  try {
    const visit = await incrementDailyVisit()

    return NextResponse.json(
      {
        ok: true,
        visits: visit?.visits ?? null,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  } catch {
    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }
}
