import { Router, Request, Response } from "express"
import { ListPlansController } from "../controllers/plans/ListPlansController"
import { CreateCustomPlanController } from "../controllers/plans/CreateCustomPlanController"

const router = Router()

router.get("/plans", new ListPlansController().handle)

router.post("/plans/custom", new CreateCustomPlanController().handle)

export { router }
