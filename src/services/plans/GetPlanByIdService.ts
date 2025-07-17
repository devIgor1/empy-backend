import prismaClient from "../../prisma"

export class GetPlanByIdService {
  async execute(id: string) {
    const plan = await prismaClient.plan.findUnique({
      where: { id },
    })

    return plan
  }
}
