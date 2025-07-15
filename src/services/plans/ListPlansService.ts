import prismaClient from "../../prisma"

class ListPlansService {
  async execute() {
    const plans = await prismaClient.plan.findMany({
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
