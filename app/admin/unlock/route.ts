import { NextRequest, NextResponse } from "next/server"
import { grantAdminAccess } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key") ?? ""
  const granted = await grantAdminAccess(key)

  if (!granted) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.redirect(new URL("/admin", request.url))
}
