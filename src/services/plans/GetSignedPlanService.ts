import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class GetSignedPlanService {
  async execute(customerId: string) {
    const purchase = await prisma.purchase.findFirst({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: { plan: true },
    })

    if (!purchase) {
      throw new Error("Nenhum plano encontrado.")
    }

    return purchase
  }
}
