import { notFound } from "next/navigation"
import RegisterPageClient from "@/components/RegisterPageClient"
import { siteConfig } from "@/lib/site-config"

export default function RegisterPage() {
  if (!siteConfig.authEnabled) {
    notFound()
  }

  return <RegisterPageClient />
}
