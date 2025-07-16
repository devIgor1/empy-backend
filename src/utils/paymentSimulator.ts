import { PurchaseStatus } from "@prisma/client"

let step = 0

export function simulatePayment(): PurchaseStatus {
  const flow: PurchaseStatus[] = [
    "PAID", // 1. Standard
    "DECLINED_NO_LIMIT", // 2. Pro
    "PAID", // 3. Pro
    "NOT_AUTHORIZED", // 4. Standard
    "PAID", // 5. Standard
  ]

  const status = flow[step] || "PAID"
  step++
  return status
}
