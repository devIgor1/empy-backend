import { prisma } from "../../lib/prisma"

class ListPlansService {
  async execute() {
    const plans = await prisma.plan.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        monthlyPrice: "asc",
      },
    })
    return plans
  }
}

export { ListPlansService }
