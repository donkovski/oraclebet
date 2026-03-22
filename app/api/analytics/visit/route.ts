import { NextResponse } from "next/server"
import { incrementDailyVisit } from "@/lib/supabase-admin"

export async function POST() {
  try {
    const visit = await incrementDailyVisit()

    if (!visit) {
      console.error("Daily visit tracking failed.", "No visit row was returned.")

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

    return NextResponse.json(
      {
        ok: true,
        visits: visit.visits,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  } catch (error) {
    console.error("Daily visit tracking failed.", error)

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
