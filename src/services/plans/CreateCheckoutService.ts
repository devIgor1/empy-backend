import {
  BillingCycle,
  PrismaClient,
  Purchase,
  PurchaseStatus,
} from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { simulatePayment } from "../../utils/paymentSimulator"
import { prisma } from "../../lib/prisma"

export class CreatePurchaseService {
  async execute({
    planId,
    amount,
    billingCycle,
    customerName,
  }: {
    planId: string
    amount: number
    billingCycle: BillingCycle
    customerName: string
  }) {
    const status = simulatePayment() as PurchaseStatus

    const newPurchase: Purchase = {
      id: uuidv4(),
      customerId: "local-user",
      customerName,
      planId,
      amount,
      billingCycle,
      status,
      createdAt: new Date(),
    }

    await prisma.purchase.create({
      data: newPurchase,
    })

    return newPurchase
  }
}
