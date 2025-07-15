import { Request, Response } from "express"
import { ZodError } from "zod"
import { CreateCustomPlanSchema } from "../../validators/planValidator"
import { CreateCustomPlanService } from "../../services/plans/CreateCustomPlanService"

class CreateCustomPlanController {
  async handle(req: Request, res: Response) {
    try {
      const data = CreateCustomPlanSchema.parse(req.body)
      const service = new CreateCustomPlanService()
      const plan = await service.execute(data)

      return res.status(201).json(plan)
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Erro de validação",
          issues: err.issues.map((e) => e.message),
        })
      }

      if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
      }

      console.error(err)
      return res.status(500).json({ error: "Erro interno ao criar plano" })
    }
  }
}

export { CreateCustomPlanController }
