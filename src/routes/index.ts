import { Router } from "express"
import { ListPlansController } from "../controllers/plans/ListPlansController"
import { CreateCustomPlanController } from "../controllers/plans/CreateCustomPlanController"
import { CreateCheckoutController } from "../controllers/plans/CreateCheckoutController"

const router = Router()

router.get("/plans", new ListPlansController().handle)

router.post("/plans/custom", new CreateCustomPlanController().handle)

router.post("/checkout/:planId/:cycle", new CreateCheckoutController().handle)

export { router }
