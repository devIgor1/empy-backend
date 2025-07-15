import z from "zod"

export const CreateCustomPlanSchema = z.object({
  basePlanId: z.string().uuid(),
  namePublic: z.string(),
  nameInternal: z.string().optional(),
  desconto: z.number().min(0).max(100).optional(),
  precoMensal: z.number(),
  precoAnual: z.number(),
})

export type CreateCustomPlanDTO = z.infer<typeof CreateCustomPlanSchema>
