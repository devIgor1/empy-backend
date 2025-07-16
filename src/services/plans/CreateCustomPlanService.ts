import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { CreateCustomPlanDTO } from "../../validators/planValidator"

const prisma = new PrismaClient()

const baseUrl = "http://localhost:3333" // ajuste se estiver em produção

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
        paymentLink: "",
      },
    })

    const updatedPlan = await prisma.plan.update({
      where: { id: newPlan.id },
      data: {
        paymentLink: `${baseUrl}/pay/${newPlan.id}`,
      },
    })
    return updatedPlan
  }
}
