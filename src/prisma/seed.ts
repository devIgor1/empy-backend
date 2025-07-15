import prismaClient from "./index"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"

dotenv.config()

async function seed() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3333"

  const plans = [
    {
      namePublic: "Standard",
      precoMensal: 189.9,
      precoAnual: 1899,
      qtdCreditosOff: 10,
      qtdCreditosOn: "30",
      ativo: true,
      recomendado: true,
    },
    {
      namePublic: "Pro",
      precoMensal: 279.9,
      precoAnual: 2799,
      qtdCreditosOff: 30,
      qtdCreditosOn: "ILIMITADOS",
      ativo: true,
      recomendado: false,
    },
    {
      namePublic: "Light",
      precoMensal: 1,
      precoAnual: 5,
      qtdCreditosOff: 2,
      qtdCreditosOn: "20",
      ativo: true,
      recomendado: false,
    },
  ]

  for (const plan of plans) {
    const id = uuidv4()
    await prismaClient.plan.create({
      data: {
        id,
        ...plan,
        isCustom: false,
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
