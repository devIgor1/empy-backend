import { Request, Response } from "express"
import { GetPlanByIdService } from "../../services/plans/GetPlanByIdService"

export class GetPlanByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const service = new GetPlanByIdService()
    const plan = await service.execute(id)

    if (!plan) {
      return res.status(404).json({ error: "Plano não encontrado" })
    }

    return res.json(plan)
  }
}
