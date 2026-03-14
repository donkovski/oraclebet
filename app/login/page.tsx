import { notFound } from "next/navigation"
import LoginPageClient from "@/components/LoginPageClient"
import { siteConfig } from "@/lib/site-config"

export default function LoginPage() {
  if (!siteConfig.authEnabled) {
    notFound()
  }

  return <LoginPageClient />
}
