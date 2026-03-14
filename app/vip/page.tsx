import { notFound } from "next/navigation"
import { siteConfig } from "@/lib/site-config"

export default async function VipPage() {
  if (!siteConfig.vipEnabled) {
    notFound()
  }

  const { default: VipPageClient } = await import("@/components/VipPageClient")

  return <VipPageClient />
}
