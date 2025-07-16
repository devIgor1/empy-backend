import { Request, Response } from "express"
import { CreatePurchaseService } from "../../services/plans/CreateCheckoutService"
import { BillingCycle } from "@prisma/client"
import { getStatusMessage } from "../../utils/statusCheckoutMessage"

export class CreateCheckoutController {
  async handle(req: Request, res: Response) {
    const { planId, cycle } = req.params
    const { namePublic, monthlyPrice, annualPrice, cardNumber } = req.body

    const validFakeCard = "4111 1111 1111 1111"
    if (cardNumber !== validFakeCard) {
      return res.status(400).json({
        success: false,
        error: "Atenção: o cartão fornecido é inválido.",
      })
    }

    const amount = cycle === "monthly" ? monthlyPrice : annualPrice
    const billingCycle: BillingCycle =
      cycle === "monthly" ? "MONTHLY" : "ANNUAL"

    const service = new CreatePurchaseService()
    const purchase = await service.execute({
      planId,
      amount,
      billingCycle,
      customerName: namePublic,
    })

    const success = purchase.status === "PAID"
    const message = getStatusMessage(purchase.status)

    return res.status(201).json({
      success,
      status: purchase.status,
      message,
      data: purchase,
    })
  }
}
