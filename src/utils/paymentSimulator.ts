export function simulatePayment():
  | "PAID"
  | "DECLINED_NO_LIMIT"
  | "NOT_AUTHORIZED" {
  const rand = Math.random()
  if (rand < 0.8) return "PAID"
  return Math.random() < 0.5 ? "DECLINED_NO_LIMIT" : "NOT_AUTHORIZED"
}
