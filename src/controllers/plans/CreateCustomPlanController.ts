import { Request, Response } from "express"
import { CreateCustomPlanService } from "../../services/plans/CreateCustomPlanService"

export class CreateCustomPlanController {
  async handle(req: Request, res: Response) {
    try {
      const {
        basePlanId,
        namePublic,
        nameInternal,
        monthlyPrice,
        annualPrice,
        discount,
      } = req.body

      const service = new CreateCustomPlanService()

      const plan = await service.execute({
        basePlanId,
        namePublic,
        nameInternal,
        monthlyPrice,
        annualPrice,
        discount,
      })

      return res.status(201).json(plan)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
