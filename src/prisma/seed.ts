import prismaClient from "./index"

async function seed() {
  await prismaClient.plan.create({
    data: {
      name: "Light",
      monthlyPrice: 157.0,
      annualPrice: 130.83,
      discount: 0,
      id: "1",
    },
  })
  await prismaClient.plan.create({
    data: {
      name: "Standard",
      monthlyPrice: 249.5,
      annualPrice: 207.91,
      discount: 0,
      id: "2",
    },
  })
  await prismaClient.plan.create({
    data: {
      name: "Pro",
      monthlyPrice: 347.0,
      annualPrice: 289.92,
      discount: 0,
      id: "3",
    },
  })
}

seed().then(() => {
  console.log("Seed completed")
})
