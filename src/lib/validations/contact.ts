import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, 'El mensaje es muy corto'),
})

export type ContactFormData = z.infer<typeof contactSchema>
