import { z } from 'zod'

export const reservationSchema = z.object({
    boat_id: z.number().nonnegative(),
    port: z
        .string({ required_error: 'Pole jest wymagane' })
        .min(1, 'Wybierz port'),
    invoice: z.boolean().default(false),
    invoice_number: z.number().nonnegative(),
    company_id: z.number().optional(),
    client_id: z
        .number({ required_error: 'Pole jest wymagane' })
        .nonnegative()
        .min(1, 'Wybierz klienta'),
    patent_name: z.string({ required_error: 'Pole jest wymagane' }),
    patent_number: z
        .number({ required_error: 'Pole jest wymagane' })
        .nonnegative(),
    zaliczka: z.number().nonnegative().optional(),
    cleaning: z.number().nonnegative().optional(),
    start: z.string({ required_error: 'Pole jest wymagane' }),
    end: z.string({ required_error: 'Pole jest wymagane' }),
})

export type ReservationSchema = z.infer<typeof reservationSchema>
