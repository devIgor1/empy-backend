import { prisma } from "../../lib/prisma"

export class ListPurchasesService {
  async execute() {
    const purchases = await prisma.purchase.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        plan: {
          select: { publicName: true },
        },
        amount: true,
        status: true,
      },
    })

    return purchases
  }
}
