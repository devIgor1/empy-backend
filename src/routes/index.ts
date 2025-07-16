import { Router } from "express"
import { ListPlansController } from "../controllers/plans/ListPlansController"
import { CreateCustomPlanController } from "../controllers/plans/CreateCustomPlanController"
import { CreateCheckoutController } from "../controllers/plans/CreateCheckoutController"
import { GetPlanByIdController } from "../controllers/plans/GetPlanByIdController"
import { GetCurrentPlanController } from "../controllers/plans/GetCurrentPlanController"
import { GetAllPurchasesController } from "../controllers/purchases/ListPurchasesController"

const router = Router()

router.get("/plans", new ListPlansController().handle)

router.get("/plans/:id", new GetPlanByIdController().handle)

router.post("/plans/custom", new CreateCustomPlanController().handle)

router.post("/checkout/:planId/:cycle", new CreateCheckoutController().handle)

router.get("/my-plan", new GetCurrentPlanController().handle)

router.get("/purchases", new GetAllPurchasesController().handle)

export { router }
