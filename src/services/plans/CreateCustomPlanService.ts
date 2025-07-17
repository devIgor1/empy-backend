import { v4 as uuidv4 } from "uuid"
import { CreateCustomPlanDTO } from "../../validators/planValidator"
import prismaClient from "../../prisma"

export class CreateCustomPlanService {
  async execute(data: CreateCustomPlanDTO) {
    const basePlan = await prismaClient.plan.findUnique({
      where: { id: data.basePlanId },
    })
    if (!basePlan) {
      throw new Error("Plano base não encontrado")
    }

    const id = uuidv4()

    const newPlan = await prismaClient.plan.create({
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
        paymentLink: `${process.env.FRONTEND_BASE_URL}/?custom=${id}`,
      },
    })

    return newPlan
  }
}
