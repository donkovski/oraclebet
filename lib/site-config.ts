export const siteConfig = {
  vipEnabled: false,
  authEnabled: false,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  primaryDomain: "oraclebet.eu",
  secondaryDomain: "oraclebet.online",
  legacyDomain: "oraclebet.net",
  siteUrl: "https://oraclebet.eu",
} as const
