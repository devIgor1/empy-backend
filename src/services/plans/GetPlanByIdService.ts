import { prisma } from "../../lib/prisma"

export class GetPlanByIdService {
  async execute(id: string) {
    const plan = await prisma.plan.findUnique({
      where: { id },
    })

    return plan
  }
}
