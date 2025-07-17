import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { CreateCustomPlanDTO } from "../../validators/planValidator"

const prisma = new PrismaClient()
const frontendBaseUrl = process.env.FRONTEND_BASE_URL ?? "http://localhost:5173"

export class CreateCustomPlanService {
  async execute(data: CreateCustomPlanDTO) {
    const basePlan = await prisma.plan.findUnique({
      where: { id: data.basePlanId },
    })
    if (!basePlan) {
      throw new Error("Plano base não encontrado")
    }

    const id = uuidv4()

    const newPlan = await prisma.plan.create({
      data: {
        id,
        publicName: data.namePublic,
        internalName: data.nameInternal,
        monthlyPrice: data.monthlyPrice,
        annualPrice: data.annualPrice,
        discount: data.discount,
        isCustom: true,
        isActive: true,
        isRecommended: false,
        offlineCredits: basePlan.offlineCredits,
        onlineCredits: basePlan.onlineCredits,
        paymentLink: `${frontendBaseUrl}/?custom=${id}`,
      },
    })

    return newPlan
  }
}
