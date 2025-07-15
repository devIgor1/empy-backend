import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { CreateCustomPlanDTO } from "../../validators/planValidator"

const prisma = new PrismaClient()

export class CreateCustomPlanService {
  async execute(data: CreateCustomPlanDTO) {
    const basePlan = await prisma.plan.findUnique({
      where: { id: data.basePlanId },
    })

    if (!basePlan) {
      throw new Error("Plano base não encontrado")
    }

    const newPlan = await prisma.plan.create({
      data: {
        id: uuidv4(),
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
        paymentLink: basePlan.paymentLink,
      },
    })

    return newPlan
  }
}
