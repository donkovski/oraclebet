import { hasAdminAccess, isAdminAuthenticated } from "@/lib/admin-auth"
import { PREDICTION_IMPORT_XML_TEMPLATE } from "@/lib/admin-xml"

export async function GET() {
  const accessGranted = await hasAdminAccess()
  const authenticated = await isAdminAuthenticated()

  if (!accessGranted || !authenticated) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(PREDICTION_IMPORT_XML_TEMPLATE, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": 'attachment; filename="oraclebet-predictions-template.xml"',
      "Cache-Control": "no-store",
    },
  })
}
