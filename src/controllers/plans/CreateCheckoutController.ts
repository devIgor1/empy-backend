import { Request, Response } from "express"
import { CreatePurchaseService } from "../../services/plans/CreateCheckoutService"
import { BillingCycle } from "@prisma/client"

export class CreateCheckoutController {
  async handle(req: Request, res: Response) {
    const { planId, cycle } = req.params
    const { namePublic, monthlyPrice, annualPrice } = req.body

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

    return res.status(201).json(purchase)
  }
}
