import { Request, Response } from "express"
import { ListPurchasesService } from "../../services/purchases/ListPurchasesService"

export class GetAllPurchasesController {
  async handle(req: Request, res: Response) {
    const service = new ListPurchasesService()
    const purchases = await service.execute()

    return res.json(purchases)
  }
}
