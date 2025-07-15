import { Request, Response } from "express"
import { ListPlansService } from "../../services/plans/ListPlansService"

class ListPlansController {
  async handle(req: Request, res: Response) {
    const listPlansService = new ListPlansService()
    const plans = await listPlansService.execute()
    return res.json(plans)
  }
}

export { ListPlansController }
