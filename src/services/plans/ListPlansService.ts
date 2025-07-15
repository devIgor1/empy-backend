import prismaClient from "../../prisma"

class ListPlansService {
  async execute() {
    const plans = await prismaClient.plan.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        precoMensal: "asc",
      },
    })
    return plans
  }
}

export { ListPlansService }
