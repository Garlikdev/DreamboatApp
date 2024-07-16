import { z } from 'zod'

export const clientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
    street: z.string().min(1, 'Ulica jest wymagana'),
    postal_code: z.string().min(1, 'Kod pocztowy jest wymagany'),
    city: z.string().min(1, 'Miejscowość jest wymagana'),
    pesel: z.number().int().positive().min(0, 'Pesel jest wymagany'),
    phone: z.number().int().positive().min(0, 'Numer telefonu jest wymagany'),
    email: z.number().int().positive().min(0, 'Adres email jest wymagany'),
})

export type ClientSchema = z.infer<typeof clientSchema>
