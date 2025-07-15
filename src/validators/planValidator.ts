import z from "zod"

export const CreateCustomPlanSchema = z.object({
  basePlanId: z.uuid(),
  namePublic: z.string(),
  nameInternal: z.string().optional(),
  discount: z.number().min(0).max(100).optional(),
  monthlyPrice: z.number(),
  annualPrice: z.number(),
})

export type CreateCustomPlanDTO = z.infer<typeof CreateCustomPlanSchema>
