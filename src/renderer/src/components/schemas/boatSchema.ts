import { z } from 'zod'

const pricingSchema = z.object({
    id: z.string(),
    days: z.number().min(1, 'Must be at least 1 day'),
    price: z.number().min(0, 'Price must be positive'),
})

export const boatSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    pricePerHour: z
        .number()
        .int()
        .positive()
        .min(0, 'Price per hour must be a positive number'),
    deposit: z
        .number()
        .int()
        .positive()
        .min(0, 'Deposit price must be a positive number'),
    capacity: z.number().positive().min(1, 'Capacity must be at least 1'),
    pricing: z.array(pricingSchema).optional(),
})

export type BoatSchema = z.infer<typeof boatSchema>
