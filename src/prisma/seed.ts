import prismaClient from "./index"
import dotenv from "dotenv"

dotenv.config()

async function seed() {
  const frontendBaseUrl =
    process.env.FRONTEND_BASE_URL ?? "http://localhost:5173"
  const discountRate = 2 / 12 // 16,67%

  const plans = [
    {
      id: "1",
      publicName: "Light",
      monthlyPrice: 157.0,
      offlineCredits: 2,
      onlineCredits: "20",
      isRecommended: false,
    },
    {
      id: "2",
      publicName: "Standard",
      monthlyPrice: 249.5,
      offlineCredits: 10,
      onlineCredits: "30",
      isRecommended: true,
    },
    {
      id: "3",
      publicName: "Pro",
      monthlyPrice: 347.0,
      offlineCredits: 30,
      onlineCredits: "UNLIMITED",
      isRecommended: false,
    },
  ]

  for (const plan of plans) {
    const annualPrice = +(plan.monthlyPrice * 12 * (1 - discountRate)).toFixed(
      2
    )

    await prismaClient.plan.create({
      data: {
        id: plan.id,
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
        paymentLink: `${frontendBaseUrl}/?custom=${plan.id}`,
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
