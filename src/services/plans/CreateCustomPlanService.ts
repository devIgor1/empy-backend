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
        namePublic: data.namePublic,
        nameInternal: data.nameInternal,
        precoMensal: data.precoMensal,
        precoAnual: data.precoAnual,
        desconto: data.desconto,
        isCustom: true,
        ativo: true,
        recomendado: false,
        qtdCreditosOff: basePlan.qtdCreditosOff,
        qtdCreditosOn: basePlan.qtdCreditosOn,
        paymentLink: basePlan.paymentLink,
      },
    })

    return newPlan
  }
}
