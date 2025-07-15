import prismaClient from "./index"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"

dotenv.config()

async function seed() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3333"
  const discountRate = 2 / 12 // 16,67%

  const plans = [
    {
      publicName: "Light",
      monthlyPrice: 157.0,
      offlineCredits: 2,
      onlineCredits: "20",
      isRecommended: false,
    },
    {
      publicName: "Standard",
      monthlyPrice: 249.5,
      offlineCredits: 10,
      onlineCredits: "30",
      isRecommended: true,
    },
    {
      publicName: "Pro",
      monthlyPrice: 347.0,
      offlineCredits: 30,
      onlineCredits: "UNLIMITED",
      isRecommended: false,
    },
  ]

  for (const plan of plans) {
    const id = uuidv4()
    const annualPrice = +(plan.monthlyPrice * 12 * (1 - discountRate)).toFixed(
      2
    )

    await prismaClient.plan.create({
      data: {
        id,
        publicName: plan.publicName,
        internalName: plan.publicName.toLowerCase(),
        monthlyPrice: plan.monthlyPrice,
        annualPrice,
        discount: Number((discountRate * 100).toFixed(2)),
        isCustom: false,
        offlineCredits: plan.offlineCredits,
        onlineCredits: plan.onlineCredits,
        isActive: true,
        isRecommended: plan.isRecommended,
        paymentLink: `${baseUrl}/pay/${id}`,
      },
    })
  }

  console.log("Seed completed!")
}

seed()
  .catch((err) => console.error("Seed failed", err))
  .finally(async () => {
    await prismaClient.$disconnect()
  })
