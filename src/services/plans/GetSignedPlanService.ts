import prismaClient from "../../prisma"

export class GetSignedPlanService {
  async execute(customerId: string) {
    const purchase = await prismaClient.purchase.findFirst({
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
