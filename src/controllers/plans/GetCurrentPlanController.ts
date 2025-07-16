import { Request, Response } from "express"
import { GetSignedPlanService } from "../../services/plans/GetSignedPlanService"

export class GetCurrentPlanController {
  async handle(req: Request, res: Response) {
    try {
      const customerId = "local-user"
      const service = new GetSignedPlanService()
      const currentPlan = await service.execute(customerId)
      return res.status(200).json(currentPlan)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      }

      console.error(error)
      return res.status(500).json({ error: "Erro interno ao buscar plano" })
    }
  }
}
