export const siteConfig = {
  vipEnabled: false,
  authEnabled: false,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  primaryDomain: "oraclebet.net",
  secondaryDomain: "oraclebet.online",
} as const
