export type Result = {
  date: string
  match: string
  prediction: string
  odds: number
  result: string
  status: "WIN" | "LOSE" | "VOID"
}
