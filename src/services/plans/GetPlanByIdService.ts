import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class GetPlanByIdService {
  async execute(id: string) {
    const plan = await prisma.plan.findUnique({
      where: { id },
    })

    return plan
  }
}
