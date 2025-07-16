let callCount = 0

export function simulatePayment() {
  const sequence = [
    "PAID",
    "DECLINED_NO_LIMIT",
    "PAID",
    "NOT_AUTHORIZED",
    "PAID",
  ]

  const status = sequence[callCount] || "PAID"
  callCount++
  return status
}
